const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Game_Indices" , {
    
      id : {
         type : DataTypes.INTEGER,
         primaryKey : true , 
         autoIncrement : true
      },
      game_index : {
        type : DataTypes.INTEGER,
        allowNull : true
       },
       version_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
          model : "Versions",
          key : "id"
        }
       },
       pokemon_id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
          model : "Pokemon",
          key : "id"
        }
       },

    }, {
        timestamps : false,
        indexes : [
          {
            unique : true,
            fields : ['"pokemon_id', 'version_id']
          }
        ]
    },
    {timestamps : false}
)
};