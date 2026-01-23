import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard, { Property } from '../components/PropertyCard';
import { motion } from 'framer-motion';

const rentProperties: Property[] = [
  {
    id: 'r1',
    title: 'Modern Apartment in Westlands',
    location: 'Westlands, Nairobi, Kenya',
    price: 'KES 150,000 / month',
    type: 'Rent',
    beds: 2,
    baths: 2,
    sqft: 1200,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r2',
    title: 'Seaside Villa Rental',
    location: 'Bofa Beach, Kilifi',
    price: 'KES 350,000 / month',
    type: 'Rent',
    beds: 4,
    baths: 5,
    sqft: 3200,
    images: [
      'https://images.unsplash.com/photo-1512918760513-0f96bc6a60e8?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r3',
    title: 'Executive Lavington Townhouse',
    location: 'Lavington, Nairobi',
    price: 'KES 250,000 / month',
    type: 'Rent',
    beds: 5,
    baths: 4,
    sqft: 2800,
    images: [
      'https://images.unsplash.com/photo-1600596542815-e32c630bd1ba?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r4',
    title: 'Furnished Kilimani Apartment',
    location: 'Kilimani, Nairobi',
    price: 'KES 180,000 / month',
    type: 'Rent',
    beds: 3,
    baths: 3,
    sqft: 1800,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502005229766-939cb934d60b?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r5',
    title: 'Nyali Beachfront Condo',
    location: 'Nyali, Mombasa',
    price: 'KES 120,000 / month',
    type: 'Rent',
    beds: 2,
    baths: 2,
    sqft: 1400,
    images: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'r6',
    title: 'Karen Garden Cottage',
    location: 'Karen, Nairobi',
    price: 'KES 90,000 / month',
    type: 'Rent',
    beds: 2,
    baths: 1,
    sqft: 1000,
    images: [
      'https://images.unsplash.com/photo-1599809275372-b4036417379a?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop'
    ]
  }
];

const RentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="pt-32 pb-12 bg-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Luxury Rentals</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Discover our exclusive selection of premium properties available for rent in prime locations.</p>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentProperties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
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
