/**
 * Infinity Code - Drizzle ORM Configuration
 * Configuration for database migrations and schema management
 */

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/infinity_code',
  },
  verbose: true,
  strict: true,
});