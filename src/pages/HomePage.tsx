import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import MapSearch from '../components/MapSearch';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProperties />
        <MapSearch />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
