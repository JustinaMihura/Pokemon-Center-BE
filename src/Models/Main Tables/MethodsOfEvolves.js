const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("MethodsOfEvolves", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    },{
        timestamps : false
    })
};