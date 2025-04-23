

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
        Locations,
        Contest_Combos,
        Contest_Effects,
        Contest_Type,
        Move_Damage_Class,
        Flavor_text_entries,
        Meta,
        Categories, 
        Ailments,
        Lengueage,
        Names,
        Past_Values,
        Super_Contest_Effects,
        Move_Battle_Preferences,
        Move_Battle_Style,
        Pokeathlon_Stats_Changes,
        Pokeathlon_Stats,
        Flavors,
        Berries,
        Flavors_Join_Table,
        Firmness,
        Characteristics_IVs,
        Descriptions,
        Game_Indices,
        Item_Attributes,
        Item_Category,
        Item_Fling_Effect,
        Attributes,
        Natures,
        Effects_Entries,
        Effect_Changes,
        Regions,
        Encounter_Method_Rate,
        Damage_Relations,
        Forms,
        Forms_Types
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
  Species.hasMany(Pokemon, { foreignKey: "species_id" });
  
  Pokemon.hasMany(Past_Types, { foreignKey: 'pokemon_id' });
  Past_Types.belongsTo(Pokemon, { foreignKey: 'pokemon_id' });

  Past_Types.belongsTo(Pokemons_Types, {
    foreignKey: 'pokemon_type_id'
  });
  Pokemons_Types.hasMany(Past_Types, {
    foreignKey: 'pokemon_type_id'
  });
  
  Generations.hasMany(Past_Types, { foreignKey: 'generation_id' });
  Past_Types.belongsTo(Generations, { foreignKey: 'generation_id' });
  
  Pokemon.belongsToMany(Versions, {
    through : Game_Indices,
    foreignKey : "pokemon_id",
    otherKey : "version_id",
    as : "game_indices"
  });

  Versions.belongsToMany(Pokemon, {
    through : Game_Indices,
    foreignKey : "version_id",
    otherKey : "pokemon_id",
    as : "Pokemon indices"
  });

  Pokemon.hasMany(Forms, { foreignKey: 'pokemon_id' });
  Forms.belongsTo(Pokemon, { foreignKey: 'pokemon_id' });
  
  Forms.belongsToMany(Types, {
    through: Forms_Types,
    foreignKey: 'form_id',
    otherKey: 'type_id',
    as: 'Types',
  });
  
  Types.belongsToMany(Forms, {
    through: Forms_Types,
    foreignKey: 'type_id',
    otherKey: 'form_id',
  });
  
  Forms.belongsTo(Version_Groups , {foreignKey : "version_group_id"});


  //?__________________________________- Abilities -_______________________________________________________________________________________________
  Pokemon.belongsToMany(Abilities, {
    through: Pokemon_Abilities,
    foreignKey: 'pokemon_id',
    otherKey: 'abilities_id',
    as: 'abilities'
  });
  
  Abilities.belongsToMany(Pokemon, {
    through: Pokemon_Abilities,
    foreignKey: 'abilities_id',
    otherKey: 'pokemon_id',
    as: 'pokemon'
  });
  
  Pokemon.hasMany(Past_Abilities, {
    foreignKey: 'pokemon_id',
    as: 'past_abilities'
  });
  
  Past_Abilities.belongsTo(Pokemon, {
    foreignKey: 'pokemon_id'
  });
  
  Past_Abilities.belongsTo(Pokemon_Abilities, {
    foreignKey: 'pokemon_abilities_id',
  });

  Pokemon_Abilities.hasMany(Past_Abilities , {
    foreignKey : 'pokemon_abilities_id',
  })
  
  Past_Abilities.belongsTo(Generations, {
    foreignKey: 'generation_id',
    as: 'generation'
  });
  
  Generations.hasMany(Past_Abilities, {
    foreignKey: 'generation_id',
    as: 'past_abilities'
  });
  
    Abilities.belongsTo(Generations, {
      foreignKey : "generation_id"
    });

    Generations.hasMany(Abilities,{
      foreignKey : "generation_id"
    });

    Abilities.belongsToMany(Lengueage, {
      through : Effects_Entries,
      foreignKey : "abilities_id",
      otherKey : "lengueage_id",
      as : "Effects_entries "
    }); 

    Lengueage.belongsToMany(Abilities , {
      through : Effects_Entries,
      foreignKey  : "lengueage_id",
      otherKey : "abilities_id",
      as : "abilities"
    });

    Effects_Entries.belongsTo(Effect_Changes, {
      foreignKey : "effect_changes_id"
    });

    Effect_Changes.hasMany(Effect_Changes, {
      foreignKey : "effect_changes_id",
      as : "effect_enries"
    });

    Abilities.belongsToMany(Version_Groups , {
      through : Effect_Changes,
      foreignKey  : "abilities_id",
      otherKey : "version_group_id",
      as : "Effect"
    });

    Version_Groups.belongsToMany(Abilities, {
      through : Effect_Changes,
      foreignKey: "version_group_id",
      otherKey : "abilities_id",
      as : "abilities_effect_change"
    });

    Abilities.belongsToMany(Version_Groups , {
      through : Flavor_text_entries,
      foreignKey  : "abilities_id",
      otherKey : "version_group_id",
      as : "Flavor_Text"
    });

    Version_Groups.belongsToMany(Abilities, {
      through : Flavor_text_entries,
      foreignKey: "version_group_id",
      otherKey : "abilities_id",
      as : "abilities_flavor_text"
    });

    Abilities.belongsToMany(Lengueage , {
      through : Names,
      foreignKey : "abilities_id",
      otherKey : "lengueage_id",
      as : "names_traducc"
    });

    Lengueage.belongsToMany(Abilities, {
      through : Names, 
      foreignKey : "lengueage_id",
      otherKey : "abilities_id",
      as : "abilitites_traducc"
    });


    //?___________________________________________________-Moves-__________________________________________________________________________
  
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
  
  Pokemons_Moves.hasMany(Version_Group_Details, { 
    foreignKey: 'pokemon_move_id' 
  });

  Version_Group_Details.belongsTo(Pokemons_Moves, { 
    foreignKey: 'pokemon_move_id' 
  });
  
  Version_Group_Details.belongsTo(Move_Method , 
    {foreignKey : "move_method_id"
    })

  Move_Method.hasMany(Version_Group_Details , {
    foreignKey : "move_method_id"
  })
    

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
  Generations.hasMany(Moves, {foreignKey : "generation_id"})
  
  Moves.belongsTo(Types , {
    foreignKey : "types_id",
    as : "type"
  });

  
  Moves.belongsTo(Target , {foreignKey : "target_id"})
  Target.hasMany(Moves, {foreignKey : "target_id"})
  
  Moves.belongsToMany(Stats, {
      through : Move_Stats_Change,
      foreignKey : "stats_id",
      otherKey : "moves_id",
      as : "Stats_changes "
    });
  
  Moves.belongsToMany(Moves , {
    through : Contest_Combos, 
    foreignKey : "move_id", 
    otherKey : "use_after_id",
    as : "UseAfter"
  });

  Moves.belongsToMany(Moves, {
    through : Contest_Combos,
    foreignKey : "move_id" ,
    otherKey : "use_before_id", 
    as : "useBefore" 
  });

  Contest_Effects.belongsToMany(Lengueage , {
    through : Effects_Entries,
    foreignKey  : "contest_effect_id",
    otherKey : "lengueage_id"
  });

  Lengueage.belongsToMany(Contest_Effects , {
    through : Effects_Entries,
    foreignKey : "lenguaege_id",
    otherKey : "contest_effect_id"
  });
  
  
  Contest_Effects.belongsToMany(Lengueage , {
    through : Flavor_text_entries,
    foreignKey  : "contest_effect_id",
    otherKey : "language_id"
  });

  Lengueage.belongsToMany(Contest_Effects , {
    through : Flavor_text_entries,
    foreignKey : "language_id",
    otherKey : "contest_effect_id"
  });
  

  Moves.belongsTo(Contest_Effects , {
     foreignKey : "contest_effects_id"
    });

  Contest_Effects.hasMany(Moves , { 
    foreignKey : "contest_effects_id"
  });


  Moves.belongsTo(Contest_Type , {
     foreignKey : "contest_type_id"
    });

  Contest_Type.hasMany(Moves , { 
    foreignKey : "contet_type_id"
  });

  Move_Damage_Class.belongsToMany(Lengueage, {
    through : Descriptions,
    foreignKey : "move_damage_class_id",
    otherKey : "lengueage_id"
  });

  Lengueage.belongsToMany(Move_Damage_Class, {
    through : Descriptions,
    foreignKey : "lengueage_id",
    otherKey : "move_damage_class_id"
  });

  Moves.belongsTo(Move_Damage_Class , {
     foreignKey : "move_damage_class_id"
    });

  Move_Damage_Class.hasMany(Moves , { 
    foreignKey : "move_damage_class_id"
  });


  Moves.belongsToMany(Version_Groups , {
    through : Flavor_text_entries, 
    foreignKey : "moves_id",
    otherKey : "version_group_id",
  });

  Version_Groups.belongsToMany(Moves , {
    through : Flavor_text_entries, 
    foreignKey : "version_group_id",
    otherKey : "moves_id" 
  });

  Meta.belongsTo(Ailments , { foreignKey : "ailments_id"})
  Ailments.hasMany(Meta , { foreignKey : "ailments_id"});

  Meta.belongsTo(Categories , { foreignKey : "categories_id"})
  Categories.hasMany(Meta , { foreignKey : "categories_id"})

  Moves.belongsTo(Meta , {foreignKey : "meta_id"})
  Meta.hasOne(Moves , { foreignKey : "meta_id"})

  Moves.belongsToMany(Lengueage , {
    through : Names , 
    foreignKey : "move_id",
    otherKey : "lengueage_id",
    as : "Traducc"
  });

  Lengueage.belongsToMany(Moves , {
    through : Names , 
    foreignKey : "lengueage_id",
    otherKey : "move_id",
    as : "Moves_names"
  });

  Moves.belongsToMany(Version_Groups , {
    through : Past_Values ,
    foreignKey :"moves_id",
    otherKey : "past_values_id",
    as : "past_values"
  });

  Version_Groups.belongsToMany(Moves , {
    through : Past_Values ,
    foreignKey : "past_values_id",
    otherKey :"moves_id",
    as : "past_values"
  });

 Past_Values.belongsTo(Types , {
   foreignKey : "type_id"
  })

 Types.hasMany(Past_Values , {
   foreignKey : "type_id"
  })

  Moves.belongsTo(Super_Contest_Effects , { 
    foreignKey : "super_contest_effects_id"
  });

  Super_Contest_Effects.hasMany(Moves ,  { 
    foreignKey : "super_contest_effects_id"
  });

  Super_Contest_Effects.belongsToMany(Lengueage , {
    through : Flavor_text_entries, 
    foreignKey : "super_contest_effects_id",
    otherKey : "language_id",
    as : "Flavor_texts"
  });

  Lengueage.belongsToMany(Super_Contest_Effects , {
    through : Flavor_text_entries, 
    foreignKey : "language_id",
    otherKey :"super_contest_effects_id",
    as : "Super_contest_effects"
  });


  //?______________________________________- Locations / Locations_Areas -_______________________________________________________________

  Locations.hasMany(Locations_Areas, {
    foreignKey : "locations_areas_id",
    as : "areas"
  });

  Locations_Areas.belongsTo(Locations, {
    foreignKey : "location_areas_id",
    as : "locations"
  });

  Locations.belongsToMany(Generations, {
    through : Game_Indices,
    foreignKey : "locations_id",
    otherKey : "generations_id",
    
  });

  Generations.belongsToMany(Locations, {
    through : Game_Indices,
    foreignKey : "generations_id",
    otherKey : "locations_id",
    as : "locations"
  });

  Locations.belongsToMany(Lengueage , {
    through : Names,
    foreignKey : "locations_id",
    otherKey : "lengueage_id",
    as : "names"
  })

  Lengueage.belongsToMany(Locations, {
    through : Names, 
    foreignKey : "lengueage_id",
    otherKey : "locations_id",
    as : "locations_traducc"
  });

  Locations.belongsTo(Regions , {
    foreignKey : "region_id",
    as : "region"
  });

  Regions.hasMany(Locations, {
    foreignKey : "region_id",
    as : "locations"
  });

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
    as : "pokemon_encounters"
  });

  Locations_Areas.belongsToMany(Encounter_Methods, {
    through : Encounter_Method_Rate,
    foreignKey : "locations_areas_id",
    otherKey : "encounter_method_id",
    as : "encounter_method_rate"
  });

  Encounter_Methods.belongsToMany(Locations_Areas, {
    through : Encounter_Method_Rate,
    foreignKey : "encounter_method_id",
    otherKey : "locations_areas_id",
    as : "locations_areas_rate"
  });

  Locations_Areas.belongsToMany(Lengueage, {
    through : Names, 
    foreignKey : "locations_areas_id",
    otherKey : "lengueage_id",
    as : "names"
  });

  Lengueage.belongsToMany(Locations_Areas, {
    through : Names, 
    foreignKey : "lengueage_id",
    otherKey : "locations_areas_id",
    as : "locations_Areas_traduc"
  });



 //?_____________________________- Pokemon_Encounters -___________________________________________________________
  
 
  
  Version_Details.hasMany(Pokemon_Encounters, { 
    foreignKey: 'version_detail_id'
   });

  Pokemon_Encounters.belongsTo(Version_Details, { 
    foreignKey: 'version_detail_id' 
  });

  Version_Details.hasMany(Encounter_Details, { 
    foreignKey: 'version_detail_id' 
  });

  Encounter_Details.belongsTo(Version_Details, { 
    foreignKey: 'version_detail_id' 
  
  });
  
  Encounter_Details.belongsTo(Encounter_Methods, { 
    foreignKey: 'encounter_method_id' 
  });

  Encounter_Methods.hasMany(Encounter_Details, { 
    foreignKey: 'encounter_method_id' 
  });
    
  Conditions.hasMany(Conditions_Values, {
    foreignKey : "conditions_id"
  });

  Conditions_Values.belongsTo(Conditions,{
    foreignKey : "conditions_id"
  })
  
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
  
  Version_Details.belongsTo(Held_Items, {
    foreignKey : "version_detail_id"
  });

  Held_Items.hasMany(Version_Details, {
    foreignKey : "version_detail_id"
  });

  Items.belongsToMany(Item_Attributes, {
    through : Attributes,
    foreignKey : "items_id",
    otherKey : "item_attribute_id",
    as : "Item_Attributes"
  });

  Item_Attributes.belongsToMany(Items, {
    through : Attributes,
    foreignKey : " item_attributes_id",
    otherKey : "items_id",
    as : "Items"
  });

  Items.belongsTo(Evolution_Chains , {
    foreignKey : "baby_trigger_for",
    as : "baby_trigger"
  });

  Evolution_Chains.hasOne(Items ,{
    foreignKey : "baby_trigger_for",
    as : "baby_trigger"
  });

  Items.belongsTo(Item_Category , {
    foreignKey : "item_category_id",
    as : "item_category"
  });

  Item_Category.hasMany(Items, {
     foreignKey : "item_category_id",
     as : "items"
  });

  Items.belongsToMany(Lengueage , {
    through  : Effects_Entries,
    foreignKey : "items_id",
    otherKey : "lengueage_id",
    as : "effect_entries"
  });

  Lengueage.belongsToMany(Items, {
    through : Effects_Entries,
    foreignKey : "lengueage_id",
    otherKey : "items_id",
    as : "items_names"
  });

 

  Items.belongsToMany(Version_Groups, {
    through : Flavor_text_entries,
    foreignKey : "items_id",
    otherKey : "version_group_id",
    as : "flavor_text"
  });

  Version_Groups.belongsToMany(Items , { 
    through : Flavor_text_entries,
    foreignKey : "version_group_id",
    otherKey : "items_id"
  });

  Items.belongsToMany(Generations, {
    through : Game_Indices,
    foreignKey : "items_id",
    otherKey : "generations_id",
    as : "game_indices"
  });

  Generations.belongsToMany(Items , {
    through : Game_Indices,
    foreignKey : "generations_id",
    otherKey : "items_id",
    as : "item_game_index"
  });

  Items.belongsTo(Machines , {
    foreignKey : "machines_id",
    as : "machines"
  })

  Machines.hasOne(Items , {
    foreignKey : "machines_id",
    as : "items"
  });
  
  Items.belongsTo(Item_Fling_Effect , {
    foreignKey : "fling_effect_id",
    as : "fling_effect"
  });

  Item_Fling_Effect.hasMany(Items, {
    foreignKey : "items_id",
    as : "Items"
  });


  //?________________________________________-Types-_______________________________________________

    Types.belongsTo(Damage_Relations, {
      foreignKey : "damage_relations_id",
      as : "damage_relations"
    });

    Damage_Relations.hasOne(Types, {
      foreignKey : "damage_relations_id",
      as : "main_type"
    });

    Damage_Relations.hasMany(Types, {
      foreignKey : "double_damage_from_id",
      as : "double_damage_from"
    });

    Types.hasMany(Damage_Relations, {
      foreignKey : "double_damage_from_id",
      as : "double_damage_from"
    });

    Damage_Relations.hasMany(Types, { 
      as: "double_damage_to", 
      foreignKey: "double_damage_to_id" 
    });

    Types.belongsTo(Damage_Relations, { 
      as: "double_damage_to", 
      foreignKey: "double_damage_to_id" 
    });

    Damage_Relations.hasMany(Types, { 
      as: "half_damage_from", 
      foreignKey: "half_damage_from_id" 
    });

    Types.belongsTo(Damage_Relations, { 
      as: "half_damage_from", 
      foreignKey: "half_damage_from_id" 
    });

    Damage_Relations.hasMany(Types, { 
      as: "half_damage_to", 
      foreignKey: "half_damage_to_id" 
    });

    Types.belongsTo(Damage_Relations, { 
      as: "half_damage_to", 
      foreignKey: "half_damage_to_id" 
    });

    Damage_Relations.hasMany(Types, {
       as: "no_damage_from", 
       foreignKey: "no_damage_from_id" 
      });

    Types.belongsTo(Damage_Relations, 
      { as: "no_damage_from", 
        foreignKey: "no_damage_from_id" 
      });

    Damage_Relations.hasMany(Types, { 
      as: "no_damage_to", 
      foreignKey: "no_damage_to_id" 
    });

    Types.belongsTo(Damage_Relations, { 
      as: "no_damage_to", 
      foreignKey: "no_damage_to_id" 
    });

    Types.belongsToMany(Generations, {
      through : Game_Indices,
      foreignKey : "types_id",
      otherKey :  "generations_id",
    });

    Generations.belongsToMany(Types, {
      through : Game_Indices,
      foreignKey : "generations_id",
      otherKey : "types_id"
    });

    Types.belongsTo(Generations, {
      foreignKey : "types_id",
      as : "generations"
    });

    Types.belongsTo(Move_Damage_Class, {
      foreignKey : "move_damage_class_id",
      as : "move_damage_class"
    });

    Move_Damage_Class.hasMany(Types, {
      foreignKey : "move_damage_class_id"
    });

    Types.hasMany(Moves , {
      foreignKey : "types_id",
      as : "moves"
    });

    Types.belongsToMany(Lengueage, {
      through : Names,
      foreignKey: "types_id",
      otherKey : "lengueage_id",
      as : "names_traducc"
    });

    Lengueage.belongsToMany(Types , {
      through : Names,
      foreignKey : "lengueage_id",
      otherKey : "types_id",
      as : "types_names"
    });



  //?_____________________________________________________________________________________________________________________________________________
  //?---------------------------------------------------------------------------------------------------------------------------------------------


  //?__________________________________________- SPECIES (spinal table) -__________________________________________________________________________
  
  
  
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
  

//?_______________________________________________ -Evolution_Chain -_____________________________________________________________________________

//* EVOLUTION CHAIN ---( tree structure )---> EVOLUTIONS is a node <--> Evolves_to (link table) <--> Another Evolutions Node.

  Species.belongsTo(Evolution_Chains, {
    foreignKey : "evolution_chain_id",
     as : "Evolution_Chain"
    });


  Evolution_Chains.hasMany(Species, {
    foreignKey : "evolution_chain_id",
    as : "pokemon"
  });
     
    
  Evolution_Chains.hasMany(Evolutions, { 
    foreignKey: 'evolution_chain_id' ,
    as : "chain"
  })   //*-------- Root 

  Evolutions.belongsTo(Evolution_Chains, { 
    foreignKey: 'evolution_chain_id'
   })

   Evolutions.belongsTo(Species, {
    foreignKey: 'species_id',
    as: 'species'
  });
  
  Species.hasOne(Evolutions, {
    foreignKey: 'species_id',
    as: 'node'
  });
    
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
      
 //?______________________________-Evolutions_Details-___________________________________________-
  
  Evolution_Details.belongsTo(Items, {
    foreignKey : "item_id", 
    as : "item"
  });

  Items.hasMany(Evolution_Details, { 
    foreignKey: 'item_id' 
  });
  
  Evolution_Details.belongsTo(Items , {
    foreignKey : "heldItems_id" ,
     as : "heldItem"
  });

  Items.hasMany(Evolution_Details , {
    foreignKey : "heldItems_id"
  })
  
  Evolution_Details.belongsTo(Genders, {
    foreignKey : "gender_id" 
  });

  Genders.hasMany(Encounter_Details, {
    foreignKey : "gender_id"
  })
  
  Evolution_Details.belongsTo(Moves, {
    foreignKey : "know_moves_id" , 
    as : "Know_Move"
  })

  Moves.hasMany(Evolution_Details, {
    foreignKey : "know_moves_id"
  })
  
  Evolution_Details.belongsTo(Types , {
    foreignKey : "known_move_type_id" ,
     as : "Know_move_type"
    })

  Types.hasMany(Evolution_Details, {
    foreignKey : "known_move_type_id",
     as : "Know_move_type"
    })
  
  Evolution_Details.belongsTo(Types , {
    foreignKey : "party_type_id" ,
     as : "PartyType"
    })

  //?Un tipo específico que debe estar presente en el equipo para que ocurra la evolución
  Types.hasMany(Evolution_Details , {
    foreignKey : "party_type_id" ,
     as : "PartyType"
    })
  
  Evolution_Details.belongsTo(Locations, {
    foreignKey : "location_id",
     as : "location"
    })
  Locations.hasMany(Encounter_Details, {
    foreignKey : "location_id"
  })
  
  Evolution_Details.belongsTo(Triggers, {
    foreignKey : "triggers_id" ,
     as : "trigger"
    })
  Triggers.hasMany(Evolution_Details , {
    foreignKey : "triggers_id"
  })
  
  Evolution_Details.belongsTo(Species , {
    foreignKey : "party_species_id" ,
     as : "party_species"
    })
  //*Una especie específica que debe estar en el equipo para que ocurra la evolución.
  Species.hasMany(Evolution_Details, {
    foreignKey : "party_species_id"
  })
  
  Evolution_Details.belongsTo(Species , {
    foreignKey : "trade_species_id" ,
     as : "Trade_Species"
    })
  //*La especie con la que se debe intercambiar para que ocurra la evolución.
  Species.hasMany(Encounter_Details , {
    foreignKey : "trade_species_id" , 
    as : "Trade_Species"
  })
  
  Evolutions.hasMany(Evolution_Details, {
     foreignKey: 'evolution_id' 
    });

  Evolution_Details.belongsTo(Evolutions, {
     foreignKey: 'evolution_id' 
    });
      
  //?___________________________________________________________________________________________________
  
  Species.belongsTo(Generations , {
    foreignKey : "generations_id" , 
    as : "Generation"
  })

  Generations.hasMany(Species ,  {
    foreignKey : "generations_id" ,
     as : "Generation"
    })
  
  GrowthRates.hasMany(LevelExperiences, {
    foreignKey : "levels_experiences_id" ,
     as : "levels"
    })

  LevelExperiences.belongsTo(GrowthRates, {
    foreignKey : "levels_experiences_id" ,
     as : "levels"
    })
  
  Species.belongsTo(GrowthRates , {
    foreignKey : "growth_rate_id" ,
     as : "growth_rate"
    })

  GrowthRates.hasMany(Species, {
    foreignKey : "growth_rate_id" ,
     as : "growth_rate"
    })
  
  Species.belongsTo(Habitad , {
    foreignKey : "habitad_id" ,
     as : "Habitad"
    })
  Habitad.hasMany(Species, {
    foreignKey : "habitad_id"
  })
  
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
  
  Varieties.belongsTo(Pokemon ,  { 
    foreignKey: 'pokemon_id' 
  })

  Pokemon.hasOne(Varieties,  { 
    foreignKey: 'pokemon_id' 
  })
  
  Species.hasMany(Varieties , {
    foreignKey : "species_id",
     as : "varieties"
    })

  Varieties.belongsTo(Species , {
    foreignKey : "species_id"
  });

  Species.belongsToMany(Lengueage , {
    through : Descriptions,
    foreignKey : "species_id",
    otherKey : "langueage_id",
    as : "form_descriptions"
  });
  
  Lengueage.belongsToMany(Species , {
    through : Descriptions,
    foreignKey : "langueage_id",
    otherKey : "species_id",
  });

  Species.belongsToMany(Versions , {
    through : Flavor_text_entries,
    foreignKey : "species_id",
    otherKey : "version_id",
    as : "flavor_entries"
  });

  Flavor_text_entries.belongsTo(Lengueage ,{foreignKey : "langueage_id"});

//?_________________________________________________________________________________________________________
//?----------------------------------------------------------------------------------------------------------

//?___________________________-Natures-______________________________________________________________________

Natures.belongsToMany(Move_Battle_Style , {
  through : Move_Battle_Preferences,
  foreignKey : "natures_id",
  otherKey : "move_battle_style_id",
  as : "Move_battle_preferences"
});

Move_Battle_Style.belongsToMany(Natures, {
  through  : Move_Battle_Preferences,
  foreignKey : "move_battle_style_id",
  otherKey : "natures_id",
  as : "Natures Preferences"
});

Natures.belongsToMany(Pokeathlon_Stats , {
  through : Pokeathlon_Stats_Changes,
  foreignKey : "natures_id",
  otherKey : "pokeathlon_stats_id",
  as : "Pokeathlon_stats_changes"
});

Pokeathlon_Stats.belongsToMany(Natures , {
  through : Pokeathlon_Stats_Changes,
  foreignKey : "pokeathlon_stats_id",
  otherKey : "natures_id",
  as : "Natures affected"
});

Natures.belongsTo(Flavors , {
  foreignKey : "likes_flavor_id",
  as : "likes_flavors"
});

Flavors.hasMany(Natures, {
  foreignKey: "likes_flavor_id",
  as: "liked_by_natures",
});

Natures.belongsTo(Flavors , {
  foreignKey : "hates_flavors_id",
  as : "hates_flavors"
});

Flavors.hasMany(Natures, {
  foreignKey: "hates_flavors_id",
  as: "hated_by_natures",
});

Natures.belongsTo(Stats , {
  foreignKey : "increased_stats_id",
  as : "Increased_stats"
});

Natures.belongsTo(Stats , {
  foreignKey : "decreased_stats_id",
  as : "Decreased_stats"
});

Natures.belongsToMany(Lengueage , {
  through : Names,
  foreignKey : "natures_id",
  otherKey : "lengueage_id",
  as : "names"
});

Lengueage.belongsToMany(Natures, {
  through : Names,
  foreignKey : "lengueage_id",
  otherKey : "natures_id",
  as : "traducc_natures"
});

//?______________________________- Berries -_________________________________________________________________

Berries.belongsTo(Types , {
  foreignKey : "type_id",
  as : "natural_gift_type"
});

Types.hasOne(Berries , {
  foreignKey : "type_id",
  as : "natural_gift_berries"
});

Berries.belongsTo(Items , {
  foreignKey : "items_id",
  as : "item_name"
});

Items.hasOne(Berries, {
  foreignKey : "items_id",
  as : "Berries"
});

Flavors.belongsTo(Contest_Type , {
  foreignKey : "contest_type_id"
});

Contest_Type.hasMany(Flavors , {
  foreignKey : "contest_type_id",
  as : "berries"
});

Berries.belongsToMany(Flavors , {
  through : Flavors_Join_Table,
  foreignKey : "berries_id",
  otherKey : "flavors_id",
  as : "Flavors"
});

Flavors.belongsToMany(Berries , {
  through : Flavors_Join_Table,
  foreignKey : "flavors_id",
  otherKey : "berries_id",
  as : "berries"
});

Berries.belongsTo(Firmness , {
  foreignKey : "firmness_id",
  as : "Firmness"
});

Firmness.hasMany(Berries , {
  foreignKey : "firmness_id",
  as : "Berries"
});

//?___________________________________IVs___________________________________________________________________

Characteristics_IVs.belongsTo(Stats , {
  foreignKey : "stats_id",
  as : "highest_stats"
});



Characteristics_IVs.belongsToMany(Lengueage , {
  through : Descriptions,
  foreignKey : "characteristics_id",
  otherKey : "lengueage_id",
  as : "descriptions"
});

Lengueage.belongsToMany(Characteristics_IVs , {
  through : Descriptions,
  foreignKey : "lengueage_id",
  otherKey : "characteristics_id",
  as : "Characteristics_IVs"
});


//?____________________________________-Stats-____________________________________________________________


  Stats.belongsToMany(Moves, {
    through : Move_Stats_Change,
    foreignKey : "moves_id",
    otherKey : "stats_id",
    as : "Moves_effects"
  });
  
  Stats.hasMany(Natures , {
    foreignKey : "increased_stats_id",
    as : "increased_natures",
  });

  Stats.hasMany(Natures , {
    foreignKey : "decreased_stats_id",
    as : "decreased_natures"
  });

  Stats.hasMany(Characteristics_IVs , {
  foreignKey : "stats_id",
  as : "characteristics"
});


Stats.belongsToMany(Lengueage , {
  through : Names,
  foreignKey : "stats_id",
  otherKey : "lengueage_id",
});

Lengueage.belongsToMany(Stats, {
  through : Names,
  foreignKey : "lengueage_id",
  otherKey : "stats_id"
})
//?_____________________________________-Game-___________________________________________________________

  Version_Details.belongsTo(Versions, { 
    foreignKey: 'version_id'
   });
  Versions.hasMany(Version_Details, {
     foreignKey: 'version_id' 
    });

  Version_Group_Details.belongsTo(Version_Groups, { 
    foreignKey: 'version_group_id' 
  });

  Version_Groups.hasMany(Version_Group_Details, {
     foreignKey: 'version_group_id' 
    });

  Version_Groups.hasMany(Versions, {
    foreignKey : "version_id",
    as : "versions"
  });

  Versions.belongsTo(Version_Groups , {
    foreignKey : "versions_id",
    as : "version_group"
  });

  Version_Groups.hasMany(Move_Method, {
    foreignKey : "move_method_id",
    as : "move_learn_method"
  });

  Version_Groups.belongsTo(Generations, {
    foreignKey : "generations_id"
  });

  Generations.hasMany(Version_Groups, {
    foreignKey : "generations_id",
  });

  Version_Groups.hasMany(Pokedexes, {
    foreignKey : "pokedexes_id"
  });


  Move_Method.belongsTo(Version_Groups, {
    foreignKey : "move_method_id",
    as : "version_group"
  });

  Flavor_text_entries.belongsTo(Version_Groups , {
    foreignKey : "version_group_id",
    as : "version_group"
  });

  Version_Groups.hasMany(Flavor_text_entries , {
    foreignKey : "version_group_id"
  });

  Regions.hasMany(Pokedexes, {
    foreignKey : "region_id",
    as : "pokedexes"
  });

  Pokedexes.belongsTo(Regions , {
    foreignKey : "region_id",
    as : "regions"
  });

  Regions.belongsTo(Generations, {
    foreignKey : "generation_id",
    as : "main_generation"
  });

  Generations.hasOne(Regions , {
    foreignKey : "generation_id"
  });

  Regions.hasMany(Version_Groups , {
    foreignKey : "version_group_id",
    as : "version_groups"
  });

  Version_Groups.belongsTo(Regions, {
    foreignKey : "version_groups_id",
    as : "region"
  });

  Generations.hasMany(Types, {
    foreignKey  : "types_id",
    as : "types_created"
  });

 
  Generations.hasMany(Version_Groups, {
    foreignKey : "versions_group_id",
    as : "version_group"
  });

  Version_Groups.belongsTo(Generations, {
    foreignKey : "versions_group_id",
    as : "generations"
  });

  Pokedexes.belongsToMany(Lengueage, {
    through : Descriptions, 
    foreignKey : "pokedexes_id",
    otherKey : "lengueage_id",
    as : "descriptions_trad"
  });

  Lengueage.belongsToMany(Pokedexes, {
    through : Descriptions,
    foreignKey : "lengueage_id",
    otherKey: "pokedexes_id",
    as : "pokedexes_desc"
  });

  Pokedexes.belongsToMany(Lengueage, {
    through : Names,
    foreignKey : "pokedexes_id",
    otherKey : "lengueage_id",
    as : "names_traducc"
  });

  Lengueage.belongsToMany(Pokedexes, {
    through : Names,
    foreignKey : "lengueage_id",
    otherKey : "pokedexes_id",
    as : "pokedexes_trad"
  });

  Encounter_Method_Rate.belongsTo(Version_Details, {
    foreignKey : "version_details_id"
  });

  Version_Details.hasMany(Encounter_Method_Rate, {
    foreignKey : "version_details_id"
  });



//"✅" TERMINAR relaciones de Moves
//"✅" Terminar relaciones de Items 
//"✅" Crear relaciones de Berries, Contest, CARPETA Loactions en general , abilitites , nature

  
  //! CREAR TABLA Usuarios
  

};

