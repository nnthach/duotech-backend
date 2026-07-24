import { Router } from 'express';

export const userRouter = Router();

// Health check — dùng cho CI/CD blue-green deploy.
userRouter.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok user' });
});
