const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Generations} = sequelize.models;

module.exports = async () => {
    try {
        console.time("Generations db ✅ --> time ");

        const {data} = await axios.get(`${BASEURL}generation`)
        
        
        if(data) {
            const generations = await Promise.all(data.results.map(e => {
               return axios.get(e.url)
            }));


            await Generations.destroy({where : {}});

            if(generations) {
                
                
                    for (const g of generations) {
                        await Generations.create({
                            id: g.data.id,
                            name: g.data.name
                        });
                    }
                
            }
        }
        console.timeEnd("Generations db ✅ --> time ");
        return 
    } catch (error) {
        console.error({"Generations db error" : error});
    }
};