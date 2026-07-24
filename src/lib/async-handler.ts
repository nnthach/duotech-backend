import { type NextFunction, type Request, type RequestHandler, type Response } from 'express';

// Bọc async controller → tự forward lỗi về error handler tập trung.
// Handler ngoài trả về void (đúng kiểu Express), .catch(next) lo phần reject.
// Nhờ vậy controller không cần try/catch nữa.
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
