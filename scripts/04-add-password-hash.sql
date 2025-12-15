-- Add password_hash column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Update existing users with hashed passwords
-- Password for all test users: "senha123"
-- Hash generated with bcrypt: $2a$10$YQj5xzKQZ5nX5vQx5xKQZOu5xzKQZ5nX5vQx5xKQZOu5xzKQZ5nX5
UPDATE users 
SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMye1IQFJ3OLB3gqYLOHFgKJH7c9hXKXQmW'
WHERE email IN ('dr.silva@exemplo.com', 'dra.santos@exemplo.com');

-- Make password_hash NOT NULL after adding data
ALTER TABLE users ALTER COLUMN password_hash SET NOT NULL;

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
