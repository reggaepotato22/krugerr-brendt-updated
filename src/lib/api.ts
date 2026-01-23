// API Base URL - Change this to your actual domain in production
// For local dev without a PHP server, this will likely fail unless you mock it or run a PHP server on port 8000
const API_BASE = '/api'; 

export const api = {
  // Auth
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      return data;
    } catch (error) {
      console.warn("API Login Error (Check if PHP server is running):", error);
      throw error;
    }
  },

  // Properties
  getProperties: async () => {
    try {
      const res = await fetch(`${API_BASE}/properties.php`);
      if (!res.ok) return []; // Return empty if API fails (e.g. 404 in dev)
      return await res.json();
    } catch (error) {
      console.warn("API Error (Using local data):", error);
      return [];
    }
  },

  addProperty: async (propertyData) => {
    const res = await fetch(`${API_BASE}/properties.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData),
    });
    return await res.json();
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const res = await fetch(`${API_BASE}/upload.php`, {
      method: 'POST',
      body: formData,
    });
    return await res.json();
  },

  // Inquiries
  getInquiries: async () => {
    try {
        const res = await fetch(`${API_BASE}/inquiries.php`);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        return [];
    }
  },

  sendInquiry: async (inquiryData) => {
    const res = await fetch(`${API_BASE}/inquiries.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData),
    });
    return await res.json();
  },

  updateInquiryStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/inquiries.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    return await res.json();
  }
};
