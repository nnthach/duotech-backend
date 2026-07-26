import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '@/controllers/user.controller.js';
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

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin user.
 *       404:
 *         description: Không tìm thấy user.
 */
userRouter.get('/:id', asyncHandler(getUserById));

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Tạo user mới
 *     tags: [Users]
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
 *         description: User vừa tạo.
 *       409:
 *         description: Email đã được sử dụng.
 */
userRouter.post('/', asyncHandler(createUser));

/**
 * @openapi
 * /api/v1/users/{id}:
 *   put:
 *     summary: Cập nhật user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               userPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: User sau khi cập nhật.
 *       404:
 *         description: Không tìm thấy user.
 */
userRouter.put('/:id', asyncHandler(updateUser));

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Xoá user (soft delete)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Xoá thành công.
 *       404:
 *         description: Không tìm thấy user.
 */
userRouter.delete('/:id', asyncHandler(deleteUser));
