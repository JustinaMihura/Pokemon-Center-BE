const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Pokemons_Types" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        slot : {
            type : DataTypes.INTEGER
        }, 
        pokemon_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Pokemons",
                key : "id"
            }
        },
        type_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Types",
                key : "id"
            }
        },
    }, {
        timestamps : false,
        indexes: [
            {
              unique: true, 
              fields: ['pokemon_id', 'type_id'] 
            }
          ]
    },
    {timestamps : false}
)
};