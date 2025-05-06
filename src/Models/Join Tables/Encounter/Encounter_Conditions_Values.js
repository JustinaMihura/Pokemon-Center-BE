const {DataTypes}= require("sequelize");

module.exports = (sequelize) => {
    
    sequelize.define("Encounter_Conditions_Values" , {

        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },

         encounter_detail_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Encounter_Details",
                key : "id"
            }
        },
        condition_value_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Conditions_Values",
                key : "id"
            }
        } 
    }, 
        {
            timestamps : false,
          /*   indexes : [
                {
                    unique : true,
                    fields : ['encounter_detail_id','condition_value_id']
                }
            ] */
        })
};

