-- ============================================================================
-- RESET COMMANDS (Run these to clear existing data)
-- ============================================================================
-- 1. DELETE ALL DATA (Keeps tables)
-- TRUNCATE TABLE sessions, venues RESTART IDENTITY;

-- 2. DROP TABLES (Complete Reset)
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS venues;

-- ============================================================================
-- SCHEMA SETUP
-- ============================================================================

-- 1. Venues Table (for Game Locator)
CREATE TABLE venues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    distance TEXT,
    action TEXT,
    buy_in TEXT,
    status TEXT,
    tables INTEGER DEFAULT 0,
    image_url TEXT,
    is_top_choice BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE to READ venues (Public Info)
CREATE POLICY "Public venues are viewable by everyone" 
ON venues FOR SELECT 
USING (true);

-- Allow authenticated users to insert (optional, for admin/community updates)
-- For now, maybe restricted or just authenticated
CREATE POLICY "Authenticated users can insert venues" 
ON venues FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 2. Sessions Table (for Strategy/Tracker)
CREATE TABLE sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL, -- Links to Supabase Auth User
    venue TEXT NOT NULL,
    game TEXT NOT NULL,
    duration TEXT,
    profit NUMERIC DEFAULT 0,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_live BOOLEAN DEFAULT false,
    buy_in NUMERIC,
    cash_out NUMERIC
);

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their OWN sessions
CREATE POLICY "Users can view own sessions" 
ON sessions FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can insert their OWN sessions
CREATE POLICY "Users can insert own sessions" 
ON sessions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their OWN sessions
CREATE POLICY "Users can update own sessions" 
ON sessions FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy: Users can delete their OWN sessions
CREATE POLICY "Users can delete own sessions" 
ON sessions FOR DELETE 
USING (auth.uid() = user_id);

-- ============================================================================
-- SEED DATA (Optional - Run to add some initial venues)
-- ============================================================================
INSERT INTO venues (name, distance, action, buy_in, status, tables, image_url, is_top_choice)
VALUES 
    ('The Grand Casino', '2.4 mi', 'High', '$2/$5 NLH', 'Live', 12, 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80', true),
    ('Poker Room Downtown', '5.1 mi', 'Medium', '$1/$3 NLH', 'Waitlist (3)', 8, 'https://images.unsplash.com/photo-1596838132731-3313274e1e35?w=800&q=80', false),
    ('Riverside Card Club', '8.7 mi', 'Low', '$1/$2 PLO', 'Open', 4, 'https://images.unsplash.com/photo-1605870445919-838d190e8e12?w=800&q=80', false);
