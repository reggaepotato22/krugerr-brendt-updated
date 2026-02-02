import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const SmartSearch = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy');

  const handleSearch = () => {
    if (activeTab === 'buy') {
      navigate('/buy');
    } else {
      navigate('/rent');
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-card/90 backdrop-blur-md p-4 md:p-6 border border-border shadow-2xl max-w-4xl w-full mx-auto rounded-none md:rounded-sm"
    >
      <div className="flex gap-4 mb-6 justify-center md:justify-start">
        <button
          onClick={() => setActiveTab('buy')}
          className={`pb-2 text-sm font-medium tracking-wide uppercase transition-colors border-b-2 min-h-[44px] flex items-center ${
            activeTab === 'buy' ? 'border-primary text-foreground' : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab('rent')}
          className={`pb-2 text-sm font-medium tracking-wide uppercase transition-colors border-b-2 min-h-[44px] flex items-center ${
            activeTab === 'rent' ? 'border-primary text-foreground' : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          Rent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="relative group">
          <label className="block text-xs font-bold text-muted uppercase mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 min-h-[44px] bg-input border border-border focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-foreground font-medium hover:border-primary transition-colors rounded-sm">
              <option className="bg-card text-foreground">All Locations</option>
              <option className="bg-card text-foreground">Kilifi</option>
              <option className="bg-card text-foreground">Nairobi</option>
              <option className="bg-card text-foreground">Mombasa</option>
              <option className="bg-card text-foreground">Diani</option>
              <option className="bg-card text-foreground">Dubai</option>
              <option className="bg-card text-foreground">London</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-xs font-bold text-muted uppercase mb-2">Property Type</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 min-h-[44px] bg-input border border-border focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-foreground font-medium hover:border-primary transition-colors rounded-sm">
              <option className="bg-card text-foreground">All Types</option>
              <option className="bg-card text-foreground">Apartment</option>
              <option className="bg-card text-foreground">Villa</option>
              <option className="bg-card text-foreground">Office</option>
              <option className="bg-card text-foreground">Land</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-xs font-bold text-muted uppercase mb-2">Price Range</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 min-h-[44px] bg-input border border-border focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-foreground font-medium hover:border-primary transition-colors rounded-sm">
              <option className="bg-card text-foreground">Any Price</option>
              <option className="bg-card text-foreground">Under 10M KES</option>
              <option className="bg-card text-foreground">10M - 50M KES</option>
              <option className="bg-card text-foreground">50M - 100M KES</option>
              <option className="bg-card text-foreground">100M+ KES</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="w-full bg-primary hover:bg-primary-light text-secondary font-bold py-3 px-6 min-h-[44px] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide text-sm btn-shine rounded-sm"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </motion.div>
  );
};

export default SmartSearch;
