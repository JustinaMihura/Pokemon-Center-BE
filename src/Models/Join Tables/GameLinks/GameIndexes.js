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
        allowNull : true,
        references : {
          model : "Versions",
          key : "id"
        }
       },
       pokemon_id : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
          model : "Pokemon",
          key : "id"
        }
       },
       generation_id : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
          model : "Generations",
          key : "id"
        }
       },
       location_id : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
          model : "Locations",
          key : "id"
        }
       },

    }, {
        timestamps : false,
       /*  indexes : [
          {
            unique : true,
            fields : ['"pokemon_id', 'version_id']
          }
        ] */
    },
    {timestamps : false}
)
};