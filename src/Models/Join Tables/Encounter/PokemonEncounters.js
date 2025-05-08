const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Pokemon_Encounters" , {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
             primaryKey: true
        },
        pokemon_id : {

            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Pokemon",
                key : "id"
            }
        },

        location_area_id : {
            type : DataTypes.INTEGER,
            allowNull : false, 
            references : {
                model : "Locations_Areas",
                key : "id"
            }
        },
        version_details_id : { 
            type : DataTypes.INTEGER,
            allowNull : true, 
            references : {
                model : "Version_Details",
                key : "id"
            }
        }
    }, {
        timestamps : false,
       /*  indexes : [
            {
                unique: true,
                fields : ['version_details_id','location_area_id', 'pokemon_id']
            }
        ] */
    },
   
)
};