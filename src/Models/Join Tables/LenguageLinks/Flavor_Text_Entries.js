const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Flavor_text_entries" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        flavor_text : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
      
        
    }, {timestamp : false})
};