const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Version_Groups, Versions} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Version_Groups db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}version-group/?offset=0&limit=29/`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const version_group of response) {

                await Version_Groups.findOrCreate({where : {
                    id : version_group.data.id,
                    name : version_group.data.name
                }});

            }
        };
        console.timeEnd("Version_Groups db ✅ --> time ")

    } catch (error) {
    
        console.error({"Version_Groups db error :" : error});
        
    }
};
