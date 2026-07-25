import { Router } from 'express';

export const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Dùng cho CI/CD blue-green deploy.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service đang chạy bình thường.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
healthRouter.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});
