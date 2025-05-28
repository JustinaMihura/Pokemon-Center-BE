const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Names", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },
        abilities_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Abilities",
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
        move_id : {
             type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Moves",
                key : "id"
            }
        },
        locations_id :  {
             type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Locations",
                key : "id"
            }
        },
        locations_areas_id : {
             type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Locations_Areas",
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
        types_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Types",
                key : "id"
            }
        },
        species_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Species",
                key : "id"
            }
        },
        natures_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Natures",
                key : "id"
            }
        },
        stats_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Stats",
                key : "id"
            }
        },
        pokedexes_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Pokedexes",
                key : "id"
            }
        }

    } , 
        {
            timestamps : false
        })
}