const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'VIAGEM - 365',
    description: 'Projeto final - Módulo 01 - FuturoDev/TRIP',
    version:"1.0.0"
  },
  host: 'localhost:3000',
};

const outputFile = './src/routes/swagger.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);