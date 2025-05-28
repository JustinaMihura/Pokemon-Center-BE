
const axios = require("axios");
require("dotenv").config();
const batching = require("../../utils/batching_fn.js")
const {sequelize} = require("../../db/db.js");
const pLimit = require("p-limit").default;
const asyncRetry = require("../../utils/asyncRetry_fn.js")

const {Pokemon} = sequelize.models
const {BASEURL} = process.env;


module.exports = async () => {
    
    try {
        
    const start = performance.now();
    const t = sequelize.transaction();

    const {data} = await axios.get(`${BASEURL}pokemon/?offset=0&limit=1302`);
    
    if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };
        
        const slice_urls = batching(data.results.map(e => e.url), 50);
        let pokemons = [];
        let pokemon_relations = [];
        let last_valid_id = 0; 
        const limit = pLimit(10);
        
            for (let i = 0; i < slice_urls.length; i++) {

                const element = slice_urls[i];
                const data = await Promise.all(element.map(url => limit(() => axios.get(url))));

                for (const e of data){
                    
                    

                    const results = await asyncRetry(async(attemps) => {

                        const compare = ["base_experience", "height", "weight", "is_default", "legacy_cry", "latest_cry"];
                        
                        //-- la PokeApi tiene errores de guardado en los id de lo ultimos registros
                        //-- por ende los arreglamos aqui para que sea mas seguro y eficiente el guardado.
                        
                        let pokemon_id; 
                        
                        if (e.data.id < 10000) {
                            pokemon_id = e.data.id;
                            last_valid_id = pokemon_id;  
                            
                        } else {
                            
                            pokemon_id = last_valid_id + 1; 
                            last_valid_id = pokemon_id;  
                        };
                        
                        const poke = await Pokemon.findOne({where : {
                            id : pokemon_id,
                            name: e.data.name, 
                        }, transaction : t});
                        
                        //-- Comparación de data de ambos lados (si existe en db)
                        //Verficando previamente si los valores no son null, undefined o diferente a data de la BD.
    
                        const compare_data = {
                            
                            name: e.data.name,
                            id: pokemon_id,
                            base_experience: e.data.base_experience,
                            height: e.data.height,
                            weight: e.data.weight,
                            is_default : e.data.is_default,
                            imgFront : e.data.sprites?.other?.["official-artwork"]?.front_default ||
                            e.data.sprites?.other?.["dream_world"]?.front_default ||
                            e.data.sprites.other?.["home"]?.front_default ||
                            e.data.sprites?.front_default || 
                            e.data.sprites?.other?.["showdown"]?.front_default ||
                            "pokemon",
                            imgShiny :e.data.sprites?.other["official-artwork"]?.front_shiny ||
                            e.data.sprites?.other?.["dream_world"]?.front_shiny ||
                            e.data.sprites?.other?.["home"]?.front_shiny ||
                            e.data.sprites?.front_shiny || 
                            e.data.sprites?.other?.["showdown"]?.front_shiny ||
                            "pokemon",
                            legacy_cry : e.data.cries?.["legacy"],
                            latest_cry : e.data.cries?.["latest"]
                            
                        };
                        
                                if(poke) {
                                    
                                    let update = {};
                                    
                                    for (const attr of compare) {
                                        if(
                                            compare_data[attr] !== null &&
                                            compare_data[attr] !== undefined &&
                                            compare_data[attr] !== poke[attr]
                                        ){
                                            update[attr] = compare_data[attr]
                                        }
                                    }
    
                                    if(Object.keys(update).length > 0) {
                                        await poke.update(update, {transaction : t})
                                    };
                                    
                                } else {
                                    
                                    pokemons.push(compare_data);
                                };
                        
                    //  guardar la data extraida de la Api en esta variable para luego retornarla con la funcion.         
                    //  Lo hago para evitar nuevas calls a la Api buscando la misma informacion.
                    //  Ademas para evitar errores de guardado por temas de jerarquia. (los saves de Types y Pokemons tienen que ser cargados previamente a la carga del save de pokemons_relations
                    
                                pokemon_relations.push({
                                id : pokemon_id,
                                types : e.data.types,
                                abilities : e.data.abilities,
                                forms : e.data.forms,
                                game_indeces : e.data.game_indices,
                                held_items : e.data.held_items || [],
                                location_area_encounters : e.data.location_area_encounters,
                                moves : e.data.moves,
                                past_abilities : e.data.past_abilities || [],
                                past_types : e.data.past_types || [],
                                species : e.data.species,
                                stats : e.data.stats,
    
                            });
                    });

                    // luego modiicar (seguramente va para logs/error)

                    if(!(results.success)) {
                        continue;
                    }
                };
                    await new Promise(res => setTimeout(res, 1000));
            };

            if (pokemons.length > 0) await Pokemon.bulkCreate(pokemons, {transaction : t});
            
            const end = performance.now();
            const duration = end - start;
            await t.commit();

            return {

                data: pokemon_relations ,
                duration : duration,
                task :"Pokemon"
                
            };
            
    } catch (error) {
            await t.rollback()
            console.error("Pokemon db error" ,error)
        }
};

