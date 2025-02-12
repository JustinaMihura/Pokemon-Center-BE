const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("PokemonStats" , {

        base_stat : {
            type : DataTypes.INTEGER
        },
     
    }, 
    {
        timestamps : false
    }
)
};