-- AtendeBem Additional Tables Migration - FIXED VERSION
-- Version 1.3 - Creates tables WITHOUT foreign keys first, adds constraints later
-- This allows the script to run even if base tables don't exist yet

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

CREATE TABLE IF NOT EXISTS contract_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contract_type VARCHAR(50) NOT NULL DEFAULT 'treatment',
    content TEXT NOT NULL,
    dynamic_fields JSONB DEFAULT '[]',
    version INTEGER DEFAULT 1,
    previous_version_id UUID,
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
    tenant_id UUID,
    viewer_url TEXT,
    dicom_metadata JSONB,
    thumbnail_url TEXT,
    technique TEXT,
    acquired_at TIMESTAMP WITH TIME ZONE,
    study_time TIME,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- IMAGE ANNOTATIONS
-- ============================================

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
    tenant_id UUID,
    performed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
    labels TEXT[],
    assigned_to UUID,
    last_message_text TEXT,
    last_message_from VARCHAR(20),
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
    deleted_at TIMESTAMP WITH TIME ZONE,
    reorder_point INTEGER,
    supplier_name VARCHAR(255),
    supplier_contact VARCHAR(255),
    barcode VARCHAR(100),
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
-- INDEXES FOR ALL TABLES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_contracts_user ON contracts(user_id);
CREATE INDEX IF NOT EXISTS idx_contracts_patient ON contracts(patient_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);

CREATE INDEX IF NOT EXISTS idx_medical_images_user ON medical_images(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_images_patient ON medical_images(patient_id);

CREATE INDEX IF NOT EXISTS idx_odontograms_user ON odontograms(user_id);
CREATE INDEX IF NOT EXISTS idx_odontograms_patient ON odontograms(patient_id);

CREATE INDEX IF NOT EXISTS idx_odontogram_procedures_odontogram ON odontogram_procedures(odontogram_id);
CREATE INDEX IF NOT EXISTS idx_odontogram_procedures_user ON odontogram_procedures(user_id);

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

CREATE INDEX IF NOT EXISTS idx_crm_leads_user ON crm_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_user ON crm_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_lead ON crm_tasks(lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_tasks_patient ON crm_tasks(patient_id);

CREATE INDEX IF NOT EXISTS idx_nfe_invoices_user ON nfe_invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_nfe_invoices_patient ON nfe_invoices(patient_id);

-- ============================================
-- ADD FOREIGN KEYS (only if referenced tables exist)
-- ============================================

DO $$
BEGIN
    -- Only add foreign keys if users table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') THEN
        -- contracts
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'contracts_user_id_fkey') THEN
            ALTER TABLE contracts ADD CONSTRAINT contracts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;

        -- contract_templates
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'contract_templates_user_id_fkey') THEN
            ALTER TABLE contract_templates ADD CONSTRAINT contract_templates_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;

        -- medical_images
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'medical_images_user_id_fkey') THEN
            ALTER TABLE medical_images ADD CONSTRAINT medical_images_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;

        -- odontograms
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'odontograms_user_id_fkey') THEN
            ALTER TABLE odontograms ADD CONSTRAINT odontograms_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;

        -- inventory_items
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'inventory_items_user_id_fkey') THEN
            ALTER TABLE inventory_items ADD CONSTRAINT inventory_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;

        -- anamnesis
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'anamnesis_user_id_fkey') THEN
            ALTER TABLE anamnesis ADD CONSTRAINT anamnesis_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;

        -- budgets
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'budgets_user_id_fkey') THEN
            ALTER TABLE budgets ADD CONSTRAINT budgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;

        -- crm_leads
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'crm_leads_user_id_fkey') THEN
            ALTER TABLE crm_leads ADD CONSTRAINT crm_leads_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;
    END IF;

    -- Only add patient foreign keys if patients table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'patients' AND table_schema = 'public') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'contracts_patient_id_fkey') THEN
            ALTER TABLE contracts ADD CONSTRAINT contracts_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'medical_images_patient_id_fkey') THEN
            ALTER TABLE medical_images ADD CONSTRAINT medical_images_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'odontograms_patient_id_fkey') THEN
            ALTER TABLE odontograms ADD CONSTRAINT odontograms_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'anamnesis_patient_id_fkey') THEN
            ALTER TABLE anamnesis ADD CONSTRAINT anamnesis_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;
        END IF;

        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'budgets_patient_id_fkey') THEN
            ALTER TABLE budgets ADD CONSTRAINT budgets_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE;
        END IF;
    END IF;
END $$;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

SELECT 'Additional tables migration completed successfully!' as status;
