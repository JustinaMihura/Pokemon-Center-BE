const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Pal_Park_Encounters", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        base_score : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        rate : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    } , 
        {
            timestamps : false
        })
}