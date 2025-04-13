const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Held_Items", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        }
    } , 
        {
            timestamps : false
        })
}