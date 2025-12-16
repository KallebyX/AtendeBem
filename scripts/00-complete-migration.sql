-- AtendeBem Complete Database Migration
-- Execute este script no banco de dados PostgreSQL da Vercel
-- Version 2.0 - All tables in correct order

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS & AUTHENTICATION (Base table)
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    name TEXT NOT NULL,
    crm TEXT NOT NULL,
    crm_uf VARCHAR(2) NOT NULL,
    specialty TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    profile_image_url TEXT,
    phone TEXT
);

-- ============================================
-- 2. PATIENTS (Depends on users)
-- ============================================

CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(2),
    cep VARCHAR(9),
    insurance_provider VARCHAR(255),
    insurance_number VARCHAR(100),
    blood_type VARCHAR(5),
    allergies TEXT,
    chronic_conditions TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. APPOINTMENTS (Depends on users)
-- ============================================

CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    patient_age INTEGER,
    patient_gender VARCHAR(20),
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    appointment_type VARCHAR(50) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    main_complaint TEXT,
    clinical_history TEXT,
    physical_exam TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    prescriptions JSONB,
    exams_requested JSONB,
    referrals JSONB,
    observations TEXT,
    status VARCHAR(30) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. PROCEDURES (Depends on users, appointments)
-- ============================================

CREATE TABLE IF NOT EXISTS procedures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    procedure_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    procedure_type VARCHAR(100),
    procedure_name TEXT NOT NULL,
    procedure_code VARCHAR(20),
    anesthesia_type VARCHAR(50),
    duration_minutes INTEGER,
    description TEXT,
    findings TEXT,
    complications TEXT,
    materials_used JSONB,
    team_members JSONB,
    outcome VARCHAR(50),
    follow_up_needed BOOLEAN DEFAULT false,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. MEDICAL PRESCRIPTIONS (Depends on users, patients, appointments)
-- ============================================

CREATE TABLE IF NOT EXISTS medical_prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prescription_date DATE NOT NULL DEFAULT CURRENT_DATE,
    cid10_code VARCHAR(10),
    cid10_description TEXT,
    cid11_code VARCHAR(20),
    cid11_description TEXT,
    clinical_indication TEXT,
    notes TEXT,
    valid_until DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. DIGITAL PRESCRIPTIONS (Depends on users, patients)
-- ============================================

CREATE TABLE IF NOT EXISTS digital_prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT NOT NULL,
    patient_birth_date DATE,
    cid10_code VARCHAR(10),
    cid10_description TEXT,
    clinical_indication TEXT,
    medications JSONB NOT NULL,
    prescription_type VARCHAR(50) DEFAULT 'simple',
    validity_days INTEGER DEFAULT 30,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    signature_status VARCHAR(50) DEFAULT 'unsigned',
    signature_date TIMESTAMP WITH TIME ZONE,
    signature_certificate_info JSONB,
    signed_document_url TEXT,
    qr_code_url TEXT,
    verification_code VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. APPOINTMENTS SCHEDULE (Depends on users, patients)
-- ============================================

CREATE TABLE IF NOT EXISTS appointments_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    appointment_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled',
    value DECIMAL(10, 2),
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. PAYMENTS (Depends on users, patients, appointments_schedule)
-- ============================================

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_schedule_id UUID REFERENCES appointments_schedule(id) ON DELETE SET NULL,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'completed',
    transaction_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 9. PATIENT EXAMS (Depends on users, patients, appointments)
-- ============================================

CREATE TABLE IF NOT EXISTS patient_exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id),
    exam_type VARCHAR(255) NOT NULL,
    exam_name VARCHAR(500) NOT NULL,
    exam_date DATE NOT NULL,
    result_date DATE,
    result_summary TEXT,
    result_file_url TEXT,
    laboratory VARCHAR(255),
    requested_by VARCHAR(255),
    status VARCHAR(50) DEFAULT 'requested',
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 10. PATIENT MEDICAL HISTORY (Depends on users, patients, appointments)
-- ============================================

CREATE TABLE IF NOT EXISTS patient_medical_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id),
    cid10_code VARCHAR(10),
    cid11_code VARCHAR(20),
    diagnosis TEXT NOT NULL,
    diagnosis_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 11. MEDICAL CERTIFICATES (Depends on users, appointments)
-- ============================================

CREATE TABLE IF NOT EXISTS medical_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_type VARCHAR(50) NOT NULL,
    days_off INTEGER,
    start_date DATE,
    end_date DATE,
    cid_code VARCHAR(10),
    diagnosis_description TEXT,
    observations TEXT,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. PRESCRIPTIONS (Legacy - Depends on users, appointments)
-- ============================================

CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    prescription_type VARCHAR(30) DEFAULT 'normal',
    medications JSONB NOT NULL,
    instructions TEXT,
    validity_days INTEGER DEFAULT 30,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 13. EXAM REQUESTS (Depends on users, appointments)
-- ============================================

CREATE TABLE IF NOT EXISTS exam_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    exams JSONB NOT NULL,
    clinical_indication TEXT,
    urgency VARCHAR(20) DEFAULT 'routine',
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 14. AI CONVERSATIONS (Depends on users)
-- ============================================

CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_archived BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS ai_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 15. DOCUMENT TEMPLATES (Depends on users)
-- ============================================

CREATE TABLE IF NOT EXISTS document_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    template_type VARCHAR(50) NOT NULL,
    name TEXT NOT NULL,
    content JSONB NOT NULL,
    is_favorite BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 16. USER SETTINGS (Depends on users)
-- ============================================

CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(10) DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    default_consultation_duration INTEGER DEFAULT 30,
    signature_image_url TEXT,
    clinic_name TEXT,
    clinic_address TEXT,
    clinic_phone TEXT,
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 17. AUDIT LOGS (Depends on users)
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 18. SIGNATURE SESSIONS (For VIDaaS integration)
-- ============================================

CREATE TABLE IF NOT EXISTS signature_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prescription_id UUID REFERENCES digital_prescriptions(id) ON DELETE CASCADE,
    session_type VARCHAR(50) NOT NULL DEFAULT 'prescription',
    vidaas_session_id TEXT,
    vidaas_auth_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    cpf_signer TEXT NOT NULL,
    document_hash TEXT,
    signed_document_url TEXT,
    certificate_info JSONB,
    error_message TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 19. MEDICATIONS (Reference table)
-- ============================================

CREATE TABLE IF NOT EXISTS medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(500) NOT NULL,
    active_ingredient VARCHAR(500),
    concentration VARCHAR(100),
    pharmaceutical_form VARCHAR(100),
    administration_route VARCHAR(100),
    protocol VARCHAR(500),
    registry_type VARCHAR(50),
    is_controlled BOOLEAN DEFAULT false,
    is_high_cost BOOLEAN DEFAULT false,
    sus_available BOOLEAN DEFAULT true,
    anvisa_code VARCHAR(50),
    ean_code VARCHAR(20),
    manufacturer VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 20. PRESCRIPTION ITEMS (Depends on medical_prescriptions, medications)
-- ============================================

CREATE TABLE IF NOT EXISTS prescription_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prescription_id UUID NOT NULL REFERENCES medical_prescriptions(id) ON DELETE CASCADE,
    medication_id UUID REFERENCES medications(id),
    medication_name VARCHAR(500) NOT NULL,
    dosage VARCHAR(200) NOT NULL,
    frequency VARCHAR(200) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    administration_instructions TEXT,
    special_warnings TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_patients_cpf ON patients(cpf);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date DESC);
CREATE INDEX IF NOT EXISTS idx_procedures_user_id ON procedures(user_id);
CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_user ON digital_prescriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_patient ON digital_prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_schedule_user ON appointments_schedule(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_schedule_patient ON appointments_schedule(patient_id);
CREATE INDEX IF NOT EXISTS idx_payments_patient ON payments(patient_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_signature_sessions_user ON signature_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_signature_sessions_prescription ON signature_sessions(prescription_id);

-- ============================================
-- TRIGGER FUNCTION FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
        AND table_schema = 'public'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS update_%s_updated_at ON %s', t, t);
        EXECUTE format('CREATE TRIGGER update_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', t, t);
    END LOOP;
END;
$$;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================
