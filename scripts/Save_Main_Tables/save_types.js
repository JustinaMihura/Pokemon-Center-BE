//?--bulkCreate() time_exp => comparacion tiempo de espera entre bulk create y create experimento,

const axios = require("axios");
const {sequelize} = require("../../db/db.js")
require("dotenv").config()

const {BASEURL} = process.env
const {Types} = sequelize.models;

module.exports = async () => {
    console.time("Type db ✅ --> time :")
    try {
        const {data} = await axios.get(`${BASEURL}/type/?offset=0&limit=21`);
        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
        };

        const response = await Promise.all(data.results.map(e => axios(e.url)));
        const types = [];
        let last_valid_id = 0;

        await Types.destroy({where : {}});

        response.map(e => {
            let type_id;

            if (e.data.id < 10000) {
                type_id = e.data.id;
                last_valid_id = type_id; 
                
            } else {
                type_id = last_valid_id + 1; 
                last_valid_id = type_id;     
            }

            return types.push({
                name : e.data.name,
                id : type_id,
                img : e.data.sprites?.["generation-vi"]?.["x-y"].name_icon ||
                      e.data.sprites?.["generation-vii"]?.["sun-moon"].name_icon ||
                      e.data.sprites?.["generation-ix"]?.["scarlet-violet"].name_icon || null
            })
        });                                                                  

        await Types.bulkCreate(types);
        console.timeEnd("Type db ✅ --> time :");

    } catch (error) {   

        console.log({"Types_Model" : error});
        
    }
};