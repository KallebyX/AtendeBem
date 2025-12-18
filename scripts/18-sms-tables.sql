-- Migration: Tabelas de SMS (MOD-SMS)
-- Data: 2025-12-17

CREATE TABLE IF NOT EXISTS sms_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    message_template TEXT NOT NULL,
    
    -- Agendamento
    scheduled_for TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, sending, completed, cancelled
    
    -- Destinatários
    recipient_filter JSONB, -- Filtros para selecionar pacientes
    total_recipients INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    delivered_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    
    -- Custos
    estimated_cost DECIMAL(10, 2),
    actual_cost DECIMAL(10, 2),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_sms_campaigns_tenant ON sms_campaigns(tenant_id);
CREATE INDEX IF NOT EXISTS idx_sms_campaigns_status ON sms_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_sms_campaigns_scheduled ON sms_campaigns(scheduled_for);

ALTER TABLE sms_campaigns ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own campaigns" ON sms_campaigns;
CREATE POLICY "Users can view own campaigns" ON sms_campaigns
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own campaigns" ON sms_campaigns;
CREATE POLICY "Users can manage own campaigns" ON sms_campaigns
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Mensagens SMS individuais
CREATE TABLE IF NOT EXISTS sms_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES sms_campaigns(id) ON DELETE SET NULL,
    
    to_number VARCHAR(20) NOT NULL,
    message_text TEXT NOT NULL,
    
    -- Twilio
    twilio_sid VARCHAR(100) UNIQUE,
    status VARCHAR(50) DEFAULT 'queued', -- queued, sent, delivered, failed, undelivered
    error_code VARCHAR(20),
    error_message TEXT,
    
    -- Custos
    cost DECIMAL(10, 4),
    
    -- Opt-out
    is_opt_out BOOLEAN DEFAULT false,
    
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sms_messages_tenant ON sms_messages(tenant_id);
CREATE INDEX IF NOT EXISTS idx_sms_messages_patient ON sms_messages(patient_id);
CREATE INDEX IF NOT EXISTS idx_sms_messages_campaign ON sms_messages(campaign_id);
CREATE INDEX IF NOT EXISTS idx_sms_messages_status ON sms_messages(status);
CREATE INDEX IF NOT EXISTS idx_sms_messages_created ON sms_messages(created_at DESC);

ALTER TABLE sms_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own sms" ON sms_messages;
CREATE POLICY "Users can view own sms" ON sms_messages
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can create own sms" ON sms_messages;
CREATE POLICY "Users can create own sms" ON sms_messages
    FOR INSERT WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Opt-outs (LGPD)
CREATE TABLE IF NOT EXISTS sms_opt_outs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    phone_number VARCHAR(20) NOT NULL,
    opted_out_at TIMESTAMPTZ DEFAULT NOW(),
    reason VARCHAR(255),
    
    UNIQUE(tenant_id, phone_number)
);

CREATE INDEX IF NOT EXISTS idx_sms_opt_outs_phone ON sms_opt_outs(phone_number);

ALTER TABLE sms_opt_outs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own opt-outs" ON sms_opt_outs;
CREATE POLICY "Users can view own opt-outs" ON sms_opt_outs
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
