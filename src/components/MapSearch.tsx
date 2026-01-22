import { Map } from 'lucide-react';

const MapSearch = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Search by Map</h2>
            <p className="text-gray-500 mb-8 text-lg leading-relaxed">
              Find your perfect property by location. Our interactive map allows you to explore neighborhoods, view nearby amenities, and discover exclusive listings in your desired area.
            </p>
            <button className="bg-secondary hover:bg-primary text-white font-medium py-4 px-8 transition-colors duration-300 flex items-center gap-2 uppercase tracking-wide text-sm">
              <Map className="w-4 h-4" />
              Open Interactive Map
            </button>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-video bg-gray-100 rounded-sm overflow-hidden relative group cursor-pointer">
              {/* Placeholder Map Image */}
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
                alt="Map Search" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <Map className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              {/* Decorative Pins */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse" />
              <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-primary rounded-full animate-pulse delay-100" />
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary rounded-full animate-pulse delay-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSearch;
