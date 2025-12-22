-- AtendeBem Fix Missing Columns
-- Run this to add missing columns to existing tables
-- Version 1.0

-- ============================================
-- FIX ODONTOGRAMS TABLE
-- ============================================

-- Add patient_id if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'odontograms' AND column_name = 'patient_id') THEN
        ALTER TABLE odontograms ADD COLUMN patient_id UUID REFERENCES patients(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add user_id if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'odontograms' AND column_name = 'user_id') THEN
        ALTER TABLE odontograms ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add teeth_data if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'odontograms' AND column_name = 'teeth_data') THEN
        ALTER TABLE odontograms ADD COLUMN teeth_data JSONB DEFAULT '{}';
    END IF;
END $$;

-- Add clinical_notes if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'odontograms' AND column_name = 'clinical_notes') THEN
        ALTER TABLE odontograms ADD COLUMN clinical_notes TEXT;
    END IF;
END $$;

-- ============================================
-- FIX MEDICAL_IMAGES TABLE
-- ============================================

-- Drop tenant_id constraint if exists and add user_id
DO $$
BEGIN
    -- Add user_id if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'medical_images' AND column_name = 'user_id') THEN
        ALTER TABLE medical_images ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
    END IF;

    -- Add patient_id if not exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'medical_images' AND column_name = 'patient_id') THEN
        ALTER TABLE medical_images ADD COLUMN patient_id UUID REFERENCES patients(id) ON DELETE CASCADE;
    END IF;
END $$;

-- ============================================
-- FIX CONTRACTS TABLE
-- ============================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'contracts' AND column_name = 'user_id') THEN
        ALTER TABLE contracts ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'contracts' AND column_name = 'patient_id') THEN
        ALTER TABLE contracts ADD COLUMN patient_id UUID REFERENCES patients(id) ON DELETE CASCADE;
    END IF;
END $$;

-- ============================================
-- FIX INVENTORY_ITEMS TABLE
-- ============================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'inventory_items' AND column_name = 'user_id') THEN
        ALTER TABLE inventory_items ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- ============================================
-- FIX INVENTORY_MOVEMENTS TABLE
-- ============================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'inventory_movements' AND column_name = 'user_id') THEN
        ALTER TABLE inventory_movements ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- ============================================
-- FIX TISS_GUIDES TABLE
-- ============================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'tiss_guides' AND column_name = 'user_id') THEN
        ALTER TABLE tiss_guides ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'tiss_guides' AND column_name = 'patient_id') THEN
        ALTER TABLE tiss_guides ADD COLUMN patient_id UUID REFERENCES patients(id) ON DELETE CASCADE;
    END IF;
END $$;

-- ============================================
-- FIX NFE_INVOICES TABLE
-- ============================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'nfe_invoices' AND column_name = 'user_id') THEN
        ALTER TABLE nfe_invoices ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'nfe_invoices' AND column_name = 'patient_id') THEN
        ALTER TABLE nfe_invoices ADD COLUMN patient_id UUID REFERENCES patients(id) ON DELETE SET NULL;
    END IF;
END $$;

-- ============================================
-- DROP tenant_id columns (not needed)
-- ============================================

-- Comment out if you want to keep tenant_id for backward compatibility
-- ALTER TABLE odontograms DROP COLUMN IF EXISTS tenant_id;
-- ALTER TABLE medical_images DROP COLUMN IF EXISTS tenant_id;
-- ALTER TABLE contracts DROP COLUMN IF EXISTS tenant_id;
-- ALTER TABLE inventory_items DROP COLUMN IF EXISTS tenant_id;
-- ALTER TABLE inventory_movements DROP COLUMN IF EXISTS tenant_id;
-- ALTER TABLE tiss_guides DROP COLUMN IF EXISTS tenant_id;
-- ALTER TABLE nfe_invoices DROP COLUMN IF EXISTS tenant_id;

-- ============================================
-- UPDATE tenant_id to user_id where possible
-- ============================================

-- If tables have tenant_id but not user_id, copy values
DO $$
BEGIN
    -- For each table that might have tenant_id
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'odontograms' AND column_name = 'tenant_id')
       AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'odontograms' AND column_name = 'user_id') THEN
        UPDATE odontograms SET user_id = tenant_id WHERE user_id IS NULL AND tenant_id IS NOT NULL;
    END IF;
END $$;

-- ============================================
-- CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_odontograms_user ON odontograms(user_id);
CREATE INDEX IF NOT EXISTS idx_odontograms_patient ON odontograms(patient_id);

-- ============================================
-- FIX COMPLETE
-- ============================================
