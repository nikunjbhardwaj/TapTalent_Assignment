import { pool } from '../config/database.js';

export async function getCachedQuote(sourceUrl) {
  try {
    const result = await pool.query(`
      SELECT * FROM quotes 
      WHERE source_url = $1 
      AND retrieved_at > NOW() - INTERVAL '60 seconds'
      ORDER BY retrieved_at DESC 
      LIMIT 1
    `, [sourceUrl]);
    
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Cache check error:', error);
    return null;
  }
}

export async function storeQuote(quoteData) {
  try {
    const { source_url, buy_price, sell_price, currency, data_quality, quote_timestamp, error_message } = quoteData;
    
    await pool.query(`
      INSERT INTO quotes (source_url, buy_price, sell_price, currency, data_quality, quote_timestamp, error_message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [source_url, buy_price, sell_price, currency, data_quality, quote_timestamp, error_message]);
    
    return true;
  } catch (error) {
    console.error('Store quote error:', error);
    return false;
  }
}