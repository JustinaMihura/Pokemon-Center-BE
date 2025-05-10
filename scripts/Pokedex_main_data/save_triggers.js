const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Triggers} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Triggers db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}evolution-trigger/`);
        const triggers = [];

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const trigger of response) {

                const exist = Triggers.findOne({where : {
                    id : trigger.data.id,
                }});

                if(!exist) {
                    triggers.push({
                        id : trigger.data.id,
                        name : trigger.data.name
                    })
                }
            }
        };  
        await Triggers.bulkCreate(triggers)
        console.timeEnd("Triggers db ✅ --> time ")

    } catch (error) {
        console.error("Triggers db error :" ,error);
    }
};
