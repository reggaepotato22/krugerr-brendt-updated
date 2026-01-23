import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="pt-32 pb-12 container mx-auto px-6 flex-grow">
        <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif text-secondary mb-2">Terms & Conditions</h1>
          <p className="text-gray-400 text-sm mb-8">Last Updated: January 22, 2026</p>
          
          <div className="prose prose-stone max-w-none text-gray-600 space-y-6">
            <p>
              Welcome to Krugerr Brendt International. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-2">1. Acceptance of Terms</h3>
            <p>
              By accessing this website, you accept these Terms and Conditions in full. If you disagree with any part of these terms, you must not use our website.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-2">2. Intellectual Property</h3>
            <p>
              Unless otherwise stated, Krugerr Brendt International owns the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages for your own personal use subject to restrictions set in these terms.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-2">3. Property Information</h3>
            <p>
              The property details, prices, and availability listed on this website are for information purposes only and subject to change without notice. We make every effort to ensure accuracy, but we do not guarantee the completeness or correctness of the information.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-2">4. Limitation of Liability</h3>
            <p>
              Krugerr Brendt International shall not be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use materials on this website.
            </p>

            <h3 className="text-xl font-bold text-secondary mt-6 mb-2">5. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Kenya, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
