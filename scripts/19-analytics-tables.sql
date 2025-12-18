-- Migration: Tabelas de Relatórios e Analytics (MOD-PRF)
-- Data: 2025-12-17

CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    event_type VARCHAR(100) NOT NULL,
    -- appointment_created, appointment_completed, prescription_issued,
    -- patient_registered, payment_received, exam_ordered, etc
    
    event_data JSONB DEFAULT '{}'::jsonb,
    
    -- Contexto
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    
    -- Valores (para métricas financeiras)
    revenue_amount DECIMAL(10, 2),
    cost_amount DECIMAL(10, 2),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_tenant ON analytics_events(tenant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_patient ON analytics_events(patient_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own events" ON analytics_events;
CREATE POLICY "Users can view own events" ON analytics_events
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can create own events" ON analytics_events;
CREATE POLICY "Users can create own events" ON analytics_events
    FOR INSERT WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Relatórios salvos
CREATE TABLE IF NOT EXISTS saved_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    report_type VARCHAR(100) NOT NULL,
    -- financial, clinical, operational, patient_satisfaction, performance
    
    -- Configuração
    filters JSONB DEFAULT '{}'::jsonb,
    date_range JSONB DEFAULT '{}'::jsonb,
    grouping VARCHAR(50), -- daily, weekly, monthly, yearly
    
    -- Agendamento
    is_scheduled BOOLEAN DEFAULT false,
    schedule_frequency VARCHAR(50), -- daily, weekly, monthly
    schedule_time TIME,
    schedule_recipients TEXT[], -- emails
    
    last_generated_at TIMESTAMPTZ,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_reports_tenant ON saved_reports(tenant_id);
CREATE INDEX IF NOT EXISTS idx_saved_reports_user ON saved_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_reports_type ON saved_reports(report_type);
CREATE INDEX IF NOT EXISTS idx_saved_reports_scheduled ON saved_reports(is_scheduled, is_active);

ALTER TABLE saved_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own reports" ON saved_reports;
CREATE POLICY "Users can view own reports" ON saved_reports
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own reports" ON saved_reports;
CREATE POLICY "Users can manage own reports" ON saved_reports
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
