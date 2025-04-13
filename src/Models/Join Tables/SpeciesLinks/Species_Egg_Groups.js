const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Species_Egg_Groups" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        }
    }, 
    {
        timestamps : false
    }
)
};