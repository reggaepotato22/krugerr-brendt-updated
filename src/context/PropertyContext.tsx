import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { properties as initialProperties, Property } from '../data/properties';

// Extend Property type to include optional fields for analytics/management
export interface ExtendedProperty extends Property {
  visits?: number;
  isLocal?: boolean; // True if created via Admin Dashboard (stored in localStorage)
  dateAdded?: string;
  status?: 'available' | 'sold' | 'rented';
  supabaseId?: string; // ID from Supabase (unused in demo mode)
}

interface PropertyContextType {
  properties: ExtendedProperty[];
  loading: boolean;
  addProperty: (property: ExtendedProperty) => Promise<void>;
  updateProperty: (id: string, updates: Partial<ExtendedProperty>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  getPropertyById: (id: string) => ExtendedProperty | undefined;
  incrementVisits: (id: string) => void;
  getStats: () => { totalProperties: number; totalVisits: number; totalInquiries: number };
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<ExtendedProperty[]>([]);
  const [loading, setLoading] = useState(true);

  // Load properties from LocalStorage + Hardcoded (standalone demo mode)
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 1. Get Local Properties (Admin created)
        const localPropsStr = localStorage.getItem('kb_properties');
        const localProps: ExtendedProperty[] = localPropsStr ? JSON.parse(localPropsStr) : [];
        
        // 2. Get Analytics (Visits)
        const analyticsStr = localStorage.getItem('kb_analytics');
        const analytics: Record<string, number> = analyticsStr ? JSON.parse(analyticsStr) : {};

        // 3. Merge Hardcoded Properties with Analytics
        
        const hardcodedPropsWithStats = initialProperties.map(p => ({
          ...p,
          visits: analytics[p.id] || 0,
          isLocal: false,
          status: 'available' as const
        }));

        const localPropsWithStats = localProps.map(p => ({
          ...p,
          visits: analytics[p.id] || 0,
          isLocal: true
        }));

        const allProps = [...localPropsWithStats, ...hardcodedPropsWithStats];
        setProperties(allProps);
      } catch (error) {
        console.error("Failed to load property data:", error);
        setProperties(initialProperties);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Listen for storage changes (cross-tab sync for local mode)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kb_properties' || e.key === 'kb_analytics') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save Local Properties to LocalStorage
  const saveLocalProperties = (updatedProperties: ExtendedProperty[]) => {
    const localOnly = updatedProperties.filter(p => p.isLocal);
    localStorage.setItem('kb_properties', JSON.stringify(localOnly));
    setProperties(updatedProperties);
  };

  const addProperty = async (newProperty: ExtendedProperty) => {
    // Local Storage only (demo mode)
    const propertyWithMeta = {
      ...newProperty,
      id: newProperty.id || Date.now().toString(),
      isLocal: true,
      visits: 0,
      dateAdded: new Date().toISOString()
    };
    const updated = [propertyWithMeta, ...properties];
    saveLocalProperties(updated);
  };

  const updateProperty = async (id: string, updates: Partial<ExtendedProperty>) => {
    // Update Local State & Storage (demo mode)
    const updatedProps = properties.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    
    saveLocalProperties(updatedProps);
  };

  const deleteProperty = async (id: string) => {
    const updatedProps = properties.filter(p => p.id !== id);
    saveLocalProperties(updatedProps);
  };



  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  const incrementVisits = (id: string) => {
    setProperties(prev => {
      const updated = prev.map(p => {
        if (p.id === id) {
          return { ...p, visits: (p.visits || 0) + 1 };
        }
        return p;
      });
      
      // Update Analytics Storage
      const analyticsStr = localStorage.getItem('kb_analytics');
      const analytics = analyticsStr ? JSON.parse(analyticsStr) : {};
      analytics[id] = (analytics[id] || 0) + 1;
      localStorage.setItem('kb_analytics', JSON.stringify(analytics));

      return updated;
    });
  };

  const getStats = () => {
    const totalProperties = properties.length;
    const totalVisits = properties.reduce((acc, curr) => acc + (curr.visits || 0), 0);
    // Inquiries would typically come from another context/storage, but for now we'll placeholder it
    // or fetch from CRM storage if possible.
    const inquiriesStr = localStorage.getItem('kb_leads');
    const totalInquiries = inquiriesStr ? JSON.parse(inquiriesStr).length : 0;

    return { totalProperties, totalVisits, totalInquiries };
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      loading,
      addProperty,
      updateProperty,
      deleteProperty,
      getPropertyById,
      incrementVisits,
      getStats
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
