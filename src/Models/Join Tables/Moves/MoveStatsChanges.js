const {DataTypes} = require("sequelize");
 

module.exports = (sequelize) => {

    sequelize.define("Move_Stats_Change" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        change : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }, 
    {
        timestamps : false
    }
)
};