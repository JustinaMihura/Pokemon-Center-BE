const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Fling-Effect" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        effect : {
            type : DataTypes.STRING(50)
        } 
    }, 
        {
            timestamps : false
        }
    )
}