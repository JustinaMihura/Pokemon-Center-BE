const axios = require("axios");
require("dotenv").config()
const {sequelize} = require("../../db/db.js");
const pLimit = require("p-limit").default;

const {BASEURL} = process.env;
const {Versions} = sequelize.models;

module.exports = async () => {
    try {
        
        console.time("Version db ✅ --> time :")
        const {data} = await axios.get(`${BASEURL}version/?offset=0&limit=43`);
        
        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };
        
        const limit = pLimit(10);
        
        const response = await Promise.all(data.results.map(e => limit(() => axios.get(e.url))));
        
        if(response) {

            for(const v of response){

                await Versions.findOrCreate({where : {
                    name : v.data.name,
                    id : v.data.id
                }});
            };
        }
        console.timeEnd("Version db ✅ --> time :")

    } catch (error) {
        console.error({"Verion_time error" : error});
    }
};
