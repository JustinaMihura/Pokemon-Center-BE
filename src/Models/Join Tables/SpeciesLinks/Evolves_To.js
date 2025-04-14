const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Evolves_To" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        
    }, {timestamps : false})
};