const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Past_Values" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        effect_chance : {
            type : DataTypes.INTEGER,
            allowNull : true
        }, 
        accuracy : {
            type : DataTypes.INTEGER,
            allowNull : false
        }, 
        pp : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        power : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        effects : {
            type : DataTypes.STRING(50),
            allowNull : true
        },
        

    }, 
    {
        timestamps : false
    }
)
};