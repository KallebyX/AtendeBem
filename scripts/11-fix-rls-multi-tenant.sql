-- Migration: Corrigir RLS em tabelas críticas + Multi-Tenant
-- Data: 2025-12-17
-- Descrição: Adiciona Row-Level Security em 5 tabelas faltantes e implementa sistema multi-tenant

-- =====================================================
-- 1. TABELA TENANTS (Multi-Organizações)
-- =====================================================

CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    
    -- Planos SaaS
    plan_type VARCHAR(50) DEFAULT 'free' CHECK (plan_type IN ('free', 'starter', 'professional', 'enterprise', 'custom')),
    
    -- Limites por plano
    max_users INTEGER DEFAULT 1,
    max_patients INTEGER DEFAULT 100,
    max_storage_gb INTEGER DEFAULT 1,
    max_monthly_prescriptions INTEGER DEFAULT 50,
    max_monthly_appointments INTEGER DEFAULT 100,
    
    -- Módulos habilitados (feature flags)
    features JSONB DEFAULT '[]',
    -- Exemplo: ["MOD-ODO", "MOD-TEL", "MOD-EST", "MOD-GES"]
    
    -- Faturamento
    billing_email VARCHAR(255),
    billing_status VARCHAR(50) DEFAULT 'active' CHECK (billing_status IN ('active', 'suspended', 'cancelled', 'trial')),
    trial_ends_at TIMESTAMPTZ,
    
    -- Dados fiscais
    cnpj VARCHAR(18),
    tax_id VARCHAR(50),
    company_name VARCHAR(255),
    
    -- Contato
    phone VARCHAR(20),
    address JSONB,
    
    -- Customização
    logo_url TEXT,
    primary_color VARCHAR(7) DEFAULT '#0066cc',
    
    -- Compliance
    lgpd_dpo_name VARCHAR(255),
    lgpd_dpo_email VARCHAR(255),
    data_retention_years INTEGER DEFAULT 20, -- CFM: 20 anos
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

DROP INDEX IF EXISTS idx_tenants_slug;
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);

DROP INDEX IF EXISTS idx_tenants_plan;
CREATE INDEX IF NOT EXISTS idx_tenants_plan ON tenants(plan_type);

DROP INDEX IF EXISTS idx_tenants_billing_status;
CREATE INDEX IF NOT EXISTS idx_tenants_billing_status ON tenants(billing_status);

-- =====================================================
-- 2. ADICIONAR tenant_id EM TODAS AS TABELAS
-- =====================================================

-- Users
ALTER TABLE users ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);

-- Patients
ALTER TABLE patients ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_patients_tenant ON patients(tenant_id);

-- Appointments
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_appointments_tenant ON appointments(tenant_id);

-- Procedures
ALTER TABLE procedures ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_procedures_tenant ON procedures(tenant_id);

-- Medical Prescriptions
ALTER TABLE medical_prescriptions ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_medical_prescriptions_tenant ON medical_prescriptions(tenant_id);

-- Prescription Items
ALTER TABLE prescription_items ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_prescription_items_tenant ON prescription_items(tenant_id);

-- Digital Prescriptions (SEM RLS ATUALMENTE!)
ALTER TABLE digital_prescriptions ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_tenant ON digital_prescriptions(tenant_id);

-- Signature Sessions (SEM RLS ATUALMENTE!)
ALTER TABLE signature_sessions ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_signature_sessions_tenant ON signature_sessions(tenant_id);

-- Appointments Schedule (SEM RLS ATUALMENTE!)
ALTER TABLE appointments_schedule ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_appointments_schedule_tenant ON appointments_schedule(tenant_id);

-- Payments (SEM RLS ATUALMENTE!)
ALTER TABLE payments ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_payments_tenant ON payments(tenant_id);

-- Patient Exams (SEM RLS ATUALMENTE!)
ALTER TABLE patient_exams ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_patient_exams_tenant ON patient_exams(tenant_id);

-- AI Conversations
ALTER TABLE ai_conversations ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_tenant ON ai_conversations(tenant_id);

-- AI Messages
ALTER TABLE ai_messages ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_ai_messages_tenant ON ai_messages(tenant_id);

-- Document Templates
ALTER TABLE document_templates ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_document_templates_tenant ON document_templates(tenant_id);

-- User Settings
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_user_settings_tenant ON user_settings(tenant_id);

-- Audit Logs
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON audit_logs(tenant_id);

-- =====================================================
-- 3. HABILITAR RLS EM TABELAS FALTANTES
-- =====================================================

-- Digital Prescriptions
ALTER TABLE digital_prescriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own digital prescriptions" ON digital_prescriptions;
CREATE POLICY "Users can view own digital prescriptions" ON digital_prescriptions
    FOR SELECT USING (
        user_id = current_setting('app.current_user_id', true)::uuid
        OR tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can create own digital prescriptions" ON digital_prescriptions;
CREATE POLICY "Users can create own digital prescriptions" ON digital_prescriptions
    FOR INSERT WITH CHECK (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can update own digital prescriptions" ON digital_prescriptions;
CREATE POLICY "Users can update own digital prescriptions" ON digital_prescriptions
    FOR UPDATE USING (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

-- Signature Sessions
ALTER TABLE signature_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own signature sessions" ON signature_sessions;
CREATE POLICY "Users can view own signature sessions" ON signature_sessions
    FOR SELECT USING (
        user_id = current_setting('app.current_user_id', true)::uuid
        OR tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can create own signature sessions" ON signature_sessions;
CREATE POLICY "Users can create own signature sessions" ON signature_sessions
    FOR INSERT WITH CHECK (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can update own signature sessions" ON signature_sessions;
CREATE POLICY "Users can update own signature sessions" ON signature_sessions
    FOR UPDATE USING (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

-- Appointments Schedule
ALTER TABLE appointments_schedule ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own appointments schedule" ON appointments_schedule;
CREATE POLICY "Users can view own appointments schedule" ON appointments_schedule
    FOR SELECT USING (
        user_id = current_setting('app.current_user_id', true)::uuid
        OR tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can create own appointments schedule" ON appointments_schedule;
CREATE POLICY "Users can create own appointments schedule" ON appointments_schedule
    FOR INSERT WITH CHECK (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can update own appointments schedule" ON appointments_schedule;
CREATE POLICY "Users can update own appointments schedule" ON appointments_schedule
    FOR UPDATE USING (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can delete own appointments schedule" ON appointments_schedule;
CREATE POLICY "Users can delete own appointments schedule" ON appointments_schedule
    FOR DELETE USING (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

-- Payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (
        user_id = current_setting('app.current_user_id', true)::uuid
        OR tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can create own payments" ON payments;
CREATE POLICY "Users can create own payments" ON payments
    FOR INSERT WITH CHECK (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can update own payments" ON payments;
CREATE POLICY "Users can update own payments" ON payments
    FOR UPDATE USING (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

-- Patient Exams
ALTER TABLE patient_exams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own patient exams" ON patient_exams;
CREATE POLICY "Users can view own patient exams" ON patient_exams
    FOR SELECT USING (
        user_id = current_setting('app.current_user_id', true)::uuid
        OR tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can create own patient exams" ON patient_exams;
CREATE POLICY "Users can create own patient exams" ON patient_exams
    FOR INSERT WITH CHECK (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can update own patient exams" ON patient_exams;
CREATE POLICY "Users can update own patient exams" ON patient_exams
    FOR UPDATE USING (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can delete own patient exams" ON patient_exams;
CREATE POLICY "Users can delete own patient exams" ON patient_exams
    FOR DELETE USING (
        user_id = current_setting('app.current_user_id', true)::uuid
    );

-- =====================================================
-- 4. FUNÇÃO PARA DEFINIR TENANT CONTEXT
-- =====================================================

CREATE OR REPLACE FUNCTION set_tenant_context(p_tenant_id UUID)
RETURNS VOID AS $$
BEGIN
    PERFORM set_config('app.current_tenant_id', p_tenant_id::TEXT, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 5. SEED TENANT PADRÃO (migração de dados existentes)
-- =====================================================

-- Criar tenant default para usuários existentes
INSERT INTO tenants (
    id,
    name,
    slug,
    plan_type,
    max_users,
    max_patients,
    features
) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Tenant Default (Migração)',
    'default-migration',
    'enterprise',
    999,
    99999,
    '["MOD-ANM", "MOD-TIS", "MOD-ASS", "MOD-RCB", "MOD-FAT", "MOD-PRF", "MOD-AIA"]'::jsonb
) ON CONFLICT (slug) DO NOTHING;

-- Atualizar usuários existentes sem tenant
UPDATE users 
SET tenant_id = '00000000-0000-0000-0000-000000000001'::uuid
WHERE tenant_id IS NULL;

-- Atualizar outras tabelas (com base no user_id)
UPDATE patients p
SET tenant_id = u.tenant_id
FROM users u
WHERE p.user_id = u.id AND p.tenant_id IS NULL;

UPDATE appointments a
SET tenant_id = u.tenant_id
FROM users u
WHERE a.user_id = u.id AND a.tenant_id IS NULL;

UPDATE medical_prescriptions mp
SET tenant_id = u.tenant_id
FROM users u
WHERE mp.user_id = u.id AND mp.tenant_id IS NULL;

UPDATE digital_prescriptions dp
SET tenant_id = u.tenant_id
FROM users u
WHERE dp.user_id = u.id AND dp.tenant_id IS NULL;

-- =====================================================
-- 6. AUDIT LOG APRIMORADO
-- =====================================================

-- Adicionar campos de auditoria mais detalhados
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS ip_address INET;
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS request_id UUID;
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS resource_type VARCHAR(100);
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS resource_id UUID;

CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

-- =====================================================
-- 7. COMENTÁRIOS E DOCUMENTAÇÃO
-- =====================================================

COMMENT ON TABLE tenants IS 'Organizações multi-tenant (clínicas, hospitais, consultórios)';
COMMENT ON COLUMN tenants.features IS 'Feature flags: módulos habilitados (MOD-ODO, MOD-TEL, etc)';
COMMENT ON COLUMN tenants.data_retention_years IS 'LGPD/CFM: anos de retenção de dados (padrão: 20)';

COMMENT ON FUNCTION set_tenant_context IS 'Define app.current_tenant_id para queries RLS';
