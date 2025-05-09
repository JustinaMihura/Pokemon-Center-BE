const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Flavor_text_entries" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        flavor_text : {
            type : DataTypes.STRING(200),
            allowNull : true
        },
        genus : {
            type : DataTypes.STRING(100),
            allowNull : true
        },
        species_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Species",
                key : "id"
            }
        },
        items_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Items",
                key : "id"
            }
        },
        version_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Version",
                key : "id"
            }
        },
        langueage_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Lengueage",
                key : "id"
            }
        },
        super_contest_effect_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Super_Contest_Effects",
                key : "id"
            }
        },
        moves_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Moves",
                key : "id"
            }
        },
        contest_effect_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Contest_Effects",
                key : "id"
            }
        },
        version_group_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Version_Groups",
                key : "id"
            }
        },
        abilities_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Abilities",
                key : "id"
            }
        },
        
        
        
    }, {timestamps : false})
};