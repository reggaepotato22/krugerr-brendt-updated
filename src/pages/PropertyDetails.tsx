import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Bed, Bath, Square, ArrowLeft } from 'lucide-react';
import { getPropertyById, Property } from '../data/properties';

import InquiryForm from '../components/CRM/InquiryForm';
import CurrencyCalculator from '../components/CurrencyCalculator';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const foundProperty = getPropertyById(id);
      setProperty(foundProperty || null);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-3xl font-serif text-secondary mb-4">Property Not Found</h1>
        <p className="text-gray-500 mb-8">The property you are looking for does not exist or has been removed.</p>
        <Link to="/" className="bg-primary text-white px-8 py-3 rounded-sm hover:bg-secondary transition-colors uppercase tracking-widest text-sm">
          Return Home
        </Link>
      </div>
    );
  }

  // Ensure amenities has a default value if undefined
  const amenities = property.amenities || [
    '24/7 Security', 'Parking', 'Water Supply', 'Electricity'
  ];

  // Ensure description has a default value
  const description = property.description || 'No description available for this property.';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Image Collage */}
      <div className="pt-20 pb-8 px-4 md:px-8 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-4 text-sm font-medium uppercase tracking-wide">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[60vh] min-h-[500px]">
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group">
            <img src={property.images[0]} alt="Main View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {/* Handle cases with fewer than 5 images gracefully */}
          {property.images.slice(1, 5).map((img, idx) => (
             <div key={idx} className="relative overflow-hidden group">
               <img src={img} alt={`View ${idx + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </div>
          ))}
          {/* Fillers if not enough images */}
          {property.images.length < 5 && Array.from({ length: 5 - property.images.length }).map((_, idx) => (
            <div key={`filler-${idx}`} className="relative bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs uppercase">No Image</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Details */}
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary font-medium mb-2 uppercase tracking-wide text-sm">
                <span className="bg-primary/10 px-2 py-1 rounded-sm">For {property.type}</span>
                <span>•</span>
                <span>Property</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-lg mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                {property.location}
              </div>
              <div className="flex gap-8 border-y border-gray-100 py-6">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-secondary">{property.beds} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-secondary">{property.baths} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-secondary">{property.sqft} sqft</span>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-secondary mb-6">Description</h2>
              <div className="text-gray-500 leading-relaxed whitespace-pre-line">
                {description}
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-xl font-bold text-secondary mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column: Contact/Price */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg border border-gray-100 sticky top-24 space-y-8">
              <div>
                <span className="text-gray-500 text-sm uppercase tracking-wide block mb-1">Price</span>
                <span className="text-3xl font-serif text-primary">{property.price}</span>
              </div>
              
              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
              
              <div className="pt-8 border-t border-gray-200">
                <CurrencyCalculator />
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
