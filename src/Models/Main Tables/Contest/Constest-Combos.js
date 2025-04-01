const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Contest_Combos" , { 

        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        type : {
            type : DataTypes.ENUM('Normal' , 'Super'),
            allowNull : false
        },
    }, 
        {
            timestamps : false
        }
    )
}