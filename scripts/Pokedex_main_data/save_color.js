const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Colors} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Color db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}pokemon-color/`);
        const colors = []

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const color of response) {

                const exist = await Colors.findOne({where : {
                    id : color.data.id,
                }});

                if(!exist) {
                   colors.push({
                       id : color.data.id,
                       name : color.data.name
                   });
                }
            }
        };
        await Colors.bulkCreate(colors)  
        console.timeEnd("Color db ✅ --> time ")

    } catch (error) {
    
        console.error({"Color db error :" : error});
        
    }
};
