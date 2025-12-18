-- Fix RLS policy for login
-- Allow unauthenticated users to query users table for email/password during login

-- First, drop the current restrictive policy
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can view own profile or login" ON users;

-- Allow users to select by email (for login) OR if they are the user
CREATE POLICY "Users can view own profile or login" ON users
    FOR SELECT USING (
        -- Allow if this is the current user
        id = current_setting('app.current_user_id', true)::uuid 
        -- OR if app.current_user_id is not set (during login/registration)
        OR current_setting('app.current_user_id', true) IS NULL
    );

-- Keep update restricted to own profile
DROP POLICY IF EXISTS "Users can update own profile" ON users;

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (id = current_setting('app.current_user_id')::uuid);

-- Allow registration (INSERT without user context)
DROP POLICY IF EXISTS "Users can insert own record" ON users;
DROP POLICY IF EXISTS "Users can register" ON users;

CREATE POLICY "Users can register" ON users
    FOR INSERT WITH CHECK (
        -- Allow insert if no user context (registration)
        current_setting('app.current_user_id', true) IS NULL
        -- OR if inserting as the current user
        OR id = current_setting('app.current_user_id', true)::uuid
    );
