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
    
    // Check if we need to add sample data
    const result = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(result.rows[0].count) === 0) {
      const sampleDataSQL = fs.readFileSync(path.join(__dirname, '../../database/sample-data.sql'), 'utf8');
      await pool.query(sampleDataSQL);
      console.log('Sample data added to database');
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

// Export the pool for use in other files
export default pool;