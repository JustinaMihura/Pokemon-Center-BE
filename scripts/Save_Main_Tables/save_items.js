const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db.js");
const batching = require("../batching_fn.js");

const {BASEURL} = process.env;
const {Items} = sequelize.models;

module.exports = async () => {
    try {
        console.time("Items db ✅ --> time :")
        const {data} = await axios(`${BASEURL}item/?offset=0&limit=2180`);
        const slice_urls = batching(data.results.map(e => e.url));
        const items = [];
        let last_valid_id;

        for (let i = 0; i < slice_urls.length; i++) {
            const element = slice_urls[i];
            const data = await Promise.all(element.map(e => axios.get(e)))

            data.map(i => {

                if(i.data.id < 10000) {
                    last_valid_id = i.data.id
                }else{
                    last_valid_id = last_valid_id + 1
                };

                items.push({
                    name : i.data.name,
                    id : last_valid_id,
                    baby_trigger_for : i.data.baby_trigger_for,
                    cost : i.data.cost,
                    fling_power : i.data.fling_power,
                    img : i.data.sprites.default
                })
                return
            })
        };
        await Items.bulkCreate(items);
        console.timeEnd("Items db ✅ --> time :");
        
    } catch (error) {
        console.error({"Items db error" : error});
        
    }

};