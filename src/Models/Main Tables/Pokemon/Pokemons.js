const { DataTypes} = require("sequelize");


module.exports = (database) => {
    
    database.define("Pokemon" ,{
        
        name : {
            type : DataTypes.STRING(27),
            allowNull : false
        },
        id :{
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        base_experience : { 
            type : DataTypes.INTEGER,
        },
        height : {
            type : DataTypes.INTEGER
        },
        weight : { 
            type : DataTypes.INTEGER
        
        },
        is_default : {
            //! true = forma base ; false = shiny o forma regional
            type : DataTypes.BOOLEAN
        },
        imgFront : { //!official-artwork
            type : DataTypes.STRING(100)
        },
        imgShiny : {//!official-artwork
            type : DataTypes.STRING(100)
        },
        legacy_cry : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        latest_cry : {
            type : DataTypes.STRING(100),
            allowNull : true
        },

        
        //"✅"abilities.id = tabla intermedia = 
                            //* abilities + is_hidden + slot
        //"✅"cries.id legacy (1era salida) latest (ultima)

        //? PREFIERO QUE ME MUESTRE EL INDICE DE LA POKEDEXES ATRAVES DE SPECIES 
        //! gameindexes.id = tabla intermedia =   
         //!                   //*game_index + version.id
         
        //"✅"held_items = tabla intermedia = 
                            //* item.id + version details.id =
                                                    //rarity + version.id 
                                                    
        //"✅"location_area_encounter.id (tabla intermedia ) = pokemon id, location-area.id y version_details id = 
        //                                                                                     version + max_chance + encounter_details id =
                                                                                                                            // method.id , chance, conditions-values, max_level, min-level
        //"✅"pokemonmoves.id = tabla intermedia = 
                            //* moves.id + version_details.id =
                                                    //* version.id + level_learned_at" + moveMethod.id
        //"✅"past_abilities.id = tabla intermedia = 
                                //* generation.id + abilities.id 
         //"✅"past_type.id (tipos pasados a esa generacion) = tabla intermedia = 
                                //* generation.id + type.id 
        //"✅"species.id
        //"✅"pokemon_stats.id  = tabla intermedia = 
                            //* stat.id + base_stat + effort 
        //"✅" types.id = tabla intermedia = 
                            //* type.id + poke.id + slot
                                                                                                  
    },
    { 
        timestamps: false 
    }
)
};

