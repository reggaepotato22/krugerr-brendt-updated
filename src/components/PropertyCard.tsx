import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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

  const nextImage = (e?: MouseEvent) => {
    e?.preventDefault();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e?: MouseEvent) => {
    e?.preventDefault();
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextImage();
    } else if (info.offset.x > swipeThreshold) {
      prevImage();
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card text-foreground border border-border overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {/* Image Carousel */}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={currentImage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            src={property.images[currentImage]}
            alt={property.title}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>

        {/* Status Badge - Minimal */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-background/90 backdrop-blur-md text-foreground text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-border/50 shadow-sm">
            {property.type}
          </span>
        </div>

        {/* Navigation Arrows - Only visible on hover (Desktop) */}
        <div className="hidden md:flex absolute inset-0 items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button 
            onClick={prevImage}
            className="pointer-events-auto p-2 bg-background/80 hover:bg-primary hover:text-white text-foreground transition-colors backdrop-blur-sm rounded-full shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={nextImage}
            className="pointer-events-auto p-2 bg-background/80 hover:bg-primary hover:text-white text-foreground transition-colors backdrop-blur-sm rounded-full shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* View Details Overlay */}
        <Link 
          to={`/property/${property.id}`}
          className="absolute inset-0 z-0"
          draggable={false}
        />
      </div>

      <div className="p-6 relative bg-card">
        <div className="mb-4">
          <h3 className="text-lg font-serif text-foreground tracking-wide mb-1 line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>
          <div className="flex items-center gap-1 text-muted text-xs tracking-widest uppercase">
            <MapPin className="w-3 h-3 text-primary" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end border-t border-border pt-4">
          <div className="flex gap-4 text-muted text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-foreground font-medium">{property.beds}</span> Beds
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-foreground font-medium">{property.baths}</span> Baths
            </div>
          </div>
          <p className="text-primary font-serif text-lg tracking-wide">{formatPrice(property.price)}</p>
        </div>
      </div>
    </motion.div>
  );
};


export default PropertyCard;
