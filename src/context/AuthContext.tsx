import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    if (email === 'admin@krugerrbrendt.com' && pass === 'admin123') {
      setUser({ id: 'local-admin', email, role: 'admin' });
      return;
    }
    throw new Error('Invalid admin credentials');
  };

  const signOut = async () => {
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
