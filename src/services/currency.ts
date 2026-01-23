
const API_URL = 'https://open.er-api.com/v6/latest/USD';

export interface ExchangeRates {
  [key: string]: number;
}

let cachedRates: ExchangeRates | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  const now = Date.now();
  if (cachedRates && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedRates;
  }

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data && data.rates) {
      cachedRates = data.rates;
      lastFetchTime = now;
      return data.rates;
    }
    throw new Error('Invalid data format');
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    // Fallback rates if API fails
    return {
      USD: 1,
      KES: 130, // Approximate
      GBP: 0.78,
      EUR: 0.92
    };
  }
};

export const convertCurrency = (amount: number, from: string, to: string, rates: ExchangeRates): number => {
  if (from === to) return amount;
  const fromRate = rates[from];
  const toRate = rates[to];
  
  if (!fromRate || !toRate) return 0;
  
  // Convert to USD first (since base is USD), then to target
  const amountInUSD = amount / fromRate;
  return amountInUSD * toRate;
};
