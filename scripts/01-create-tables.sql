-- AtendeBem Complete Database Schema
-- Version 1.0 - Initial Setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    crm TEXT NOT NULL,
    crm_uf VARCHAR(2) NOT NULL,
    specialty TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    profile_image_url TEXT,
    phone TEXT,
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_crm_uf CHECK (LENGTH(crm_uf) = 2)
);

-- ============================================
-- APPOINTMENTS (ATENDIMENTOS)
-- ============================================

CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    patient_age INTEGER,
    patient_gender VARCHAR(20),
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    appointment_type VARCHAR(50) NOT NULL, -- 'consulta', 'retorno', 'procedimento', 'exame'
    specialty VARCHAR(100) NOT NULL,
    main_complaint TEXT,
    clinical_history TEXT,
    physical_exam TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    prescriptions JSONB, -- Array of medications
    exams_requested JSONB, -- Array of exams
    referrals JSONB, -- Array of referrals
    observations TEXT,
    status VARCHAR(30) DEFAULT 'completed', -- 'draft', 'completed', 'archived'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_appointment_type CHECK (appointment_type IN ('consulta', 'retorno', 'procedimento', 'exame')),
    CONSTRAINT valid_status CHECK (status IN ('draft', 'completed', 'archived'))
);

-- ============================================
-- MEDICAL PROCEDURES
-- ============================================

CREATE TABLE IF NOT EXISTS procedures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    procedure_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    procedure_type VARCHAR(100) NOT NULL, -- 'cirurgia', 'biopsia', 'endoscopia', etc
    procedure_name TEXT NOT NULL,
    procedure_code VARCHAR(20), -- TUSS code
    anesthesia_type VARCHAR(50),
    duration_minutes INTEGER,
    description TEXT,
    findings TEXT,
    complications TEXT,
    materials_used JSONB,
    team_members JSONB, -- Array of team members
    outcome VARCHAR(50), -- 'sucesso', 'complicacao', 'cancelado'
    follow_up_needed BOOLEAN DEFAULT false,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MEDICAL CERTIFICATES (ATESTADOS)
-- ============================================

CREATE TABLE IF NOT EXISTS medical_certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_type VARCHAR(50) NOT NULL, -- 'afastamento', 'acompanhamento', 'comparecimento'
    days_off INTEGER,
    start_date DATE,
    end_date DATE,
    cid_code VARCHAR(10),
    diagnosis_description TEXT,
    observations TEXT,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_certificate_type CHECK (certificate_type IN ('afastamento', 'acompanhamento', 'comparecimento'))
);

-- ============================================
-- PRESCRIPTIONS (RECEITAS)
-- ============================================

CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    prescription_type VARCHAR(30) DEFAULT 'normal', -- 'normal', 'controlada', 'especial'
    medications JSONB NOT NULL, -- Array of medications with dosage, frequency, duration
    instructions TEXT,
    validity_days INTEGER DEFAULT 30,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_prescription_type CHECK (prescription_type IN ('normal', 'controlada', 'especial'))
);

-- ============================================
-- EXAM REQUESTS (SOLICITAÇÕES DE EXAMES)
-- ============================================

CREATE TABLE IF NOT EXISTS exam_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    patient_cpf TEXT,
    request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    exams JSONB NOT NULL, -- Array of requested exams
    clinical_indication TEXT,
    urgency VARCHAR(20) DEFAULT 'routine', -- 'routine', 'urgent', 'emergency'
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_urgency CHECK (urgency IN ('routine', 'urgent', 'emergency'))
);

-- ============================================
-- AI ASSISTANT INTERACTIONS
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
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant'
    content TEXT NOT NULL,
    metadata JSONB, -- Store any additional context
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_role CHECK (role IN ('user', 'assistant'))
);

-- ============================================
-- TEMPLATES & SHORTCUTS
-- ============================================

CREATE TABLE IF NOT EXISTS document_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    template_type VARCHAR(50) NOT NULL, -- 'prescription', 'certificate', 'report'
    name TEXT NOT NULL,
    content JSONB NOT NULL,
    is_favorite BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER SETTINGS & PREFERENCES
-- ============================================

CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(10) DEFAULT 'light', -- 'light', 'dark', 'system'
    notifications_enabled BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    default_consultation_duration INTEGER DEFAULT 30,
    signature_image_url TEXT,
    clinic_name TEXT,
    clinic_address TEXT,
    clinic_phone TEXT,
    preferences JSONB, -- Additional user preferences
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_theme CHECK (theme IN ('light', 'dark', 'system'))
);

-- ============================================
-- AUDIT LOG
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50), -- 'appointment', 'prescription', etc
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_crm ON users(crm, crm_uf);
CREATE INDEX idx_users_active ON users(is_active);

-- Appointments
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date DESC);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_patient_cpf ON appointments(patient_cpf);

-- Procedures
CREATE INDEX idx_procedures_user_id ON procedures(user_id);
CREATE INDEX idx_procedures_date ON procedures(procedure_date DESC);
CREATE INDEX idx_procedures_appointment_id ON procedures(appointment_id);

-- Medical Certificates
CREATE INDEX idx_certificates_user_id ON medical_certificates(user_id);
CREATE INDEX idx_certificates_date ON medical_certificates(issue_date DESC);

-- Prescriptions
CREATE INDEX idx_prescriptions_user_id ON prescriptions(user_id);
CREATE INDEX idx_prescriptions_date ON prescriptions(issue_date DESC);

-- Exam Requests
CREATE INDEX idx_exam_requests_user_id ON exam_requests(user_id);
CREATE INDEX idx_exam_requests_date ON exam_requests(request_date DESC);

-- AI Conversations
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_messages_conversation_id ON ai_messages(conversation_id);

-- Templates
CREATE INDEX idx_templates_user_id ON document_templates(user_id);
CREATE INDEX idx_templates_type ON document_templates(template_type);

-- Audit Logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_procedures_updated_at BEFORE UPDATE ON procedures
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON ai_conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON document_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
