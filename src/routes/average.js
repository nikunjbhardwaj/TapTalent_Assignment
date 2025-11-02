import express from 'express';
import { getQuotesByCurrency } from './quotes.js';
import { calculateAverages } from '../services/calculations.js';

const router = express.Router();

// Route 3 - GET /average/ars - Returns average of ARS quotes
router.get('/ars', async (req, res) => {
  try {
    const quotes = await getQuotesByCurrency('ARS');
    const averages = calculateAverages(quotes);

    res.json({
      average_buy_price: parseFloat(averages.average_buy_price.toFixed(4)),
      average_sell_price: parseFloat(averages.average_sell_price.toFixed(4))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate ARS averages',
      details: error.message
    });
  }
});

// Route 4 - GET /average/brl - Returns average of BRL quotes
router.get('/brl', async (req, res) => {
  try {
    const quotes = await getQuotesByCurrency('BRL');
    const averages = calculateAverages(quotes);

    res.json({
      average_buy_price: parseFloat(averages.average_buy_price.toFixed(4)),
      average_sell_price: parseFloat(averages.average_sell_price.toFixed(4))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate BRL averages',
      details: error.message
    });
  }
});

export default router;