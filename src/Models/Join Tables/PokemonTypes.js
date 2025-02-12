const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("PokemonsTypes" , {}, {
        timestamps : false
    },
    {timestamps : false}
)
};