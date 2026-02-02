-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Venues Table
create table public.venues (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  distance text,      -- e.g., "0.8 miles"
  action text,        -- e.g., "5/10 NLH"
  buy_in text,        -- e.g., "$500-$2000"
  status text,        -- e.g., "Very Busy"
  tables integer default 0,
  image_url text,
  is_top_choice boolean default false
);

-- Create Sessions Table
create table public.sessions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid,       -- For now, we will use the demo ID: 00000000-0000-0000-0000-000000000000
  venue text not null,
  game text,          -- e.g., "No Limit Hold'em"
  profit numeric default 0,
  duration text,      -- e.g., "4h 30m"
  date timestamp with time zone default timezone('utc'::text, now()),
  is_live boolean default false,
  buy_in numeric,
  cash_out numeric
);

-- Enable Row Level Security (RLS)
-- For development/demo purposes, we will create policies that allow public access.
-- WARNING: In a production app with real users, you would restrict this to authenticated users only.

alter table public.venues enable row level security;
alter table public.sessions enable row level security;

-- Policy to allow anonymous read access to venues (public data)
create policy "Allow public read access on venues"
on public.venues for select
to anon
using (true);

-- Policy to allow generic access to sessions (for demo purposes)
-- In production, this should be: using (auth.uid() = user_id)
create policy "Allow all access on sessions for demo"
on public.sessions for all
to anon
using (true)
with check (true);

-- Insert Dummy Data for Venues
insert into public.venues (name, distance, action, buy_in, status, tables, is_top_choice)
values 
('The Bellagio', '0.8 miles', '5/10 NLH', '$500-$2000', 'Very Busy', 12, true),
('Aria Resort', '1.2 miles', '2/5 NLH', '$300-$1000', 'Moderate', 8, false),
('Wynn Poker', '2.5 miles', '10/20 PLO', '$1000+', 'Busy', 5, false);

-- Insert Dummy Data for Sessions
insert into public.sessions (user_id, venue, game, profit, duration, date, is_live)
values
('00000000-0000-0000-0000-000000000000', 'Bellagio', 'No Limit Hold''em', 1250, '6h 15m', now() - interval '1 day', false),
('00000000-0000-0000-0000-000000000000', 'Aria', 'Pot Limit Omaha', -400, '4h 00m', now() - interval '3 days', false);
