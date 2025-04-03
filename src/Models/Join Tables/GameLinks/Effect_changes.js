const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Effect_Changes" , {
      id : {
        type :DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
      },
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