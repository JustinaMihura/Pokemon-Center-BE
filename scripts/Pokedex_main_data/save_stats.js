const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Stats} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Stats db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}stat/`);
        const stats = [];
        const stats_relations = [];

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const stat of response) {

                const exist = await Stats.findOne({where : {
                    id :stat.data.id,
                }});

                stats_relations.push({
                    id :stat.data.id,
                    affecting_moves : stat.data.affecting_moves,
                    affecting_natures : stat.data.affecting_natures,
                    characteristics : stat.data.characteristics,
                    move_damage_class : stat.data.move_damage_class,
                    names : stat.data.names
                })

                if(!exist) {
                    stats.push({
                        id : stat.data.id,
                        name : stat.data.name,
                        game_index : stat.data.game_index,
                        is_battle_only : stat.data.is_battle_only
                    });
                }
            }
        };
        await Stats.bulkCreate(stats);
        console.timeEnd("Stats db ✅ --> time ")
        return stats_relations;

    } catch (error) {
    
        console.error("Stats db error :" , error);
        
    }
};
