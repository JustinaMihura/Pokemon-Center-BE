const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Flavor_text_entries" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        flavor_text : {
            type : DataTypes.STRING(200),
            allowNull : false
        },
      
        
    }, {timestamp : false})
};