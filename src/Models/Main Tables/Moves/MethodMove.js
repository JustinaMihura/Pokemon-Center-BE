const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Move_Method" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
       
        // version.group.id 1 a muchos
    }, 
        {
            timestamps : false
        }
    )
}