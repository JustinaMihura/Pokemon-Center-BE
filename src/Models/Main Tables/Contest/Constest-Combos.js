const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Contest_Combos" , { 

        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        type : {
            type : DataTypes.ENUM('normal' , 'super'),
            allowNull : false
        },
        relation : {
            type : DataTypes.ENUM('use_after', 'use_before'),
            allowNull : true
        }
    }, 
        {
            timestamps : false
        }
    )
}