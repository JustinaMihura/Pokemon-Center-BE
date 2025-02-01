const express = require("express");
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

// Configurar CORS para permitir múltiples orígenes
server.use((req, res, next) => {
  const allowedOrigins = [
    'https://pokemon-center-three.vercel.app', // Producción
    'http://localhost:5173', // Desarrollo local
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin); // Permitir el origen de la solicitud
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  
  next();
});

server.use("/", routes);

server.listen(process.env.PORT || 3001, process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost', () => {
  console.log(server.name + " is listening on port " + (process.env.PORT || 3001));
});
