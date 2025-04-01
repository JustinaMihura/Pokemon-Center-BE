const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Move_Machines" , {
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