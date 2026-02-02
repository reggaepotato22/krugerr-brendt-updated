import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CRM = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('CRM Portal access is restricted to authorized agents.');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card border border-border p-8 rounded-sm shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-primary mb-2">Agent Portal</h1>
            <p className="text-muted-foreground text-sm">Secure CRM Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-input border border-border text-foreground px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                placeholder="agent@krugerrbrendt.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-input border border-border text-foreground px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 uppercase tracking-widest transition-colors"
            >
              Login
            </button>
            
            <div className="text-center mt-4">
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Forgot Password?</a>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CRM;
