const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Firmness" , { 
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