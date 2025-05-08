const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Conditions, Lengueage, Names} = sequelize.models;

module.exports = async () => {
    try {
        console.time("Conditions db ✅ --> time ");

        const {data} = await axios.get(`${BASEURL}encounter-condition/`)
        
        if(data) {
            const results = await Promise.all(data.results.map(e => {
               return axios.get(e.url)
            }));

            if(results) {

                for (const c of results) {

                    await Conditions.findOrCreate({where : {
                        id : c.data.id },
                        defaults : {
                            name : c.data.name,
                        } 
                    });
                }
            }
        }
        console.timeEnd("Conditions db ✅ --> time ");
        return 
        
    } catch (error) {
        console.error({"Conditions db error" : error});
    }
};