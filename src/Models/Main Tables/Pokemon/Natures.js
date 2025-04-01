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
        // mov-battle-preferneces = tabla intermedia = 
                                    //* moveBattleStyle.id + low_hp_prefenreces + hight_hp_preferneces
        //pokeathlon-stats-changes.id = tabla intermedia = 
                                    //* pokeathlonStats.id + max_change
    }, 
    
        {
            timestamps : false
        }
    )
}