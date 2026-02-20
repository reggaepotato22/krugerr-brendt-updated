import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, hasSupabaseEnv } from '../lib/supabase';

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

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error || !data) {
        // Fallback: Check if user metadata has role, or default based on email
        // This is a temporary fallback to ensure access if the profiles table is empty
        setUser({
            id: userId,
            email: email,
            role: email.includes('admin') ? 'admin' : 'user' 
        });
      } else {
        setUser({
            id: data.id,
            email: data.email,
            role: data.role
        });
      }
    } catch (e) {
        console.error("Profile fetch error", e);
        setUser({ id: userId, email, role: 'user' });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasSupabaseEnv) {
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
         fetchProfile(session.user.id, session.user.email!);
      } else {
        setLoading(false);
      }
    }).catch(err => {
      console.error("Auth session check failed:", err);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
         fetchProfile(session.user.id, session.user.email ?? '');
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, pass: string) => {
    if (!hasSupabaseEnv) {
      if (email === 'admin@krugerrbrendt.com' && pass === 'admin123') {
        setUser({ id: 'local-admin', email, role: 'admin' });
        return;
      }
      throw new Error('Invalid admin credentials');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    if (hasSupabaseEnv) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('kb_user'); // Cleanup legacy local storage if present
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
