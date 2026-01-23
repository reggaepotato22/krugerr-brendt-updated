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
      className="bg-black/80 backdrop-blur-md p-6 border border-white/10 shadow-2xl max-w-4xl w-full mx-auto"
    >
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('buy')}
          className={`pb-2 text-sm font-medium tracking-wide uppercase transition-colors border-b-2 ${
            activeTab === 'buy' ? 'border-primary text-white' : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab('rent')}
          className={`pb-2 text-sm font-medium tracking-wide uppercase transition-colors border-b-2 ${
            activeTab === 'rent' ? 'border-primary text-white' : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          Rent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="relative group">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-white font-medium hover:bg-white/10 transition-colors">
              <option className="bg-black text-white">All Locations</option>
              <option className="bg-black text-white">Kilifi</option>
              <option className="bg-black text-white">Nairobi</option>
              <option className="bg-black text-white">Mombasa</option>
              <option className="bg-black text-white">Diani</option>
              <option className="bg-black text-white">Dubai</option>
              <option className="bg-black text-white">London</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Property Type</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-white font-medium hover:bg-white/10 transition-colors">
              <option className="bg-black text-white">All Types</option>
              <option className="bg-black text-white">Apartment</option>
              <option className="bg-black text-white">Villa</option>
              <option className="bg-black text-white">Office</option>
              <option className="bg-black text-white">Land</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative group">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Price Range</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:outline-none focus:border-primary text-sm appearance-none cursor-pointer text-white font-medium hover:bg-white/10 transition-colors">
              <option className="bg-black text-white">Any Price</option>
              <option className="bg-black text-white">Under 10M KES</option>
              <option className="bg-black text-white">10M - 50M KES</option>
              <option className="bg-black text-white">50M - 100M KES</option>
              <option className="bg-black text-white">100M+ KES</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="w-full bg-primary hover:bg-primary-light text-secondary font-bold py-3 px-6 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </motion.div>
  );
};

export default SmartSearch;
