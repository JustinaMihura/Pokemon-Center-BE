const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Regions" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        //location.id
        //generation.id
        //pokedexes.id
        //versions.id
    }, 
        {
            timestamps : false
        }
    )
}