import { Router } from 'express';

import { getUsers } from '@/controllers/user.controller.js';
import { asyncHandler } from '@/lib/async-handler.js';

export const userRouter = Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Lấy danh sách user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: get user ok
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
userRouter.get('/', asyncHandler(getUsers));
