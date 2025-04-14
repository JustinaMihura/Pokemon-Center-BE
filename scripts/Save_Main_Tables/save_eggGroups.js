const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Egg_Groups} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Egg_Groups db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}pokemon-color/`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };
        await Egg_Groups.destroy({where : {}});
        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const egg of response) {

                    await Egg_Groups.create({
                        id : egg.data.id,
                        name : egg.data.name
                    });
            }
        };  
        console.timeEnd("Egg_Groups db ✅ --> time ")

    } catch (error) {
        console.error("Color db error :" ,error);
    }
};
