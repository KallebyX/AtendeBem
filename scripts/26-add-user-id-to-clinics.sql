-- Migration: Add user_id to clinics and rooms tables
-- This aligns with the user-based RLS pattern used in other tables

-- Add user_id to clinics table
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE CASCADE;

-- Add user_id to rooms table
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE CASCADE;

-- Add staff_user_id to staff_schedules if not exists
ALTER TABLE staff_schedules ADD COLUMN IF NOT EXISTS staff_user_id UUID REFERENCES users(id) ON DELETE CASCADE;

-- Create indexes for user_id columns
CREATE INDEX IF NOT EXISTS idx_clinics_user_id ON clinics(user_id);
CREATE INDEX IF NOT EXISTS idx_rooms_user_id ON rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_schedules_staff_user_id ON staff_schedules(staff_user_id);

-- Update RLS policies to use user_id instead of tenant_id
DROP POLICY IF EXISTS clinics_select ON clinics;
DROP POLICY IF EXISTS clinics_insert ON clinics;
DROP POLICY IF EXISTS clinics_update ON clinics;
DROP POLICY IF EXISTS clinics_delete ON clinics;

CREATE POLICY clinics_select ON clinics
  FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY clinics_insert ON clinics
  FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY clinics_update ON clinics
  FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY clinics_delete ON clinics
  FOR DELETE USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Update rooms RLS policies
DROP POLICY IF EXISTS rooms_select ON rooms;
DROP POLICY IF EXISTS rooms_insert ON rooms;
DROP POLICY IF EXISTS rooms_update ON rooms;
DROP POLICY IF EXISTS rooms_delete ON rooms;

CREATE POLICY rooms_select ON rooms
  FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY rooms_insert ON rooms
  FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY rooms_update ON rooms
  FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY rooms_delete ON rooms
  FOR DELETE USING (user_id = current_setting('app.current_user_id', true)::uuid);
