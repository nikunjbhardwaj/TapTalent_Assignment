import axios from 'axios';
import * as cheerio from 'cheerio';


//Cronista Scraper ARS(Blue dollar)
export async function scrapeCronista() {
  try {
    const response = await axios.get(
      'https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB',
      { timeout: 10000 }
    );

    const $ = cheerio.load(response.data);
    
    const buyPrice = $('.buy').text().match(/\$?([\d.,]+)/)?.[1];
    const sellPrice = $('.sell').text().match(/\$?([\d.,]+)/)?.[1];
    
    if (buyPrice && sellPrice) {
      const parseSpanishNumber = (str) => {
        const clean = str.replace(/[$\s]/g, '').trim();
        return parseFloat(clean.replace(/\./g, '').replace(',', '.'));
      };
      
      return {
        success: true,
        buy_price: parseSpanishNumber(buyPrice),
        sell_price: parseSpanishNumber(sellPrice),
        quote_timestamp: new Date(),
        error_message: null
      };
    } else {
      throw new Error('Could not extract prices from Cronista');
    }

  } catch (error) {
    return {
      success: false,
      buy_price: null,
      sell_price: null,
      quote_timestamp: null,
      error_message: error.message
    };
  }
}

// DolarHoy Scraper (ARS Blue Dollar)
export async function scrapeDolarHoy() {
  try {
    const response = await axios.get('https://dolarhoy.com/', {
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    const bodyText = $('body').text();
    const allPrices = bodyText.match(/(\d{3,4}[.,]\d{2})/g) || [];
    
    // Filter for blue dollar range (1400-1500)
    const bluePrices = allPrices.filter(p => {
      const num = parseFloat(p.replace(',', '.'));
      return num > 1400 && num < 1500;
    });
    
    if (bluePrices.length >= 2) {
      return {
        success: true,
        buy_price: parseFloat(bluePrices[0].replace(',', '.')),
        sell_price: parseFloat(bluePrices[1].replace(',', '.')),
        quote_timestamp: new Date(),
        error_message: null
      };
    } else {
      throw new Error('Could not find blue dollar prices in DolarHoy');
    }

  } catch (error) {
    return {
      success: false,
      buy_price: null,
      sell_price: null,
      quote_timestamp: null,
      error_message: error.message
    };
  }
}

// Wise BRL (Hidden api found using dev tools)
export async function fetchWise() {
  try {
    const response = await axios.get(
      'https://wise.com/rates/history+live?source=USD&target=BRL&length=1&resolution=hourly&unit=day',
      { timeout: 10000 }
    );

    const data = response.data;
    
    if (data && data.length > 0) {
      const latestRate = data[data.length - 1];
      return {
        success: true,
        buy_price: latestRate.value - 0.02, // Estimate buy price taken since there is only one price given in BRL currency
        sell_price: latestRate.value + 0.02, // Estimate sell price taken since there is only one price given in BRL currency
        quote_timestamp: new Date(latestRate.time),
        error_message: null
      };
    } else {
      throw new Error('No data received from Wise API');
    }

  } catch (error) {
    return {
      success: false,
      buy_price: null,
      sell_price: null,
      quote_timestamp: null,
      error_message: error.message
    };
  }
}