import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

export interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: string;
  isAction?: boolean;
  propertyId?: string | number;
}

export interface ChatSession {
  id: string;
  startTime: string;
  lastMessageTime: string;
  messages: ChatMessage[];
  status: 'active' | 'archived';
  userName?: string;
  userPhone?: string;
}

interface ChatContextType {
  sessions: ChatSession[];
  allSessions: ChatSession[];
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;
  startSession: (userName?: string, userPhone?: string) => string;
  addMessage: (sessionId: string, text: string, isBot: boolean, isAction?: boolean, propertyId?: string | number) => void;
  deleteSession: (sessionId: string) => void;
  getStats: () => { totalSessions: number; totalMessages: number };
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allSessions, setAllSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [mySessionIds, setMySessionIds] = useState<string[]>(() => {
    try {
        return JSON.parse(localStorage.getItem('krugerr_my_sessions') || '[]');
    } catch {
        return [];
    }
  });

  const sessions = allSessions.filter(s => mySessionIds.includes(s.id));

  const loadChats = async () => {
    try {
      const data = await api.getChats();
      // Ensure data matches interface
      const mapped = data.map((s: any) => ({
        id: s.id,
        startTime: s.startTime || s.start_time,
        lastMessageTime: s.lastMessageTime || s.last_message_time,
        messages: s.messages || [],
        status: s.status || 'active',
        userName: s.userName,
        userPhone: s.userPhone
      }));
      setAllSessions(mapped);
    } catch (e) {
      console.error("Failed to load chats", e);
    }
  };

  useEffect(() => {
    loadChats();
    // Do not load from localStorage to allow refresh to clear session
    // const savedSessionId = localStorage.getItem('krugerr_current_session_id');
    // if (savedSessionId) {
    //   setCurrentSessionId(savedSessionId);
    // }

    // Listen for storage changes (cross-tab sync for local mode)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'krugerr_chats') {
        loadChats();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Poll for updates every 10 seconds (for Admin view when using API)
    const pollInterval = setInterval(loadChats, 10000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }, []);

  useEffect(() => {
    if (currentSessionId) {
      localStorage.setItem('krugerr_current_session_id', currentSessionId);
    }
  }, [currentSessionId]);

  const startSession = (userName?: string, userPhone?: string) => {
    const newSessionId = Math.random().toString(36).substr(2, 9);
    const newSession: ChatSession = {
      id: newSessionId,
      startTime: new Date().toISOString(),
      lastMessageTime: new Date().toISOString(),
      messages: [],
      status: 'active',
      userName,
      userPhone
    };
    setAllSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    
    // Update My Sessions
    const updatedMySessions = [...mySessionIds, newSessionId];
    setMySessionIds(updatedMySessions);
    localStorage.setItem('krugerr_my_sessions', JSON.stringify(updatedMySessions));
    
    // Sync to backend/storage
    api.startChatSession(newSession).catch(err => console.error("Failed to start session remotely", err));
    
    return newSessionId;
  };

  const addMessage = (sessionId: string, text: string, isBot: boolean, isAction?: boolean, propertyId?: string | number) => {
    const newMessage: ChatMessage = {
      text,
      isBot,
      timestamp: new Date().toISOString(),
      isAction,
      propertyId
    };

    setAllSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          messages: [...session.messages, newMessage],
          lastMessageTime: new Date().toISOString()
        };
      }
      return session;
    }));

    // Sync to backend/storage
    api.addChatMessage(sessionId, newMessage).catch(err => console.error("Failed to add message remotely", err));
  };

  const deleteSession = (sessionId: string) => {
     setAllSessions(prev => prev.filter(s => s.id !== sessionId));
     api.deleteChatSession(sessionId).catch(err => console.error("Failed to delete session", err));
  };

  const getStats = () => {
    const totalSessions = allSessions.length;
    const totalMessages = allSessions.reduce((acc, session) => acc + session.messages.length, 0);
    return { totalSessions, totalMessages };
  };

  return (
    <ChatContext.Provider value={{ sessions, allSessions, currentSessionId, setCurrentSessionId, startSession, addMessage, deleteSession, getStats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
