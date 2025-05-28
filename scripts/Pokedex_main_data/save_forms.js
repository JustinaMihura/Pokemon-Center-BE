const axios = require("axios");
require("dotenv").config();
const batching = require("../../utils/batching_fn");
const pLimit = require("p-limit").default;
const { sequelize } = require("../../db/db");

const {BASEURL} = process.env;
const {Forms} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Forms db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}pokemon-form/?offset=0&limit=1527`);
        const limit = pLimit(10);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };

        const slice_urls = batching(data.results.map(e => e.url), 50);
        for (let i = 0; i < slice_urls.length; i++) {
            const element = slice_urls[i];
            
            const data = await Promise.all(element.map(url => limit(() => axios.get(url))));

            if(data && data.length == 50){

                for (const f of data) {

                    const form = await Forms.findOne({where : {
                        name : f.data.name
                    }});

                    if(form) {

                        let attr = {

                            "is_mega" : f.data.is_mega,
                            "is_default": f.data.is_default,
                            "is_battle_only": f.data.is_battle_only, 
                            "form_name"  : f.data.form_name,
                            "form_order" : f.data.form_order,
                            "img_front" : f.data.img_front,
                            "img_back": f.data.img_back,
                            "img_front_shiny" : f.data.img_front_shiny,
                            "img_back_shiny" : f.data.img_back_shiny
                        }
    
                        const update = {} ;

                        for (const field in attr) {
                            if(
                                attr[field] !== null &&
                                attr[field] !== undefined &&
                                attr[field] !== form[field]
                            ){
                                update[field] = attr[field]
                            }
                        }

                        if(Object.keys(update).length > 0) {

                            await Forms.update(update)
                        };

                    }
                    else {

                        await Forms.create({
                            name : f.data.name,
                            id : f.data.id,
                            is_mega : f.data.is_mega,
                            is_default : f.data.is_default,
                            is_battle_only : f.data.is_battle_only,
                            form_name : f.data.form_name,
                            form_order : f.data.form_order,
                            img_front : f.data.sprites.front_default,
                            img_back : f.data.front_back_default,
                            img_front_shiny : f.data.front_shiny,
                            img_back_shiny : f.data.back_shiny
                        })
                    }
                }
            };
            await new Promise(res => setTimeout(res, 1000));
        };

        console.timeEnd("Forms db ✅ --> time ");
        
    } catch (error) {
        console.error({"Forms error : " : error});
    }
};
