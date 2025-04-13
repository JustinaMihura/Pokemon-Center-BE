const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Evolutions" , {
        id : {
            type  : DataTypes.INTEGER,
            primaryKey : true
        },
    
       
    },
    {timestamps : false}
)
};