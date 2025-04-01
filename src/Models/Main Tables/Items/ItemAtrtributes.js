const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("ItemAttributes" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        description : {
            type : DataTypes.STRING(100)
        }
    }, 
        {
            timestamps : false
        }
    )
}