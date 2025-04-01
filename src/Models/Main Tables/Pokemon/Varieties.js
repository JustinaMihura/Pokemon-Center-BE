const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Varieties" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        is_default : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
        },
       
    }, 
    {
        timestamps : false
    }
);
}