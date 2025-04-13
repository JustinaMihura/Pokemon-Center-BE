const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Pockets" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        //* categories.id
    }, 
        {
            timestamps : false
        }
    )
}