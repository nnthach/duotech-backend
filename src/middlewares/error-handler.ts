import { type NextFunction, type Request, type Response } from 'express';

import { logger } from '@/lib/logger.js';

// Error handler tập trung — mọi lỗi throw ra đều rơi vào đây.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error(err);
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(500).json({ error: message });
}
