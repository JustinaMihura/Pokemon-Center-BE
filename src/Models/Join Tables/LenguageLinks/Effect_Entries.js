const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Effects_Entries", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        effects : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
         short_effect : {
            type : DataTypes.STRING(20),
            allowNull : true
         },
         langueage_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Lengueage",
                key : "id"
            }
         },
         abilities_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Abilities",
                key : "id"
            }
         }
    } , 
        {
            timestamps : false
        })
}