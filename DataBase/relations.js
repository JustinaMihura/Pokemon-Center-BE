

module.exports = (sequelize) => {

    const {Pokemon,
        Types , 
        Pokemons_Types,
        Stats,
        Pokemon_Stats,
        Species,
        Past_Types,
        Generations,
        Abilities,
        Past_Abilities,
        Moves,
        Pokemons_Moves,
        Versions,
        Version_Details,
        Move_Method,
        Encounter_Details,
        Pokemon_Encounters,
        Locations_Areas,
        Encounter_Methods,
        Encounter_Conditions_Values,
        Conditions,
        Conditions_Values,
        Items,
        Held_Items,
        Pokemon_Abilities,
        Varieties,
        Pokedexes,
        Pokemon_Pokedexes,
        Shape,
        Colors,
        Egg_Groups,
        Species_Egg_Groups,
        Evolutions,
        Evolution_Details,
        Evolution_Chains,
        Evolves_To,
        Genders,
        Triggers,
        LevelExperiences,
        GrowthRates,
        Habitad,
        Pal_Park_Area,
        Pal_Park_Encounters,
        Version_Group_Details,
        Version_Groups,
        Move_Machines,
        Machines,
        Target,
        Move_Stats_Change,
        Locations
       } = sequelize.models;



//?-----------------------------------------------------------------------------------------------------------------------------------------------
//?_______________________________ -  POKEMON ( spinal table )  -  ________________________________________________________________________________


Pokemon.belongsToMany(Types, {
    through: Pokemons_Types,
    foreignKey: 'pokemon_id',
    otherKey: 'type_id',
    as: 'CurrentTypes',
  });
  
  Types.belongsToMany(Pokemon, {
    through: Pokemons_Types,
    foreignKey: 'type_id',
    otherKey: 'pokemon_id',
    as: 'Pokemons_with_it',
  });
  
  Pokemon.belongsToMany(Stats, {
    through: Pokemon_Stats,
    foreignKey: 'pokemon_id',
    otherKey: 'stat_id',
    as: 'Stats',
  });
  
  Stats.belongsToMany(Pokemon, {
    through: Pokemon_Stats,
    foreignKey: 'stat_id',
    otherKey: 'pokemon_id',
    as: 'Pokemon_with_it',
  });
  
  Pokemon.belongsTo(Species, {foreignKey : "species_id"})
  Species.hasMany(Pokemon,  {foreignKey : "species_id"})
  
  Pokemon.belongsToMany(Types, {
    through: Past_Types,
    foreignKey: 'type_id',
    otherKey: 'pokemon_id',
    as: 'past_types',
  });
  
  Types.belongsToMany(Pokemon, {
    through: Past_Types,
    foreignKey: 'pokemon_id',
    otherKey: 'type_id',
    as: 'Pokemon_with_it',
  });
  
  Generations.hasMany(Past_Types, { foreignKey: 'generation_id' });
  Past_Types.belongsTo(Generations, { foreignKey: 'generation_id' });
  
  
  //?__________________________________- Abilities -_______________________________________________________________________________________________
  
  Pokemon.belongsToMany(Abilities , {
    through : Pokemon_Abilities,
    foreignKey : "pokemon_id",
    otherKey : "abilities_id",
    as : "abilities"
   });
  
  Abilities.belongsToMany(Pokemon, {
    through : Pokemon_Abilities,
    foreignKey : "abilities_id",
    otherKey : "pokemon_id",
    as : "pokemon"
  });
  
  Pokemon.belongsToMany(Abilities, {
     through: Past_Abilities,
      foreignKey: 'past_pokemon_id',
      otherKey : "past_abilities_id",
      as: 'past_abilities',
    });
    
    Abilities.belongsToMany(Pokemon, {
      through: Past_Abilities,
      foreignKey: 'past_ability_id',
      otherKey : "past_pokemon_id",
      as  : "pokemons_who_have_it"
    });
    
    Past_Abilities.belongsTo(Generations, {
      foreignKey: 'generationId',
      as: 'generation',
    });
  
    Generations.hasMany(Past_Abilities, {
      foreignKey: 'generationId',
      as: 'abilities',
    });
  
    Abilities.belongsTo(Generations, {foreignKey : "generation_id"})
    Generations.hasMany(Abilities,{foreignKey : "generation_id"} )


    //?____________________________________________________________________________________________________________________________________
    //?____________________________-Moves-__________________________________________________________________________________________________
  
  Pokemon.belongsToMany(Moves, { 
    through: Pokemons_Moves,
    foreignKey: 'pokemon_id', 
    otherKey: 'move_id',
    as : "moves"  
    });
  
  Moves.belongsToMany(Pokemon, { 
    through: Pokemons_Moves , 
    foreignKey: 'move_id',   
    otherKey: 'pokemon_id',
    as : "learn_by_pokemon" 
    });
  
  Pokemons_Moves.hasMany(Version_Group_Details, { foreignKey: 'pokemon_move_id' });
  Version_Group_Details.belongsTo(Pokemons_Moves, { foreignKey: 'pokemon_move_id' });
  
  Version_Group_Details.belongsTo(Move_Method , {foreignKey : "move_method_id"})
  Move_Method.hasMany(Version_Group_Details , {foreignKey : "move_method_id"})
    
  Version_Group_Details.belongsTo(Version_Groups, { foreignKey: 'version_group_id' });
  Version_Groups.hasMany(Version_Group_Details, { foreignKey: 'version_group_id' });
  
  Move_Machines.belongsTo(Version_Groups , {
    foreignKey : "version_groups_id"
  })
  
  Version_Groups.hasMany(Move_Machines , {
    foreignKey : "version_groups_id"
  })
  
  Moves.belongsToMany(Machines , {
    through : Move_Machines,
    foreignKey : "machines_id",
    otherKey : "moves_id",
    as : "machines"
  }),
  
  Machines.belongsToMany(Moves , {
    through : Move_Machines,
    foreignKey : "machines_id",
    otherKey : "move_id",
    as : "moves"
  });
  
  Moves.belongsTo(Generations , {foreignKey : "generation_id"})
  Generations.hasMany(Moves, {foreignKey : "moves_id"})
  
  Moves.belongsTo(Types , {foreignKey : "types_id"})
  Types.hasMany(Moves , {foreignKey : "moves_id"})
  
  Moves.belongsTo(Target , {foreignKey : "target_id"})
  Target.hasMany(Moves, {foreignKey : "moves_id"})
  
  Moves.belongsToMany(Stats, 
    {
      through : Move_Stats_Change,
      foreignKey : "stats_id",
      otherKey : "moves_id",
      as : "Stats_changes "
    });
  
  Stats.belongsToMany(Moves, {
    through : Move_Stats_Change,
    foreignKey : "moves_id",
    otherKey : "stats_id",
    as : "Moves_efects"
  });
  
  //?____________________________________________________________________________________________________________________________________________________

  //?______________________________________- Locations_Areas / Encounters -_______________________________________________________________

  Pokemon.belongsToMany(Locations_Areas, {
    through : Pokemon_Encounters,
    foreignKey : "pokemon_id",
    otherKey : "locations_areas_id",
    as : "encounters_areas"
  });

  Locations_Areas.belongsToMany(Pokemon, {
    through : Pokemon_Encounters,
    foreignKey : "locations_areas_id",
    otherKey : "pokemon_id",
    as : "pokemon_enounters"
  });
  
  Version_Details.belongsTo(Versions, { foreignKey: 'version_id' });
  Versions.hasMany(Version_Details, { foreignKey: 'version_id' });
    
  Version_Details.hasMany(Encounter_Details, { foreignKey: 'version_detail_id' });
  Encounter_Details.belongsTo(Version_Details, { foreignKey: 'version_detail_id' });

  Version_Details.hasMany(Pokemon_Encounters, { foreignKey: 'pokemon_encounter_id' });
  Pokemon_Encounters.belongsTo(Version_Details, { foreignKey: 'pokemon_encounter_id' });
  
  Encounter_Details.belongsTo(Encounter_Methods, { foreignKey: 'encounter_method_id' });
  Encounter_Methods.hasMany(Encounter_Details, { foreignKey: 'encounter_method_id' });
    
  Conditions.hasMany(Conditions_Values, {foreignKey : "conditions_id"})
  Conditions_Values.belongsTo(Conditions,{foreignKey : "conditions_id"})
  
  Encounter_Details.belongsToMany(Conditions_Values, {
    through : Encounter_Conditions_Values ,
     foreignKey : "encounter_details_id",
     otherKey : "conditions_values_id",
     as : "conditions_values"
    });

  Conditions_Values.belongsToMany(Encounter_Details, {
    through : Encounter_Conditions_Values ,
     foreignKey : "conditions_values_id",
     otherKey : "encounter_details_id",
     as : "encounters_details"
    });


  //?__________________________________________________________________________________________________________________________________________________
  //?___________________________________- Items -_____________________________________________________________________________________________________


  Pokemon.belongsToMany(Items, {
    through : Held_Items,
    foreignKey : "pokemon_id",
    otherKey : "held_items_id",
    as : "held_items"
  });

  Items.belongsToMany(Pokemon, {
    through : Held_Items,
    foreignKey : "items_id",
    otherKey : "pokemon_id",
    as  : "pokemon_who_hold_it"
  });
  
  Items.hasMany(Held_Items, { foreignKey: 'item_id' });
  Held_Items.belongsTo(Items, { foreignKey: 'item_id' });
  
  Version_Details.belongsTo(Held_Items, {foreignKey : "version_detail_id"})
  Held_Items.hasMany(Version_Details, {foreignKey : "version_detail_id"})



  //?_________________________________________________________________________________________________________________________
  //?-------------------------------------------------------------------------------------------------------------------------
  //?__________________________________________- SPECIES (spinal table) -_____________________________________________________
  
  
  
  Species.belongsToMany(Pokedexes, {
    through : Pokemon_Pokedexes,
    foreignKey : "species_id", 
    otherKey : "pokemon_pokedexes_id",
     as: 'pokedex_numbers'
    });

  Pokedexes.belongsToMany(Species, {
    through : Pokemon_Pokedexes,
    foreignKey : "pokedex:id",
    otherKey : "species_id",
     as: 'pokemon_entries'
    });
  
  Species.belongsTo(Shape, {foreignKey : "shape_id"})
  Shape.hasMany(Species, {foreignKey : "shape_id"} )
  
  Species.belongsTo(Colors, {foreignKey : "color_id"})
  Colors.hasMany(Species, {foreignKey : "color_id"})
  
  Species.belongsToMany(Egg_Groups, {
    through : Species_Egg_Groups,
    foreignKey : "species_id", 
    otherKey : "egg_group_id",
    as : "egg_group"
  });

  Egg_Groups.belongsToMany(Species, {
    through : Species_Egg_Groups,
    foreignKey : "egg_group_id",
    otherKey : "species_id",
    as : "belonging_species"
  });
  
  Species.belongsTo(Evolution_Chains, {
    foreignKey : "evolution_chain_id",
     as : "Evolution_Chain"
    });



//* EVOLUTION CHAIN ---( tree structure )---> EVOLUTIONS is a node <--> Evolves_to (link table) <--> Another Evolutions Node.



  Evolution_Chains.hasMany(Species, {
    foreignKey : "evolution_chain_id",
    as : "pokemon"
  });
     
  Species.belongsTo(Evolutions, {foreignKey : "species_id"})
  Evolutions.belongsTo(Species, {foreignKey : "species_id"})
    
  Evolution_Chains.hasMany(Evolutions, { foreignKey: 'evolution_chain_id' ,as : "chain"})   //*--- Root 
  Evolutions.belongsTo(Evolution_Chains, { foreignKey: 'evolution_chain_id' })
    
  Evolutions.belongsToMany(Evolutions, //*----------- Node to Node
    {
      through : Evolves_To , //*------------Link
      foreignKey : "from_species_id",                           
      otherKey : "to_species_id" ,
      as : "evolves_to_pokemon"
    });
    
    Evolutions.belongsToMany(Evolutions,   
      {
        through :Evolves_To , 
        foreignKey : "to_species_id" , 
        otherKey : "from_species_id" , 
        as : "Evolves_From"
      });
      
  
   
  //?______________________Evolutions_Details________________________________________________________________________________-
  
  Evolution_Details.belongsTo(Items, {foreignKey : "item_id", as : "item"})
  Items.hasMany(Evolution_Details, { foreignKey: 'item_id' });
  
  Evolution_Details.belongsTo(Items , {foreignKey : "heldItems_id" , as : "heldItem"})       
  Items.hasMany(Evolution_Details , {foreignKey : "heldItems_id"})
  
  Evolution_Details.belongsTo(Genders, {foreignKey : "gender_id" })
  Genders.hasMany(Encounter_Details, {foreignKey : "gender_id"})
  
  Evolution_Details.belongsTo(Moves, {foreignKey : "know_moves_id" , as : "Know_Move"})
  Moves.hasMany(Evolution_Details, {foreignKey : "know_moves_id"})
  
  Evolution_Details.belongsTo(Types , {foreignKey : "known_move_type_id" , as : "Know_move_type"})
  Types.hasMany(Evolution_Details, {foreignKey : "known_move_type_id", as : "Know_move_type"})
  
  Evolution_Details.belongsTo(Types , {foreignKey : "party_type_id" , as : "PartyType"})
  //?Un tipo específico que debe estar presente en el equipo para que ocurra la evolución
  Types.hasMany(Evolution_Details , {foreignKey : "party_type_id" , as : "PartyType"})
  
  Evolution_Details.belongsTo(Locations, {foreignKey : "location_id", as : "location"})
  Locations.hasMany(Encounter_Details, {foreignKey : "location_id"})
  
  Evolution_Details.belongsTo(Triggers, {foreignKey : "triggers_id" , as : "trigger"})
  Triggers.hasMany(Evolution_Details , {foreignKey : "triggers_id"})
  
  Evolution_Details.belongsTo(Species , {foreignKey : "party_species_id" , as : "party_species"})
  //*Una especie específica que debe estar en el equipo para que ocurra la evolución.
  Species.hasMany(Evolution_Details, {foreignKey : "party_species_id"})
  
  Evolution_Details.belongsTo(Species , {foreignKey : "trade_species_id" , as : "Trade_Species"})
  //*La especie con la que se debe intercambiar para que ocurra la evolución.
  Species.hasMany(Encounter_Details , {foreignKey : "trade_species_id" , as : "Trade_Species"})
  
  Evolutions.hasMany(Evolution_Details, { foreignKey: 'evolution_id' });
  Evolution_Details.belongsTo(Evolutions, { foreignKey: 'evolution_id' });
      
  
  //?___________________________________________________________________________________________________
  
        
  Species.belongsTo(Generations , {foreignKey : "generations_id" , as : "Generation"})
  Generations.hasMany(Species ,  {foreignKey : "generations_id" , as : "Generation"})
  
  GrowthRates.hasMany(LevelExperiences, {foreignKey : "levels_experiences_id" , as : "levels"})
  LevelExperiences.belongsTo(GrowthRates, {foreignKey : "levels_experiences_id" , as : "levels"})
  
  Species.belongsTo(GrowthRates , {foreignKey : "growth_rate_id" , as : "growth_rate"})
  GrowthRates.hasMany(Species, {foreignKey : "growth_rate_id" , as : "growth_rate"})
  
  Species.belongsTo(Habitad , {foreignKey : "habitad_id" , as : "Habitad"})
  Habitad.hasMany(Species, {foreignKey : "habitad_id"})
  
  Species.belongsToMany(Pal_Park_Area , {
    through : Pal_Park_Encounters,
    foreignKey : "species_id",
    otherKey : "pal_park_areas_id",
    as : "pal_park_encounters_areas"
  });
  
  Pal_Park_Area.belongsToMany(Species, {
    through : Pal_Park_Encounters,
    foreignKey : "pal_park_areas_id",
    otherKey : "species_id",
    as : "pal_park_pokemons"
  });
  
  Varieties.belongsTo(Pokemon ,  { foreignKey: 'pokemon_id' })
  Pokemon.hasOne(Varieties,  { foreignKey: 'pokemon_id' })
  
  Species.hasMany(Varieties , {foreignKey : "species_id", as : "varieties"})
  Varieties.belongsTo(Species , {foreignKey : "species_id"})
  
//?_________________________________________________________________________________________________________
//?----------------------------------------------------------------------------------------------------------



  
  
  

};

