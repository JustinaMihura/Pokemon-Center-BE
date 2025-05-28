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
       abilities_id : {
        type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Abilities",
                id : "id"
            }
       },
       version_group_id : {
        type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Version_Groups",
                id : "id"
            }
       },
       
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};