import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SmartSearch from './SmartSearch';

const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?q=80&w=2075&auto=format&fit=crop", // Modern Villa
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop", // Luxury Interior
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", // Poolside
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Dark Overlay for Luxury Feel */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
          
          <img
            src={heroImages[currentImage]}
            alt="Luxury Property"
            className="w-full h-full object-cover scale-105 animate-slow-zoom" 
            style={{ animation: 'zoom 20s infinite alternate' }} 
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mb-16 max-w-4xl"
        >
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight tracking-wide">
            UNPARALLELED <span className="text-primary italic">LUXURY</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase">
            Curating the World's Finest Properties
          </p>
        </motion.div>

        <SmartSearch />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs text-white/70 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white animate-bounce" />
      </motion.div>
    </div>
  );
};

export default Hero;
