// Calculate averages from quotes
export function calculateAverages(quotes) {
  const validQuotes = quotes.filter(q => q.buy_price && q.sell_price);
  
  if (validQuotes.length === 0) {
    return { average_buy_price: 0, average_sell_price: 0 };
  }

  const totalBuy = validQuotes.reduce((sum, q) => sum + parseFloat(q.buy_price), 0);
  const totalSell = validQuotes.reduce((sum, q) => sum + parseFloat(q.sell_price), 0);

  return {
    average_buy_price: totalBuy / validQuotes.length,
    average_sell_price: totalSell / validQuotes.length
  };
}

// Calculate slippage percentages
export function calculateSlippage(quotes, averages) {
  return quotes.map(quote => {
    if (!quote.buy_price || !quote.sell_price) {
      return {
        source: quote.source,
        buy_price_slippage: null,
        sell_price_slippage: null,
        data_quality: quote.data_quality
      };
    }

    const buySlippage = ((quote.buy_price - averages.average_buy_price) / averages.average_buy_price) * 100;
    const sellSlippage = ((quote.sell_price - averages.average_sell_price) / averages.average_sell_price) * 100;

    return {
      source: quote.source,
      buy_price_slippage: parseFloat(buySlippage.toFixed(4)),
      sell_price_slippage: parseFloat(sellSlippage.toFixed(4)),
      data_quality: quote.data_quality
    };
  });
}