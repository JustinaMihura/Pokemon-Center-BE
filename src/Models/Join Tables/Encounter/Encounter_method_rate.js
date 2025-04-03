const { DataTypes} = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("Encounter_Method_Rate" , {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement: true,
             primaryKey: true
        }
    }, {
        timestamps : false
    },
    {timestamps : false}
)
};