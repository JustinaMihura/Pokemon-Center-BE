const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Encounter_Details" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        chance : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        max_chance : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        min_level : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};