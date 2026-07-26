import { Router } from 'express';

import { login, refresh, register } from '@/controllers/auth.controller.js';
import { asyncHandler } from '@/lib/async-handler.js';

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

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Đăng ký user mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userEmail, userName, userPassword]
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: user@example.com
 *               userName:
 *                 type: string
 *                 example: Nguyen Van A
 *               userPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Đăng ký thành công.
 *       400:
 *         description: Dữ liệu không hợp lệ.
 *       409:
 *         description: Email đã được sử dụng.
 */
authRouter.post('/register', asyncHandler(register));

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Đăng nhập, trả về access token + refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userEmail, userPassword]
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: user@example.com
 *               userPassword:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Đăng nhập thành công.
 *       400:
 *         description: Dữ liệu không hợp lệ.
 *       401:
 *         description: Email hoặc mật khẩu không đúng.
 */
authRouter.post('/login', asyncHandler(login));

/**
 * @openapi
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Cấp lại access token + refresh token mới (rotate)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access token + refresh token mới.
 *       400:
 *         description: Dữ liệu không hợp lệ.
 *       401:
 *         description: Refresh token không hợp lệ, đã hết hạn, hoặc đã bị thay bằng token mới hơn.
 */
authRouter.post('/refresh-token', asyncHandler(refresh));
