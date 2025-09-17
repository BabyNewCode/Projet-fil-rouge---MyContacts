const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyContacts API',
      version: '1.0.0',
      description: 'API pour gérer les utilisateurs et leurs contacts',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Serveur local',
      },
    ],
  },
  apis: [__dirname + '/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
