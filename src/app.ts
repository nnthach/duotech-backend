import express, { type Express } from 'express';

import { errorHandler } from './middlewares/error-handler.js';
import { notFound } from './middlewares/not-found.js';
import { healthRouter } from './routes/health.route.js';
import { v1Router } from './routes/v1/index.js';

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  // Routes
  app.use('/health', healthRouter);
  app.use('/api/v1', v1Router);

  // 404 + error handler (đặt CUỐI cùng)
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
