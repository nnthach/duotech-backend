import { defineConfig } from 'drizzle-kit';

import { env } from './src/config/env.js';

// định nghĩa cho drizzle-kit
export default defineConfig({
  schema: './src/database/schema/index.ts', // đọc các schema
  out: './src/database/migrations', // sinh ra file migrations
  dialect: 'postgresql',
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
  },
});
