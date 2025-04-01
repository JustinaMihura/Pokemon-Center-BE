const {DataTypes} = require("sequelize");

module.exports = (sequelize) =>  {

    sequelize.define("Pokedexes" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        descriptions : {
            type : DataTypes.STRING(100)    
        },
        is_main_series : {
            type : DataTypes.BOOLEAN,
            alowNull : false
        },
        //pokemon-entries --> tabla intermedia =    
                            // entry_number + species.id
        //region.id
        //version.id (1 a muchos)
        
    }, 
        {
            timestamps : false
        }
    )
}