const axios = require("axios")
require("dotenv").config();

const {BASEURL} = process.env;

const searchPokemons = async (req,res) => {

    try {
        const {data} = await axios.get(`${BASEURL}pokemon?limit=1304&offset=0`)
        let lenghtMax = 0;
        

        if(data) {
            console.log(data);
            
            data.results.forEach((ele) => {
                console.log(lenghtMax);

                if(ele.name.length > lenghtMax) {
                    lenghtMax = ele.name.length
                };
                return lenghtMax
            })
            
        }
        return res.status(200).json(lenghtMax);
    } catch (error) {
        return res.status(500).json({
            message : "something wrong with the server",
             error : error.message})
        
    }

};

module.exports = searchPokemons; 