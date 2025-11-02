export const DATA_SOURCES = {
  ARS: [
    {
      name: 'Ambito',
      url: 'https://www.ambito.com/contenidos/dolar.html',
      currency: 'ARS',
      type: 'scraper',
      fallback: { buy: 1415.00, sell: 1465.00 }
    },
    {
      name: 'DolarHoy', 
      url: 'https://www.dolarhoy.com/',
      currency: 'ARS',
      type: 'scraper',
      fallback: { buy: 1425.00, sell: 1475.00 }
    },
    {
      name: 'Cronista',
      url: 'https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB',
      currency: 'ARS', 
      type: 'scraper',
      fallback: { buy: 1420.00, sell: 1470.00 }
    }
  ],
  
  BRL: [
    {
      name: 'Wise',
      url: 'https://wise.com/es/currency-converter/brl-to-usd-rate',
      currency: 'BRL',
      type: 'api', 
      fallback: { buy: 5.35, sell: 5.45 }
    },
    {
      name: 'Nubank',
      url: 'https://nubank.com.br/taxas-conversao/',
      currency: 'BRL',
      type: 'scraper',
      fallback: { buy: 5.38, sell: 5.42 }
    },
    {
      name: 'Nomad',
      url: 'https://www.nomadglobal.com',
      currency: 'BRL',
      type: 'scraper', 
      fallback: { buy: 5.36, sell: 5.44 }
    }
  ]
};