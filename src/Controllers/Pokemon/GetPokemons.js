const axios = require("axios");
const { where } = require("sequelize");
require("dotenv").config();

const {BASEURL} = process.env



const getPokemons = async (req,res) => {

    try {
    const db_call = await Pokemon.findAll({limit : 10})
      
           return res.status(200).json(db_call);
   

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
