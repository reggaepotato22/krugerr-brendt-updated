import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary-light text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <img 
            src="/krugerr-brendt-logo.png" 
            alt="Krugerr Brendt" 
            className="h-24 w-auto object-contain mb-6"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <h2 className="text-3xl font-serif text-primary tracking-widest mb-6 border-b-2 border-primary/30 pb-2">KRUGERR BRENDT</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl tracking-wide">
            Representing the most exquisite properties in Kenya and across the globe. <br/>
            An unyielding commitment to luxury, discretion, and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
          {/* Contact */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Contact</h4>
            <a href="https://maps.google.com/?q=Bofa+Rd,+Kilifi,+Kenya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors cursor-pointer group">
              <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm tracking-wide">Bofa Rd. - Kilifi, Kenya</span>
            </a>
            <a href="tel:+254733323273" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors cursor-pointer group">
              <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm tracking-wide">+254 733 323 273</span>
            </a>
            <a href="mailto:info@krugerrbrendt.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors cursor-pointer group">
              <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm tracking-wide">info@krugerrbrendt.com</span>
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Explore</h4>
            <div className="flex gap-8">
              <div className="flex flex-col gap-3">
                <Link to="/buy" className="text-sm text-gray-400 hover:text-primary transition-colors tracking-wide">Buy</Link>
                <Link to="/rent" className="text-sm text-gray-400 hover:text-primary transition-colors tracking-wide">Rent</Link>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/new-projects" className="text-sm text-gray-400 hover:text-primary transition-colors tracking-wide">New Projects</Link>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors tracking-wide">Contact</Link>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-secondary transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-secondary transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-secondary transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 tracking-widest uppercase">
          <p>
            © 2026 Krugerr Brendt International Limited.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/admin/crm" className="hover:text-white transition-colors opacity-50 hover:opacity-100">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
