const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Species" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true
        },
        is_baby : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        is_legenadary : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        is_mythical : {
            type : DataTypes.BOOLEAN, 
            allowNull : false
        },
        base_happiness : {
            type : DataTypes.INTEGER,
            allowNull : false
        
        }, 
        hatch_counter : {
            //Número de ciclos necesarios para eclosionar un huevo
            type : DataTypes.INTEGER,
            allowNull : false
        },
        capture_rate : {
            //Probabilidad de captura del Pokémon.
            type : DataTypes.INTEGER,
            allowNull : false
        },
}, 
{timestamps : false}
)
};