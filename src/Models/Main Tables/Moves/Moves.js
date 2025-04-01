const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Moves" ,{
        
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(40),
            allowNull : false
        },
        accuracy : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        pp : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        short_text : {
            type : DataTypes.STRING(30),
            allowNull : false
        },
        text : {
            type : DataTypes.STRING(60),
            allowNull : true
        },
        power : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        effect_chance : {
            type : DataTypes.INTEGER,
            allowNull : true
        },
        priority : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        }
        //"✅"contest_combos.id  = tabla intermedia = 
                                    //* combo.id + use.before (boolean) + use.after (boolean)
                                 
        //"✅"contest_effect.id 1 a muchos
        //"✅"constest_type  id 1 a muchos
        //"✅"MovesDamageClass.id 1 a muchos
        //"✅"generation.id
        //"✅"flavor_text_entries.id = tabla intermedia = 
                                                        //* version_group_id + move_id + langueage(enum).
        //"✅"learn_by_pokemon.id = tabla intermedia = 
                                //*pokemon.id , move.id
        //"✅" move_machines --> tabla intermedia =
                                                // machines_id version_groups_id moves_id
        //"✅"meta.id =tabla intermedia = 
                        //* category.id + ailment.id + ailment_chance 
                        
        //"✅"stat_changes.id = tabla intermedia = 
                                //* stat.id + changes + move.id
        // "✅"superContestEffect.id
        //"✅"target.id
        //"✅"type.id
        // "✅"past_values_id  = tabla intermedia = 
                                        //* version_group_id + datos.
    },
        {
            timestamps : false
        })
}