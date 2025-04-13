const axios = require("axios");
const {sequelize} = require("../../db/db.js");
const batching = require("../batching_fn.js");
const pLimit = require("p-limit").default;
require("dotenv").config();

const {BASEURL} = process.env;
const {Moves} = sequelize.models;

module.exports =  async () => {
    try {
        console.time("Moves db ✅ --> time :");
        const {data} = await axios(`${BASEURL}move/?offset=0&limit=937`);
        
        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };
        
        const slice_urls = batching(data.results.map(e => e.url), 50);
        let last_valid_id = 0;
        const moves = [];
        const limit = pLimit(10);
        await Moves.destroy({where : {}});
        
        for (let i = 0; i < slice_urls.length; i++) {

            const element = slice_urls[i];
           const data = await Promise.all(element.map(url => limit(() => axios.get(url))));

            data.map(m => {

                if(m.data.id < 10000){
                    last_valid_id = m.data.id
                } else {
                    last_valid_id = last_valid_id + 1
                };

                return moves.push({
                    name : m.data.name,
                    id : last_valid_id,
                    accuracy : m.data.accuracy,
                    effect_chance : m.data.effect_chance,
                    power : m.data.power,
                    priority : m.data.priority,
                    pp : m.data.pp,
                });
            });

            await new Promise(res => setTimeout(res, 500));
        };

    await Moves.bulkCreate(moves);
    console.timeEnd("Moves db ✅ --> time :");

    return
    } catch (error) {
        console.error({"Moves_db error" : error});
        
    }
};