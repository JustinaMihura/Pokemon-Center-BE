const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Encounter_Method_Rate" , {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
             primaryKey: true
        },
        location_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Locations",
                key : "id"
            }
        },
        version_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Versions",
                key : "id"
            }
        },
        enounter_method_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Encounter_Methods",
                key : "id"
            }
        },
    }, {
        timestamps : false,
        indexes : [
            {
                unique : true,
                fields : ['location_id', 'encounter_method_id','version_id']
            }
        ]
    },
    {timestamps : false}
)
};