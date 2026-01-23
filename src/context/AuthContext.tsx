import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../lib/api';

// Simple User Interface matching the PHP API response
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('kb_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('kb_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    // Call PHP API
    const data = await api.login(email, pass);
    if (data.token && data.user) {
      setUser(data.user);
      localStorage.setItem('kb_user', JSON.stringify(data.user));
      localStorage.setItem('kb_token', data.token);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('kb_user');
    localStorage.removeItem('kb_token');
  };

  const value = {
    user,
    loading,
    isAdmin: user?.role === 'admin',
    login,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
