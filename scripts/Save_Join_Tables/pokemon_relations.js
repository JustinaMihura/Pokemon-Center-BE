
//?__Por ERRORES de la PokeApi preferi usar un bulce for of para hacer fn asincronicas lineales -
//? y no en paralelo como con Promise.All(). Hay abilidades repetidas en pokemons y por ende se rompe la bd.
//?__ Por cuestione e seguridad y futuros erroes en la ata prefieron sacrificar tiempo de espera y realizar las consultas linealmente.


const axios = require("axios");
const {sequelize} = require("../../db/db.js");

const { 
    Types , Pokemon, Abilities, Pokemons_Types ,
    Species, Pokemon_Abilities, Moves, Pokemons_Moves,
    Stats , Pokemon_Stats,Items,Held_Items,Past_Abilities,
    Past_Types , Versions, Game_Indices, Locations_Areas,
    Pokemon_Encounters, Generations, Version_Details,Forms,
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

        await Pokemons_Types.destroy({where : {}});
        await  Pokemon_Abilities.destroy({where : {}});
        await Pokemons_Moves.destroy({where : {}});
        await Pokemon_Stats.destroy({where : {}});
        await Held_Items.destroy({where : {}});
        await Game_Indices.destroy({where : {}});
        await Pokemon_Encounters.destroy({where : {}})
        await Past_Abilities.destroy({where : {}});
        await Past_Types.destroy({where : {}})
        await Version_Details.destroy({where : {}})
        
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

        if (e.forms && e.forms.length > 0) {

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
            for(const t of e.types) {

                const type = await Types.findOne({where : {
                    name : t.type.name
                }});

                if(type) {
                    const alreadyExists = await Pokemons_Types.findOne({where : {
                        pokemon_id : poke_by_id,
                        type_id : type.id
                }}); 

                    if(!alreadyExists) {

                        await Pokemons_Types.create({
                            pokemon_id : poke_by_id,
                            type_id : type.id,
                            slot : t.slot
                        })
                    }}
            };
                
        //----------------Pokemon_Abilitites--------------------------------------
            for(const a of e.abilities){

                const ability = await Abilities.findOne({where : {
                    name : a.ability.name
                }});

                if (!ability) continue;
                const alreadyExists = await poke_by_id.hasAbility(ability);

                if (!alreadyExists) {
                await poke_by_id.addAbility(ability, {
                    through: {
                    slot: a.slot,
                    is_hidden: a.is_hidden
                    }
                })};
            }
        //----------------Pokemon_Moves-------------------------------------------
            for(const m of e.moves) {
                const move = await Moves.findOne({where : {
                    name : m.move.name
                }});
                if (!move) continue;
                const alreadyExist = await poke_by_id.hasMove(move);

                if(!alreadyExist) {
                    await poke_by_id.addMove(move);
                }
            };
        //---------------Pokemon_Stats-------------------------------------------
            for (const s of e.stats) {
                const stats = await Stats.findOne({where : {
                    name : s.stat.name
                }});

                if(!stats) continue;
                const alreadyExist = await poke_by_id.hasStat(stats);

                if(!alreadyExist) {
                    await poke_by_id.addStat(stats, {
                        through : {
                            base_stat : s.base_stat,
                            effort : s.effort,
                        }
                    })
                };
            };
        //----------------Held_Items---------------------------------------------
        //! Agregar version_details relations despues
            if(e.held_items){
                
                for(const i of e.held_items) {
                    const item = await Items.findOne({where : {
                        name : i.item.name
                    }});
                    
                    if(item) {
                        const alreadyExist = await poke_by_id.hasHeld_item(item);
        
                        if(!alreadyExist) {
                            await poke_by_id.addHeld_item(item)
                        }
                    }
                };
            };
        //---------------------Game_Indices--------------------------------------
            if(e.game_indices) {

                for(const p of e.game_indices) {
                    
                        const version = await Versions.findOne({where : {
                            name : p.version.name
                        }});

                        if(version) {
                            const alreadyExist = await poke_by_id.hasGame_index(version);
                            if(!alreadyExist) {
                                await poke_by_id.addGame_index(version, {
                                    through : {
                                        game_index : p.game_index
                                    }
                                });
                            };
                        }
                }};
        //----------------------Encounters----------------------------------------
        //! Agregar version_details relations despues -> encounter-detail id + version.id  
            if(e.location_area_encounters){

                const {data} = await axios.get(e.location_area_encounters);

                for(const l of data) {
                    const locations = await Locations_Areas.findOne({where : {
                        name : l.location_area.name
                    }});
                        
                    if(!locations) continue;

                    const alreadyExist = await Pokemon_Encounters.findOne({
                        where: {
                            pokemon_id: poke_by_id.id,
                            locations_areas_id: locations.id,
                        },
                    });

                    if(!alreadyExist) {
                        await Pokemon_Encounters.create({
                            pokemon_id: poke_by_id.id,
                            locations_areas_id: locations.id,
                        })
                    };
                }
                        
            };
        //---------------------Past_Types-----------------------------------
            if(e.past_types){
                
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
                                        slot : t.slot,
                                        pokemon_id : poke_by_id.id
                                    }
                                });

                                if(pokemon_type) {
                                     const alreadyExist = await Past_Types.findOne({
                                    where : {
                                        pokemon_type_id : pokemon_type.id,
                                        generation_id : gen.id,
                                        pokemon_id : poke_by_id.id
                                    }
                                });

                                if (!alreadyExist) {
                                    
                                    await Past_Types.create({
                                        pokemon_type_id : pokemon_type.id,
                                        generation_id : gen.id,
                                        pokemon_id : poke_by_id.id

                                    })
                                }
                                }
                            }
                        }}


                } catch (error) {
                        console.error({"pokemon_Past_Type_relation error " : error});
                        
                }

                   
            }
        //---------------------Past_Abilitites(history abilities)------------------------------
            if(e.past_abilities) {
               
                    for(const pa of e.past_abilities) {
                        
                    const gen = await Generations.findOne({where : {
                        name : pa.generation.name
                    }})
                    if(!gen) continue;

                    for(const a of pa.abilities) {
                        const abilityName = a.ability?.name;
                        if (!abilityName) continue;

                        const ability = await Abilities.findOne({where : {
                            name : abilityName
                        }});

                        if(!ability) continue; 

                        const [poke_ability] = await Pokemon_Abilities.findOrCreate({where : {
                            slot : a.slot,
                            is_hidden : a.is_hidden,
                            pokemon_id: poke_by_id.id,
                            abilities_id : ability.id
                        }});

                        const alreadyExist = await Past_Abilities.findOne({where : {
                            pokemon_abilities_id : poke_ability.id,
                            pokemon_id : poke_by_id.id,
                            generation_id : gen.id
                        }});
                        
                        if(!alreadyExist) {
                        await Past_Abilities.create({
                            pokemon_id : poke_by_id.id,
                            pokemon_abilities_id : poke_ability.id,
                            generation_id : gen.id
                            })
                        }
                    }
                }
           
            }   

               
        })); 
        console.timeEnd("Pokemon_Relations db ✅ --> time ")

    } catch (error) {
        console.error({"pokemon_relations error" : error.errors  });
    }
};
 