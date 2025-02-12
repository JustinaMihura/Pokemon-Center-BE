const {Sequelize} = require("sequelize");
require("dotenv").config();
const FPokemonStats = require("./src/Models/Join Tables/PokemonStats.js")
const FSpecies = require("./src/Models/Main Tables/Species.js")
const FEvolution_Chain = require("./src/Models/Main Tables/Evolution-Chain.js")
const FEvolution = require("./src/Models/Join Tables/Evolutions.js")
const FStats = require("./src/Models/Main Tables/Stats.js")
const FTypes = require("./src/Models/Main Tables/Types.js")
const FPokemon = require("./src/Models/Main Tables/Pokemons.js")
const FPokemonsTypes = require("./src/Models/Join Tables/PokemonTypes.js")
const FMethodsOfEvolves = require("./src/Models/Main Tables/MethodsOfEvolves.js")
const FEvolutionMethod = require("./src/Models/Join Tables/EvolutionMethod.js")
const FMOoves = require("./src/Models/Main Tables/Moves.js"); 
const FGames = require("./src/Models/Main Tables/Games.js")

const {PG_USERNAME , PG_PASSWORD,NODE_ENV, DB_NAME, DB_PORT} = process.env;


const sequelize = new Sequelize(
    `postgres://${PG_USERNAME}:${PG_PASSWORD}@${NODE_ENV}:${DB_PORT}/${DB_NAME}`);


FEvolution(sequelize)
FEvolution_Chain(sequelize) 
FPokemonsTypes(sequelize)
FSpecies(sequelize)
FTypes(sequelize)
FPokemon(sequelize)
FStats(sequelize)
FPokemonStats(sequelize)
FMethodsOfEvolves(sequelize)
FEvolutionMethod(sequelize)
FMOoves(sequelize)

const {Types, 
    Pokemon, 
    Stats, 
    PokemonStats, 
    Evolution_Chains,
    Species, 
    PokemonsTypes, 
    Evolutions , 
    MethodsOfEvolves,
    EvolutionMethod,
    Moves
    } = sequelize.models



Pokemon.belongsToMany(Stats,{
    through : PokemonStats,
     foreignKey :  "pokemon_id" 
    });

Stats.belongsToMany(Pokemon,{
    through : PokemonStats,
     foreignKey : "stat_id"
    }); 

Pokemon.belongsToMany(Types ,{through : PokemonsTypes});
Types.belongsToMany(Pokemon ,{through : PokemonsTypes});

Pokemon.belongsTo(Species, { foreignKey: "species_id" });
Species.hasMany(Pokemon, { foreignKey: "species_id" });

Species.belongsTo(Evolution_Chains, { foreignKey: "evolution_chain_id" });
Evolution_Chains.hasMany(Species, { foreignKey: "evolution_chain_id" }); 

Species.hasMany(Evolutions , {foreignKey : "species_id", as : "ToSpecies"})
Evolutions.belongsTo(Species , {foreignKey : "species_id", as : "FromSpecies"})
    
Evolutions.belongsToMany(MethodsOfEvolves, {
    through: EvolutionMethod,
    foreignKey: "evolution_id",
  });

MethodsOfEvolves.belongsToMany(Evolutions, {
    through: EvolutionMethod,
    foreignKey: "trigger_id",
  });

Moves.belongsTo(Types , {foreignKey : "types_id"})
Types.hasMany(Moves, {foreignKey : "type_id"})



module.exports ={
    sequelize, 
    ...sequelize.models
}