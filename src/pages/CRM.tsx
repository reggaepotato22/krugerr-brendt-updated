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
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-secondary/50 backdrop-blur-sm border border-white/10 p-8 rounded-sm shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-primary mb-2">Agent Portal</h1>
            <p className="text-gray-400 text-sm">Secure CRM Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="agent@krugerrbrendt.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-secondary font-bold py-3 uppercase tracking-widest transition-colors"
            >
              Login
            </button>
            
            <div className="text-center mt-4">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Forgot Password?</a>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default CRM;
