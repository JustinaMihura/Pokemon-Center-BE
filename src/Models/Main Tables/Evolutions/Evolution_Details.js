const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Evolution_Details",{
        id : { 
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        min_level : { 
            type : DataTypes.INTEGER,
            allowNull : true
        },
        min_happiness : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        min_beauty : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        min_affection : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        needs_overworld_rain : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        },
        relative_physical_stats : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        time_of_day : {
            type : DataTypes.STRING(10),
            allowNull : true
        },
        trade_species : {
            type : DataTypes.STRING(30),
            allowNull : true
        },
        turn_upside_down : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        }

},

    {timestamps : false}
)
};

