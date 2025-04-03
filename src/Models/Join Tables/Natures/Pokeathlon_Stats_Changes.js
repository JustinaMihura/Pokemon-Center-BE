const { DataTypes, INTEGER} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Pokeathlon_Stats_Changes" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        max_chance : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

    }, {
        timestamps : false
    },
    {timestamps : false}
)
};