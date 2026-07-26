import { Router } from 'express';

import { login, register } from '@/controllers/auth.controller.js';
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
