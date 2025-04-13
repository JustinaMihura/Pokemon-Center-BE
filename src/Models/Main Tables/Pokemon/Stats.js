const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    
    sequelize.define("Stats" , {

        id : { 
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : { 
            type : DataTypes.STRING(15),
            allowNull : false
        },
      
    }, 
    {
        timestamps : false
    }
)
};