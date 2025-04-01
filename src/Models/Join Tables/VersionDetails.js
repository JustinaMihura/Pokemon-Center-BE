const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Version_Details" , {
       level_learned_at : { //! For Moves
        type : DataTypes.INTEGER,
        allowNull : true
       },
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