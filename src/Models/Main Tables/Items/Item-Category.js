const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Item-Category" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        
        //items.id(1 a muchos)
        //pocket.id (lugar donde se guardan los items en la bag)
    }, 
        {
            timestamps : false
        }
    )
}