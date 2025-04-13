const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Move_Battle_Preferences" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        high_hp_preference : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        low_hp_preference : {
            type : DataTypes.INTEGER,
            slloeNull : false
        }
    }, 
    {
        timestamps : false
    }
)
};