const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Forms" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
        },
        name:  {
            type : DataTypes.STRING,
            allowNull : false,
        },
        is_mega : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        is_default : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        },
        is_battle_only : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        },
        img_front : {
            type : DataTypes.STRING(150),
            allowNull : true,
        },
        img_back : {
            type : DataTypes.STRING(150),
            allowNull : true
        },
        img_front_shiny : {
            type : DataTypes.STRING(150),
            allowNull : true,
        },
        img_back_shiny : {
            type : DataTypes.STRING(150),
            allowNull : true
        },
        form_name : {
            type : DataTypes.STRING,
            allowNull : true
        },
        form_order : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    }, {
        timestamps : false
    })

};