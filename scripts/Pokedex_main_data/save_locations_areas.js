const axios = require("axios");
const {sequelize} = require("../../db/db.js");
const batching = require("../../utils/batching_fn.js");
const pLimit = require("p-limit").default;
require("dotenv").config();

const {Locations_Areas,Locations,Encounter_Method_Rate, Versions,Version_Details,Encounter_Methods} = sequelize.models;
const {BASEURL} = process.env;


module. exports = async () => {

    try {


        console.time("Locations_Areas db ✅ --> time")
         const {data} = await axios.get(`${BASEURL}location-area/?offset=0&limit=1089`);
         
         if (!data || !data.results || data.results.length === 0) {
             throw new Error("La API no devolvió resultados válidos.");
            };
            
        const slice_urls = batching(data.results.map(e => e.url), 50)
        const limit = pLimit(10);

       for (let i = 0; i < slice_urls.length; i++) {
        
            const element = slice_urls[i];

           const response = await Promise.all(element.map(url => limit(() => axios.get(url))));

            if(response) {
                 response.map(async l => {

                    let exist = await Locations_Areas.findOne({where : {
                        name : l.data.name,
                    }})

                    if(!exist) {

                        exist = await Locations_Areas.create({
                            name : l.data.name,
                            id : l.data.id,
                            game_index : l.data.game_index
                        })
                        
                    } else if (

                        exist && 
                        l.data.game_index &&
                        l.data.game_index !== exist.game_index 
                    ){
                        await exist.update({game_index : l.data.game_index})
                    };

                    const location = await Locations.findOne({where : {
                        name : l.data.location.name
                    }});

                    const l_exist = await exist.getLocations()
                    if(!l_exist) await exist.setLocations(location);

                    for (const encounter of l.data.encounter_method_rates) {

                        const encounter_method = await Encounter_Methods.findOne({where : {
                            name : encounter.encounter_method.name
                        }});

                        const [encounter_method_rates] = await Encounter_Method_Rate.findOrCreate({where : {
                            location_area_id : exist.id,
                            encounter_method_id : encounter_method.id
                        }});

                        for (const v_d of encounter.version_details) {
                            
                            const version = await Versions.findOne({where : {
                                name : v_d.version.name
                            }});

                            if(!version) continue;

                            await Version_Details.findOrCreate({where : {
                                encounter_method_rate_id : encounter_method_rates.id,
                                version_id : version.id
                                } , default : {
                                    rate : v_d.rate
                                }
                        })
                        }
                    }
                })
            }

        await new Promise(res => setTimeout(res, 500))
       };

       console.timeEnd("Locations_Areas db ✅ --> time")

    } catch (error) {
        console.error({"Locations_Areas" : error});
    }
};



