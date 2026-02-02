import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="pt-32 pb-12 container mx-auto px-6 flex-grow">
        <div className="bg-card p-8 md:p-12 shadow-sm rounded-sm max-w-4xl mx-auto border border-border">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm mb-8">Last Updated: January 22, 2026</p>
          
          <div className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <p>
              At Krugerr Brendt International, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or engage with our services.
            </p>

            <h3 className="text-xl font-bold text-foreground mt-6 mb-2">1. Information We Collect</h3>
            <p>
              We may collect personal information such as your name, email address, phone number, and property preferences when you fill out forms on our site, subscribe to our newsletter, or contact our agents.
            </p>

            <h3 className="text-xl font-bold text-foreground mt-6 mb-2">2. How We Use Your Information</h3>
            <p>
              Your information is used to:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provide and personalize our real estate services.</li>
                <li>Communicate with you regarding inquiries and property updates.</li>
                <li>Improve our website functionality and user experience.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </p>

            <h3 className="text-xl font-bold text-foreground mt-6 mb-2">3. Data Security</h3>
            <p>
              We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>

            <h3 className="text-xl font-bold text-foreground mt-6 mb-2">4. Third-Party Sharing</h3>
            <p>
              We do not sell or rent your personal information. We may share data with trusted service providers who assist us in operating our website or conducting our business, provided they agree to keep this information confidential.
            </p>

            <h3 className="text-xl font-bold text-foreground mt-6 mb-2">5. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@krugerrbrendt.com" className="text-primary hover:underline">info@krugerrbrendt.com</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
