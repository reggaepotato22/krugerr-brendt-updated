// API Base URL - Change this to your actual domain in production
// For local dev without a PHP server, this will likely fail unless you mock it or run a PHP server on port 8000
import { getLeads, saveLead, updateLeadStatus } from '../services/crm';
import { Property } from '../data/properties';

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
    try {
      const res = await fetch(`${API_BASE}/properties.php`);
      if (!res.ok || !isJson(res)) throw new Error("API unavailable");
      return await res.json();
    } catch (error) {
      console.warn("API Error (Using local data):", error);
      // Fallback to empty or local json if we had one
      return [];
    }
  },

  addProperty: async (propertyData: any) => {
    try {
        const res = await fetch(`${API_BASE}/properties.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
        });
        if (!res.ok || !isJson(res)) {
            const text = await res.text();
            throw new Error(`API Error: ${text.substring(0, 100)}`);
        }
        return await res.json();
    } catch (e) {
        console.error("Add Property Failed:", e);
        throw e;
    }
  },

  uploadImage: async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch(`${API_BASE}/upload.php`, {
        method: 'POST',
        body: formData,
        });
        
        if (!res.ok || !isJson(res)) throw new Error("Upload API unavailable");
        return await res.json();
    } catch (e) {
        console.warn("Upload failed, using placeholder");
        return { url: URL.createObjectURL(file) }; // Mock upload for local preview
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
        const localLeads = getLeads();
        // Map local format to API format
        return localLeads.map(l => ({
            id: l.id,
            customer_name: l.name,
            email: l.email,
            message: l.message,
            property_id: l.propertyId,
            property_title: l.propertyTitle,
            property_image: null,
            status: l.status,
            created_at: l.date
        }));
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
        console.warn("Using Local Storage for Saving Inquiry");
        // Extract phone from message if possible, or just save
        const phoneMatch = inquiryData.message.match(/Phone: (.*)/);
        const phone = phoneMatch ? phoneMatch[1] : '';
        
        saveLead({
            name: inquiryData.customer_name,
            email: inquiryData.email,
            phone: phone,
            message: inquiryData.message,
            propertyId: inquiryData.property_id,
            propertyTitle: inquiryData.subject // Using subject as proxy for title if not passed explicitly, usually formatted
        });
        return { message: "Saved locally" };
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
        updateLeadStatus(id, status as any);
        return { message: "Updated locally" };
    }
  }
};
