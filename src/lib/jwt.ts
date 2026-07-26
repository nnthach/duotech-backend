import jwt, { type SignOptions } from 'jsonwebtoken';

import { env } from '@/config/env.js';
import { UnauthorizedError } from '@/lib/errors.js';

export interface AccessTokenPayload {
  userId: number;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch {
    throw new UnauthorizedError('Token không hợp lệ hoặc đã hết hạn');
  }

  if (typeof decoded === 'string' || typeof decoded.userId !== 'number') {
    throw new UnauthorizedError('Token không hợp lệ hoặc đã hết hạn');
  }
  return { userId: decoded.userId };
}
