import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useProperties } from '../hooks/useProperties';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = new Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Custom Gold Icon for Head Office
const HeadOfficeIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Blue Icon for Properties
const PropertyIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapSearch = () => {
  const { properties } = useProperties();
  // Kilifi Coordinates (Head Office)
  const headOfficeCoords: [number, number] = [-3.6307, 39.8499];

  return (
    <div className="w-full h-[600px] relative z-0">
      <MapContainer 
        center={[-1.2921, 36.8219]} // Start centered on Kenya roughly
        zoom={6} 
        scrollWheelZoom={false}
        className="w-full h-full rounded-sm z-0"
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        {/* Dark Theme Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Head Office Marker */}
        <Marker position={headOfficeCoords} icon={HeadOfficeIcon}>
          <Popup className="custom-popup">
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary/10 p-1.5 rounded-full">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-secondary text-lg">Head Office</h3>
              </div>
              <p className="text-gray-600 text-sm mb-1">Krugerr Brendt International</p>
              <p className="text-gray-500 text-xs">Kilifi, Kenya</p>
            </div>
          </Popup>
        </Marker>

        {/* Property Markers */}
        {properties.map((property) => (
          property.coords && (
            <Marker 
              key={property.id} 
              position={property.coords} 
              icon={PropertyIcon}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <div className="relative h-24 mb-2 overflow-hidden rounded-sm">
                    <img 
                      src={property.images[0]} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-sm">
                      {property.type}
                    </div>
                  </div>
                  <h3 className="font-bold text-secondary text-sm mb-1 line-clamp-1">{property.title}</h3>
                  <p className="text-primary font-serif text-sm mb-2">{property.price}</p>
                  <Link 
                    to={`/property/${property.id}`}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors uppercase tracking-wider font-medium"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
      
      {/* Legend / Overlay */}
      <div className="absolute bottom-4 right-4 z-[400] bg-white/90 backdrop-blur-sm p-3 rounded-sm shadow-lg border border-gray-100 max-w-xs">
        <h4 className="font-serif font-bold text-secondary mb-2 text-sm">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png" className="w-4 h-6" alt="Head Office" />
            <span className="text-xs text-gray-600">Head Office (Kilifi)</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png" className="w-4 h-6" alt="Property" />
            <span className="text-xs text-gray-600">Available Properties</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
