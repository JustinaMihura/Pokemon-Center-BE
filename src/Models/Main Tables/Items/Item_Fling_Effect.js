const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Item_Fling_Effect" , { //? Efecto cuando se usa Lanzamiento(Move) 
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        effect : {
            type : DataTypes.STRING(50)
        } 
    }, 
        {
            timestamps : false
        }
    )
}