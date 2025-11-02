import express from 'express';
import { getQuotesByCurrency } from './quotes.js';
import { calculateAverages, calculateSlippage } from '../services/calculations.js';

const router = express.Router();

// Route 5 - GET /slippage/ars - Returns slippage percentages for ARS
router.get('/ars', async (req, res) => {
  try {
    const quotes = await getQuotesByCurrency('ARS');
    const averages = calculateAverages(quotes);
    const slippageData = calculateSlippage(quotes, averages);

    res.json(slippageData);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate ARS slippage',
      details: error.message
    });
  }
});

// Route-6 GET /slippage/brl - Returns slippage percentages for BRL
router.get('/brl', async (req, res) => {
  try {
    const quotes = await getQuotesByCurrency('BRL');
    const averages = calculateAverages(quotes);
    const slippageData = calculateSlippage(quotes, averages);

    res.json(slippageData);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate BRL slippage',
      details: error.message
    });
  }
});

export default router;