
//?__Por ERRORES de la PokeApi preferi usar un bulce for of para hacer fn asincronicas lineales -
//? y no en paralelo como con Promise.All(). Hay abilidades repetidas en pokemons y por ende se rompe la bd.
//?__ Por cuestiones de seguridad y futuros erroes en la data prefieron sacrificar tiempo de espera y realizar las consultas linealmente.


const axios = require("axios");
const {sequelize} = require("../../db/db.js");

const { 
    
    Types , Pokemon, Abilities, Pokemons_Types ,
    Species, Pokemon_Abilities, Moves, Pokemons_Moves,
    Stats , Pokemon_Stats,Items,Held_Items,Past_Abilities,
    Past_Types , Versions, Game_Indices, Locations_Areas,
    Pokemon_Encounters, Generations, Version_Details,Forms,
    Version_Groups,Move_Method,Version_Group_Details,Encounter_Details,
    Encounter_Methods,Conditions_Values,Encounter_Conditions_Values

}   = sequelize.models;

module.exports = async (pokemon_relations) => {
    
    try{

        console.time("Pokemon_Relations db ✅ --> time ");
        
        //*___Metodos posibles para el modelo Pokemon____________
        
         const instance_method = await Pokemon.findByPk(1);
         console.dir(Object.getOwnPropertyNames(Object.getPrototypeOf(instance_method)), {
             maxArrayLength: null
         });

        //*______________________________________________________

        await Promise.all(pokemon_relations.map(async e => {
            
            const poke_by_id = await Pokemon.findByPk(e.id);

        //---------------------Species-------------------------------------------
            
            if(e.species) {
                const specie = await Species.findOne({where : {
                    name : e.species.name
                }});
                
                if(!specie) return
                
                await poke_by_id.setSpecies(specie)
            };

        //----------------------Forms---------------------------------------------

        if (Array.isArray(e.forms) && e.forms.length > 0) {

            for (const f of e.forms) {
                try {

                    const form = await Forms.findOne({ where: { name: f.name } });
        
                    if (form) {
                        const hasForm = await poke_by_id.hasForm(form);
                        if (!hasForm)  await poke_by_id.addForm(form);
                    }
                } catch (error) {
                    console.error(`Error al agregar forma: ${f.name}`, error);
                }
            }
        }
            
        //---------------- Pokemon_Types------------------------------------------

        if(Array.isArray(e.types) && e.types.length > 0) {

            for(const t of e.types) {

                const type = await Types.findOne({where : {
                    name : t.type.name
                }});

                if(type) {
                    const alreadyExists = await Pokemons_Types.findOne({where : {
                        pokemon_id : poke_by_id.id,
                        type_id : type.id
                }}); 

                    if(!alreadyExists) {

                        await Pokemons_Types.create({
                            pokemon_id : poke_by_id.id,
                            type_id : type.id,
                            slot : t.slot
                        })
                }}
            }};
                
        //----------------Pokemon_Abilitites--------------------------------------

            if(Array.isArray(e.abilities) && e.abilities.length > 0) {

                for(const a of e.abilities){

                const ability = await Abilities.findOne({where : {
                    name : a.ability.name
                }});

                if (!ability) continue;
                const alreadyExists = await Pokemon_Abilities.findOne({where : {
                    pokemon_id : poke_by_id.id,
                    ability_id : ability.id
                }});

                if (!alreadyExists) {

                    await Pokemon_Abilities.create({
                        slot: a.slot,
                        is_hidden: a.is_hidden,
                        pokemon_id : poke_by_id.id,
                        ability_id : ability.id
                    })
                }};
            }
            
        //----------------Pokemon_Moves-------------------------------------------

            if(Array.isArray(e.moves) && e.moves.length > 0){

                for(const m of e.moves) {

                const move = await Moves.findOne({where : {
                    name : m.move.name
                }});

                if (!move) continue;
                
                const [root_link] = await Pokemons_Moves.findOrCreate({where : {
                    pokemon_id : poke_by_id.id ,
                    move_id : move.id
                }});
                
                
                for (const vg_d of m.version_group_details) {

                    const version_group = await Version_Groups.findOne({where : {
                        name : vg_d.version_group.name
                    }});
                
                    const method = await Move_Method.findOne({where : {
                        name :  vg_d.move_learn_method.name
                    }});

                    if (!version_group || !method) continue;

                    await Version_Group_Details.findOrCreate({where : {
                        pokemon_move_id :  root_link.id,
                        method_id : method.id,
                        version_group_id : version_group.id
                        },
                        defaults : {
                            level_learn_at : vg_d.level_learn_at
                        }
                    });
                    };
                };
            };
            
        //---------------Pokemon_Stats-------------------------------------------

            if(Array.isArray(e.stats) && e.stats.length > 0){

                for (const s of e.stats) {

                const stat = await Stats.findOne({where : {
                    name : s.stat.name
                }});

                if(!stat) continue;

                const alreadyExist = await Pokemon_Stats.findOne({where : {
                    pokemon_id : poke_by_id.id, 
                    stat_id : stat.id
                }});

                if(!alreadyExist) {

                    await Pokemon_Stats.create({
                        base_stat : s.base_stat,
                        effort : s.effort,
                        pokemon_id : poke_by_id.id, 
                        stat_id : stat.id
                    });

                } else {
                    
                    let update = {};
                    for (const attr of ["effort" , "base_stat"]) {
                         if(
                        s[attr] !== null &&
                        s[attr] !== undefined &&
                        s[attr] !== alreadyExist[attr]
                        ) 
                        update[attr] = s[attr] 
                    };
                      if(Object.keys(update).length > 0) await alreadyExist.update(update)
                };
            };
            }
        //----------------Held_Items---------------------------------------------

             if(Array.isArray(e.held_items) && e.held_items.length > 0){
                
                for(const i of e.held_items) {

                    const item = await Items.findOne({where : {
                        name : i.item.name
                    }});
                    
                    if(!item) continue;

                    const [alreadyExist] = await Held_Items.findOrCreate({where : {
                        item_id : item.id,
                        pokemon_id : poke_by_id.id
                    }});
                    
                    for (const v_d of i.version_details) {
                        const version = await Versions.findOne({where : {
                            name  : v_d.version.name
                        }});

                        if(!version) continue ;

                        await Version_Details.findOrCreate({where : {
                            held_item_id : alreadyExist.id,
                            version_id : version.id
                            },
                            defaults : {
                                rarity : v_d.version_details.rarity
                            }
                        })
                    }
                };
            }; 
        //--------------------Game_Indices--------------------------------------

            if(Array.isArray(e.game_indices) && e.game_indices.length > 0) {

                for(const p of e.game_indices) {
                    
                        const version = await Versions.findOne({where : {
                            name : p.version.name
                        }});

                        if(version) {

                            await Game_Indices.findOrCreate({where : {
                                pokemon_id : poke_by_id.id, 
                                version_id : version.id
                                },
                                defaults : {
                                    game_index : p.game_index
                                }
                            });
                        }
                }};

        //--------------------------------Encounters----------------------------------------

            if(e.location_area_encounters){

                const {data} = await axios.get(e.location_area_encounters);

                for(const l of data) {

                    const locations = await Locations_Areas.findOne({where : {
                        name : l.location_area.name
                    }});
                        
                    if(!locations) continue;

                    const [alreadyExist] = await Pokemon_Encounters.findOrCreate({
                        where: {
                            pokemon_id: poke_by_id.id,
                            locations_areas_id: locations.id,
                        },
                    });

                    for (const v_d of l.version_details) {


                        const version = await Versions.findOne({where : {
                            name : v_d.version.name
                        }});

                       
                        if(!version) continue;

                        const [version_details] = await Version_Details.findOrCreate({where : {
                            pokemon_encounter_id : alreadyExist.id,
                            version_id : version.id
                            },
                            defaults : {
                                max_chance : v_d.max_chance
                            }
                        }) 

                        if(Array.isArray(v_d.encounter_details) && v_d.encounter_details.length > 0) {

                            for (const encounter of v_d.encounter_details) {

                                const method = await Encounter_Methods.findOne({where : {
                                name : encounter.method.name
                                }})

                                const [encounter_detail] = await Encounter_Details.findOrCreate({where : {

                                    version_detail_id : version_details.id,
                                    method_id : method.id
                                    },
                                    defaults : {
                                        chance : encounter.chance,
                                        max_level : encounter.max_level,
                                        min_level : encounter.min_level
                                    }
                                })

                                if(Array.isArray(encounter.condition_values) && encounter.condition_values.length > 0) {

                                    for (const c of encounter.condition_values) {
                                    
                                        const condition_value = await Conditions_Values.findOne({where : {
                                            name : c.name
                                        }});

                                        if(!condition_value) continue;

                                        await Encounter_Conditions_Values.create({
                                            encounter_detail_id : encounter_detail.id,
                                            condition_value_id : condition_value.id
                                        });

                                    }
                                }
                            };
                        };
                    }
                }
            };
        //-----------------------------------Past_Types-----------------------------------
            if(Array.isArray(e.past_types) && e.past_types.length > 0){
                
                try {

                    for (const pt of e.past_types) {

                        const gen = await Generations.findOne({where : {
                            name : pt.generation.name
                        }});


                        for (const t of pt.types) {
                        
                            const type = await Types.findOne({where : {
                                name : t.type.name
                            }});

                            if(gen && type) {

                                const [pokemon_type] = await Pokemons_Types.findOrCreate({
                                    where : {
                                        type_id : type.id,
                                        pokemon_id : poke_by_id.id
                                    },
                                    defaults : {
                                        slot : t.slot,
                                    }
                                });

                                await Past_Types.findOrCreate({
                                    where : {
                                        pokemon_type_id : pokemon_type.id,
                                        generation_id : gen.id,
                                        pokemon_id : poke_by_id.id
                                    }
                                });
                            }
                        }}

                } catch (error) {
                        console.error({"pokemon_Past_Type_relation error " : error});
                        
                }
            };
        //---------------------Past_Abilitites(history abilities)------------------------------

            if(Array.isArray(e.past_abilities) && e.past_abilities.length > 0) {
               
                    for(const pa of e.past_abilities) {
                        
                    const gen = await Generations.findOne({where : {
                        name : pa.generation.name
                    }})

                    for(const a of pa.abilities) {

                        const abilityName = !a.ability?.name ? "unknown" : a.ability.name;
                        
                        const [ability] = await Abilities.findOrCreate({where : {
                            name : abilityName
                        }});

                        const [poke_ability] = await Pokemon_Abilities.findOrCreate({where : {
                            abilities_id : ability.id,
                            pokemon_id: poke_by_id.id},
                            defaults : {
                                slot : a.slot,
                                is_hidden : a.is_hidden,
                            }
                        });

                        await Past_Abilities.findOrCreate({where : {
                            pokemon_abilities_id : poke_ability.id,
                            pokemon_id : poke_by_id.id,
                            generation_id : gen.id
                        }});
                    }
                }
            }   
        })); 
        console.timeEnd("Pokemon_Relations db ✅ --> time ")

    } catch (error) {
        console.error({"pokemon_relations error" : error.errors  });
    }
};
 