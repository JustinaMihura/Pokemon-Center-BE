const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("EvolutionMethod" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        
    }, {timestamp : false})
};