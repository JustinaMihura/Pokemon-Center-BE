const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Contest_Effects" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        appeal : {
            type : DataTypes.INTEGER,
            allowNull : false
            //?Puntos que el movimiento da en el concurso
        },
        effect : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        short_effect : {
            type : DataTypes.STRING(50),
            allowNull: false
        },
        jam : {
            type : DataTypes.INTEGER
            //? Qué tanto interfiere con otros participantes (afecta su puntuación).
        }
        }, 
        {
            timestamps : false
        }
    )
}