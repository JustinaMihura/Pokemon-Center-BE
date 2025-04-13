const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Abilities" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : true
        },
        is_main_series : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        }
        //"✅"pokemon.id = tabla intermedia = 
                                //* pokemon id + slot + is_hidden
        //"✅"generation.id
    }, 
        {
            timestamps : false
        }
    )
}