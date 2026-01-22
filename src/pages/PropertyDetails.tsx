import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Bed, Bath, Square, Check, User, Mail, Phone } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Viewing property:", id);
  }, [id]);

  // Dummy data - in a real app, fetch based on ID
  const property = {
    title: 'Beachfront Villa in Bofa',
    location: 'Bofa, Kilifi, Kenya',
    price: 'KES 85,000,000',
    description: `Experience the epitome of luxury living in this stunning beachfront villa located in the prestigious Bofa area of Kilifi. This architectural masterpiece offers breathtaking ocean views, private beach access, and meticulously designed interiors that blend modern elegance with coastal charm.\n\nThe property features spacious open-plan living areas, a state-of-the-art kitchen, and expansive outdoor entertainment spaces. Each bedroom is an en-suite sanctuary with private balconies overlooking the Indian Ocean. The landscaped gardens lead directly to the pristine white sands, offering an exclusive lifestyle of tranquility and sophistication.`,
    amenities: [
      'Private Beach Access', 'Infinity Pool', 'Staff Quarters', 'Backup Generator',
      '24/7 Security', 'Landscaped Gardens', 'Double Garage', 'Air Conditioning',
      'Solar Water Heating', 'High-speed Internet'
    ],
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Image Collage */}
      <div className="pt-20 pb-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[60vh] min-h-[500px]">
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group">
            <img src={property.images[0]} alt="Main View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="relative overflow-hidden group">
            <img src={property.images[1]} alt="Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="relative overflow-hidden group">
            <img src={property.images[2]} alt="Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="relative overflow-hidden group">
            <img src={property.images[3]} alt="Exterior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="relative overflow-hidden group">
            <img src={property.images[4]} alt="Pool" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <span className="text-white font-medium uppercase tracking-wide border border-white px-4 py-2">View All Photos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Details */}
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-primary font-medium mb-2 uppercase tracking-wide text-sm">
                <span className="bg-primary/10 px-2 py-1 rounded-sm">For Sale</span>
                <span>•</span>
                <span>Villa</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-lg mb-6">
                <MapPin className="w-5 h-5 text-primary" />
                {property.location}
              </div>
              <div className="flex gap-8 border-y border-gray-100 py-6">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-secondary">5 Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-secondary">6 Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-secondary">4,500 sqft</span>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-secondary mb-6">Description</h2>
              <div className="text-gray-500 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-secondary mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-secondary mb-6">Floor Plans</h2>
              <div className="bg-gray-50 p-8 text-center border border-dashed border-gray-300 rounded-sm">
                <p className="text-gray-400 mb-4">Floor plans available upon request</p>
                <button className="text-primary font-medium border-b border-primary pb-0.5 hover:text-secondary hover:border-secondary transition-colors text-sm uppercase">
                  Request Floor Plans
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Form */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white p-8 shadow-xl rounded-sm border border-gray-100">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-3xl font-bold text-primary">{property.price}</p>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary text-sm rounded-sm" placeholder="Your Name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary text-sm rounded-sm" placeholder="Your Email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary text-sm rounded-sm" placeholder="+254" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                    <textarea className="w-full p-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary text-sm rounded-sm h-32 resize-none" placeholder="I am interested in this property..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-secondary hover:bg-primary text-white font-medium py-3 px-6 transition-colors duration-300 uppercase tracking-wide text-sm rounded-sm">
                    Enquire Now
                  </button>
                </form>
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
