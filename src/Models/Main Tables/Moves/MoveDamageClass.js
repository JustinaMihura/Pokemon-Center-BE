const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("MoveDamageClass" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        description : {
            type : DataTypes.STRING(50),
            allowNull : false
        }
        //* move.id muchos  a 1 
    }, 
        {
            timestamps : false
        }
    )
}