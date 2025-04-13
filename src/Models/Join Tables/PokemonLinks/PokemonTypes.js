const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Pokemons_Types" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        slot : {
            type : DataTypes.INTEGER
        }, 
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};