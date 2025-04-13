const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Conditions_Values" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        //condition.id
        
    }, 
        {
            timestamps : false
        }
    )
}