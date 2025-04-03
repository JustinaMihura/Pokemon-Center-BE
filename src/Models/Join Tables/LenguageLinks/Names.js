const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Names", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        }
    } , 
        {
            timestamps : false
        })
}