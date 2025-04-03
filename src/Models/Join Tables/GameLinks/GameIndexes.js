const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Game_Indices" , {
    
      game_index : {
        type : DataTypes.INTEGER,
        allowNull : true
       },
       
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};