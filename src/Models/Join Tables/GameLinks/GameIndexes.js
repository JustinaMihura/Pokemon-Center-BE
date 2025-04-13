const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Game_Indices" , {
    
      game_index : {
        type : DataTypes.INTEGER,
        allowNull : true
       },
       id : {
          type : DataTypes.INTEGER,
          primaryKey : true , 
          autoIncrement : true
       }
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};