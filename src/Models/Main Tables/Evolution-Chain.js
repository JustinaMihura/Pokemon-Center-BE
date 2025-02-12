const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Evolution_Chains",{
        id : { 
            type : DataTypes.INTEGER,
            primaryKey : true
    }}, 
    {timestamps : false}
)
};

