-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'client')) default 'client',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security for Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

-- Goals table
create table goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  current_value numeric default 0,
  target_value numeric not null,
  unit text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habits table
create table habits (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  title text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habit Logs (for history)
create table habit_logs (
  id uuid default uuid_generate_v4() primary key,
  habit_id uuid references habits(id) not null,
  completed_at date default current_date not null,
  unique(habit_id, completed_at)
);

-- Metrics table (Performance Score)
create table metrics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  score integer check (score >= 0 and score <= 100),
  date date default current_date not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Time Logs (Admin)
create table time_logs (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references profiles(id) not null,
  hours numeric not null,
  notes text,
  date date default current_date not null,
  is_invoiced boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
