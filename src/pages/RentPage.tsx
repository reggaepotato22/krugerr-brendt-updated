import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../hooks/useProperties';
import { motion } from 'framer-motion';

const RentPage = () => {
  const { properties } = useProperties();
  const rentProperties = properties.filter(p => p.type === 'Rent');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="pt-32 pb-12 bg-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Luxury Rentals</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light tracking-wide">
            Discover our exclusive collection of premium rental properties in Kenya's most sought-after locations.
          </p>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rentProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RentPage;
