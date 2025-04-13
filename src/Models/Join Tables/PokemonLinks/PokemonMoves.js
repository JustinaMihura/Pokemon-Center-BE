const { DataTypes, INTEGER} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Pokemons_Moves" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        }
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};