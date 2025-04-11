const pokemon_relations = require("./Save_Join_Tables/pokemon_relations.js");
const save_pokemon = require("./Save_Main_Tables/save_pokemon.js");
const save_types = require("./Save_Main_Tables/save_types.js");
const save_abilitites = require("./Save_Main_Tables/save_abilities.js");
const save_moves = require("./Save_Main_Tables/save_move.js");
const save_items = require("./Save_Main_Tables/save_items.js");
const save_pokedexes = require("./Save_Main_Tables/save_pokedexes.js");
const save_versions = require("./Save_Main_Tables/save_versions.js");
const save_locations_areas = require("./Save_Main_Tables/save_locations_areas.js");

module.exports = async () => {

    try {
        const pokemons_relations = await save_pokemon();
        await save_types();
        await save_abilitites();
        await save_moves();
        await save_items();
        await save_pokedexes();
        await save_versions();
        await save_locations_areas();
        await pokemon_relations(pokemons_relations)
    } catch (error) {
        console.log(error);
        
    }
}


//!Despues hacerlo automatitizado buscando archivo por carpeta. 