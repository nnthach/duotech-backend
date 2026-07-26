import { type Request, type Response } from 'express';

import { userService } from '@/services/user.service.js';

export async function getUsers(_req: Request, res: Response): Promise<void> {
  const users = await userService.list();
  res.status(200).json({ message: 'get user alo ok', data: users });
}
