import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon, LatLngBoundsExpression } from 'leaflet';
import { useProperties } from '../hooks/useProperties';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Building2, Star } from 'lucide-react';
import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Create custom DivIcons using Lucide React components
const createCustomIcon = (icon: JSX.Element, color: string, size: number = 32) => {
  const html = renderToStaticMarkup(
    <div className="relative flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110">
      <div className={`relative z-10 p-2 rounded-full shadow-lg ${color} text-white`}>
        {icon}
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-current text-gray-800 opacity-50"></div>
    </div>
  );

  return new DivIcon({
    html,
    className: 'custom-marker-icon', // Use a custom class to avoid default styles
    iconSize: [size, size],
    iconAnchor: [size / 2, size], // Center bottom
    popupAnchor: [0, -size], // Above the icon
  });
};

const HeadOfficeIcon = createCustomIcon(<Star size={20} fill="currentColor" />, 'bg-primary');
const PropertyIcon = createCustomIcon(<Building2 size={18} />, 'bg-blue-600');

// Component to handle map bounds
const MapController = ({ 
  headOfficeCoords, 
  properties 
}: { 
  headOfficeCoords: [number, number], 
  properties: any[] 
}) => {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = [headOfficeCoords];
    
    properties.forEach(p => {
      if (p.coords) points.push(p.coords);
    });

    if (points.length > 0) {
      const bounds: LatLngBoundsExpression = points;
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [map, headOfficeCoords, properties]);

  return null;
};

const MapSearch = () => {
  const { properties } = useProperties();
  // Kilifi Coordinates (Head Office)
  const headOfficeCoords: [number, number] = [-3.6307, 39.8499];

  return (
    <div className="w-full h-[600px] relative z-0">
      <MapContainer 
        center={headOfficeCoords}
        zoom={6} 
        scrollWheelZoom={false}
        className="w-full h-full rounded-sm z-0"
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <MapController headOfficeCoords={headOfficeCoords} properties={properties} />
        
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
              <div className="mt-2 text-xs text-primary font-bold uppercase tracking-wide">Global Headquarters</div>
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
      <div className="absolute bottom-4 right-4 z-[400] bg-white/90 backdrop-blur-sm p-4 rounded-sm shadow-lg border border-gray-100 max-w-xs">
        <h4 className="font-serif font-bold text-secondary mb-3 text-sm border-b border-gray-200 pb-2">Map Legend</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
               <Star size={14} fill="currentColor" />
            </div>
            <span className="text-xs font-medium text-gray-700">Head Office (Kilifi)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
               <Building2 size={14} />
            </div>
            <span className="text-xs font-medium text-gray-700">Available Properties</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
