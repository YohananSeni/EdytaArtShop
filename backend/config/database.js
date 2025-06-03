import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Pool } = pg;

// Create a new pool instance using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/artshop',
});

// Setup database and create tables if they don't exist
export const setupDatabase = async () => {
  try {
    const schemaSQL = fs.readFileSync(path.join(__dirname, '../../database/schema.sql'), 'utf8');
    await pool.query(schemaSQL);
    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

// Export the pool for use in other files
export default pool;