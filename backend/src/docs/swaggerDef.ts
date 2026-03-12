import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJSDoc from 'swagger-jsdoc';
import packageJson from '../../package.json' with { type: 'json' };
import { PORT } from '../common/constants.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routerPath = join(__dirname, 'components/paths/*.yaml');
const schemaPath = join(__dirname, 'components/schemas/*.yaml');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My News API',
      version: packageJson.version,
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

export default swaggerSpec;
