const express = require("express");
const server = express();
const routes = require("./src/Routes/index.js");
require("dotenv").config();
const {sequelize}= require("./db/db.js")
const {FRONTEND_URL} = process.env
const checkSaveMonthly = require("./scripts/crone_jobs.js")


const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

server.name = "api";
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  
  next();
});
server.use("/" , routes);

const initializeApp = async () => {

  try {

    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await checkSaveMonthly()

    server.listen(process.env.PORT, process.env.NODE_ENV , () => {
      console.log(server.name + " is listening on port " + (process.env.PORT));
    });

  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
  }
};

initializeApp();

