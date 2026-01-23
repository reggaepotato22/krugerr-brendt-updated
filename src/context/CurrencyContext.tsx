import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getExchangeRates, ExchangeRates } from '../services/currency';

export type Currency = 'KES' | 'USD' | 'GBP' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceString: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('KES');
  const [rates, setRates] = useState<ExchangeRates | null>(null);

  useEffect(() => {
    // Load saved currency preference
    const saved = localStorage.getItem('krugerr_currency');
    if (saved) setCurrency(saved as Currency);
    
    // Fetch live exchange rates
    const fetchRates = async () => {
        try {
            const data = await getExchangeRates();
            setRates(data);
        } catch (error) {
            console.error("Failed to load exchange rates", error);
        }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    localStorage.setItem('krugerr_currency', currency);
  }, [currency]);

  const parsePrice = (priceString: string): { value: number; currency: Currency } => {
    // Remove commas and clean string
    const clean = priceString.replace(/,/g, '').trim();
    let value = 0;
    let curr: Currency = 'KES';

    if (clean.includes('KES') || clean.includes('Ksh')) {
      value = parseFloat(clean.replace(/KES|Ksh/gi, ''));
      curr = 'KES';
    } else if (clean.includes('USD') || clean.includes('$')) {
      value = parseFloat(clean.replace(/USD|\$/gi, ''));
      curr = 'USD';
    } else if (clean.includes('GBP') || clean.includes('£')) {
      value = parseFloat(clean.replace(/GBP|£/gi, ''));
      curr = 'GBP';
    } else if (clean.includes('EUR') || clean.includes('€')) {
      value = parseFloat(clean.replace(/EUR|€/gi, ''));
      curr = 'EUR';
    } else {
      // Default fallback if no currency symbol found
      value = parseFloat(clean);
    }
    
    return { value: isNaN(value) ? 0 : value, currency: curr };
  };

  const formatPrice = (priceString: string): string => {
    const { value, currency: sourceCurrency } = parsePrice(priceString);
    
    if (value === 0) return priceString;
    
    // If rates are not loaded yet, use hardcoded approximation or return original
    // Fallback to approximate rates if fetch failed
    const currentRates = rates || {
        USD: 1,
        KES: 130,
        GBP: 0.79,
        EUR: 0.92
    };

    // Convert: Source -> USD -> Target
    // rates are based on USD (1 USD = X Currency)
    const sourceRate = currentRates[sourceCurrency];
    const targetRate = currentRates[currency];

    if (!sourceRate || !targetRate) return priceString;

    const valueInUSD = value / sourceRate;
    const targetValue = valueInUSD * targetRate;

    // Format output
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    });

    return formatter.format(targetValue);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
