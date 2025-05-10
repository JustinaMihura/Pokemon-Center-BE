const {Sequelize} = require("sequelize");
require("dotenv").config();
const loadModels = require("./models.js")
const loadRelations = require("./relations.js")
const {PG_USERNAME , PG_PASSWORD,PG_HOST, DB_NAME, DB_PORT} = process.env;


//-------- Pokedex DB -------------//

const sequelize = new Sequelize(
  `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${DB_PORT}/${DB_NAME}`,{
    logging: false
    , 
  });
  
  loadModels(sequelize)     //? Models loads from Models directory
  loadRelations(sequelize)  //? Relations loads 
 
//---------------------------------//


module.exports = {
    sequelize,
    ...sequelize.models
}