const axios = require("axios");
require("dotenv").config()
const {sequelize} = require("../../db/db.js");

const {BASEURL} = process.env;
const {Versions} = sequelize.models;

module.exports = async () => {
    try {

        console.time("Version db ✅ --> time :")
        const {data} = await axios.get(`${BASEURL}version/?offset=0&limit=43`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };

        await Versions.destroy({where : {}});
        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response) {
            for(const v of response){
                Versions.create({
                    name : v.data.name,
                    id : v.data.id
                });
            };
            
        }
        console.timeEnd("Version db ✅ --> time :")

    } catch (error) {
        console.error({"Verion_time error" : error});
    }
};
