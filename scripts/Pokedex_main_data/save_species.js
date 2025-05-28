const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");
const batching = require("../../utils/batching_fn");
const pLimit = require("p-limit").default;

const {BASEURL} = process.env;
const {Species} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Species db ✅ --> time ");

        const limit = pLimit(10);
        const species = [];
        const species_data = [];

        const {data} = await axios.get(`${BASEURL}pokemon-species/?offset=0&limit=1025`);


        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };

        const slice_urls = batching(data.results.map(u => u.url), 50);

        for (let i = 0; i < slice_urls.length; i++) {

            const element = slice_urls[i];
            const results = await Promise.all(element.map(url => limit(() => axios.get(url))));

            if(results) {
                
                for (const e of results) {

                    const specie = await Species.findOne({where : {
                        name : e.data.name
                    }});
                    
                    let compare_data = {
                        base_happiness : e.data.base_happiness,
                        capture_rate : e.data.capture_rate,
                        forms_switchable :e.data.forms_switchable,
                        gender_rate : e.data.gender_rate,
                        has_gender_differences : e.data.has_gender_differences,
                        hatch_counter : e.data.hatch_counter,
                        is_baby : e.data.is_baby,
                        is_legendary : e.data.is_legendary,
                        is_mythical : e.data.is_mythical,
                        id : e.data.id,
                        name : e.data.name
                    };
                    
                    if(specie) {
    
                        let compare = ['base_happines','capture_rate','forms_switchable','gender_rate','has_gender_differences',' hatch_counter','is_baby','is_legendary',' is_mythical'];
                        let update = {};
                                
                        for (const attr of compare) {
                            if(
                                compare_data[attr] !== null &&
                                compare_data[attr] !== undefined &&
                                compare_data[attr] !== specie[attr]
                            ){
                                update[attr] = compare_data[attr]
                            }
                        }
    
                        if(Object.keys(update).length > 0) {
                            await specie.update(update)
                        };

                    } else {
                        species.push(compare_data);
                    }
                    
                    species_data.push({
                        id : e.data.id,
                        color : e.data.color,
                        egg_groups : e.data.egg_groups,
                        evolution_chain : e.data.evolution_chain,
                        flavor_text_entries : e.data.flavor_text_entries,
                        form_descriptions : e.data.form_descriptions,
                        genera : e.data.genera,
                        generation : e.data.generation,
                        habitat : e.data.habitat,
                        names : e.data.names,
                        pal_park_encounters : e.data.pal_park_encounters,
                        pokedex_numbers : e.data.pokedex_numbers,
                        shape : e.data.shape,
                        varieties : e.data.varieties
                    })
                };                
            }
            await new Promise(res => setTimeout(res, 500));
        };

        await Species.bulkCreate(species);
        console.timeEnd("Species db ✅ --> time ");
        return species_data; 
        
    } catch (error) {
        console.error({"Species db ✅ --> time " : error});
    }
}