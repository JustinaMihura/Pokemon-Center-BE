const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Growth_Rates" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        
        formula : {
            type : DataTypes.STRING(500)
        }
        //"✅"levelsexperiences.id 1 a muchos 
    }, 
        {
            timestamps : false
        }
    )
}