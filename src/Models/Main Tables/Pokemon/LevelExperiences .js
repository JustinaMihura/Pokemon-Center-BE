const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("LevelExperiences" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        level : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        },
        experience : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        }
    }, 
        {
            timestamps : false
        }
    )
}