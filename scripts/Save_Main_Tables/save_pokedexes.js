const axios = require("axios");
const {sequelize} = require("../../db/db.js");
require("dotenv").config();
const pLimit = require("p-limit").default;
const {BASEURL} = process.env;
const {Pokedexes} = sequelize.models;

module.exports = async () => {
    try {
      console.time("Pokedexes db ✅ --> time :");
        const {data} = await axios.get(`${BASEURL}pokedex/?offset=0&limit=32`);
        const pokedexes = [];

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };
        const limit = pLimit(10)
        
        const response = await Promise.all(data.results.map(e => limit(() => axios(e))));
        
        if(response) {
          
          response.forEach(async p => {

            const exist = await Pokedexes.findOne({where : {
              id: p.data.id,
            }});

            if(!exist) {
              pokedexes.push({
                name: p.data.name,
                id: p.data.id,
                is_main_series: p.data.is_main_series
              });

            } else if(
              p.data.is_main_series !== exist.is_main_series
            ){
              await Pokedexes.update({is_main_series : p.data.is_main_series})
            };
          })
        };
        await Pokedexes.bulkCreate(pokedexes) 
        console.timeEnd("Pokedexes db ✅ --> time :");
        
    } catch (error) {
        console.error({"Pokedexes db error" : error});
        
    }
};