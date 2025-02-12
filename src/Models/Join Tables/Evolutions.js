const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Evolutions" , {
        id : {
            type  : DataTypes.INTEGER,
            primaryKey : true
        },
        species_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Species" , 
                key : "id"
            }
        },

        evolves_to : {
            type: DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Species",
                key : "id"
            }
        },
        min_level : { 
            type : DataTypes.INTEGER
        },
        min_happ : {
            type : DataTypes.INTEGER
        },
        min_beauty : {
            type : DataTypes.INTEGER
        },
        location : {
            type : DataTypes.STRING(30)
        },
        item : {
            type : DataTypes.STRING(30)
        },
        held_item : {
            type : DataTypes.STRING(30)
        },
        gender : {
            type : DataTypes.STRING(30)
        },
        trade_species : {
            type : DataTypes.STRING(30)
        }

       
    },
    {timestamps : false}
)
};