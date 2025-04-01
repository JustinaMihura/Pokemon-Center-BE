const { DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("IVs" , { 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(20),
            allowNull : false
        },
        descriptions : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        possible_values : {
            type : DataTypes.ARRAY(DataTypes.INTEGER)
        },
        gene_modulo : {
            type : DataTypes.INTEGER
        }
        //highest_stat = stat.id 
    }, 
        {
            timestamps : false
        }
    )
}