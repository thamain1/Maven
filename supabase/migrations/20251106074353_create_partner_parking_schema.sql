/*
  # Partner Parking Schema

  ## Overview
  Creates tables and policies for the Partner Parking feature, enabling users to reserve
  multiple adjacent parking spaces for groups (family, friends, guests).

  ## New Tables

  ### 1. `group_reservations`
  Core table for group parking reservations
  - `id` (uuid, primary key) - Unique reservation identifier
  - `user_id` (uuid) - Reference to the user creating the reservation
  - `location_id` (text) - Parking location identifier
  - `location_name` (text) - Name of parking location
  - `num_spaces` (integer) - Number of spaces reserved (2-5)
  - `layout_preference` (text) - Preferred layout: 'side-by-side' or 'same-row'
  - `row_number` (text, nullable) - Assigned row in parking lot
  - `space_numbers` (text[], nullable) - Array of assigned space numbers
  - `reservation_date` (timestamptz) - Date and time of reservation
  - `duration_hours` (integer) - Duration in hours
  - `total_cost` (decimal) - Total cost for all spaces
  - `status` (text) - Status: 'pending', 'confirmed', 'active', 'completed', 'cancelled'
  - `created_at` (timestamptz) - Timestamp of creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ### 2. `group_participants`
  Participants/guests in group reservations
  - `id` (uuid, primary key) - Unique participant identifier
  - `reservation_id` (uuid) - Reference to group reservation
  - `name` (text) - Participant name
  - `contact` (text, nullable) - Phone or email
  - `vehicle_id` (text, nullable) - License plate or vehicle identifier
  - `space_number` (text, nullable) - Assigned space number
  - `notify` (boolean) - Whether to send notifications
  - `notification_sent` (boolean) - Track if notification was sent
  - `created_at` (timestamptz) - Timestamp of creation

  ## Security
  - Enable RLS on all tables
  - Users can only view and manage their own reservations
  - Authenticated users can create reservations
  - Users can view participants for their reservations only
*/

-- Create group_reservations table
CREATE TABLE IF NOT EXISTS group_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  location_id text NOT NULL,
  location_name text NOT NULL,
  num_spaces integer NOT NULL CHECK (num_spaces >= 2 AND num_spaces <= 5),
  layout_preference text NOT NULL DEFAULT 'side-by-side' CHECK (layout_preference IN ('side-by-side', 'same-row')),
  row_number text,
  space_numbers text[],
  reservation_date timestamptz NOT NULL,
  duration_hours integer NOT NULL DEFAULT 2,
  total_cost decimal(10, 2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create group_participants table
CREATE TABLE IF NOT EXISTS group_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id uuid NOT NULL REFERENCES group_reservations(id) ON DELETE CASCADE,
  name text NOT NULL,
  contact text,
  vehicle_id text,
  space_number text,
  notify boolean DEFAULT false,
  notification_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE group_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for group_reservations
CREATE POLICY "Users can view own reservations"
  ON group_reservations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reservations"
  ON group_reservations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reservations"
  ON group_reservations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reservations"
  ON group_reservations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for group_participants
CREATE POLICY "Users can view participants for own reservations"
  ON group_participants
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_reservations
      WHERE group_reservations.id = group_participants.reservation_id
      AND group_reservations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add participants to own reservations"
  ON group_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM group_reservations
      WHERE group_reservations.id = group_participants.reservation_id
      AND group_reservations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update participants for own reservations"
  ON group_participants
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_reservations
      WHERE group_reservations.id = group_participants.reservation_id
      AND group_reservations.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM group_reservations
      WHERE group_reservations.id = group_participants.reservation_id
      AND group_reservations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete participants from own reservations"
  ON group_participants
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM group_reservations
      WHERE group_reservations.id = group_participants.reservation_id
      AND group_reservations.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_group_reservations_user_id ON group_reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_group_reservations_status ON group_reservations(status);
CREATE INDEX IF NOT EXISTS idx_group_reservations_location ON group_reservations(location_id);
CREATE INDEX IF NOT EXISTS idx_group_participants_reservation ON group_participants(reservation_id);