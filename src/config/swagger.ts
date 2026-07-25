import swaggerJsdoc from 'swagger-jsdoc';

import { SERVICE_NAME } from './constants.js';
import { env } from './env.js';

const isTs = import.meta.url.endsWith('.ts');

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: SERVICE_NAME,
      version: '0.1.0',
      description: 'API docs for user-authenticate service',
    },
    servers: [{ url: `http://localhost:${env.PORT}` }],
  },
  apis: isTs ? ['src/routes/**/*.route.ts'] : ['dist/routes/**/*.route.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
