const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Contest_Combos_Moves" , { 
       
       use_after : {
            type : DataTypes.BOOLEAN,
            allowNull : false
            //!Una lista de movimientos que deben usarse después del movimiento actual en un combo.

        },
        use_before : {
            type : DataTypes.BOOLEAN,
            allowNull : false
            //!Una lista de movimientos que deben usarse antes del movimiento actual para activar el combo

        }
    }, 
        {
            timestamps : false
        }
    )
}