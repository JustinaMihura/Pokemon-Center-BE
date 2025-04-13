const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Species" , {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING(30),
            allowNull : false
            
        },
        is_baby : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        },
        is_legendary : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        },
        is_mythical : {
            type : DataTypes.BOOLEAN, 
            allowNull : true
        },
        base_happiness : {
            type : DataTypes.INTEGER,
            allowNull : true
        
        }, 
        hatch_counter : {
            //Número de ciclos necesarios para eclosionar un huevo
            type : DataTypes.INTEGER,
            allowNull : true
        },
        capture_rate : {
            //Probabilidad de captura del Pokémon.
            type : DataTypes.INTEGER,
            allowNull : true
        },
      
        forms_switchable : {
            //?Pueden cambiar durante el juego.
            type : DataTypes.BOOLEAN,
            allowNull : true
        },
        gender_rate : {
            //? del 0 al 8. 0 (sin genero y 8 (50% hembra/macho)) // 1 mas prob de ser macho
                                                                  //? 7 mas prob de ser hembra 
            type : DataTypes.INTEGER,
            allowNull : true
        }, 
       
        has_gender_differences : {
            type : DataTypes.BOOLEAN,
            allowNull : true
        },



        //"✅"varieties.id = tabla intermedia = 
                            //* pokemon.id + is_default 
        //"✅"pokedex_number.id = tabla intermedia = 
                                //* pokedex.id + entry_number
        //"✅"shape.id
        //"✅"color.id
        //"✅"egg_gropus.id = tabla intermedia egggropu.id + poke.id
        //"✅"evolution_chain.id
        //"✅"generation.id
        //"✅"growth_rate.id
        //"✅"habitad.id
        //"✅"pal_park_encounters = tabla intermedia = 
                                    // palparkarea.id + rate + base_score
},
{timestamps : false}
)
};