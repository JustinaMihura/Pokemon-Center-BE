const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Pal_Park_Area} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Pal_Park_Area db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}pal-park-area/`);
        const area = []

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const area of response) {

                const exist = await Pal_Park_Area.findOne({where : {
                    id : area.data.id,
                }});

                if(!exist) {
                   area.push({
                       id : color.data.id,
                       name : color.data.name
                   });
                }
            }
        };
        await Pal_Park_Areas.bulkCreate(area)  
        console.timeEnd("Pal_Park_Area db ✅ --> time ")

    } catch (error) {
    
        console.error({"Pal_Park_Area db error :" : error});
        
    }
};
