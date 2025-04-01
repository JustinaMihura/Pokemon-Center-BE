const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Encounter_Methods", {
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