import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true  

});

export async function initializeDatabase() {
  try {

    const result = await pool.query('SELECT NOW() as time');
    console.log('Database connected successfully');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        source_url TEXT,
        buy_price DECIMAL,
        sell_price DECIMAL,
        currency TEXT,
        data_quality TEXT,
        quote_timestamp TIMESTAMP,
        retrieved_at TIMESTAMP DEFAULT NOW(),
        error_message TEXT
      )
    `);
    
    console.log('Quotes table ready');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
}