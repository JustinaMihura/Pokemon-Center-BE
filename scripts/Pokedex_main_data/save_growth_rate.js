const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Growth_Rates} = sequelize.models;

module.exports = async () => {

    try {

        console.time("growth_rate db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}growth-rate/`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const growth_rate of response) {

                await Growth_Rates.findOrCreate({where : {
                    id : growth_rate.data.id,
                    name : growth_rate.data.name
                    }, defaults : {
                        formula : growth_rate.data.formula,
                    }
            });
            }
        };
        console.timeEnd("growth_rate db ✅ --> time ")

    } catch (error) {
    
        console.error({"growth_rate db error :" : error});
        
    }
};
