import bcrypt from 'bcryptjs';

import { UnauthorizedError } from '@/lib/errors.js';
import { signAccessToken } from '@/lib/jwt.js';
import { userRepository } from '@/repositories/user.repository.js';
import { toPublicUser, userService, type PublicUser } from '@/services/user.service.js';
import type { LoginInput, RegisterInput } from '@/validations/auth.validation.js';

export interface LoginResult {
  user: PublicUser;
  accessToken: string;
}

export const authService = {
  async register(input: RegisterInput): Promise<PublicUser> {
    return userService.create(input);
  },

  async login(input: LoginInput): Promise<LoginResult> {
    const user = await userRepository.findByEmail(input.userEmail);
    if (!user || user.userDeletedAt) throw new UnauthorizedError();

    const isMatch = await bcrypt.compare(input.userPassword, user.userPassword);
    if (!isMatch) throw new UnauthorizedError();

    const publicUser = toPublicUser(user);
    const accessToken = signAccessToken({ userId: publicUser.userId });
    return { user: publicUser, accessToken };
  },
};
