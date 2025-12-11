import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'eldo',
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'postgres',
      max: 20, // 최대 연결 수
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}
