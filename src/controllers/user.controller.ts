import { type Request, type Response } from 'express';

import { userService } from '@/services/user.service.js';
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserIdParamSchema,
} from '@/validations/user.validation.js';

export async function getUsers(_req: Request, res: Response): Promise<void> {
  const users = await userService.list();
  res.status(200).json({ message: 'get user list success alo alo', data: users });
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = UserIdParamSchema.parse(req.params);
  const user = await userService.getById(id);
  res.status(200).json({ message: 'get user by id success', data: user });
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const input = CreateUserSchema.parse(req.body);
  const user = await userService.create(input);
  res.status(201).json({ message: 'create user success', data: user });
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const { id } = UserIdParamSchema.parse(req.params);
  const input = UpdateUserSchema.parse(req.body);
  const user = await userService.update(id, input);
  res.status(200).json({ message: 'update user success', data: user });
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { id } = UserIdParamSchema.parse(req.params);
  await userService.remove(id);
  res.status(204).send();
}
