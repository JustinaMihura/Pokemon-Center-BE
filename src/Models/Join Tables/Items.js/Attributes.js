const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Attributes", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
    } , 
        {
            timestamps : false
        })
}