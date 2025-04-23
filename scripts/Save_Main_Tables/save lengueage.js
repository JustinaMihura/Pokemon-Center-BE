const axios = require("axios");
const {sequelize} = require("../../db/db.js");
require("dotenv").config();

const {BASEURL} = process.env;
const {Lengueage} = sequelize.models;

module.exports = async () => {
    try {
      console.time("Lenguage db ✅ --> time :");
        const {data} = await axios.get(`${BASEURL}language`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };
        await Lengueage.destroy({where : {}});
        
        const response = await Promise.all(data.results.map(e => axios(e)));
        
        if(response) {
          
          response.forEach(p =>
                  Lengueage.create({
                    iso3166: p.data.iso3166,
                    iso639 : p.data.iso639,
                    id: p.data.id,
                    official : p.data.official,
                    name : p.data.name
                  })
                )
        } 
        console.timeEnd("Lenguage db ✅ --> time :");
        
    } catch (error) {
        console.error({"Lenguage db error" : error});
        
    }
}