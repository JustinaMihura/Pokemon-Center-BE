const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Berries" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        growth_time : {
            //? Indica cuántos ciclos de juego tarda la baya en crecer completamente
            //? Cada ciclo equivale a 4 horas en los juegos principales.
            type : DataTypes.INTEGER,
            allowNull : false
        },
        max_harvest : {
           //? Cantidad máxima de bayas que se pueden recolectar de una planta completamente crecida
            type : DataTypes.INTEGER,
            allowNull : false
        },
        natural_gift_power : {
            //?Poder base del movimiento Natural Gift si la baya es consumida durante la batalla
            type : DataTypes.INTEGER,
        },
        size : {
            //?Tamaño en milímetros
            type : DataTypes.INTEGER,
            allowNull : false
        },
        smoothness : {
            //?nfluye en la preparación de Pokéblocks/Poffins en los juegos de concursos de belleza.
            //?Mientras más baja sea la suavidad, mejor es la baya para hacer buenos Pokéblocks/Poffins.
            type : DataTypes.INTEGER,
            allowNull : false
        },
        soil_dryness : {
            //?Indica qué tan rápido la tierra se seca cuando se cultiva la baya.
            //?Si el valor es alto, necesitarás regar la planta con más frecuencia para evitar que se marchite.
            type : DataTypes.INTEGER,
            allowNull : false
        }
        // type.id //? Tipo que se le da con Natural Gift 
        //item.id 1 a muchos //? Es el ítem que el jugador puede obtener en los juegos.
        //firmness. id 1 a muchos //? firmeza
      //flavor.id muchos a muchos = potency:INTEGER + berries.id + flavor.id //? Sabores y Potencia 
    } , 
        {
            timestamps : false            
        })
}