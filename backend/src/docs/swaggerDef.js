const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const { PORT } = require('../common/constants');
const { version } = require('../../package.json');

const routerPath = path.join(__dirname, 'components/paths/*.yaml');
const schemaPath = path.join(__dirname, 'components/schemas/*.yaml');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My News API',
      version,
      description: 'API documentation for My News',
    },
    servers: [
      {
        url: process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [routerPath, schemaPath],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
