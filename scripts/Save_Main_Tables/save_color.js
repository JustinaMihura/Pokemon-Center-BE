const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Colors} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Color db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}pokemon-color/`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };
        await Colors.destroy({where : {}});
        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const color of response) {

                    await Colors.create({
                        id : color.data.id,
                        name : color.data.name
                    });
            }
        };  
        console.timeEnd("Color db ✅ --> time ")

    } catch (error) {
    
        console.error({"Color db error :" : error});
        
    }
};
