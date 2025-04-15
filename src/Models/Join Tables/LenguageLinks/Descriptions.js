const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Descriptions", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        descriptions : {
            type : DataTypes.STRING(200),
            allowNull : false
        }
    } , 
        {
            timestamps : false
        })
}