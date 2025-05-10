const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Encounter_Methods} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Encounter_method db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}encounter-method/`);
        const encounter_methods = []

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const method of response) {

                const exist = await Encounter_Methods.findOne({where : {
                    id : method.data.id,
                }});

                if(!exist) {
                   encounter_methods.push({
                       id : method.data.id,
                       name : method.data.name
                   });
                }
            }
        };
        await Encounter_Methods.bulkCreate(encounter_methods);  
        console.timeEnd("Encounter_method db ✅ --> time ");

    } catch (error) {
    
        console.error({"Encounter_method db error :" : error});
        
    }
};
