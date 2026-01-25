import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SmartSearch from './SmartSearch';

const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?q=80&w=2075&auto=format&fit=crop", // Modern Villa
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop", // Luxury Interior
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", // Poolside
];

// Fallback video or real one if hosted
const HERO_VIDEO = "https://videos.pexels.com/video-files/7578544/7578544-hd_1920_1080_30fps.mp4"; // Luxury Interior Walkthrough

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only cycle images if video fails or is loading
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {/* Video Layer */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          poster={heroImages[0]}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Fallback Image Slideshow (Visible if video not loaded) */}
        <AnimatePresence mode="wait">
          {!videoLoaded && (
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "linear" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={heroImages[currentImage]}
                alt="Luxury Property"
                className="w-full h-full object-cover scale-105" 
                style={{ animation: 'zoom 20s infinite alternate' }} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center mb-12 max-w-5xl"
        >
          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight tracking-wide drop-shadow-lg">
            UNPARALLELED <span className="text-primary italic">LUXURY</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light tracking-widest uppercase drop-shadow-md">
            Curating the World's Finest Properties
          </p>
        </motion.div>

        <div className="w-full max-w-4xl">
          <SmartSearch />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs text-white/70 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white animate-bounce" />
      </motion.div>
    </div>
  );
};

export default Hero;
