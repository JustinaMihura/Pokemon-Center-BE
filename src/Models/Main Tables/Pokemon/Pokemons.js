const { DataTypes} = require("sequelize");


module.exports = (database) => {
    
    database.define("Pokemon" ,{
        
        name : {
            type : DataTypes.STRING(27),
            allowNull : false
        },
        id :{
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        base_experience : { 
            type : DataTypes.INTEGER,
        },
        height : {
            type : DataTypes.INTEGER
        },
        weight : { 
            type : DataTypes.INTEGER
        
        },

    },
    { 
        timestamps: false 
    }
)
};

