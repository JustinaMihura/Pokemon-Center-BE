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
            model : "Pokemon_Moves",
            key : "id"
        }
       }
       
    }, {
        timestamps : false,
        indexes: [
            {
              unique: true, 
              fields: ['pokemon_move_id'] 
            }
          ]
    },
    {timestamps : false}
)
};