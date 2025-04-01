const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Versions" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        }},
        //version-groups.id
        {
            timestamps : false
        }
    )
}