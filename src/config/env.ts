import { z } from 'zod';

// Validate biến môi trường MỘT LẦN khi khởi động. Sai/thiếu -> fail ngay,
// không phải lúc runtime giữa production.
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),

  // DATABASE_HOST khác nhau giữa local ('localhost') và trong Docker network ('db').
  DATABASE_HOST: z.string().default('localhost'),
  // Port Postgres lắng nghe TRONG container, luôn là 5432 — khác với POSTGRES_PORT
  // (port map ra host, chỉ dùng khi connect từ máy host).
  DATABASE_PORT: z.coerce.number().default(5432),

  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),

  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('1d'),
});

export const env = EnvSchema.parse(process.env);
