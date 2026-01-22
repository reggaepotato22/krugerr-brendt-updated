import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">{title}</h1>
          <p className="text-gray-500">This page is currently under construction.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
