import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export type Profile = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  type: 'Sale' | 'Rent';
  status: 'available' | 'sold' | 'rented';
  image_urls: string[];
  amenities: string[];
  beds: number;
  baths: number;
  sqft: number;
  coords: number[]; // [lat, lng]
  agent_id?: string;
  created_at: string;
};

export type Inquiry = {
  id: string;
  property_id?: string;
  customer_name: string;
  email: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
};
