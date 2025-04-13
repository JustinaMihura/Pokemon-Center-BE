const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Meta" , { 

        //* datos en forma de procentajes 0 a 100%
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        ailment_chance : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        crit_rate : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        drain: {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        flinch_chance: {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        healing: {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        max_hits : {   //? número máximo de veces que un movimiento puede golpear al objetivo.
            type : DataTypes.INTEGER,
            allowNull : true
        },
        min_hits : {   //? número min 
            type : DataTypes.INTEGER,
            allowNull : true
        },
        max_turns: { //?la cantidad máxima de turnos durante los cuales un movimiento tiene efecto.
            type : DataTypes.INTEGER,
            allowNull : true
        },
        min_turns: { //? cantidad min
            type : DataTypes.INTEGER,
            allowNull : true
        },
        stat_chance: {
            type : DataTypes.INTEGER,
            allowNull : false
        },
    }, 
        {
            timestamps : false
        }
    )
}