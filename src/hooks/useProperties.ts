import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { properties as localProperties, Property as LocalProperty } from '../data/properties';

// Adapter to normalize PHP API property to LocalProperty interface
const normalizeProperty = (p: any): LocalProperty => ({
  id: p.id.toString(),
  title: p.title,
  price: `${p.currency} ${parseFloat(p.price).toLocaleString()}`,
  location: p.location,
  type: p.type,
  beds: parseInt(p.beds),
  baths: parseInt(p.baths),
  sqft: parseInt(p.sqft),
  images: p.image_urls || [],
  description: p.description,
  amenities: p.amenities,
  coords: p.coords && p.coords.length === 2 ? [parseFloat(p.coords[0]), parseFloat(p.coords[1])] : undefined
});

export const useProperties = () => {
  const [properties, setProperties] = useState<LocalProperty[]>(localProperties);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProperties = async () => {
      try {
        const data = await api.getProperties();

        if (mounted && data && Array.isArray(data)) {
          const remoteProperties = data.map(normalizeProperty);
          // Combine local and remote properties
          // Remote properties first so they appear at the top
          setProperties([...remoteProperties, ...localProperties]);
        }
      } catch (err) {
        console.error('API connection error (using local data only)');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProperties();

    return () => {
      mounted = false;
    };
  }, []);

  return { properties, loading };
};
