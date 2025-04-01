const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("GrowthRates" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        description : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        formula : {
            type : DataTypes.STRING(200)
        }
        //"✅"levelsexperiences.id 1 a muchos 
    }, 
        {
            timestamps : false
        }
    )
}