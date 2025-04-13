const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Forms_Types" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        slot : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};