import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import { env } from '@/config/env.js';
import { logger } from '@/lib/logger.js';

const pool = new Pool({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
});

const db = drizzle(pool);
// đưa migration vào database
await migrate(db, { migrationsFolder: './src/database/migrations' });
logger.info('Migration hoàn tất');

await pool.end();
