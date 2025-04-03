const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Effects_Entries", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        effects : {
            type : DataTypes.STRING(50),
            allowNull : false
        }
    } , 
        {
            timestamps : false
        })
}