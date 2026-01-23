import { useCurrency, Currency } from '../context/CurrencyContext';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencies: { code: Currency; symbol: string; name: string }[] = [
    { code: 'KES', symbol: 'Ksh', name: 'Kenya Shilling' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
  ];

  const handleSelect = (code: Currency) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-primary transition-colors group"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium tracking-widest uppercase">{currency}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-4 w-48 bg-secondary border border-white/10 shadow-xl rounded-sm py-2"
          >
            {currencies.map((c) => (
              <button
                key={c.code}
                onClick={() => handleSelect(c.code)}
                className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wide flex items-center justify-between hover:bg-white/5 transition-colors ${
                  currency === c.code ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <span>{c.name}</span>
                <span className="font-serif">{c.symbol}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySelector;
