const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Pokemon_Pokedexes", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        entry_number : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    } , 
        {
            timestamps : false
        })
}