-- AtendeBem Additional Tables Migration
-- Run this AFTER 00-complete-migration.sql
-- Version 1.1 - Creates tables WITHOUT foreign keys to avoid dependency issues

-- Enable UUID extension first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CONTRACTS (Patient treatment contracts)
-- ============================================

CREATE TABLE IF NOT EXISTS contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contract_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contract_type VARCHAR(50) NOT NULL DEFAULT 'treatment',
    content TEXT NOT NULL,
    variables JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MEDICAL IMAGES (DICOM/Radiology)
-- ============================================

CREATE TABLE IF NOT EXISTS medical_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    appointment_id UUID,
    study_instance_uid VARCHAR(100) UNIQUE,
    modality VARCHAR(20),
    study_description TEXT,
    body_part VARCHAR(100),
    study_date DATE,
    clinical_indication TEXT,
    dicom_files JSONB DEFAULT '[]',
    total_images INTEGER DEFAULT 0,
    status VARCHAR(30) DEFAULT 'scheduled',
    report TEXT,
    findings TEXT,
    conclusion TEXT,
    radiologist_name VARCHAR(255),
    radiologist_crm VARCHAR(20),
    reported_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS image_annotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_id UUID,
    user_id UUID,
    annotation_type VARCHAR(50) NOT NULL,
    coordinates JSONB NOT NULL,
    label TEXT,
    measurement_value DECIMAL(10, 4),
    measurement_unit VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ODONTOGRAMS (Dental charts)
-- ============================================

CREATE TABLE IF NOT EXISTS odontograms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    teeth_data JSONB DEFAULT '{}',
    clinical_notes TEXT,
    treatment_plan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS odontogram_procedures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    odontogram_id UUID,
    tooth_number VARCHAR(5) NOT NULL,
    tooth_face VARCHAR(10),
    procedure_code VARCHAR(20),
    procedure_name VARCHAR(255) NOT NULL,
    status VARCHAR(30) DEFAULT 'planned',
    notes TEXT,
    performed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BIOMETRICS (Patient identification)
-- ============================================

CREATE TABLE IF NOT EXISTS biometric_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    biometric_type VARCHAR(30) NOT NULL,
    template_data TEXT NOT NULL,
    quality_score DECIMAL(5, 2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS biometric_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    enrollment_id UUID,
    biometric_type VARCHAR(30) NOT NULL,
    verification_result BOOLEAN NOT NULL,
    match_score DECIMAL(5, 2),
    device_info JSONB,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- WHATSAPP INTEGRATION
-- ============================================

CREATE TABLE IF NOT EXISTS whatsapp_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    phone_number VARCHAR(20) NOT NULL,
    contact_name VARCHAR(255),
    last_message_at TIMESTAMP WITH TIME ZONE,
    unread_count INTEGER DEFAULT 0,
    status VARCHAR(30) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID,
    user_id UUID,
    direction VARCHAR(10) NOT NULL,
    message_type VARCHAR(30) DEFAULT 'text',
    content TEXT,
    media_url TEXT,
    wa_message_id VARCHAR(100),
    status VARCHAR(30) DEFAULT 'sent',
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivered_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- INVENTORY MANAGEMENT
-- ============================================

CREATE TABLE IF NOT EXISTS inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sku VARCHAR(50),
    category VARCHAR(100),
    unit VARCHAR(30) DEFAULT 'unidade',
    current_stock DECIMAL(12, 2) DEFAULT 0,
    min_stock DECIMAL(12, 2) DEFAULT 0,
    max_stock DECIMAL(12, 2),
    cost_price DECIMAL(12, 2),
    sale_price DECIMAL(12, 2),
    supplier VARCHAR(255),
    location VARCHAR(100),
    expiration_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID,
    user_id UUID,
    movement_type VARCHAR(30) NOT NULL,
    quantity DECIMAL(12, 2) NOT NULL,
    unit_cost DECIMAL(12, 2),
    total_cost DECIMAL(12, 2),
    reference_type VARCHAR(50),
    reference_id UUID,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ANAMNESIS (Patient intake forms)
-- ============================================

CREATE TABLE IF NOT EXISTS anamnesis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    appointment_id UUID,
    chief_complaint TEXT,
    history_present_illness TEXT,
    past_medical_history JSONB,
    family_history JSONB,
    social_history JSONB,
    medications JSONB,
    allergies JSONB,
    review_of_systems JSONB,
    vital_signs JSONB,
    physical_exam TEXT,
    assessment TEXT,
    plan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BUDGETS (Treatment quotes)
-- ============================================

CREATE TABLE IF NOT EXISTS budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    budget_number VARCHAR(50),
    title VARCHAR(255),
    items JSONB NOT NULL DEFAULT '[]',
    subtotal DECIMAL(12, 2) DEFAULT 0,
    discount_percent DECIMAL(5, 2) DEFAULT 0,
    discount_amount DECIMAL(12, 2) DEFAULT 0,
    total DECIMAL(12, 2) DEFAULT 0,
    payment_conditions TEXT,
    validity_days INTEGER DEFAULT 30,
    valid_until DATE,
    notes TEXT,
    status VARCHAR(30) DEFAULT 'draft',
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TISS (Brazilian health insurance integration)
-- ============================================

CREATE TABLE IF NOT EXISTS tiss_guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    appointment_id UUID,
    guide_type VARCHAR(50) NOT NULL,
    guide_number VARCHAR(50),
    provider_code VARCHAR(50),
    insurance_code VARCHAR(50),
    insurance_name VARCHAR(255),
    card_number VARCHAR(50),
    card_validity DATE,
    main_procedure_code VARCHAR(20),
    procedures JSONB DEFAULT '[]',
    total_value DECIMAL(12, 2),
    status VARCHAR(30) DEFAULT 'draft',
    submitted_at TIMESTAMP WITH TIME ZONE,
    response_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TELEMEDICINE
-- ============================================

CREATE TABLE IF NOT EXISTS telemedicine_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    appointment_id UUID,
    session_type VARCHAR(30) DEFAULT 'video',
    room_id VARCHAR(100),
    room_url TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    recording_url TEXT,
    status VARCHAR(30) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CRM (Customer Relationship Management)
-- ============================================

CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    source VARCHAR(100),
    interest VARCHAR(255),
    notes TEXT,
    status VARCHAR(30) DEFAULT 'new',
    converted_patient_id UUID,
    converted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crm_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    lead_id UUID,
    patient_id UUID,
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
-- NFE (Electronic Invoice)
-- ============================================

CREATE TABLE IF NOT EXISTS nfe_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    patient_id UUID,
    invoice_number VARCHAR(50),
    series VARCHAR(10),
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    operation_type VARCHAR(30),
    items JSONB NOT NULL DEFAULT '[]',
    total_value DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(50),
    xml_content TEXT,
    pdf_url TEXT,
    access_key VARCHAR(50),
    protocol_number VARCHAR(50),
    status VARCHAR(30) DEFAULT 'draft',
    sefaz_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADD MISSING COLUMNS TO EXISTING TABLES
-- (Handles case where tables exist but lack these columns)
-- ============================================

DO $$
BEGIN
    -- CONTRACTS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contracts' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contracts' AND column_name = 'user_id') THEN
            ALTER TABLE contracts ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contracts' AND column_name = 'patient_id') THEN
            ALTER TABLE contracts ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- CONTRACT_TEMPLATES
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contract_templates' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contract_templates' AND column_name = 'user_id') THEN
            ALTER TABLE contract_templates ADD COLUMN user_id UUID;
        END IF;
    END IF;

    -- MEDICAL_IMAGES
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'medical_images' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'medical_images' AND column_name = 'user_id') THEN
            ALTER TABLE medical_images ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'medical_images' AND column_name = 'patient_id') THEN
            ALTER TABLE medical_images ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- IMAGE_ANNOTATIONS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'image_annotations' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'image_annotations' AND column_name = 'user_id') THEN
            ALTER TABLE image_annotations ADD COLUMN user_id UUID;
        END IF;
    END IF;

    -- ODONTOGRAMS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'odontograms' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'odontograms' AND column_name = 'user_id') THEN
            ALTER TABLE odontograms ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'odontograms' AND column_name = 'patient_id') THEN
            ALTER TABLE odontograms ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- ODONTOGRAM_PROCEDURES
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'odontogram_procedures' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'odontogram_procedures' AND column_name = 'user_id') THEN
            ALTER TABLE odontogram_procedures ADD COLUMN user_id UUID;
        END IF;
    END IF;

    -- BIOMETRIC_ENROLLMENTS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'biometric_enrollments' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'biometric_enrollments' AND column_name = 'user_id') THEN
            ALTER TABLE biometric_enrollments ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'biometric_enrollments' AND column_name = 'patient_id') THEN
            ALTER TABLE biometric_enrollments ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- BIOMETRIC_VERIFICATIONS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'biometric_verifications' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'biometric_verifications' AND column_name = 'user_id') THEN
            ALTER TABLE biometric_verifications ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'biometric_verifications' AND column_name = 'patient_id') THEN
            ALTER TABLE biometric_verifications ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- WHATSAPP_CONVERSATIONS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'whatsapp_conversations' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'whatsapp_conversations' AND column_name = 'user_id') THEN
            ALTER TABLE whatsapp_conversations ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'whatsapp_conversations' AND column_name = 'patient_id') THEN
            ALTER TABLE whatsapp_conversations ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- WHATSAPP_MESSAGES
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'whatsapp_messages' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'whatsapp_messages' AND column_name = 'user_id') THEN
            ALTER TABLE whatsapp_messages ADD COLUMN user_id UUID;
        END IF;
    END IF;

    -- INVENTORY_ITEMS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'inventory_items' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inventory_items' AND column_name = 'user_id') THEN
            ALTER TABLE inventory_items ADD COLUMN user_id UUID;
        END IF;
    END IF;

    -- INVENTORY_MOVEMENTS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'inventory_movements' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'inventory_movements' AND column_name = 'user_id') THEN
            ALTER TABLE inventory_movements ADD COLUMN user_id UUID;
        END IF;
    END IF;

    -- ANAMNESIS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'anamnesis' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'anamnesis' AND column_name = 'user_id') THEN
            ALTER TABLE anamnesis ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'anamnesis' AND column_name = 'patient_id') THEN
            ALTER TABLE anamnesis ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- BUDGETS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'budgets' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'budgets' AND column_name = 'user_id') THEN
            ALTER TABLE budgets ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'budgets' AND column_name = 'patient_id') THEN
            ALTER TABLE budgets ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- TISS_GUIDES
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tiss_guides' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tiss_guides' AND column_name = 'user_id') THEN
            ALTER TABLE tiss_guides ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tiss_guides' AND column_name = 'patient_id') THEN
            ALTER TABLE tiss_guides ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- TELEMEDICINE_SESSIONS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'telemedicine_sessions' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'telemedicine_sessions' AND column_name = 'user_id') THEN
            ALTER TABLE telemedicine_sessions ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'telemedicine_sessions' AND column_name = 'patient_id') THEN
            ALTER TABLE telemedicine_sessions ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- CRM_LEADS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'crm_leads' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_leads' AND column_name = 'user_id') THEN
            ALTER TABLE crm_leads ADD COLUMN user_id UUID;
        END IF;
    END IF;

    -- CRM_TASKS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'crm_tasks' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_tasks' AND column_name = 'user_id') THEN
            ALTER TABLE crm_tasks ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'crm_tasks' AND column_name = 'patient_id') THEN
            ALTER TABLE crm_tasks ADD COLUMN patient_id UUID;
        END IF;
    END IF;

    -- NFE_INVOICES
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'nfe_invoices' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'nfe_invoices' AND column_name = 'user_id') THEN
            ALTER TABLE nfe_invoices ADD COLUMN user_id UUID;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'nfe_invoices' AND column_name = 'patient_id') THEN
            ALTER TABLE nfe_invoices ADD COLUMN patient_id UUID;
        END IF;
    END IF;
END $$;

-- ============================================
-- INDEXES FOR NEW TABLES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_contracts_user ON contracts(user_id);
CREATE INDEX IF NOT EXISTS idx_contracts_patient ON contracts(patient_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);

CREATE INDEX IF NOT EXISTS idx_medical_images_user ON medical_images(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_images_patient ON medical_images(patient_id);

CREATE INDEX IF NOT EXISTS idx_odontograms_user ON odontograms(user_id);
CREATE INDEX IF NOT EXISTS idx_odontograms_patient ON odontograms(patient_id);

CREATE INDEX IF NOT EXISTS idx_biometric_enrollments_patient ON biometric_enrollments(patient_id);
CREATE INDEX IF NOT EXISTS idx_biometric_verifications_patient ON biometric_verifications(patient_id);

CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_user ON whatsapp_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_conversation ON whatsapp_messages(conversation_id);

CREATE INDEX IF NOT EXISTS idx_inventory_items_user ON inventory_items(user_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_item ON inventory_movements(item_id);

CREATE INDEX IF NOT EXISTS idx_anamnesis_patient ON anamnesis(patient_id);
CREATE INDEX IF NOT EXISTS idx_budgets_patient ON budgets(patient_id);
CREATE INDEX IF NOT EXISTS idx_tiss_guides_patient ON tiss_guides(patient_id);
CREATE INDEX IF NOT EXISTS idx_telemedicine_sessions_patient ON telemedicine_sessions(patient_id);

-- ============================================
-- ADDITIONAL MIGRATION COMPLETE
-- ============================================

SELECT 'Additional tables migration completed!' as status;
