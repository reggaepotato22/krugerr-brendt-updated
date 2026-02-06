
import { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';
import { getExchangeRates, convertCurrency, ExchangeRates } from '../services/currency';

const SUPPORTED_CURRENCIES = [
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
];

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KES');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      const data = await getExchangeRates();
      setRates(data);
      setLoading(false);
    };
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates) {
      const result = convertCurrency(amount, fromCurrency, toCurrency, rates);
      setConvertedAmount(result);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-card p-6 rounded-sm shadow-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif text-foreground font-bold flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-primary" />
          Currency Calculator
        </h3>
        {loading && <span className="text-xs text-muted-foreground animate-pulse">Updating rates...</span>}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-input rounded-sm focus:border-primary focus:outline-none text-foreground bg-input font-medium"
            min="0"
          />
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 border border-input rounded-sm focus:border-primary focus:outline-none text-sm bg-input text-foreground"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="p-2 mb-[2px] text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 border border-input rounded-sm focus:border-primary focus:outline-none text-sm bg-input text-foreground"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Estimated Exchange</p>
          <p className="text-2xl font-serif text-primary font-bold">
            {convertedAmount?.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-sm text-muted-foreground">{toCurrency}</span>
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-2">
            * Rates are real-time estimates and may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCalculator;
