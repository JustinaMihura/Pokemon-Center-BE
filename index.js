const express = require("express")
const server = express();
const routes = require("./src/Routes/index.js");



const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

server.name = "api";
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pokemon-center-three.vercel.app/'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use("/" , routes)

server.listen(3001, "localhost", () => {
    console.log(server.name + "is listening in 3001");
});
    
