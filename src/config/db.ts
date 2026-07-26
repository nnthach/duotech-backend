import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { env } from './env.js';

const pool = new Pool({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
});

export const db = drizzle(pool);

export async function connectDatabase(): Promise<void> {
  await pool.query('SELECT 1');
}
