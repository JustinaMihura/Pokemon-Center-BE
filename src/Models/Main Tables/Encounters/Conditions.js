const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Conditions" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        // values.id (1 a muchos)
    }, 
        {
            timestamps : false
        }
    )
}