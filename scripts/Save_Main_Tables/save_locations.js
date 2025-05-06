const axios = require("axios");
require("dotenv").config()
const {sequelize} = require("../../db/db.js");
const pLimit = require("p-limit").default;
const batching = require("../batching_fn.js");

const {BASEURL} = process.env;
const {Locations,Game_Indices,Generations,Regions} = sequelize.models;

module.exports = async () => {
    try {
        
        console.time("Locations db ✅ --> time :")
        const {data} = await axios.get(`${BASEURL}location?offset=0&limit=1070`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };
        
        const limit = pLimit(10);
        const slice_urls = batching(data.results.map(e => e.url), 100);

        for (let i = 0; i < slice_urls.length; i++) {
            const element = slice_urls[i];

            const response = await Promise.all(element.map(e => limit(() => axios.get(e))));
             if(response) {

                for(const v of response){
                 
                let location = await Locations.findOne({where : {
                    name : v.data.name
                }});

                if(!location) {
                   location = await Locations.create({
                    name : v.data.name,
                    id : v.data.id
                   })
                };

                for (const index of v.data.game_indices) {

                    const generation = await Generations.findOne({where : {
                            name : index.generation.name
                        }});

                    if(!generation) continue;

                    await Game_Indices.findOrCreate({where : {
                        location_id : location.id,
                        generation_id : generation.id
                        }, defaults : {
                        game_index : index.game_index
                        }
                    })
                };

                const region = await Regions.findOne({where : {
                    name : v.data.region.name
                }});

                const hasRegion = await location.getRegion();
                if(!hasRegion) await location.setRegion(region)
             }
        }
        
       }
        console.timeEnd("Locations db ✅ --> time :")

    } catch (error) {
        console.error({"Locations_time error" : error});
    }
};
