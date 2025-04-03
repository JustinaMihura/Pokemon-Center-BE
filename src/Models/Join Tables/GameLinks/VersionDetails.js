const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Version_Details" , {
    
       max_chance : {//! For Encounter
        type : DataTypes.INTEGER,
        allowNull : true
       },
       rarity : {//! For Items
        type : DataTypes.INTEGER,
        allowNull : true
       }
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};