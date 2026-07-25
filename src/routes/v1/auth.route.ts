import { Router } from 'express';

export const authRouter = Router();

/**
 * @openapi
 * /api/v1/auth:
 *   get:
 *     summary: Auth health check
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Auth module đang chạy bình thường.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok auth
 */
authRouter.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok auth' });
});
