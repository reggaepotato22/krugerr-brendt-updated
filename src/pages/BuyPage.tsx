import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../hooks/useProperties';
import { motion } from 'framer-motion';

const BuyPage = () => {
  const { properties } = useProperties();
  const saleProperties = properties.filter(p => p.type === 'Sale');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <img 
             src="https://images.unsplash.com/photo-1600596542815-e32c630bd1ba?q=80&w=2074&auto=format&fit=crop" 
             alt="Background" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-serif mb-4 tracking-wider text-secondary-foreground"
          >
            Exclusive Portfolio
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-foreground/80 text-lg max-w-2xl mx-auto font-light tracking-wide"
          >
            Discover our handpicked collection of premier properties for sale in the world's most sought-after locations.
          </motion.p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-6 py-16">
        {/* Filters (Simplified) */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button className="px-6 py-2 bg-secondary text-secondary-foreground text-sm uppercase tracking-widest rounded-sm hover:bg-primary hover:text-secondary transition-colors">All</button>
          <button className="px-6 py-2 bg-card border border-border text-muted-foreground text-sm uppercase tracking-widest rounded-sm hover:border-primary hover:text-primary transition-colors">Villas</button>
          <button className="px-6 py-2 bg-card border border-border text-muted-foreground text-sm uppercase tracking-widest rounded-sm hover:border-primary hover:text-primary transition-colors">Apartments</button>
          <button className="px-6 py-2 bg-card border border-border text-muted-foreground text-sm uppercase tracking-widest rounded-sm hover:border-primary hover:text-primary transition-colors">Land</button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {saleProperties.map((property, index) => (
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

        {saleProperties.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl text-muted-foreground">No properties found matching your criteria.</h3>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyPage;