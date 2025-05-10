const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Evolves_To" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        from_species_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Species",
                key : "id"
            }
        },
        to_species_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references : {
                model : "Species",
                key : "id"
            }
        }
        
    }, {
        timestamps : false,
        indexes : [
            {
                unique : true, 
                fields : ['to_species_id', 'from_species_id']
            }
        ]
    })
};