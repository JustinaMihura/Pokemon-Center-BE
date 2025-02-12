/* const {Species,Evolution_Chain, Evolution, Stats, Types, Pokemon} = sequelize.models

Pokemon.hasMany(Stats, {through : "PokemonStats" })
Stats.hasMany(Pokemon, {through : "PokemonStats"})

Pokemon.hasMany(Types , {through : "PokemonTypes"})
Types.hasMany(Pokemon , {through : "PokemonTypes"})

Pokemon.belongsTo(Species, {foreignKey : "species.id"})
Species.hasMany(Pokemon, {through :  "species.id"})

Species.belongsTo(Evolution_Chain, {through : "evolution_chain_id"})
Evolution_Chain.hasMany(Species, {through : "evolution_chain_id"})

Species.hasMany(Evolution , {through : "species.id"})
Evolution.belongsTo(Species , {through : "species.id"})
 */
