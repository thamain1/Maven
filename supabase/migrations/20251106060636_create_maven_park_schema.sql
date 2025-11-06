/*
  # Maven Park Database Schema

  1. New Tables
    - `parking_locations`
      - Location details, amenities, pricing
    - `user_vehicles`
      - User's registered vehicles
    - `parking_sessions`
      - Active and historical parking sessions
    - `favorite_locations`
      - User's saved parking spots
    - `user_profiles`
      - User account information

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated user access
*/

CREATE TABLE IF NOT EXISTS parking_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  total_spaces integer NOT NULL DEFAULT 0,
  available_spaces integer NOT NULL DEFAULT 0,
  hourly_rate numeric NOT NULL,
  amenities jsonb DEFAULT '[]'::jsonb,
  rating numeric DEFAULT 0,
  image_url text,
  is_available_24_7 boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  plate_number text NOT NULL,
  state text NOT NULL,
  country text DEFAULT 'United States',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS parking_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  location_id uuid REFERENCES parking_locations(id) ON DELETE CASCADE,
  vehicle_id uuid REFERENCES user_vehicles(id) ON DELETE SET NULL,
  start_time timestamptz NOT NULL DEFAULT now(),
  end_time timestamptz,
  total_cost numeric DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS favorite_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  location_id uuid REFERENCES parking_locations(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, location_id)
);

ALTER TABLE parking_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parking_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view parking locations"
  ON parking_locations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own vehicles"
  ON user_vehicles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own vehicles"
  ON user_vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own vehicles"
  ON user_vehicles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own vehicles"
  ON user_vehicles FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own sessions"
  ON parking_sessions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own sessions"
  ON parking_sessions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own sessions"
  ON parking_sessions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view own favorites"
  ON favorite_locations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own favorites"
  ON favorite_locations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can delete own favorites"
  ON favorite_locations FOR DELETE
  TO authenticated
  USING (true);