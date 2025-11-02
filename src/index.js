import express from 'express';
import { initializeDatabase } from './config/database.js';
import quotesRouter from './routes/quotes.js';
import averageRouter from './routes/average.js';
import slippageRouter from './routes/slippage.js';
import { DATA_SOURCES } from './data/sources.js';

const app = express();
const PORT = 3000;

app.use(express.json());

//routers
app.use('/quotes', quotesRouter);
app.use('/average', averageRouter);
app.use('/slippage', slippageRouter);

app.get('/', (req, res) => {
  res.json({
    message: ' Currency Exchange API',
    description: 'Real-time USD to ARS/BRL exchange rates from multiple sources',
    endpoints: {
      ars_quotes: '/quotes/ars - Get quotes from ARS sources',
      brl_quotes: '/quotes/brl - Get quotes from BRL sources',
      ars_average: '/average/ars - Get ARS average prices', 
      brl_average: '/average/brl - Get BRL average prices',
      ars_slippage: '/slippage/ars - Get ARS slippage percentages',
      brl_slippage: '/slippage/brl - Get BRL slippage percentages',
    },
  });
});

// Initializing and start server
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(` Currency API running on http://localhost:${PORT}`);
      console.log(` ARS Quotes: http://localhost:${PORT}/quotes/ars`);
      console.log(` BRL Quotes: http://localhost:${PORT}/quotes/brl`);
      console.log(` ARS Average: http://localhost:${PORT}/average/ars`);
      console.log(` BRL Average: http://localhost:${PORT}/average/brl`);
      console.log(` ARS Slippage: http://localhost:${PORT}/slippage/ars`);
      console.log(` BRL Slippage: http://localhost:${PORT}/slippage/brl`);
    });
  } catch (error) {
    console.error(' Failed to start server:', error);
    process.exit(1);
  }
}

startServer();