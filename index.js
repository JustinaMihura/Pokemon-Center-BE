const express = require("express");
const server = express();
const routes = require("./src/Routes/index.js");
require("dotenv").config();
const {sequelize }= require("./db.js")

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { types } = require("pg");

server.name = "api";
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Configurar CORS para permitir múltiples orígenes
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  
  next();
});
server.use("/" , routes);



sequelize.sync({force:"true"})
.then(() => {

  server.listen(process.env.PORT, process.env.NODE_ENV , () => {
  console.log(server.name + " is listening on port " + (process.env.PORT));
})
})
.catch(err => {
  console.log({"error" :  err});
});
