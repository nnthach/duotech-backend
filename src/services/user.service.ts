import bcrypt from 'bcryptjs';

import { PASSWORD_SALT_ROUNDS } from '@/config/constants.js';
import type { NewUser, User } from '@/database/schema/index.js';
import { ConflictError, NotFoundError } from '@/lib/errors.js';
import { userRepository } from '@/repositories/user.repository.js';
import type { CreateUserInput, UpdateUserInput } from '@/validations/user.validation.js';

export type PublicUser = Omit<User, 'userPassword' | 'userRefreshToken'>;

export function toPublicUser(user: User): PublicUser {
  const { userPassword: _userPassword, userRefreshToken: _userRefreshToken, ...publicUser } = user;
  return publicUser;
}

export const userService = {
  async list(): Promise<PublicUser[]> {
    const users = await userRepository.findAll();
    return users.map(toPublicUser);
  },

  async getById(id: number): Promise<PublicUser> {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError('Không tìm thấy user');
    return toPublicUser(user);
  },

  async create(input: CreateUserInput): Promise<PublicUser> {
    const existing = await userRepository.findByEmail(input.userEmail);
    if (existing) throw new ConflictError('Email đã được sử dụng');

    const userPassword = await bcrypt.hash(input.userPassword, PASSWORD_SALT_ROUNDS);
    const created = await userRepository.create({
      userEmail: input.userEmail,
      userName: input.userName,
      userPassword,
    });
    return toPublicUser(created);
  },

  async update(id: number, input: UpdateUserInput): Promise<PublicUser> {
    const existing = await userRepository.findById(id);
    if (!existing) throw new NotFoundError('Không tìm thấy user');

    const patch: Partial<NewUser> = {
      ...(input.userName !== undefined ? { userName: input.userName } : {}),
    };
    if (input.userPassword !== undefined) {
      patch.userPassword = await bcrypt.hash(input.userPassword, PASSWORD_SALT_ROUNDS);
    }

    const updated = await userRepository.update(id, patch);
    return toPublicUser(updated!);
  },

  async remove(id: number): Promise<void> {
    const deleted = await userRepository.softDelete(id);
    if (!deleted) throw new NotFoundError('Không tìm thấy user');
  },
};
