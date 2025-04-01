const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Pokemons_Types" , {
        slot : {
            type : DataTypes.INTEGER
        }
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};