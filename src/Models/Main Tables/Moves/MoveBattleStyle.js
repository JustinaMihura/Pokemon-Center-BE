const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Move_Battle_Style" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
    }, 
        {
            timestamps : false
        }
    )
}