import React, { createContext, useContext, useState, useEffect } from 'react';

interface VisitContextType {
  totalVisits: number;
  incrementVisit: () => void;
  getVisitStats: () => { totalVisits: number; uniqueVisitors: number };
}

const VisitContext = createContext<VisitContextType | undefined>(undefined);

export const VisitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [uniqueVisitors, setUniqueVisitors] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedVisits = localStorage.getItem('site_visits');
    const savedUnique = localStorage.getItem('site_unique_visitors');
    
    if (savedVisits) setTotalVisits(parseInt(savedVisits, 10));
    if (savedUnique) setUniqueVisitors(parseInt(savedUnique, 10));
    
    // Increment visit on session start (simple implementation)
    // In a real app, this would be more complex session tracking
    const sessionKey = 'current_session_' + new Date().toDateString();
    if (!sessionStorage.getItem(sessionKey)) {
      incrementVisit();
      sessionStorage.setItem(sessionKey, 'true');
      
      // Check for unique visitor
      if (!localStorage.getItem('visitor_id')) {
        const newUniqueCount = (parseInt(savedUnique || '0', 10)) + 1;
        setUniqueVisitors(newUniqueCount);
        localStorage.setItem('site_unique_visitors', newUniqueCount.toString());
        localStorage.setItem('visitor_id', crypto.randomUUID());
      }
    }
  }, []);

  const incrementVisit = () => {
    setTotalVisits(prev => {
      const newVal = prev + 1;
      localStorage.setItem('site_visits', newVal.toString());
      return newVal;
    });
  };

  const getVisitStats = () => {
    return {
      totalVisits,
      uniqueVisitors
    };
  };

  return (
    <VisitContext.Provider value={{ totalVisits, incrementVisit, getVisitStats }}>
      {children}
    </VisitContext.Provider>
  );
};

export const useVisits = () => {
  const context = useContext(VisitContext);
  if (context === undefined) {
    throw new Error('useVisits must be used within a VisitProvider');
  }
  return context;
};
