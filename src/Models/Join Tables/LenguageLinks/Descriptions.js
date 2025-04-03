const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Descriptions", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        descriptions : {
            type : DataTypes.STRING(50),
            allowNull : false
        }
    } , 
        {
            timestamps : false
        })
}