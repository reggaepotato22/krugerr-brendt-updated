import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-8 md:mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Featured Properties</h2>
            <p className="text-muted-foreground max-w-xl text-sm md:text-base">
              Explore our hand-picked selection of the most exclusive properties in Kenya and premier international locations.
            </p>
          </div>
          <Link to="/buy" className="hidden md:block text-primary font-medium border-b-2 border-primary pb-1 hover:text-foreground hover:border-foreground transition-colors uppercase text-sm tracking-wide">
            View All Properties
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortedProperties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/buy" className="text-primary font-medium border-b-2 border-primary pb-1 hover:text-foreground hover:border-foreground transition-colors uppercase text-sm tracking-wide">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};


export default FeaturedProperties;
