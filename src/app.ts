import express, { type Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { connectDatabase } from './config/db.js';
import { swaggerSpec } from './config/swagger.js';
import { logger } from './lib/logger.js';
import { errorHandler } from './middlewares/error-handler.js';
import { notFound } from './middlewares/not-found.js';
import { healthRouter } from './routes/health.route.js';
import { v1Router } from './routes/v1/index.js';

export async function createApp(): Promise<Express> {
  await connectDatabase();
  logger.info('Kết nối PostgreSQL thành công');

  const app = express();

  app.use(express.json());

  // Routes
  app.use('/health', healthRouter);
  app.use('/api/v1', v1Router);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req, res) => {
    res.json(swaggerSpec);
  });

  // 404 + error handler (đặt CUỐI cùng)
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
