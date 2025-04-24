const { DataTypes, INTEGER} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Pokemons_Moves" , {
        
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        pokemon_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Pokemons",
                key : "id"
            }
        },
        move_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Moves",
                key : "id"
            }
        },
    },
    {
        timestamps : false,
        indexes: [
            {
              unique: true, 
              fields: ['pokemon_id', 'move_id'] 
            }
          ]
    }
)
};