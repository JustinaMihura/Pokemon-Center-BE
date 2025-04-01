const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Genders" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(10),
            allowNull :false
        }
    })
} 