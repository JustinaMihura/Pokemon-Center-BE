const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Evolutions" , {
        id : {
            type  : DataTypes.INTEGER,
            primaryKey : true
        },
      /*   species_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Species" , 
                key : "id"
            }
        },

        evolves_to : {
            type: DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Species",
                key : "id"
            }
        }, */
     
       
    },
    {timestamps : false}
)
};