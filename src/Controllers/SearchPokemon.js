const baseUrl = require("./baseUrl.js");
const axios = require("axios")

const searchPokemons = async () => {

    try {
        const {data} = await axios.get(`${baseUrl}`)
    } catch (error) {
        
    }

};

module.exports = searchPokemons; 