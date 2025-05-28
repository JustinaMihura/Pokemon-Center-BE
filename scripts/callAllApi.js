/* const pokemon_relations = require("../scripts/Pokedex_relations_data/pokemon_relations.js");
const save_pokemon = require("../scripts/Pokedex_main_data/save_pokemon.js");
const save_types = require("../scripts/Pokedex_main_data/save_types.js");
const save_abilitites = require("../scripts/Pokedex_main_data/save_abilities.js");
const save_moves = require("../scripts/Pokedex_main_data/save_move.js");
const save_items = require("../scripts/Pokedex_main_data/save_items.js");
const save_pokedexes = require("../scripts/Pokedex_main_data/save_pokedexes.js");
const save_versions = require("../scripts/Pokedex_main_data/save_versions.js");
const save_locations_areas = require("../scripts/Pokedex_main_data/save_locations_areas.js");
const save_generations = require("../scripts/Pokedex_main_data/save_generations.js");
const save_species = require("../scripts/Pokedex_main_data/save_species.js");
const save_forms = require("../scripts/Pokedex_main_data/save_forms.js");
const save_species_relations = require("../scripts/Pokedex_relations_data/species_relations.js");
const save_color = require("../scripts/Pokedex_main_data/save_color.js");
const save_evolutions_chain = require("../scripts/Pokedex_main_data/save_evolutions_chain.js");
const save_egg_groups = require("../scripts/Pokedex_main_data/save_eggGroups.js");
const save_lenguage = require("../scripts/Pokedex_main_data/save lengueage.js");
const save_conditions = require("../scripts/Pokedex_main_data/save_conditions.js")
const save_conditions_values = require("../scripts/Pokedex_main_data/save_conditions_values.js")
const save_locations = require("../scripts/Pokedex_main_data/save_locations.js");
const save_triggers = require("../scripts/Pokedex_main_data/save_triggers.js");
const save_encounter_method = require("../scripts/Pokedex_main_data/save_encounter_method.js");
const save_regions = require("../scripts/Pokedex_main_data/save_regions.js");
const save_version_group = require("../scripts/Pokedex_main_data/save_version_groups.js")
const save_growth_rate = require("../scripts/Pokedex_main_data/save_growth_rate.js")
const save_pal_park_area = require("../scripts/Pokedex_main_data/save_pal_palk_area.js");
const save_move_method = require("../scripts/Pokedex_main_data/save_move_method.js");
const save_stats = require("../scripts/Pokedex_main_data/save_stats.js"); */
const loadMain = require("../utils/LoaderMain.js")
const loadRelations = require("../utils/LoaderRelations.js")
const {sequelize} = require("../db/db.js")

module.exports = async () => {

    try {                            
        
        const mainData = await loadMain("Pokedex_main_data");
       
        const relationResults  = await loadRelations("Pokedex_relations_data", mainData); 
        
        console.log("🎉 Datos principales cargados:", Object.keys(mainData).map(e => e.task));
        console.log("🔗 Relaciones procesadas:", relationResults.map(r => r.task));
        
        //-------------Mejorando script ------------//
        //    transaccions, asyncRetry , logErrors
        // pokemon ✅      relations ✅
        // species 
                                                    
    } catch (error) {
        console.log(error);
        
    } finally {
        // Cerrar conexiones al finalizar
        await sequelize.connectionManager.close();
        console.log("🔌 Conexiones cerradas.");
    }
}


//!Despues hacerlo automatitizado buscando archivo por carpeta. 

