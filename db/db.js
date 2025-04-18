const {Sequelize} = require("sequelize");
require("dotenv").config();
const loadModels = require("./models.js")
const loadRelations = require("./relations.js")
const {PG_USERNAME , PG_PASSWORD,NODE_ENV, DB_NAME, DB_PORT} = process.env;


const sequelize = new Sequelize(
  `postgres://${PG_USERNAME}:${PG_PASSWORD}@${NODE_ENV}:${DB_PORT}/${DB_NAME}`,{
    logging: false
    , 
  });
  
  
  loadModels(sequelize)     //? Models loads from Models directory
  loadRelations(sequelize)  //? Relations loads 
 

module.exports = {
    sequelize,
    ...sequelize.models
}