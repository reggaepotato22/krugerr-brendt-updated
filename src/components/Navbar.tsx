import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import CurrencySelector from './CurrencySelector';

const cn = (...inputs: (string | undefined | null | false)[]) => twMerge(clsx(inputs));

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'New Projects', href: '/new-projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'CRM', href: '/crm' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
          scrolled || !isHome ? 'bg-secondary/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand: Logo + Text */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Krugerr Brendt" 
                className={cn(
                  "h-12 md:h-16 w-auto object-contain transition-all duration-500 filter brightness-0 invert",
                  scrolled ? "h-10 md:h-12" : ""
                )}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden text-2xl font-serif text-white tracking-widest border-2 border-white p-2">KB</span>
            </div>
            <div className="flex flex-col items-start">
               <span className="text-lg md:text-xl font-serif text-white tracking-[0.2em] group-hover:text-primary transition-colors uppercase">KRUGERR BRENDT</span>
               <span className="text-[10px] md:text-xs font-medium text-primary tracking-[0.3em] uppercase">Real Estate</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/buy" className="text-xs font-medium tracking-widest text-white hover:text-primary transition-colors uppercase">
              Buy
            </Link>
            <Link to="/rent" className="text-xs font-medium tracking-widest text-white hover:text-primary transition-colors uppercase">
              Rent
            </Link>
            <Link to="/new-projects" className="text-xs font-medium tracking-widest text-white hover:text-primary transition-colors uppercase">
              New Projects
            </Link>
            <Link to="/contact" className="text-xs font-medium tracking-widest text-white hover:text-primary transition-colors uppercase">
              Contact
            </Link>
            <Link to="/crm" className="text-xs font-medium tracking-widest text-white hover:text-primary transition-colors uppercase">
              CRM
            </Link>
            
            <div className="h-4 w-px bg-white/20 mx-2" />
            
            <CurrencySelector />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <CurrencySelector />
             <button 
              className="text-white hover:text-primary transition-colors ml-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-secondary flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
