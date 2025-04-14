const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Evolutions" , {
        id : {
            type  : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        is_baby : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        }
    
       
    },
    {timestamps : false}
)
};