
-- 1. Enable Row Level Security (RLS) on all tables
-- This is a best practice to ensure data security by default.

-- 2. Create 'profiles' table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read profiles (or just admins? User said "Everyone can READ" for properties, but for profiles, maybe just the user themselves?)
-- Let's stick to: Users can read their own profile. Admins can read all.
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 3. Create 'properties' table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  currency TEXT DEFAULT 'KES',
  location TEXT,
  type TEXT CHECK (type IN ('Sale', 'Rent')),
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented')),
  image_urls TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  beds INTEGER DEFAULT 0,
  baths INTEGER DEFAULT 0,
  sqft INTEGER DEFAULT 0,
  coords NUMERIC[] DEFAULT '{}', -- Store as array [lat, lng]
  agent_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can READ properties
CREATE POLICY "Public profiles are viewable by everyone" ON public.properties
  FOR SELECT USING (true);

-- Policy: Only admins can INSERT, UPDATE, DELETE
CREATE POLICY "Admins can insert properties" ON public.properties
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update properties" ON public.properties
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete properties" ON public.properties
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 4. Create 'inquiries' table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can INSERT an inquiry (public lead generation)
CREATE POLICY "Public can insert inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Policy: Only admins can VIEW inquiries
CREATE POLICY "Admins can view inquiries" ON public.inquiries
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
  
CREATE POLICY "Admins can update inquiries" ON public.inquiries
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 5. Storage Bucket Setup (This usually requires dashboard action or specific SQL function if enabled)
-- Creating a bucket via SQL is possible if the storage extension is enabled.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Allow public access to view images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');

-- Allow admins to upload/delete
CREATE POLICY "Admins can upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'property-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'property-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'property-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 6. Functions & Triggers
-- Automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 7. Seed Data (Admin User)
-- Note: You cannot insert into auth.users directly securely via standard SQL in some environments without superuser.
-- Ideally, create the user in the dashboard, then manually update their role in the profiles table.
-- HOWEVER, to follow instructions, here is a snippet that assumes we can insert into profiles.
-- The user must sign up manually first, OR we use the dashboard to create the user.
--
-- INSTRUCTIONS FOR ADMIN SETUP:
-- 1. Go to Authentication -> Users in Supabase Dashboard.
-- 2. Click "Invite" or "Create User".
-- 3. Email: admin@krugerrbrendt.com
-- 4. Password: admin123
-- 5. Once created, go to the SQL Editor and run:
--    UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@krugerrbrendt.com';

