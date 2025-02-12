const {Router} = require("express");
const getPokemon = require("../Controllers/GetPokemons");
const searchPokemons = require("../Controllers/SearchPokemon");



const router = Router();

router.get ("/pokemon", getPokemon)
router.get("/search" , searchPokemons)
    

module.exports = router;