const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Past_Abilities" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        }
    }, 
    {
        timestamps : false
    }
)
};