import express from 'express';
import { getCachedQuote, storeQuote } from '../services/cache.js';
import { DATA_SOURCES } from '../data/sources.js';
import { scrapeCronista, scrapeDolarHoy, fetchWise } from '../services/scrapers.js';

const router = express.Router();

async function fetchQuote(source) {
  // Checking cache here
  const cached = await getCachedQuote(source.url);
  if (cached) {
    return {
      source_url: source.url,
      buy_price: cached.buy_price,
      sell_price: cached.sell_price,
      currency: source.currency,
      data_quality: cached.data_quality,
      quote_timestamp: cached.quote_timestamp,
      retrieved_at: cached.retrieved_at
    };
  }

  let result;
  
  // fetching live data for few websites
  switch (source.name) {
    case 'Cronista':
      result = await scrapeCronista();
      break;
    case 'DolarHoy':
      result = await scrapeDolarHoy();
      break;
    case 'Wise':
      result = await fetchWise();
      break;
    default:
      // For Ambito, Nubank, Nomad - using fallback or dummy values (they're blocking my api requests and Ambito isn't displaying data without VPN after i tried multiple times)
      result = {
        success: false,
        buy_price: null,
        sell_price: null,
        quote_timestamp: null,
        error_message: 'Source not implemented - using fallback'
      };
  }

  // If live data fails, using fallback here
  if (!result.success) {
    result = {
      success: true, 
      buy_price: source.fallback.buy,
      sell_price: source.fallback.sell,
      quote_timestamp: new Date(),
      error_message: 'Using fallback data'
    };
  }

  const quoteData = {
    source_url: source.url,
    buy_price: result.buy_price,
    sell_price: result.sell_price,
    currency: source.currency,
    data_quality: result.error_message ? 'fallback' : 'live',
    quote_timestamp: result.quote_timestamp,
    error_message: result.error_message
  };

  // Storing in database
  await storeQuote(quoteData);

  return quoteData;
}

async function getQuotesByCurrency(currency) {
  const quotes = [];
  const sources = currency === 'ARS' ? DATA_SOURCES.ARS : DATA_SOURCES.BRL;
  
  for (const source of sources) {
    const quote = await fetchQuote(source);
    quotes.push({
      buy_price: quote.buy_price,
      sell_price: quote.sell_price,
      source: quote.source_url,
      currency: quote.currency,
      data_quality: quote.data_quality,
      quote_timestamp: quote.quote_timestamp,
      retrieved_at: quote.retrieved_at || new Date()
    });
  }
  
  return quotes;
}

// Route 1 - Returns array of quotes from ARS sources
router.get('/ars', async (req, res) => {
  try {
    const quotes = await getQuotesByCurrency('ARS');
    res.json(quotes);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ARS quotes',
      details: error.message
    });
  }
});

// Route 2 - Returns array of quotes from BRL sources
router.get('/brl', async (req, res) => {
  try {
    const quotes = await getQuotesByCurrency('BRL');
    res.json(quotes);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch BRL quotes',
      details: error.message
    });
  }
});

export default router;
export { getQuotesByCurrency };
