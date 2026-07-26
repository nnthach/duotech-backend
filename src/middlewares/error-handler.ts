import { type NextFunction, type Request, type Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '@/lib/errors.js';
import { logger } from '@/lib/logger.js';

// Error handler tập trung — mọi lỗi throw ra đều rơi vào đây.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Dữ liệu không hợp lệ', details: err.flatten() });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  logger.error(err);
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(500).json({ error: message });
}
