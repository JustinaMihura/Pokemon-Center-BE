const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Pokemon_Stats" , {

        base_stat : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

        effort : {
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
        stat_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Stats",
                key : "id"
            }
        },
    }, 
    {
        timestamps : false,
        indexes: [
            {
              unique: true, 
              fields: ['pokemon_id', 'stat_id'] 
            }
          ]
    }
)
};