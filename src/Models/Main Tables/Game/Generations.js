const {DataTypes} = require("sequelize");

module.exports= (sequelize) => {
    
    sequelize.define("Generations" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey :  true
        },
        name : {
            type : DataTypes.STRING(30),
            allowNull : false
        },
       //region.id 
       //moves.id --> (1 a muchos)
       //species.id --> (1 a muchos)
       //types.id --> (1 a muchos)
       //version.id --> (1 a muchos)
       //abilities.id (1 a muchos) 
    }, 
    {
        timestamps : false
    })

};