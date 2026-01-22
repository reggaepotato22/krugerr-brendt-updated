import { useState } from 'react';
import { Search, MapPin, Home, DollarSign, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const SmartSearch = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy');

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-white/95 backdrop-blur-md p-6 rounded-sm shadow-2xl max-w-4xl w-full mx-auto"
    >
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('buy')}
          className={`pb-2 text-sm font-medium tracking-wide uppercase transition-colors border-b-2 ${
            activeTab === 'buy' ? 'border-primary text-secondary' : 'border-transparent text-gray-400 hover:text-secondary'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab('rent')}
          className={`pb-2 text-sm font-medium tracking-wide uppercase transition-colors border-b-2 ${
            activeTab === 'rent' ? 'border-primary text-secondary' : 'border-transparent text-gray-400 hover:text-secondary'
          }`}
        >
          Rent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="relative group">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-secondary font-medium">
              <option>All Locations</option>
              <option>Kilifi</option>
              <option>Nairobi</option>
              <option>Mombasa</option>
              <option>Diani</option>
              <option>Dubai</option>
              <option>London</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Property Type</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-secondary font-medium">
              <option>All Types</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Office</option>
              <option>Land</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Price Range</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-secondary font-medium">
              <option>Any Price</option>
              <option>Under 10M KES</option>
              <option>10M - 50M KES</option>
              <option>50M - 100M KES</option>
              <option>100M+ KES</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button className="w-full bg-secondary hover:bg-primary text-white font-medium py-3 px-6 transition-colors duration-300 flex items-center justify-center gap-2 uppercase tracking-wide text-sm">
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </motion.div>
  );
};

export default SmartSearch;
