const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Pokemon_Encounters" , {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
             primaryKey: true
        }
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};