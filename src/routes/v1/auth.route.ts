import { Router } from 'express';

export const authRouter = Router();

// Health check — dùng cho CI/CD blue-green deploy.
authRouter.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok auth' });
});
