// API Base URL - Change this to your actual domain in production
// For local dev without a PHP server, this will likely fail unless you mock it or run a PHP server on port 8000
const API_BASE = '/api'; 

// Helper to check if response is valid JSON
const isJson = (response: Response) => {
    const contentType = response.headers.get("content-type");
    return contentType && contentType.indexOf("application/json") !== -1;
};

export const api = {
  // Auth - Deprecated, use Supabase AuthContext instead
  // login: async (email, password) => { ... },

  // Properties
  getProperties: async () => {
    // ... existing implementation or delegate to PropertyContext logic
    // For now, we leave this as is since PropertyContext handles the main logic
    return []; 
  },

  addProperty: async (propertyData: any) => {
     // ... existing implementation
     return {};
  },

  uploadImage: async (file: File) => {
    try {
      // Try PHP API (if deployed with /api/upload.php)
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch(`${API_BASE}/upload.php`, {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok || !isJson(res)) throw new Error("Upload API unavailable");
      return await res.json();
    } catch (phpError) {
      console.warn("Image upload API unavailable, using local preview URL (demo mode)");
      return { url: URL.createObjectURL(file) }; // Local-only preview
    }
  },

  // Inquiries

  getInquiries: async () => {
    try {
      const res = await fetch(`${API_BASE}/inquiries.php`);
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (e) {
      console.warn("Using Local Storage for Inquiries");
      // Use krugerr_inquiries to match InquiryContext
      const saved = localStorage.getItem('krugerr_inquiries');
      return saved ? JSON.parse(saved) : [];
    }
  },

  sendInquiry: async (inquiryData: any) => {
    try {
      const res = await fetch(`${API_BASE}/inquiries.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData),
      });
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (e) {
      console.warn("API Error (Using Local Storage for Demo):", e);
      // Fallback: Save to Local Storage (krugerr_inquiries)
      const saved = localStorage.getItem('krugerr_inquiries');
      const inquiries = saved ? JSON.parse(saved) : [];
      
      const newInquiry = {
        ...inquiryData,
        id: Math.random().toString(36).substr(2, 9),
        status: 'new',
        date: new Date().toISOString()
      };
      
      inquiries.unshift(newInquiry);
      localStorage.setItem('krugerr_inquiries', JSON.stringify(inquiries));
      
      // Simulate WhatsApp Notification
      console.log(`[DEMO MODE] WhatsApp Notification Sent:`, inquiryData);

      return { message: "Inquiry saved locally (Demo Mode)", id: newInquiry.id };
    }
  },

  updateInquiryStatus: async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_BASE}/inquiries.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (e) {
        // Local fallback
        const saved = localStorage.getItem('krugerr_inquiries');
        if (saved) {
            const inquiries = JSON.parse(saved);
            const updated = inquiries.map((i: any) => i.id === id ? { ...i, status } : i);
            localStorage.setItem('krugerr_inquiries', JSON.stringify(updated));
        }
        return { message: "Updated locally" };
    }
  },

  updateInquiryNotes: async (id: string, notes: string) => {
    try {
      const res = await fetch(`${API_BASE}/inquiries.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, notes, action: 'update_notes' }),
      });
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (e) {
        // Local fallback
        const saved = localStorage.getItem('krugerr_inquiries');
        if (saved) {
            const inquiries = JSON.parse(saved);
            const updated = inquiries.map((i: any) => i.id === id ? { ...i, notes } : i);
            localStorage.setItem('krugerr_inquiries', JSON.stringify(updated));
        }
        return { message: "Updated locally" };
    }
  },

  // Chats
  getChats: async () => {
    try {
      const res = await fetch(`${API_BASE}/chats.php`);
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (e) {
      console.warn("Using Local Storage for Chats");
      const saved = localStorage.getItem('krugerr_chats');
      return saved ? JSON.parse(saved) : [];
    }
  },

  startChatSession: async (session: any) => {
    try {
      const res = await fetch(`${API_BASE}/chats.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...session, action: 'start_session' }),
      });
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (e) {
      // Local fallback
      const saved = localStorage.getItem('krugerr_chats');
      const sessions = saved ? JSON.parse(saved) : [];
      sessions.unshift(session);
      localStorage.setItem('krugerr_chats', JSON.stringify(sessions));
      return { message: "Session started locally" };
    }
  },

  addChatMessage: async (sessionId: string, message: any) => {
    try {
      const res = await fetch(`${API_BASE}/chats.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, ...message, action: 'add_message' }),
      });
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (e) {
      // Local fallback
      const saved = localStorage.getItem('krugerr_chats');
      if (saved) {
        const sessions = JSON.parse(saved);
        const updated = sessions.map((s: any) => {
          if (s.id === sessionId) {
            return {
              ...s,
              messages: [...s.messages, message],
              lastMessageTime: message.timestamp
            };
          }
          return s;
        });
        localStorage.setItem('krugerr_chats', JSON.stringify(updated));
      }
      return { message: "Message added locally" };
    }
  },

  deleteChatSession: async (sessionId: string) => {
    try {
      const res = await fetch(`${API_BASE}/chats.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, action: 'delete_session' }),
      });
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (e) {
      // Local fallback
      const saved = localStorage.getItem('krugerr_chats');
      if (saved) {
        const sessions = JSON.parse(saved);
        const updated = sessions.filter((s: any) => s.id !== sessionId);
        localStorage.setItem('krugerr_chats', JSON.stringify(updated));
      }
      return { message: "Session deleted locally" };
    }
  }
};
