const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Version_Groups" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        //move_learn_methods.id -> move-learn-method.id (muchos  a muchos)
        //pokedexes.id
        //regions.id
        //versions.id
       
    }, 
        {
            timestamps : false
        }
    )
}