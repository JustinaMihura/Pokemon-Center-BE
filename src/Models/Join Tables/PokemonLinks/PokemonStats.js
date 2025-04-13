const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Pokemon_Stats" , {

        base_stat : {
            type : DataTypes.INTEGER
        },
        effort : {
            type : DataTypes.INTEGER
        }
     
    }, 
    {
        timestamps : false
    }
)
};