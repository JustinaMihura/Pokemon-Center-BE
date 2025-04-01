const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Locations" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        //location-areas.id
        //regions-id
        //games-index -> tabla intermedia = generations.id + game-index
    }, 
        {
            timestamps : false
        }
    )
}