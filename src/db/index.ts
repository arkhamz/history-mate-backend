//CONNECT TO DRIZZLE
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schema';

config({ path: '.env' }); // or .env.local

// export const db = drizzle({ client });
// const db = drizzle(process.env.DATABASE_URL!);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool, { schema });
