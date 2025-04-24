const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Past_Types" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        pokemon_type_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Pokemon_Types",
                key : "id"
            }
        },
        generation_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Generations",
                key : "id"
            }
        },
        pokemon_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Generations",
                key : "id"
            }
        }
    }, 
    {
        timestamps : false,
        indexes : [
            {
                unique : true,
                fields : [' pokemon_id ','generation_id', 'pokemon_type_id']
            }
        ]
    }
)
};