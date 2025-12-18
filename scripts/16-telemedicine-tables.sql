-- Migration: Tabelas de Telemedicina (MOD-TEL)
-- Data: 2025-12-17

CREATE TABLE IF NOT EXISTS telemedicine_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    
    -- Daily.co room
    room_name VARCHAR(255) UNIQUE NOT NULL,
    room_url TEXT NOT NULL,
    room_config JSONB DEFAULT '{}'::jsonb,
    
    -- Sessão
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ,
    actual_start TIMESTAMPTZ,
    actual_end TIMESTAMPTZ,
    duration_minutes INTEGER,
    
    status VARCHAR(50) DEFAULT 'scheduled', 
    -- scheduled, waiting, in_progress, completed, cancelled, no_show
    
    -- Gravação
    is_recorded BOOLEAN DEFAULT false,
    recording_url TEXT,
    recording_consent BOOLEAN DEFAULT false,
    
    -- Notas pós-consulta
    clinical_notes TEXT,
    prescriptions_issued TEXT[],
    exams_requested TEXT[],
    follow_up_required BOOLEAN DEFAULT false,
    
    -- Qualidade
    connection_quality VARCHAR(20), -- excellent, good, fair, poor
    patient_feedback_rating INTEGER CHECK (patient_feedback_rating >= 1 AND patient_feedback_rating <= 5),
    patient_feedback_comment TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_telemedicine_tenant ON telemedicine_sessions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_telemedicine_user ON telemedicine_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_telemedicine_patient ON telemedicine_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_telemedicine_status ON telemedicine_sessions(status);
CREATE INDEX IF NOT EXISTS idx_telemedicine_scheduled ON telemedicine_sessions(scheduled_start);

ALTER TABLE telemedicine_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own sessions" ON telemedicine_sessions;
CREATE POLICY "Users can view own sessions" ON telemedicine_sessions
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own sessions" ON telemedicine_sessions;
CREATE POLICY "Users can manage own sessions" ON telemedicine_sessions
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Sala de espera virtual
CREATE TABLE IF NOT EXISTS telemedicine_waiting_room (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES telemedicine_sessions(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    admitted_at TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'waiting', -- waiting, admitted, cancelled
    
    -- Triagem virtual
    pre_consultation_notes TEXT,
    vital_signs_self_reported JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waiting_room_session ON telemedicine_waiting_room(session_id);
CREATE INDEX IF NOT EXISTS idx_waiting_room_status ON telemedicine_waiting_room(status, joined_at);

ALTER TABLE telemedicine_waiting_room ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own waiting room" ON telemedicine_waiting_room;
CREATE POLICY "Users can view own waiting room" ON telemedicine_waiting_room
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own waiting room" ON telemedicine_waiting_room;
CREATE POLICY "Users can manage own waiting room" ON telemedicine_waiting_room
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
