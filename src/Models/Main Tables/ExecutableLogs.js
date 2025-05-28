const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Executable_Logs" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey :true,
            autoIncrement : true
        },
        task : {
            type : DataTypes.STRING,
            allowNull : false
        },
        latest_run : {
            type : DataTypes.DATE,
            allowNull : false
        },
        data : {
            type : DataTypes.JSON,
            allowNull : false
        }
    }, {
        timestamps : false
    })
} ;