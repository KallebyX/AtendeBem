-- Add password_hash column to existing users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Update existing users with hashed passwords (senha123)
-- Using SHA-256 hash of 'senha123'
UPDATE public.users 
SET password_hash = '73e3a4877c05f32872b358a8bb36ab5f75e67c73e0c23ab23494e2d47de3bc67'
WHERE email IN ('dr.silva@exemplo.com', 'dra.santos@exemplo.com');
