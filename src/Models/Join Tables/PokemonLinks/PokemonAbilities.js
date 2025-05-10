const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Pokemon_Abilities" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        is_hidden : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        slot : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        pokemon_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Pokemons",
                key : "id"
            }
        },
        abilities_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Abilities",
                key : "id"
            }
        },
        // contest-type.id 1 a muchos 
        //? los concursos usan sabores de bayas para mejorar el desempeño de los Pokémon.
    }, 
        {
            timestamps : false,
            indexes: [
                {
                  unique: true, 
                  fields: ['pokemon_id', 'abilities_id'] 
                }
              ]
        }
    )
}