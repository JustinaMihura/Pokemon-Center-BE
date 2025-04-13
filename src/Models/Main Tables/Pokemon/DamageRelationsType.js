const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Damage_Relations" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        
    }, 
        {
            timestamps : false
        }
    )
}