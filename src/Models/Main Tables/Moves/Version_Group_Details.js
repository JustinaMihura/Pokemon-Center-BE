const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Version_Group_Details" , {
       level_learned_at : { //! For Moves
        type : DataTypes.INTEGER,
        allowNull : true
       },
       
       pokemon_move_id : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
            model : "Pokemons_Moves",
            key : "id"
        }
       },
       move_method_id : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
          model : 'Move_Methods',
          key : "id"
        }
       }
       
    }, {
        timestamps : false,
        indexes: [
            {
              unique: true, 
              fields: ['pokemon_move_id','move_method_id'] 
            }
          ]
    },
    {timestamps : false}
)
};