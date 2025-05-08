const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Regions, Generations, Pokedexes, Version_Groups, Locations} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Regions db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}region/`);

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const region of response) {
                
                const [exist] = await Regions.findOrCreate({where : {
                    id : region.data.id,
                    name : region.data.name 
                }});
                
                 if(exist) {

                    for (const version_group of region.data.version_groups) {
                        
                        const hasVersion_group = await Version_Groups.findOne({where : {
                            name : version_group.name
                        }});

                        if(hasVersion_group && !exist.hasVersion_group(hasVersion_group)) {
                            exist.addVersion_group(hasVersion_group)
                        };
                    };
                    }

                    
                    }
                } 
        
        console.timeEnd("Regions db ✅ --> time ")

    } catch (error) {
    
        console.error("Regions db error :" , error);
        
    }
};
