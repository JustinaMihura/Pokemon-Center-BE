const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Move_Method" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        description : {
            type : DataTypes.STRING(100),
            allowNull : false
        }
        // version.group.id 1 a muchos
    }, 
        {
            timestamps : false
        }
    )
}