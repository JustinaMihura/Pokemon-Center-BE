const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Contest_Type" , {
        id : {
            type : DataTypes.INTEGER,
            primartyKey : true
        },
        name : {
            type : DataTypes.STRING(15),
            allowNull : false
        },
        color : {
            type : DataTypes.STRING(10),
            allowNull : false
        }
    } , {
      timestamps : false  
    })
}