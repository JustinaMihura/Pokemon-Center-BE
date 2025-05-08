const axios = require("axios");
const {sequelize} = require("../../db/db.js");
require("dotenv").config();

const {BASEURL} = process.env;
const {Lengueage} = sequelize.models;

module.exports = async () => {
    try {
        console.time("Lenguage db ✅ --> time :");
        const {data} = await axios.get(`${BASEURL}language`);
        const langueage = [];
        const fields = ['iso3166','iso639','official'];
        const update = {};

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };
        
        const response = await Promise.all(data.results.map(e => axios(e)));
        
        if(response) {
          
          response.forEach(async p => {

            const exist = await Lengueage.findOne({where : {
              id: p.data.id,
            }});

            if(!exist) {
              langueage.push({
                iso3166: p.data.iso3166,
                iso639 : p.data.iso639,
                id: p.data.id,
                official : p.data.official,
                name : p.data.name
              })
            } else {

              for (const field of fields) {

                if(p.data[field] &&
                  p.data[field] !== exist[field]
                ) {
                  update[field] = p.data[fields]
                }
              };
              await Lengueage.update(update);
            };
          });
        };
        await Lengueage.bulkCreate(langueage);
        console.timeEnd("Lenguage db ✅ --> time :");
        
    } catch (error) {
        console.error({"Lenguage db error" : error});
        
    }
}