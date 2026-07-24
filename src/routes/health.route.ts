import { Router } from 'express';

export const healthRouter = Router();

// Health check — dùng cho CI/CD blue-green deploy.
healthRouter.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});
