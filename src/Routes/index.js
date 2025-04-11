const {Router} = require("express");
const getPokemon = require("../Controllers/Pokemon/GetPokemons");
const searchPokemons = require("../Controllers/Pokemon/SearchPokemon");
const Get_and_create_pokemons = require("../../scripts/Save_Main_Tables/save_pokemon.js")


const router = Router();

/* router.get ("/pokemon", async (req,res) => {
  try {
    const pokemons = await Get_and_create_pokemons()
    return res.status(200).json(pokemons);
  } catch (error) {
    return res.status(500).json({"error" : error })
  } 
}); */

router.get("/search" , searchPokemons)
    

module.exports = router;