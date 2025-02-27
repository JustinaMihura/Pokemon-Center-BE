const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    
    sequelize.define("Stats" , {

        id : { 
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : { 
            type : DataTypes.INTEGER,
            allowNull : false
        },
      
    }, 
    {
        timestamps : false
    }
)
};