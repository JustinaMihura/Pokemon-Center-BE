const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Evolution_Method" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        
    }, {timestamp : false})
};