import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { properties as initialProperties, Property } from '../data/properties';
import { supabase } from '../lib/supabase';

// Extend Property type to include optional fields for analytics/management
export interface ExtendedProperty extends Property {
  visits?: number;
  isLocal?: boolean; // True if created via Admin Dashboard (stored in localStorage)
  dateAdded?: string;
  status?: 'available' | 'sold' | 'rented';
  supabaseId?: string; // ID from Supabase
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

  // Load properties from Supabase + LocalStorage + Hardcoded
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // 1. Try Fetching from Supabase
        let supabaseProperties: ExtendedProperty[] = [];
        try {
          const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          
          if (data) {
            supabaseProperties = data.map((p: any) => ({
              id: p.id?.toString() || p.supabase_id,
              supabaseId: p.id,
              title: p.title,
              price: p.price, // Ensure format matches (string/number handling might be needed)
              location: p.location,
              type: p.type,
              beds: p.beds,
              baths: p.baths,
              sqft: p.sqft,
              images: p.image_urls || p.images || [],
              description: p.description,
              amenities: p.amenities,
              coords: p.coords,
              visits: p.visits || 0,
              isLocal: false,
              dateAdded: p.created_at,
              status: p.status || 'available'
            }));
          }
        } catch (sbError) {
          console.warn("Supabase fetch failed (using local/demo mode):", sbError);
        }

        // 2. Get Local Properties (Admin created, fallback/demo)
        const localPropsStr = localStorage.getItem('kb_properties');
        const localProps: ExtendedProperty[] = localPropsStr ? JSON.parse(localPropsStr) : [];
        
        // 3. Get Analytics (Visits) - Merge with Supabase/Local data
        const analyticsStr = localStorage.getItem('kb_analytics');
        const analytics: Record<string, number> = analyticsStr ? JSON.parse(analyticsStr) : {};

        // 4. Merge Hardcoded Properties with Analytics
        // Only add hardcoded if we didn't get a full DB response, or if we want to mix them.
        // Strategy: Always show hardcoded for demo, unless Supabase has data (which replaces them?)
        // Better: Show Supabase + Local. If both empty, show Hardcoded.
        
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

        // Combine: Supabase > Local > Hardcoded
        // If Supabase has data, we prioritize it.
        // We dedup by ID just in case.
        const allProps = [...supabaseProperties, ...localPropsWithStats, ...hardcodedPropsWithStats];
        
        // Remove duplicates based on ID
        const uniqueProps = Array.from(new Map(allProps.map(item => [item.id, item])).values());

        setProperties(uniqueProps);
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
    // 1. Try Supabase
    try {
      const sbPayload = {
        title: newProperty.title,
        price: newProperty.price,
        location: newProperty.location,
        type: newProperty.type,
        beds: newProperty.beds,
        baths: newProperty.baths,
        sqft: newProperty.sqft,
        images: newProperty.images,
        description: newProperty.description,
        amenities: newProperty.amenities,
        coords: newProperty.coords,
        status: newProperty.status || 'available',
        visits: 0
      };

      const { data, error } = await supabase
        .from('properties')
        .insert([sbPayload])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        // Success! Add to state
        const addedProp: ExtendedProperty = {
            ...newProperty,
            id: data[0].id.toString(),
            supabaseId: data[0].id,
            dateAdded: data[0].created_at,
            isLocal: false
        };
        setProperties(prev => [addedProp, ...prev]);
        return;
      }
    } catch (sbError) {
      console.warn("Supabase insert failed, falling back to local storage:", sbError);
    }

    // 2. Fallback to Local Storage
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
    // Check if it's a Supabase property
    const target = properties.find(p => p.id === id);
    
    if (target?.supabaseId || (target && !target.isLocal && !initialProperties.find(ip => ip.id === id))) {
       // Try Supabase Update
       try {
         const { error } = await supabase
           .from('properties')
           .update(updates)
           .eq('id', target.supabaseId || id);
           
         if (error) throw error;
       } catch (e) {
         console.error("Supabase update failed:", e);
       }
    }

    // Update Local State & Storage
    const updatedProps = properties.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    
    // Split into local vs non-local for storage saving
    const localOnly = updatedProps.filter(p => p.isLocal);
    localStorage.setItem('kb_properties', JSON.stringify(localOnly));
    setProperties(updatedProps);
  };

  const deleteProperty = async (id: string) => {
     // Check if Supabase
     const target = properties.find(p => p.id === id);
     if (target?.supabaseId) {
        try {
            await supabase.from('properties').delete().eq('id', target.supabaseId);
        } catch (e) {
            console.error("Supabase delete failed:", e);
        }
     }

    const updatedProps = properties.filter(p => p.id !== id);
    saveLocalProperties(updatedProps); // This only saves isLocal=true ones
    setProperties(updatedProps);
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
