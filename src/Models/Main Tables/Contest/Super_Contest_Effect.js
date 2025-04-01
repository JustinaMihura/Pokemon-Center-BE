const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Super_Contest_Effects" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        appeal : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        text : {
            type : DataTypes.STRING(50),
            allowNull : false
        }
    }, 
        {
            timestamps : false
        }
    )
}