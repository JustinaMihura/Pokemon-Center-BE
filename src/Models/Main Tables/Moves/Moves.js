const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Moves" ,{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(40),
            allowNull : false
        },
        accuracy : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        damage_class : {
            type : DataTypes.STRING(20)
        },
        pp : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        description : {
            type : DataTypes.STRING(150),
            allowNull : false
        },
        power : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
    },
        {
            timestamps : false
        })
}