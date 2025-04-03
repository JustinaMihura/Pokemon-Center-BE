const {DataTypes} = require("sequelize");


module.exports = (sequelize) =>  {

    sequelize.define("Items" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        }, 
        name : {
            type : DataTypes.STRING(50),
            allowNull : false
        },

        baby_trigger_for : {
            type: DataTypes.INTEGER,
            allowNull: true,  // Permite valores nulos
            references: {
                model: "Evolution_Chains",
                key: "id"
                },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        },
        cost : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        img : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        fling_power : {
            type : DataTypes.INTEGER,
            allowNull : true 
        }
        //"✅"held-by-pokemon.id -> Tabla intermedia = 
                                // pokemon.id + version-detail(tabla inermedia ) = 
                                                // rarity + version.id
        //"✅"machines.id

        //"✅"effect-entries.id -> effect , effect-short
        //"✅"category-item.id
        //"✅"flavor-text ->  tabla inermedia  = 
                            //verion-group.id + text 
        //"✅"attributes.id (n:n)
        //"✅"fling-effect.id (1 a 1) allowNull true
        //game_indexes.id = tabla intermedia = 
                            //* game_index + generation.id
        //
    }, 
        {
            timestamps : false
        }
    )
}