import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyLocation {
  id: string;
  title: string;
  location: string;
  price: string;
  coords: [number, number];
  image: string;
}

const properties: PropertyLocation[] = [
  {
    id: '1',
    title: 'Bofa Beach Villa',
    location: 'Kilifi, Kenya',
    price: 'KES 85,000,000',
    coords: [-3.6307, 39.8499],
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Muthaiga Sovereign Estate',
    location: 'Nairobi, Kenya',
    price: 'KES 450,000,000',
    coords: [-1.2543, 36.8379],
    image: 'https://images.unsplash.com/photo-1600596542815-e32c630bd1ba?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Palm Jumeirah Penthouse',
    location: 'Dubai, UAE',
    price: '$ 12,500,000',
    coords: [25.1124, 55.1390],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Mayfair Townhouse',
    location: 'London, UK',
    price: '£ 8,500,000',
    coords: [51.5074, -0.1278],
    image: 'https://images.unsplash.com/photo-1513584685908-2274653dbf29?q=80&w=2070&auto=format&fit=crop'
  }
];

const MapSearch = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedProperty, setSelectedProperty] = useState<PropertyLocation | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    try {
      // Check if Leaflet is available on window
      const L = (window as any).L;
      if (!L) {
        console.warn('Leaflet not loaded, map disabled');
        return;
      }

      // Initialize map if not already initialized
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current).setView([20, 0], 2);
        
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        // Custom icon
        const customIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        // Add markers
        if (Array.isArray(properties)) {
          properties.forEach((prop) => {
            const marker = L.marker(prop.coords, { icon: customIcon }).addTo(map);
            marker.on('click', () => {
              setSelectedProperty(prop);
              map.flyTo(prop.coords, 10, {
                duration: 1.5
              });
            });
          });
        }

        mapInstanceRef.current = map;
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      // Cleanup if needed (Leaflet handles most cleanup)
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden shadow-xl">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Overlay Instructions */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm shadow-md">
        <p className="text-xs font-bold text-secondary tracking-widest uppercase">
          Explore Global Properties
        </p>
      </div>

      {/* Property Preview Card */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-80 z-[1000]"
          >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="relative h-40">
                <img 
                  src={selectedProperty.image} 
                  alt={selectedProperty.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProperty(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg text-secondary leading-tight">{selectedProperty.title}</h3>
                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                      <MapPin size={12} />
                      <span className="text-xs">{selectedProperty.location}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-bold text-primary text-sm">{selectedProperty.price}</span>
                  <Link 
                    to={`/property/${selectedProperty.id}`}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors"
                  >
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapSearch;
