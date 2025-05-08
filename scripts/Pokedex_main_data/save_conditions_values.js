const axios = require("axios");
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {BASEURL} = process.env;
const {Conditions_Values,Conditions} = sequelize.models;

module.exports = async () => {
    try {
        console.time("Encounter_Conditions_Values db ✅ --> time ");

        const {data} = await axios.get(`${BASEURL}encounter-condition-value/?offset=0&limit=105`)
        
        
        if(data) {
            const results = await Promise.all(data.results.map(e => {
               return axios.get(e.url)
            }));

            if(results) {
                for (const c of results) {

                    const condition = await Conditions.findOne({where : {
                        name : c.data.condition.name
                    }});

                    const [conditions_values] = await Conditions_Values.findOrCreate({where : {
                        id : c.data.id },
                        defaults : {
                            name : c.data.name
                        }
                    });

                    if(!conditions_values) continue;

                    if(!conditions_values.condition_id && condition) {

                        await conditions_values.setCondition(condition);

                    } else if(
                        condition?.id &&
                        conditions_values.condition_id &&
                        condition.id !== conditions_values.condition_id 
                    ){
                        await conditions_values.setCondition(condition) 
                    }
                }
                
            }
        }
        console.timeEnd("Encounter_Conditions_Values db ✅ --> time ");
        return 
    } catch (error) {
        console.error({"Encounter_Conditions_Values db error" : error});
    }
};