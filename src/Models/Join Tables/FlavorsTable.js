const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Flavors_Join_Table" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        potency : { 
            type : DataTypes.INTEGER,
            allowNull : false
        }
        
    }, {timestamp : false})
};