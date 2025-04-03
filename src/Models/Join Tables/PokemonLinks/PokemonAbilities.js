const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Pokemon_Abilities" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        is_hidden : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        slot : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
        // contest-type.id 1 a muchos //? los concursos usan sabores de bayas para mejorar el desempeño de los Pokémon.
    }, 
        {
            timestamps : false
        }
    )
}