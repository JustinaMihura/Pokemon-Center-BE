const axios = require("axios");
const {sequelize} = require("../../db/db");
require("dotenv").config();
const batching = require("../batching_fn");
const pLimit = require("p-limit").default;

const {BASEURL} = process.env;
const {Evolution_Chains, Evolutions, Evolves_To, Species, Evolution_Details,Triggers,Genders,Items,Moves,Types,Locations} = sequelize.models;


module.exports = async () => {
    
    try {
        
        const limit = pLimit(10);
        const {data} = await axios.get(`${BASEURL}evolution-chain/?offset=0&limit=541`);
        
        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };

        const slice_urls = batching(data.results.map(url => url), 50);
        for (let i = 0; i < slice_urls.length; i++) {

            const element = slice_urls[i];
            const response = await Promise.all(element.map(url => limit(() => axios(url))));

            if(response && response.length > 0) {

            for (const chain of response) {


                const echain = await Evolution_Chains.findOrCreate({
                    id : chain.data.id
                });

                //*--Recursion para crear un Arbol N-ario (un arbol binario con 0 a mas de 2 hijos por nodo);
                //*--DFS(Depth-First Search) para guardar correctamente las diferentes variantes de evolucion.

                const recursiveChain = async (node , from) => { 

                    try {

                        let update = {};
                        let details_fields = ['min_level','min_happiness','min_beauty','min_affection','needs_overworld_rain','relative_physical_stats','time_of_day','turn_upside_down']
                        
                        const specie = await Species.findOne({where : {
                            name : node.species.name
                        }});
                        
                        if(specie) {

                            let current_node  = await Evolutions.findOne({where : {      //?---- nodo raiz (root node)
                                species_id : specie.id,
                                evolution_chain_id : echain.id
                            }});

                            if(current_node) {

                                if(node.is_baby !== current_node.is_baby) {
                                    await Evolutions.update({is_baby : node.is_baby})
                                };

                            } else {

                                current_node = await Evolutions.create({     //?---- nodo raiz (root node)
                                species_id : specie.id,
                                is_baby : node.is_baby,
                                evolution_chain_id : echain.id
                                });
                            };
                        
                        //-------------------------- Evolution_Details----------------------------------------

                            if(Array.isArray(node.evolution_details) && node.evolution_details.length > 0) {

                                for (const detail of node.evolution_details) {

                                    const trigger = await Triggers.findOne({where : {
                                        name : detail.trigger.name
                                    }});

                                    
                                    if(!trigger) continue;

                                    let exist = await Evolution_Details.findOne({where : {
                                        evolution_id : current_node.id,
                                        trigger_id : trigger.id
                                    }});

                                    if(!exist) {

                                        exist = await Evolution_Details.create({
                                            evolution_id : current_node.id,
                                            trigger_id : trigger.id,
                                            min_level : detail.min_level,
                                            min_happiness : detail.min_happiness,
                                            min_beauty  : detail.min_beauty,
                                            min_affection : detail.min_affection,
                                            needs_overworld_rain : detail.needs_overworld_rain,
                                            relative_physical_stats  : detail.relative_physical_stats,
                                            time_of_day : detail.time_of_day,
                                            turn_upside_down : detail.turn_upside_down
                                        });
                                    }
                                
                                //--------------------------Attributes-----------------------------------

                                    const gender = await Genders.findOne({where : {
                                        name : detail.gender
                                    }});

                                    gender &&
                                    gender.id !== exist.gender.id
                                    ? update.gender = gender : null;

                                    const held_item = await Items.findOne({where : {
                                        name : detail.held_item.name
                                    }});
                                    held_item &&
                                    held_item.id !== exist.held_item.id
                                    ? update.held_item = held_item : null;

                                    const item = await Items.findOne({where : {
                                        name : detail.item.name
                                    }});

                                    item &&
                                    item.id !== exist.item.id
                                    ? update.item = item : null;

                                    const known_move = await Moves.findOne({where : {
                                        name : detail.known_move.name
                                    }});
                                    known_move &&
                                    known_move.id !== exist.known_move.id
                                    ? update.known_move = known_move : null;

                                    const known_move_type = await Types.findOne({where : {
                                        name : detail.known_type.name
                                    }});
                                    known_move_type &&
                                    known_move_type.id !== exist.known_move_type.id
                                    ? update.known_move_type = known_move_type : null ;

                                    const location = await Locations.findOne({where : {
                                        name : detail.location.name
                                    }});

                                    location &&
                                    location.id !== exist.location.id
                                    ? update.location = location : null;

                                    const  party_species = await Species.findOne({where : {
                                        name : detail.held_item.name
                                    }});

                                    party_species && 
                                    party_species.id !== exist.party_species.id
                                    ? update.party_species = party_species : null;

                                    const  party_type = await Types.findOne({where : {
                                        name : detail.held_item.name
                                    }});

                                    party_type &&
                                    party_type.id !== exist.party_type.id
                                    ? update.party_type = party_type : null;

                                    const trade_species = await Species.findOne({where : {
                                        name : detail.held_item.name
                                    }});

                                    trade_species  &&
                                    trade_species.id !== exist.trade_species.id
                                    ? update.trade_species = trade_species : null; 

                                    for (const field of details_fields) {
                                        if(
                                            detail[field] &&
                                            detail[field] !== exist[field]
                                        ) {
                                            update[field] = detail[field]
                                        }
                                    }

                                    if(Object.keys(update).length > 0) {
                                        await exist.update(update)
                                    }
                                }
                            }
                        //-------------------------------------------------------------------------------------
                            if(from) {
                                    
                                await Evolves_To.findOrCreate({            //?----- Puente (Link)
                                    from_species_id : from.id,
                                    to_species_id : current_node.id
                                });

                            };

                            if(Array.isArray(node.evolves_to) && node.evolves_to.length > 0){

                                for (const nextNode of node.evolves_to) {           //?--- recorrer sus hijos (ej de eevee donde solo evoluciona a un nodo mas pero este tiene 8 species dif.)
                                    await recursiveChain(nextNode, current_node)  
                                }
                            }
                        };

                        return

                    } catch (error) {
                        console.error({"Error en cadena evolutiva" : error});
                    }
                };

               await recursiveChain(chain.data.chain, null)
            }
        };
        await new Promise(res => setTimeout(res, 1000)); 
    }
        
    } catch (error) {
        
        console.error({"Evolution_Chain db" : error});
        
    }
    
};