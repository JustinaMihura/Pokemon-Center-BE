const axios = require("axios");
const batching = require("../batching_fn.js");
const {sequelize} = require("../../db/db.js");
require("dotenv").config();
const pLimit = require("p-limit").default; 


const {Abilities} = sequelize.models;
const {BASEURL} = process.env;

module.exports = async() => {

    try {

        console.time("Abilities db ✅ --> time :");
        const {data}= await axios(`${BASEURL}ability/?offset=0&limit=367`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };

        const slice_urls = batching(data.results.map(e => e.url) , 50);
        const abilities = [];
        let last_valid_id = 0;
        const limit = pLimit(10)
        
        for (let i = 0; i < slice_urls.length; i++) {

            const element = slice_urls[i];
            const data = await Promise.all(element.map( async e => limit(() => axios(e))));

            data.map(async e => {
                
                let abilities_id;

                if(e.data.id < 10000) {
                    abilities_id = e.data.id
                    last_valid_id = abilities_id
                    
                } else {

                    abilities_id = last_valid_id + 1,
                    last_valid_id = abilities_id
                };
                
                const exist = await Abilities.findOne({where : {
                    id : abilities_id,
                }});

                if(!exist) {

                    abilities.push({
                        id : abilities_id,
                        name : e.data.name,
                        is_main_series : e.data.is_main_series,
                    })
                }
            });

            await new Promise(res => setTimeout(res, 500));
        }

        await Abilities.bulkCreate(abilities);
        console.timeEnd("Abilities db ✅ --> time :");

        return 
        
    } catch (error) {
        console.error("abilitites_error" , error);
        
    }
};
