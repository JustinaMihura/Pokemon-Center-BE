const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Past_Abilities" , {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        }
    }, 
    {
        timestamps : false
    }
)
};