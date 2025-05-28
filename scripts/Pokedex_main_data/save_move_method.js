const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Move_Method} = sequelize.models;

module.exports = async () => {

    try {

        console.time("Move_Method db ✅ --> time ");
        const {data} = await axios.get(`${BASEURL}move-learn-method/`);
        const move_method = [];

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("La API no devolvió resultados válidos.");
           };

        const response = await Promise.all(data.results.map(e => axios.get(e.url)));

        if(response && response.length > 0){
            
            for (const method of response) {

                const exist = await Move_Method.findOne({where : {
                    id :method.data.id,
                }});

                if(!exist) {
                    move_method.push({
                        id : method.data.id,
                        name : method.data.name,
                    });
                }
            }
        };
        await Move_Method.bulkCreate(move_method)  
        console.timeEnd("Move_Method db ✅ --> time ")

    } catch (error) {
    
        console.error("Move_Method db error :" , error);
        
    }
};
