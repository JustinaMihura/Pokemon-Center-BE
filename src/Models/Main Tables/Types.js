const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Types" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(10),
            allowNull : false,
            unique : true
        },
       
    }, 
    {
        timestamps : false
    }
);
}