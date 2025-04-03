const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Natures" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        decreased_stat : {
            type : DataTypes.STRING(20),
            allowNull : true
        },
        hates_flavor : {
            type : DataTypes.STRING(20),
            allowNull : true
        },
        increased_stat : {
            type : DataTypes.STRING(20),
            allowNull : true
        },
       likes_flavor : {
            type : DataTypes.STRING(20),
            allowNull : true
        },
        // mov-battle-preferneces = tabla intermedia = //?Este atributo indica qué tipo de estrategia de batalla prefiere un Pokémon con esta naturaleza en función de sus puntos de salud (HP). 
                                    //* moveBattleStyle.id + low_hp_prefenreces + hight_hp_preferneces

        //pokeathlon-stats-changes.id = tabla intermedia =  //? Representa una estadística del Pokéathlon (un minijuego en Pokémon HeartGold y SoulSilver).
                                    //* pokeathlonStats.id + max_change
    }, 
    
        {
            timestamps : false
        }
    )
}