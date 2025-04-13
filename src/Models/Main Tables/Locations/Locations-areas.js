const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Locations_Areas" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        game_index : {
            type : DataTypes.INTEGER, 
            allowNull : false
        }
        //location.id
        //encounter-methods-rate --> tabla intermedia =
                                //*  encounter-method.id + version-detail.id (tabla intermedia) = 
                                                                            //  version.id + rate
        //pokemon_encounter.id -->  tabla intermedia =
                                    //*pokemon.id + version-detail.id --> tabla intermedia =
                                                                        //* max_chance + version.id + 
                                                                        // encounter_details --> tabla intermedia =
                                                                                        //* chance + max-level + method.id +
                                                                                        // min-level + conditions-values.id
    }, 
        {
            timestamps : false
        }
    )
}