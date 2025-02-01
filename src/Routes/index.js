const {Router} = require("express");
const getPokemon = require("../Controllers/GetPokemons")



const router = Router();

router.get ("/pokemon", getPokemon)
    

module.exports = router;