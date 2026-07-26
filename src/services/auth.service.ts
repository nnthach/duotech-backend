import bcrypt from 'bcryptjs';

import type { User } from '@/database/schema/index.js';
import { UnauthorizedError } from '@/lib/errors.js';
import { hashToken, signAccessToken, signRefreshToken, verifyAccessToken } from '@/lib/jwt.js';
import { userRepository } from '@/repositories/user.repository.js';
import { toPublicUser, userService, type PublicUser } from '@/services/user.service.js';
import type { LoginInput, RegisterInput } from '@/validations/auth.validation.js';

export interface LoginResult {
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResult {
  accessToken: string;
  refreshToken: string;
}

async function issueTokens(
  userId: number,
): Promise<{ user: User; accessToken: string; refreshToken: string }> {
  const refreshToken = signRefreshToken({ userId });
  const updated = await userRepository.update(userId, {
    userRefreshToken: hashToken(refreshToken),
  });
  const accessToken = signAccessToken({ userId });
  return { user: updated!, accessToken, refreshToken };
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

    const { user: updated, accessToken, refreshToken } = await issueTokens(user.userId);
    return { user: toPublicUser(updated), accessToken, refreshToken };
  },

  async refreshAccessToken(refreshToken: string): Promise<RefreshResult> {
    // Refresh token cũng là JWT ký cùng secret với access token nên verifyAccessToken
    // dùng chung được — việc chặn dùng nhầm access token do bước so hash DB dưới đây đảm nhiệm.
    const { userId } = verifyAccessToken(refreshToken);

    const user = await userRepository.findById(userId);
    if (!user?.userRefreshToken) throw new UnauthorizedError();

    const isMatch = hashToken(refreshToken) === user.userRefreshToken;
    if (!isMatch) throw new UnauthorizedError();

    const result = await issueTokens(userId);
    return { accessToken: result.accessToken, refreshToken: result.refreshToken };
  },
};
