const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");
const batching = require("../batching_fn");
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
        await Species.destroy({where : {}});
        const slice_urls = batching(data.results.map(u => u.url), 50);

        for (let i = 0; i < slice_urls.length; i++) {

            const element = slice_urls[i];
            const data = await Promise.all(element.map(url => limit(() => axios.get(url))));

            if(data) {
                
                data.map((e, i) => {
                    species.push({
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
                    });

                    species_data.push({

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
                    return
                });
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