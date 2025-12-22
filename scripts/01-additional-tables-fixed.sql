-- AtendeBem Additional Tables Migration - FIXED VERSION
-- Run this AFTER 00-complete-migration.sql
-- Version 1.1 - Fixed to handle existing tables and missing columns

-- ============================================
-- CONTRACTS (Patient treatment contracts)
-- ============================================

-- Drop existing tables if they have issues
DROP TABLE IF EXISTS contract_templates CASCADE;
DROP TABLE IF EXISTS contracts CASCADE;

CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    contract_number VARCHAR(50) UNIQUE,
    title VARCHAR(255) NOT NULL,
    contract_type VARCHAR(50) NOT NULL DEFAULT 'treatment'
        CHECK (contract_type IN ('treatment', 'consent', 'telemedicine', 'general', 'orthodontics', 'implant', 'aesthetic', 'service')),
    content TEXT NOT NULL,
    template_id UUID,
    valid_from DATE,
    valid_until DATE,
    total_value DECIMAL(12, 2),
    status VARCHAR(30) DEFAULT 'draft',
    professional_signed_at TIMESTAMP WITH TIME ZONE,
    professional_signature_url TEXT,
    patient_signed_at TIMESTAMP WITH TIME ZONE,
    patient_signature_url TEXT,
    patient_ip_address INET,
    patient_user_agent TEXT,
    attachments JSONB,
    metadata JSONB,
    notes TEXT,
    professional_ip_address INET,
    witness1_name VARCHAR(255),
    witness1_signature_url TEXT,
    witness1_signed_at TIMESTAMP WITH TIME ZONE,
    witness2_name VARCHAR(255),
    witness2_signature_url TEXT,
    witness2_signed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contract_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contract_type VARCHAR(50) NOT NULL DEFAULT 'treatment',
    content TEXT NOT NULL,
    dynamic_fields JSONB DEFAULT '[]',
    version INTEGER DEFAULT 1,
    previous_version_id UUID REFERENCES contract_templates(id),
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MEDICAL IMAGES (DICOM/Radiology)
-- ============================================

-- Only add missing columns to existing table
DO $$ 
BEGIN
    -- Add columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='medical_images' AND column_name='tenant_id') THEN
        ALTER TABLE medical_images ADD COLUMN tenant_id UUID;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='medical_images' AND column_name='viewer_url') THEN
        ALTER TABLE medical_images ADD COLUMN viewer_url TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='medical_images' AND column_name='dicom_metadata') THEN
        ALTER TABLE medical_images ADD COLUMN dicom_metadata JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='medical_images' AND column_name='thumbnail_url') THEN
        ALTER TABLE medical_images ADD COLUMN thumbnail_url TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='medical_images' AND column_name='technique') THEN
        ALTER TABLE medical_images ADD COLUMN technique TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='medical_images' AND column_name='acquired_at') THEN
        ALTER TABLE medical_images ADD COLUMN acquired_at TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='medical_images' AND column_name='study_time') THEN
        ALTER TABLE medical_images ADD COLUMN study_time TIME;
    END IF;
END $$;

-- ============================================
-- ODONTOGRAMS (Dental charts) - Already exists, skip
-- ============================================

-- ODONTOGRAMS table already exists, just ensure odontogram_procedures exists
CREATE TABLE IF NOT EXISTS odontogram_procedures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    odontogram_id UUID NOT NULL REFERENCES odontograms(id) ON DELETE CASCADE,
    tooth_number VARCHAR(5) NOT NULL,
    tooth_face VARCHAR(10),
    procedure_code VARCHAR(20),
    procedure_name VARCHAR(255) NOT NULL,
    status VARCHAR(30) DEFAULT 'planned',
    notes TEXT,
    tenant_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BIOMETRICS - Already exists with different name
-- ============================================

-- The database has biometric_templates, not biometric_enrollments
-- Just add missing columns
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='biometric_templates' AND column_name='quality_score') THEN
        ALTER TABLE biometric_templates ADD COLUMN quality_score DECIMAL(5, 2);
    END IF;
END $$;

-- ============================================
-- WHATSAPP INTEGRATION - Already exists
-- ============================================

-- whatsapp_conversations and whatsapp_messages already exist
-- Just ensure all columns are present
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='whatsapp_conversations' AND column_name='labels') THEN
        ALTER TABLE whatsapp_conversations ADD COLUMN labels TEXT[];
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='whatsapp_conversations' AND column_name='assigned_to') THEN
        ALTER TABLE whatsapp_conversations ADD COLUMN assigned_to UUID REFERENCES users(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='whatsapp_conversations' AND column_name='last_message_text') THEN
        ALTER TABLE whatsapp_conversations ADD COLUMN last_message_text TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='whatsapp_conversations' AND column_name='last_message_from') THEN
        ALTER TABLE whatsapp_conversations ADD COLUMN last_message_from VARCHAR(20);
    END IF;
END $$;

-- ============================================
-- INVENTORY MANAGEMENT - Already exists
-- ============================================

-- inventory_items already exists, add missing columns
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inventory_items' AND column_name='deleted_at') THEN
        ALTER TABLE inventory_items ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inventory_items' AND column_name='reorder_point') THEN
        ALTER TABLE inventory_items ADD COLUMN reorder_point INTEGER;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inventory_items' AND column_name='supplier_name') THEN
        ALTER TABLE inventory_items ADD COLUMN supplier_name VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inventory_items' AND column_name='supplier_contact') THEN
        ALTER TABLE inventory_items ADD COLUMN supplier_contact VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='inventory_items' AND column_name='barcode') THEN
        ALTER TABLE inventory_items ADD COLUMN barcode VARCHAR(100);
    END IF;
END $$;

-- ============================================
-- ANAMNESIS - Already exists, ensure all columns
-- ============================================

DO $$
BEGIN
    -- Anamnesis table exists, just ensure it has all needed columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='anamnesis' AND column_name='vital_signs') THEN
        ALTER TABLE anamnesis ADD COLUMN vital_signs JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='anamnesis' AND column_name='medications') THEN
        ALTER TABLE anamnesis ADD COLUMN medications JSONB;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='anamnesis' AND column_name='allergies') THEN
        ALTER TABLE anamnesis ADD COLUMN allergies JSONB;
    END IF;
END $$;

-- ============================================
-- BUDGETS - Already exists
-- ============================================

-- budgets table already exists with all necessary columns

-- ============================================
-- TISS - Already exists  
-- ============================================

-- tiss_guides already exists with all necessary columns

-- ============================================
-- TELEMEDICINE - Already exists
-- ============================================

-- telemedicine_sessions already exists

-- ============================================
-- CRM (Customer Relationship Management)
-- ============================================

CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    source VARCHAR(100),
    interest VARCHAR(255),
    notes TEXT,
    status VARCHAR(30) DEFAULT 'new',
    converted_patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    converted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crm_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type VARCHAR(50),
    priority VARCHAR(20) DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- NFE - Already exists
-- ============================================

-- nfe_invoices already exists

-- ============================================
-- INDEXES FOR NEW/UPDATED TABLES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_contracts_user ON contracts(user_id);
CREATE INDEX IF NOT EXISTS idx_contracts_patient ON contracts(patient_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);

CREATE INDEX IF NOT EXISTS idx_odontogram_procedures_odontogram ON odontogram_procedures(odontogram_id);
CREATE INDEX IF NOT EXISTS idx_odontogram_procedures_user ON odontogram_procedures(user_id);

CREATE INDEX IF NOT EXISTS idx_crm_leads_user ON crm_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_user ON crm_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_lead ON crm_tasks(lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_patient ON crm_tasks(patient_id);

-- ============================================
-- ENABLE RLS FOR NEW TABLES
-- ============================================

ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contracts
CREATE POLICY contracts_select ON contracts FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);
CREATE POLICY contracts_insert ON contracts FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);
CREATE POLICY contracts_update ON contracts FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);
CREATE POLICY contracts_delete ON contracts FOR DELETE USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- RLS Policies for contract_templates
CREATE POLICY contract_templates_select ON contract_templates FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid OR is_public = true);
CREATE POLICY contract_templates_insert ON contract_templates FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);
CREATE POLICY contract_templates_update ON contract_templates FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);
CREATE POLICY contract_templates_delete ON contract_templates FOR DELETE USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- RLS Policies for CRM
CREATE POLICY crm_leads_select ON crm_leads FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);
CREATE POLICY crm_leads_all ON crm_leads FOR ALL USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY crm_tasks_select ON crm_tasks FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);
CREATE POLICY crm_tasks_all ON crm_tasks FOR ALL USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

SELECT 'Additional tables migration completed successfully!' as status;
