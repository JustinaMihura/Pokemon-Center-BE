const axios = require("axios");
const {sequelize} = require("../../db/db.js");
const batching = require("../batching_fn.js");
const pLimit = require("p-limit").default;
require("dotenv").config();

const {Locations_Areas} = sequelize.models;
const {BASEURL} = process.env;


module.exports = async () => {

    try {
        console.time("Locations_Areas db ✅ --> time")
         const {data} = await axios.get(`${BASEURL}location-area/?offset=0&limit=1089`);
         
         if (!data || !data.results || data.results.length === 0) {
             throw new Error("La API no devolvió resultados válidos.");
            };
            
        const slice_urls = batching(data.results.map(e => e.url), 50)
        let location_areas = [];
        const limit = pLimit(10);

       for (let i = 0; i < slice_urls.length; i++) {
            const element = slice_urls[i];

           const response = await Promise.all(element.map(url => limit(() => axios.get(url))));

            if(response) {
                 response.map(async l => {

                    const exist = await Locations_Areas.findOne({where : {
                        name : l.data.name,
                    }})

                    if(!exist) {
                        
                        location_areas.push({
                            name : l.data.name,
                            id : l.data.id,
                            game_index : l.data.game_index
                        })
                    } else if (

                        exist && 
                        l.data.game_index &&
                        l.data.game_index !== exist.game_index 
                    ){
                        location_areas.push({
                            name : l.data.name,
                            id : l.data.id,
                            game_index : l.data.game_index
                        })
                    }
                })
            }

        await new Promise(res => setTimeout(res, 500))
       };

       await Locations_Areas.bulkCreate(location_areas);
       console.timeEnd("Locations_Areas db ✅ --> time")

    } catch (error) {
        console.error({"Locations_Areas" : error});
    }
};



