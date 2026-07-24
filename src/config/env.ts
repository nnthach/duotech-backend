import { z } from 'zod';

// Validate biến môi trường MỘT LẦN khi khởi động. Sai/thiếu -> fail ngay,
// không phải lúc runtime giữa production.
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),

  // Thêm secret tại đây, ví dụ:
  // DATABASE_URL: z.string().url(),
});

export const env = EnvSchema.parse(process.env);
