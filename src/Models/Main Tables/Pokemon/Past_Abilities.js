const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Past_Abilities" , {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        pokemon_abilities_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Pokemon_Abilities",
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
                model : "Pokemons",
                key : "id"
            }
        }
    }, 
    {
        timestamps : false,
        indexes : [
            {
                unique : true,
                fields : ['pokemon_id','generation_id', 'pokemon_abilities_id']
            }
        ]
    }
)
};