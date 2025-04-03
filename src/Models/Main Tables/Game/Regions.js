const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Regions" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
       
    }, 
        {
            timestamps : false
        }
    )
}