const axios = require("axios");
const {sequelize} = require("../../db/db");
require("dotenv").config();
const batching = require("../batching_fn");
const pLimit = require("p-limit").default;

const {BASEURL} = process.env;
const {Evolution_Chains, Evolutions, Evolves_To, Species} = sequelize.models;


module.exports = async () => {
    
    try {
        
        const limit = pLimit(10);
        const {data} = await axios.get(`${BASEURL}evolution-chain/?offset=0&limit=541`);
        
        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };
        await Evolution_Chains.destroy({where : {}})
        await Evolutions.destroy({where : {}});
        const slice_urls = batching(data.results.map(url => url), 50);
        for (let i = 0; i < slice_urls.length; i++) {

            const element = slice_urls[i];
            const response = await Promise.all(element.map(url => limit(() => axios(url))));

            if(response && response.length > 0) {

            for (const chain of response) {

                await Evolution_Chains.create({
                    id : chain.data.id
                });

                const recursiveChain = async (node , from) => {     //*------ recursion para crear un Arbol N-ario (un arbol binario 0 a mas de 2 hijos por nodo);
                                                                      //*--------DFS para guardar correctamente las difernetes variantes de evolucion.
                    try {
                        
                        const specie = await Species.findOne({where : {
                            name : node.species.name
                        }});

                        if(specie) {

                            const current_node = await Evolutions.create({     //?---- nodo raiz (root node)
                                species_id : specie.id,
                                is_baby : node.is_baby,
                                evolution_chain_id : chain.data.id
                            });

                            if(current_node) {
                                
                                if(from) {
                                    
                                    await Evolves_To.create({            //?----- Puente (Link)
                                        from_species_id : from.id,
                                        to_species_id : current_node.id
                                    })
                                };

                                if(Array.isArray(node.evolves_to) && node.evolves_to.length > 0){

                                    for (const nextNode of node.evolves_to) {           //?--- recorrer sus hijos (ej de eevee donde solo evoluciona a un nodo mas pero este tiene 8 species dif.)
                                        await recursiveChain(nextNode, current_node)  
                                    }
                                }
                            }
                        }
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