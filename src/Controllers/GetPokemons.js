const axios = require("axios");
const baseUrl = require("./baseUrl");


const getPokemons = async (req,res) => {

    try {
        
        const {data} = await axios.get(`${baseUrl}/pokemon?limit=10&offset=0`);
       const dato = await Promise.all(data.results.map( async element => await axios(element.url)));
       
       const finalResult = dato && dato.map((ele, ind) => {
           
           return {

               name : ele.data.name,
               id : ele.data.id,
               key : ind,
                img : ele.data.sprites["front_default"], 
                type : ele.data.types[0].type.name,
               type2 : ele.data.types[1]?.type.name 
               

           }
       });


            
           return res.status(200).json(finalResult);
   

   } catch (error) {
       
       return res.status(500).json({
           message : "something wrong with the server",
            error : error.message})
   }
};

module.exports =
    getPokemons
