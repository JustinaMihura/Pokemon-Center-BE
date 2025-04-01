const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Version_Group_Details" , {
       level_learned_at : { //! For Moves
        type : DataTypes.INTEGER,
        allowNull : true
       },
       
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};