const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Flavors" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        // "✅"contest-type.id 1 a muchos //? los concursos usan sabores de bayas para mejorar el desempeño de los Pokémon.
    }, 
        {
            timestamps : false
        }
    )
}