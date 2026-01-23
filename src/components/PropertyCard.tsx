import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: 'Sale' | 'Rent';
  beds: number;
  baths: number;
  sqft?: number;
  images: string[];
}

const PropertyCard = ({ property }: { property: Property }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { formatPrice } = useCurrency();

  const nextImage = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div 
      className="group relative bg-secondary-light border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={property.images[currentImage]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </AnimatePresence>

        {/* Status Badge - Minimal */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-white/10">
            {property.type}
          </span>
        </div>

        {/* Navigation Arrows - Only visible on hover */}
        <div className={`absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
          <button 
            onClick={prevImage}
            className="p-2 bg-black/50 hover:bg-primary text-white transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={nextImage}
            className="p-2 bg-black/50 hover:bg-primary text-white transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* View Details Overlay */}
        <Link 
          to={`/property/${property.id}`}
          className="absolute inset-0 z-0"
        />
      </div>

      <div className="p-6 relative bg-secondary-light">
        <div className="mb-4">
          <h3 className="text-lg font-serif text-white tracking-wide mb-1 line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>
          <div className="flex items-center gap-1 text-gray-400 text-xs tracking-widest uppercase">
            <MapPin className="w-3 h-3 text-primary" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end border-t border-white/10 pt-4">
          <div className="flex gap-4 text-gray-400 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-medium">{property.beds}</span> Beds
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-medium">{property.baths}</span> Baths
            </div>
          </div>
          <p className="text-primary font-serif text-lg tracking-wide">{formatPrice(property.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
