const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Categories" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        description : {
            type : DataTypes.STRING(50)
        }
    }, 
        {
            timestamps : false
        }
    )
}