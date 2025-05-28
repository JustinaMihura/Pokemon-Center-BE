const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Descriptions", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        descriptions : {
            type : DataTypes.STRING(200),
            allowNull : false
        },
        move_damage_class_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Move_Damage_Class",
                id : "id"
            }
        },
        langueage_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Lengueage",
                id : "id"
            }
        },
        species_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Species",
                id : "id"
            }
        },
        characteristics_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Characteristics_IVs",
                id : "id"
            }
        },
        pokedexes_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            references : {
                model : "Pokedexes",
                id : "id"
            }
        },
        
    } , 
        {
            timestamps : false
        })
}