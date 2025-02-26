const {DataTypes} = require("sequelize");

module.exports= (sequelize) => {
    
    sequelize.define("Games" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey :  true
        },
        name : {
            type : DataTypes.STRING(30),
            allowNull : false
        },
        main_region : {
            type : DataTypes.STRING(30)
        },
        
    }, 
    {
        timestamps : false
    })

};