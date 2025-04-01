const axios = require("axios");
require("dotenv").config();

const {BASEURL} = process.env



const getPokemons = async (req,res) => {

    try {
        
        const {data} = await axios.get(`${BASEURL}pokemon?limit=10&offset=0`);
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

//* Calcular RARITY para poner en el cliente 
//! const heldItems = [
//!  { name: 'Poison Barb', rarity: 5 },
  //!{ name: 'Quick Claw', rarity: 2 },
//!];
//!
//! Paso 1: Calcular la suma total de rarezas
//!const totalRarity = heldItems.reduce((sum, item) => sum + item.rarity, 0);

//! Paso 2: Calcular el porcentaje para cada objeto
//!const percentages = heldItems.map(item => ({
  //!name: item.name,
  //!percentage: ((item.rarity / totalRarity) * 100).toFixed(2), // Redondear a 2 decimales
//!}));


module.exports =
    getPokemons
