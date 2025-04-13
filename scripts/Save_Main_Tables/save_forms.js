const axios = require("axios");
require("dotenv").config();
const batching = require("../batching_fn");
const pLimit = require("p-limit").default;
const { sequelize } = require("../../db/db");
const e = require("express");

const {BASEURL} = process.env;
const {Forms} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Forms db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}pokemon-form/?offset=0&limit=1527`);
        const limit = pLimit(10);
        const forms = [];

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };

        await Forms.destroy({where : {}});
        const slice_urls = batching(data.results.map(e => e.url), 50);
        for (let i = 0; i < slice_urls.length; i++) {
            const element = slice_urls[i];
            const data = await Promise.all(element.map(url => limit(() => axios.get(url))));

            if(data && data.length == 50){
                for (const f of data) {
                    forms.push({
                        name : f.data.name,
                        id : f.data.id,
                        is_mega : f.data.is_mega,
                        is_default : f.data.is_default,
                        is_battle_only : f.data.is_battle_only,
                        form_name : f.data.form_name,
                        form_order : f.data.form_order,
                        img_front : f.data.sprites.front_default,
                        img_back : e.data.front_back_default,
                        img_front_shiny : e.data.front_shiny,
                        img_back_shiny : e.data.back_shiny
                    })
                }
            };
            await new Promise(res => setTimeout(res, 500));
        };

        await Forms.bulkCreate(forms);
        console.timeEnd("Forms db ✅ --> time ");
        
    } catch (error) {
        console.error({"Forms error : " : error});
    }
};
