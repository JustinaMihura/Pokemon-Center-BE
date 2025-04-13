const {DataTypes}= require("sequelize");

module.exports = (sequelize) => {
    
    sequelize.define("Encounter_Conditions_Values" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
        },
        
    }, 
        {
            timestamps : false
        })
};

