const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Characteristics_IVs" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        gene_modulo : {
            //? residuo que tiene que tener
            type : DataTypes.INTEGER
        },
        possible_values : {
            //?Posible values del IV´s 
            type : DataTypes.ARRAY(DataTypes.INTEGER), //* STRING o JSON 
            allowNull : false
        }
        //"✅"highest_stat = stat.id 
    }, 
        {
            timestamps : false
        }
    )
}