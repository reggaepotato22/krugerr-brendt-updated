import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';

const FeaturedProperties = () => {
  // Select specific properties to feature (mix of Sale and Rent)
  // We want to show:
  // 1. Beachfront Villa (Sale) - id: '1'
  // 2. Modern Apartment (Rent) - id: 'r1' (was '2')
  // 3. Luxury Penthouse (Sale) - id: '3'
  // 4. Vipingo Ridge (Sale) - id: '4'
  // 5. Dubai Apartment (Sale) - id: '5'
  // 6. Hyde Park Townhouse (Sale) - id: '6'
  
  const featuredIds = ['1', 'r1', '3', '4', '5', '6'];
  const featuredProperties = properties.filter(p => featuredIds.includes(p.id));

  // Sort them to match the desired order
  const sortedProperties = featuredIds
    .map(id => featuredProperties.find(p => p.id === id))
    .filter((p): p is typeof properties[0] => p !== undefined);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Featured Properties</h2>
            <p className="text-gray-500 max-w-xl">
              Explore our hand-picked selection of the most exclusive properties in Kenya and premier international locations.
            </p>
          </div>
          <Link to="/buy" className="hidden md:block text-primary font-medium border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors uppercase text-sm tracking-wide">
            View All Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/buy" className="text-primary font-medium border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors uppercase text-sm tracking-wide">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
