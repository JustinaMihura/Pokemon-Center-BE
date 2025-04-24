//! tareita para mañana : 
//?guardar toda la data de species
//*si se puede algo mas mejor :D
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {Species, Colors, Evolution_Chains, Egg_Groups, Lengueage, Descriptions, Versions, Flavor_text_entries} = sequelize.models;

module.exports = async (species_data) => {
    try {
        console.time("Species_relations db ✅ --> time ");

        //*___Metodos posibles para el modelo Pokemon_______________________________________
        const instance_method = await Species.findByPk(1);
        console.dir(Object.getOwnPropertyNames(Object.getPrototypeOf(instance_method)), {
            maxArrayLength: null
        });
        //*_________________________________________________________________________________
        await Descriptions.destroy({where : {}});
        await Flavor_text_entries.destroy({where : {}});


        await Promise.all(species_data.map( async (e) => {
            
            const specie = await Species.findByPk(e.id);

        //--------------------------Colors--------------------------------------------
            if(e.color) {

                try {
                    const color = await Colors.findOne({where : {
                        name : e.color.name
                    }});
                    if(color)  await specie.setColor(color)

                } catch (error) {
                    throw new Error("Color link error" , error)    
                }
                
            };
        //-------------------------------Evolution_chain-----------------------------------

            if(e.evolution_chain) {
                
                try {

                    const chain_id = e.evolution_chain.url.split("/").at(-2);
                    const chain = await Evolution_Chains.findByPk(chain_id);
                    if(chain) await specie.setEvolution_Chain(chain);
                    
                } catch (error) {
                        throw new Error("Evolution_Chain link error" , error);
                    }
                }
        
        //-----------------------------Egg_Groups-------------------------------------------
            
            if(Array.isArray(e.egg_groups) && e.egg_groups.length > 0) {
                try {
                    for (const egg of e.egg_groups) {

                        const egg_group = await Egg_Groups.findOne({where : {
                            name : egg.name
                        }});
                        if(egg_group) await specie.addEgg_group(egg_group);

                    }
                } catch (error) {
                    console.error("Egg_Group link error " , error);
                    
                }
            }
        //----------------------Form_Desriptions--------------------------------------------

        if(Array.isArray(e.form_descriptions) && e.form_descriptions.length > 0) {

            try {

                for (const len of e.form_descriptions) {
                    const lenguage = await Lengueage.findOne({where : {
                        name : len.language.name
                    }});

                    if(lenguage) {
                        await Descriptions.create({
                            species_id : specie.id,
                            langueage_id : lenguage.id,
                            descriptions : len.description
                        });
                    }
                }

            } catch (error) {
                console.error("Form_descriptions error ", error);
                
            }
        };

    //------------------------------flavor_text_entries------------------------------------

        if(Array.isArray(e.flavor_text_entries) && e.flavor_text_entries.length > 0){

            try {
                
                for (const flavor of e.flavor_text_entries) {

                    const version = await Versions.findOne({where : {
                        name : flavor.version.name
                    }});
                    const language = await Lengueage.findOne({where : {
                        name : flavor.language.name
                    }});

                    if(version && language) {

                        await Flavor_text_entries.create({
                            species_id : specie.id,
                            langueage_id : language.id,
                            version_id : version.id,
                            flavor_text : flavor.flavor_text
                        });
                    }
                }

            } catch (error) {
                

            }

        }

    }))

        console.timeEnd("Species_relations db ✅ --> time ");

    } catch (error) {
        console.error("species_relations error " , error);
    }
};