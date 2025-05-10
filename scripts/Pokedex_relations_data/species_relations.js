//! tareita para mañana : 
//?guardar toda la data de species
//*si se puede algo mas mejor :D
require("dotenv").config();
const {sequelize} = require("../../db/db");

const {

    Species,Colors, Evolution_Chains,Names, 
    Pokemon_Pokedexes,Pal_Park_Encounters,
    Pal_Park_Area, Varieties ,Egg_Groups,
    Species_Egg_Groups, Lengueage, Pokedexes, 
    Versions, Pokemon, Flavor_text_entries, 
    Shape, Habitad , Growth_Rates, Generations,
    Descriptions

} = sequelize.models;

module.exports = async (species_data) => {
    try {
        console.time("Species_relations db ✅ --> time ");

        //*___Metodos posibles para el modelo Pokemon_______________________________________
        const instance_method = await Species.findByPk(1);
        console.dir(Object.getOwnPropertyNames(Object.getPrototypeOf(instance_method)), {
            maxArrayLength: null
        });
        //*_________________________________________________________________________________
     

        await Promise.all(species_data.map( async (e) => {
            
            const specie = await Species.findByPk(e.id);

        //--------------------------Colors--------------------------------------------
            if(Object.keys(e.color).length > 0) {

                try {
                    const color = await Colors.findOne({where : {
                        name : e.color.name
                    }});

                    if(!color) return;

                    const hasIt = await specie.getColor();

                    if(!hasIt) await specie.setColor(color);

                } catch (error) {

                    console.error("Color link error" , error);
                      
                }
                
            };
        //-------------------------------Evolution_chain-----------------------------------

            if(Object.keys(e.evolution_chain).length > 0) {
                
                try {

                    const chain_id = e.evolution_chain.url.split("/").at(-2);
            
                    const chain = await Evolution_Chains.findByPk(chain_id);

                    if(!chain) return;

                    const hasIt = await specie.getEvolution_Chain();
                    if(!hasIt) await specie.setEvolution_Chain(chain);
                    
                } catch (error) {

                        console.log("Evolution_Chain link error" , error);
                    }
                };
        
        //-----------------------------Egg_Groups-------------------------------------------
            
            if(Array.isArray(e.egg_groups) && e.egg_groups.length > 0) {
                try {
                    for (const egg of e.egg_groups) {

                        const egg_group = await Egg_Groups.findOne({where : {
                            name : egg.name
                        }});

                        if(!egg_group)  return 

                        await Species_Egg_Groups.findOrCreate({where : {
                            species_id : specie.id,
                            egg_group_id : egg_group.id
                        }});

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

                    if(!lenguage) continue; 

                    await Descriptions.findOrCreate({where : {
                        species_id : specie.id,
                        langueage_id : lenguage.id,
                        }, defaults : {
                        descriptions : len.description
                    }});
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

                    await Flavor_text_entries.findOrCreate({ where : {
                        species_id : specie.id,
                        langueage_id : language.id,
                        version_id : version.id,
                        }, defaults : {
                            flavor_text : flavor.flavor_text
                        }});
                    };
                };

            } catch (error) {
                console.error("Flavor-tet-entries link error", error);
            }

        };

        //---------------------------Genera------------------------------

        if(Array.isArray(e.genera) && e.flavor_text_entries.length > 0){

            try {
                
                for (const genera of e.genera) {

                    const language = await Lengueage.findOne({where : {
                        name : genera.language.name
                    }});

                    if(language) {

                    await Flavor_text_entries.findOrCreate({ where : {
                        species_id : specie.id,
                        langueage_id : language.id,
                        }, defaults : {
                            genus : genera.genus
                        }});
                    };
                };

            } catch (error) {
                console.error("Genera link error", error);
            }
        };

        //---------------------- Generation ----------------------

        if(Object.keys(e.generation).length > 0) {
            const generation = await Generations.findOne({where : {
                name : e.generation.name
            }});

            if(!generation) return ;

            const hasIt = await specie.getGeneration();
            if(!hasIt) await specie.setGeneration(generation);
        };

        //------------------- growth_rate ----------------------
        
        if(Object.keys(e.growth_rate).length > 0) {
            const growth_rate = await Growth_Rates.findOne({where : {
                name : e.growth_rate.name
            }});

            if(!growth_rate) return ;

            const hasIt = await specie.getGrowth_Rate();
            if(!hasIt) await specie.setGrowth_Rate(growth_rate);
        };

        //-------------------- Habitad -------------------------

        if(Object.keys(e.habitad).length > 0) {

            const habitad = await Habitad.findOne({where : {
                name : e.habitad.name
            }});

            if(!habitad) return ;

            const hasIt = await specie.getHabitad();
            if(!hasIt) await specie.setHabitad(habitad);
        };

        //--------------------- Shape ----------------------------

        if(Object.keys(e.shape).length > 0) {

            const shape = await Shape.findOne({where : {
                name : e.shape.name
            }});

            if(!shape) return ;

            const hasIt = await specie.getShape();
            if(!hasIt) await specie.setShape(shape);
        };

        //------------------------ Varieties ----------------------
        if(Array.isArray(e.varieties) && e.varieties.length > 0) {
             
            for (const e of e.varieties) {
                
                const pokemon = await Pokemon.findOne({where : {
                    name : e.pokemon.name
                }});

                if(!pokemon) continue;

                await Varieties.findOrCreate({where : {
                    pokemon_id : pokemon.id,
                    species_id : specie.id,
                    }, defaults : {
                        is_default : e.is_default
                    }
                });
            }
        };

        //--------------------pokedex_numbers --------------------------

        if(Array.isArray(e.pokedex_numbers) && e.pokedex_numbers.length > 0) {
             
            for (const e of e.pokedex_numbers) {
                
                const pokedex = await Pokedexes.findOne({where : {
                    name : e.pokemon.name
                }});

                if(!pokedex) continue;

                await Pokemon_Pokedexes.findOrCreate({where : {
                    pokedexes_id : pokedex.id,
                    species_id : specie.id,
                    }, defaults : {
                        entry_number : e.entry_number
                    }
                });
            }
        };

        //-----------------------pal_park_encounters--------------------

        if(Array.isArray(e.pal_park_encounters) && e.pal_park_encounters.length > 0) {
             
            for (const e of e.pal_park_encounters) {
                
                const area = await Pal_Park_Area.findOne({where : {
                    name : e.area.name
                }});

                if(!area) continue;

                await Pal_Park_Encounters.findOrCreate({where : {
                    pal_park_areas_id : area.id,
                    species_id : specie.id,
                    }, defaults : {
                        base_score : e.base_score,
                        rate : e.rate
                    }
                });
            }
        };

        //---------------------- names -----------------------------

        if(Array.isArray(e.names) && e.names.length > 0) {
             
            for (const e of e.names) {
                
                const langueage = await Lengueage.findOne({where : {
                    name : e.language.name
                }});

                if(!langueage) continue;

                await Names.findOrCreate({where : {
                    langueage_id : langueage.id,
                    species_id : specie.id,
                    }, defaults : {
                        name : e.name
                    }
                });
            }
        };
    }));

        console.timeEnd("Species_relations db ✅ --> time ");

    } catch (error) {
        console.error("species_relations error " , error);
    }
};
