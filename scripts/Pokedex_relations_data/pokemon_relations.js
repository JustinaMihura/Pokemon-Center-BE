
const axios = require("axios");
const {sequelize} = require("../../db/db.js");
const asyncRetry = require("../../utils/asyncRetry_fn.js");

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
    
    const start = performance.now();

    //*___Metodos posibles para el modelo Pokemon____________
    /* const instance_method = await Pokemon.findByPk(1);
    console.dir(Object.getOwnPropertyNames(Object.getPrototypeOf(instance_method)), {
        maxArrayLength: null
        }); */
    //*______________________________________________________
        
        for (const e of pokemon_relations) {
            
        try{
            const t = await sequelize.transaction();
            const poke_by_id = await Pokemon.findByPk(e.id,{transaction: t});
    
            //---------------------Species-------------------------------------------
                
                if(e.species) {
    
                    const species_results = await asyncRetry(async() => {

                        const specie = await Species.findOne({where : {
                            name : e.species.name
                        },transaction: t});
                        
                        if (!specie) throw new Error("Species not found");
                        
                        await poke_by_id.setSpecies(specie, {transaction: t})
                    });

                    if(!species_results.success) {
                        continue;
                    }
                };
    
            //----------------------Forms---------------------------------------------
    
            if (Array.isArray(e.forms) && e.forms.length > 0) {
    
                for (const f of e.forms) {

                    const forms_results = await asyncRetry(async () => {
    
                        const form = await Forms.findOne({ where: { name: f.name },transaction: t});
            
                        if (form) {
                            const hasForm = await poke_by_id.hasForm(form,{transaction: t});
                            if (!hasForm)  await poke_by_id.addForm(form,{transaction: t});
                        }
                    });

                    if(!forms_results.success) {
                        continue;
                    }
                    
                }
            };
                
            //---------------- Pokemon_Types------------------------------------------
    
            if(Array.isArray(e.types) && e.types.length > 0) {
    
                for(const t of e.types) {

                    const types_results = await asyncRetry(async () => {

                    const type = await Types.findOne({where : {
                        name : t.type.name
                    },transaction: t});
    
                    if(type) {

                        await Pokemons_Types.findOrCreate({where : {
                            pokemon_id : poke_by_id.id,
                            type_id : type.id
                        }, defaults : {
                            slot : t.slot
                        },
                        transaction: t
                    })
                }});
                
                if(!types_results.success) {
                    continue;
                }
            };
        };
            //----------------Pokemon_Abilitites--------------------------------------
    
                if(Array.isArray(e.abilities) && e.abilities.length > 0) {
    
                    for(const a of e.abilities){
                   
                    const abilities_results = await asyncRetry(async () => {

                        const ability = await Abilities.findOne({where : {
                            name : a.ability.name
                        },transaction: t});
    
                        if (ability) {
                            await Pokemon_Abilities.findOrCreate({where : {
                            pokemon_id : poke_by_id.id,
                            abilities_id : ability.id
                        },defaults : {
                            slot: a.slot,
                            is_hidden: a.is_hidden,
                        },transaction: t});

                        };
                    });

                    if(!abilities_results.success) {
                        continue;
                    }
                }};
                
            //----------------Pokemon_Moves-------------------------------------------
    
                if(Array.isArray(e.moves) && e.moves.length > 0){
    
                    for(const m of e.moves) {
                    
                    const moves_results = await asyncRetry(async () => {

                        const move = await Moves.findOne({where : {
                            name : m.move.name
                        }, transaction : t});
    
                        if (move) throw new Error();

                            const [pokemon_moves] = await Pokemons_Moves.findOrCreate({where : {
                                pokemon_id : poke_by_id.id ,
                                move_id : move.id
                            }, transaction : t});
                        
                        return {pokemon_moves}
                    });
                    if(!moves_results.success) {
                        continue;
                    };

                    const {pokemon_moves} = moves_results;

                    for (const vg_d of m.version_group_details) {

                        const version_g_detail_results = await asyncRetry(async () => {

                        const version_group = await Version_Groups.findOne({where : {
                            name : vg_d.version_group.name
                        },transaction : t});
                    
                        const method = await Move_Method.findOne({where : {
                            name :  vg_d.move_learn_method.name
                        },transaction : t});
    
                        if (!version_group || !method) throw new Error();
    
                        await Version_Group_Details.findOrCreate({where : {
                            pokemon_move_id :  pokemon_moves.id,
                            move_method_id : method.id,
                            version_group_id : version_group.id
                            },
                            defaults : {
                                level_learned_at : vg_d.level_learn_at
                            },
                            transaction : t
                        });
                        }) 
                        if(!version_g_detail_results.success) {
                            continue;
                        }
                        };
                    }
                };
                
            //---------------Pokemon_Stats-------------------------------------------
    
                if(Array.isArray(e.stats) && e.stats.length > 0){
    
                    for (const s of e.stats) {

                    const pokemon_stats_results = await asyncRetry(async () => {

                        const stat = await Stats.findOne({where : {
                            name : s.stat.name
                        }, transaction : t});
    
                        if(stat) throw new Error();

                        const [alreadyExist,created] = await Pokemon_Stats.findOrCreate({where : {
                            pokemon_id : poke_by_id.id, 
                            stat_id : stat.id
                        },defaults : {
                            base_stat : s.base_stat,
                            effort : s.effort,
                        }, transaction : t});
    
                        if(!created) {
    
                            let update = {};
                            for (const attr of ["effort" , "base_stat"]) {
                                if(
                                s[attr] !== null &&
                                s[attr] !== undefined &&
                                s[attr] !== alreadyExist[attr]
                                ) 
                                update[attr] = s[attr] 
                            };
                            if(Object.keys(update).length > 0) await alreadyExist.update(update, {transaction : t})
                        };
                        
                    });
                    
                    if(!pokemon_stats_results.success) {
                        continue;
                    }
                }};
            //----------------Held_Items---------------------------------------------
    
                 if(Array.isArray(e.held_items) && e.held_items.length > 0){
                    
                    for(const i of e.held_items) {

                        const held_items_results = await asyncRetry(async () => {

                            const item = await Items.findOne({where : {
                                name : i.item.name
                            },transaction : t});
                        
                            if(item) throw new Error();

                            const [held_items] = await Held_Items.findOrCreate({where : {
                                item_id : item.id,
                                pokemon_id : poke_by_id.id
                            },transaction : t});

                            return {held_items}
                        });
                        if(!held_items_results.success) {
                            continue;
                        };

                        const {held_items} = held_items_results; 

                        for (const v_d of i.version_details) {

                            const version_details_results = await asyncRetry(async () => {

                                const version = await Versions.findOne({where : {
                                name  : v_d.version.name
                                },transaction : t});
    
                                if(!version) throw new Error();
    
                                await Version_Details.findOrCreate({where : {
                                    held_item_id : held_items.id,
                                    version_id : version.id
                                    },
                                    defaults : {
                                        rarity : v_d.version_details.rarity
                                    },
                                    transaction : t
                                })
                            });

                            if(!version_details_results.success) {
                                continue;
                            }
                            
                        };
                        
                    };
                }; 
            //--------------------Game_Indices--------------------------------------
    
                if(Array.isArray(e.game_indices) && e.game_indices.length > 0) {
    
                    for(const p of e.game_indices) {
                        
                       const game_indeces_results = await asyncRetry(async() => {

                            const version = await Versions.findOne({where : {
                                name : p.version.name
                            }, transaction : t});
    
                            if(version) throw new Error();
    
                                await Game_Indices.findOrCreate({where : {
                                    pokemon_id : poke_by_id.id, 
                                    version_id : version.id
                                    },
                                    defaults : {
                                        game_index : p.game_index
                                    },
                                    transaction : t
                                });
                            
                        })
                        if(!game_indeces_results.success) {
                            continue;
                        }
                    }};
    
            //--------------------------------Encounters----------------------------------------
    
                if(e.location_area_encounters){
    
                    const {data} = await axios.get(e.location_area_encounters);
    
                    for(const l of data) {
    
                        const pokemon_encounter_result = await asyncRetry(async () => {

                            const locations = await Locations_Areas.findOne({where : {
                                name : l.location_area.name
                            },transaction : t});
                                
                            if(!locations) throw new Error();
        
                            const [alreadyExist] = await Pokemon_Encounters.findOrCreate({
                                where: {
                                    pokemon_id: poke_by_id.id,
                                    location_area_id: locations.id
                                }, transaction : t
                            });
                            return {alreadyExist}
                        })

                         if (!pokemon_encounter_result.success) {
                            continue;
                        };

                        const {alreadyExist} = pokemon_encounter_result;

                        for (const v_d of l.version_details) {
                            
                            const version_detail_result = await asyncRetry(async () => {

                                const version = await Versions.findOne({where : {
                                    name : v_d.version.name
                                },transaction : t});
                               
                                if(!version) throw new Error();
        
                                const VersionDetail = await Version_Details.findOrCreate({
                                    where: {
                                        pokemon_encounter_id: alreadyExist.id,
                                        version_id: version.id
                                    }, defaults : {
                                        max_chance: v_d.max_chance
                                    }, transaction : t
                                });
        
                                if(!VersionDetail)throw new Error()
                                
                                return {VersionDetail}
                            });
    
                            if(!version_detail_result.success) {
                                continue; 
                            };

                            const {VersionDetail} = version_detail_result;

                            if(Array.isArray(v_d.encounter_details) && v_d.encounter_details.length > 0) {
    
                                for (const encounter of v_d.encounter_details) {
    
                                    const encounter_details_results = await asyncRetry(async () => {

                                        const method = await Encounter_Methods.findOne({where : {
                                             name : encounter.method.name
                                        }, transaction : t});
    
                                        if(!method) throw new Error(); 

                                        const [encounter_detail] = await Encounter_Details.findOrCreate({where : {
    
                                            version_detail_id : VersionDetail.id,
                                            method_id : method.id
                                            },
                                            defaults : {
                                                chance : encounter.chance,
                                                max_level : encounter.max_level,
                                                min_level : encounter.min_level
                                            }, transaction : t
                                        });

                                        return {encounter_detail}
                                    });
                                    
                                    if(!encounter_details_results.success) {
                                        continue;
                                    };

                                    const {encounter_detail} = encounter_details_results;
    
                                    if(Array.isArray(encounter.condition_values) && encounter.condition_values.length > 0) {
    
                                        for (const c of encounter.condition_values) {

                                            const conditions_values_results = await asyncRetry(async () => {

                                                const condition_value = await Conditions_Values.findOne({where : {
                                                    name : c.name
                                                },transaction : t});
    
                                                if(!condition_value)throw new Error();
    
                                                await Encounter_Conditions_Values.findOrCreate({where : {
                                                    encounter_detail_id : encounter_detail.id,
                                                    condition_value_id : condition_value.id
                                                }, transaction : t
                                                })
                                            });

                                            if(!conditions_values_results.success) {
                                                continue;
                                            }
                                        }
                                    }
                                };
                            };
                        }
                    }
                };
            //-----------------------------------Past_Types-----------------------------------
                if(Array.isArray(e.past_types) && e.past_types.length > 0){
                    
                    for (const pt of e.past_types) {
                        const past_type_results = await asyncRetry(async () => {
                            
                            
                            const gen = await Generations.findOne({where : {
                                name : pt.generation.name
                            }, transaction : t});
    
    
                            for (const t of pt.types) {
                            
                                const type = await Types.findOne({where : {
                                    name : t.type.name
                                }, transaction : t});
    
                                if(gen && type) {
    
                                    const [pokemon_type] = await Pokemons_Types.findOrCreate({
                                        where : {
                                            type_id : type.id,
                                            pokemon_id : poke_by_id.id
                                        },
                                        defaults : {
                                            slot : t.slot,
                                        }, 
                                        transaction : t
                                    });
    
                                    await Past_Types.findOrCreate({
                                        where : {
                                            pokemon_type_id : pokemon_type.id,
                                            generation_id : gen.id,
                                            pokemon_id : poke_by_id.id
                                        }, transaction : t
                                    });
                                }}
                            })

                        if(!past_type_results.success) {
                            continue;
                        }
                    }};
            //---------------------Past_Abilitites(history abilities)------------------------------
    
                if(Array.isArray(e.past_abilities) && e.past_abilities.length > 0) {
                   
                    for(const pa of e.past_abilities) {

                        const past_abilities_results = asyncRetry(async () => {

                            const gen = await Generations.findOne({where : {
                                name : pa.generation.name
                            }, transaction : t})
    
                       
                            for(const a of pa.abilities) {
    
                            const abilityName = !a.ability?.name ? "unknown" : a.ability.name;
                            
                            const ability = await Abilities.findOne({where : {
                                name : abilityName
                            }, transaction : t});
    
                            if(!ability) throw new Error();
    
                            const [poke_ability] = await Pokemon_Abilities.findOrCreate({where : {
                                abilities_id : ability.id,
                                pokemon_id: poke_by_id.id},
                                defaults : {
                                    slot : a.slot,
                                    is_hidden : a.is_hidden,
                                }, transaction : t
                            });
    
                            await Past_Abilities.findOrCreate({where : {
                                pokemon_abilities_id : poke_ability.id,
                                pokemon_id : poke_by_id.id,
                                generation_id : gen.id
                            }, transaction : t});
                        }
                        });
                        
                        if(!past_abilities_results.success) {
                            continue;
                        }
                    }
                };
            await t.commit(); 
        
        const end = performance.now();
        const duration = end - start;
        
        
        return {
            task : "Pokemon_relations",
            duration : duration
        }

    } catch (error) {
        await t.rollback();
        console.error("pokemon_relations error" , error );
    }
}};
 