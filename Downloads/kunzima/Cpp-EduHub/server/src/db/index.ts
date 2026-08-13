/**
 * Infinity Code - Database Connection
 * PostgreSQL connection using Drizzle ORM
 * Gracefully handles connection failures so the server can start without a database
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index.js';
import { env } from '../config/env.js';

// Track database connection status
let dbConnected = false;

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: env.NODE_ENV === 'production' ? 20 : 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Handle pool errors (prevents unhandled rejections)
pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err.message);
});

// Create Drizzle ORM instance
export const db = drizzle(pool, { schema });

// Test connection
export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    dbConnected = true;
    console.log('✅ Database connected successfully');
    return true;
  } catch (error: any) {
    dbConnected = false;
    console.error('❌ Database connection failed:', error.message);
    console.error('   The server will start, but database operations will fail.');
    console.error('   To fix this:');
    console.error('   1. Install PostgreSQL');
    console.error('   2. Create a database named "infinity_code"');
    console.error('   3. Update DATABASE_URL in server/.env');
    console.error('   4. Run: npm run db:push (to create tables)');
    return false;
  }
}

// Check if database is connected
export function isDbConnected(): boolean {
  return dbConnected;
}

// Close connection
export async function closeConnection(): Promise<void> {
  try {
    await pool.end();
    console.log('Database connection closed');
  } catch {
    // Ignore errors on close
  }
}

export default db;