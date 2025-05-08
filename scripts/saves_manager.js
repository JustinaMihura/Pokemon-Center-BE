const pokemon_relations = require("./Pokedex_relations_data/pokemon_relations.js");
const save_pokemon = require("./Pokedex_main_data/save_pokemon.js");
const save_types = require("./Pokedex_main_data/save_types.js");
const save_abilitites = require("./Pokedex_main_data/save_abilities.js");
const save_moves = require("./Pokedex_main_data/save_move.js");
const save_items = require("./Pokedex_main_data/save_items.js");
const save_pokedexes = require("./Pokedex_main_data/save_pokedexes.js");
const save_versions = require("./Pokedex_main_data/save_versions.js");
const save_locations_areas = require("./Pokedex_main_data/save_locations_areas.js");
const save_generations = require("./Pokedex_main_data/save_generations.js");
const save_species = require("./Pokedex_main_data/save_species.js");
const save_forms = require("./Pokedex_main_data/save_forms.js");
const save_species_relations = require("./Pokedex_relations_data/species_relations.js");
const save_color = require("./Pokedex_main_data/save_color.js");
const save_evolutions_chain = require("./Pokedex_main_data/save_evolutions_chain.js");
const save_egg_groups = require("./Pokedex_main_data/save_eggGroups.js");
const save_lenguage = require("./Pokedex_main_data/save lengueage.js");
const save_conditions = require("./Pokedex_main_data/save_conditions.js")
const save_conditions_values = require("./Pokedex_main_data/save_conditions_values.js")
const save_locations = require("./Pokedex_main_data/save_locations.js");
const save_triggers = require("./Pokedex_main_data/save_triggers.js");
const save_encounter_method = require("./Pokedex_main_data/save_encounter_method.js");
const save_regions = require("./Pokedex_main_data/save_regions.js");
const save_version_group = require("./Pokedex_main_data/save_version_groups.js")

module.exports = async () => {

    try {                                               //-------------Mejorando script ------------//
                                                        // ( ❌❌❌ optimizacion con bulkCreate y verificacion de data -->//! dificil lectura y actualizacion de datos )
                                                        // ( ✅✅✅ Guardar con un bucle uno por uno con findOCreate al buscar otros registros para relacionarlos, luego en su respectivo archivo guardara sus atributos )
        const species_data = await save_species();    //
        const pokemons_data = await save_pokemon();     //
        await save_lenguage();                          //
        await save_versions();                          //
        await save_version_group();
        await save_generations();                       //
        await save_regions();                           //✅
        await save_triggers();                          //
        await save_encounter_method();                  //
        await save_evolutions_chain();                  //
        await save_forms();                             //
        await save_conditions();                        //
        await save_conditions_values();                 //
        await save_locations_areas();                   //
        await save_abilitites();                        //
        await save_types();                             //
        await save_moves();                             //
        await save_items();                             //
        await save_color();                             //
        await save_egg_groups();                        //
        await save_pokedexes();                         //
        await save_locations();                         //
        await pokemon_relations(pokemons_data)          //
        //await save_species_relations(species_data)
    } catch (error) {
        console.log(error);
        
    }
}


//!Despues hacerlo automatitizado buscando archivo por carpeta. 