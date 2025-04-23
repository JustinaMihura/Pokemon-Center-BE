const pokemon_relations = require("./Save_Join_Tables/pokemon_relations.js");
const save_pokemon = require("./Save_Main_Tables/save_pokemon.js");
const save_types = require("./Save_Main_Tables/save_types.js");
const save_abilitites = require("./Save_Main_Tables/save_abilities.js");
const save_moves = require("./Save_Main_Tables/save_move.js");
const save_items = require("./Save_Main_Tables/save_items.js");
const save_pokedexes = require("./Save_Main_Tables/save_pokedexes.js");
const save_versions = require("./Save_Main_Tables/save_versions.js");
const save_locations_areas = require("./Save_Main_Tables/save_locations_areas.js");
const save_generations = require("./Save_Main_Tables/save_generations.js");
const save_species = require("./Save_Main_Tables/save_species.js");
const save_forms = require("./Save_Main_Tables/save_forms.js");
const save_species_relations = require("./Save_Join_Tables/species_relations.js");
const save_color = require("./Save_Main_Tables/save_color.js");
const save_evolutions_chain = require("./Save_Main_Tables/save_evolutions_chain.js");
const save_egg_groups = require("./Save_Main_Tables/save_eggGroups.js");
const save_lenguage = require("./Save_Main_Tables/save lengueage.js");
module.exports = async () => {

    try {                                               //------Mejorando script.-------//
        //const species_data = await save_species();    //
        const pokemons_data = await save_pokemon();     //✅
        await save_evolutions_chain();                  //✅
        await save_forms();                             //✅
        await save_color();                             //
        await save_egg_groups();
        await save_lenguage();
        await save_versions();
        // await save_types();
        // await save_abilitites();
        // await save_moves();
        // await save_items();
        // await save_pokedexes();
        // await save_locations_areas();
        // await save_generations();
         await pokemon_relations(pokemons_data)
        //await save_species_relations(species_data)
    } catch (error) {
        console.log(error);
        
    }
}


//!Despues hacerlo automatitizado buscando archivo por carpeta. 