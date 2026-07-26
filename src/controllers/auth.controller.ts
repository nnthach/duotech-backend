import { type Request, type Response } from 'express';

import { authService } from '@/services/auth.service.js';
import { LoginSchema, RefreshTokenSchema, RegisterSchema } from '@/validations/auth.validation.js';

export async function register(req: Request, res: Response): Promise<void> {
  const input = RegisterSchema.parse(req.body);
  const user = await authService.register(input);
  res.status(201).json({ message: 'Đăng ký thành công', data: user });
}

export async function login(req: Request, res: Response): Promise<void> {
  const input = LoginSchema.parse(req.body);
  const result = await authService.login(input);
  res.status(200).json({ message: 'Đăng nhập thành công', data: result });
}

export async function refresh(req: Request, res: Response): Promise<void> {
  const { refreshToken } = RefreshTokenSchema.parse(req.body);
  const result = await authService.refreshAccessToken(refreshToken);
  res.status(200).json({ message: 'Làm mới token thành công', data: result });
}
