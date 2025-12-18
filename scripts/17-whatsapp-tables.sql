-- Migration: Tabelas de WhatsApp Business (MOD-WHA)
-- Data: 2025-12-17

CREATE TABLE IF NOT EXISTS whatsapp_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    
    phone_number VARCHAR(20) NOT NULL,
    contact_name VARCHAR(255),
    
    last_message_at TIMESTAMPTZ,
    last_message_text TEXT,
    last_message_from VARCHAR(20), -- 'patient' or 'clinic'
    
    unread_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- active, archived, blocked
    
    -- Metadata
    labels TEXT[],
    assigned_to UUID REFERENCES users(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_tenant ON whatsapp_conversations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_phone ON whatsapp_conversations(phone_number);
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_status ON whatsapp_conversations(status);
CREATE INDEX IF NOT EXISTS idx_whatsapp_conversations_updated ON whatsapp_conversations(updated_at DESC);

ALTER TABLE whatsapp_conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own conversations" ON whatsapp_conversations;
CREATE POLICY "Users can view own conversations" ON whatsapp_conversations
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own conversations" ON whatsapp_conversations;
CREATE POLICY "Users can manage own conversations" ON whatsapp_conversations
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Mensagens WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    conversation_id UUID NOT NULL REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
    
    message_id VARCHAR(255) UNIQUE, -- WhatsApp message ID
    direction VARCHAR(20) NOT NULL, -- inbound, outbound
    
    from_number VARCHAR(20) NOT NULL,
    to_number VARCHAR(20) NOT NULL,
    
    content_type VARCHAR(50) DEFAULT 'text', -- text, image, audio, video, document
    content_text TEXT,
    media_url TEXT,
    
    -- Template (se outbound)
    template_name VARCHAR(100),
    template_params JSONB,
    
    -- Status de entrega
    status VARCHAR(50) DEFAULT 'sent', -- sent, delivered, read, failed
    status_updated_at TIMESTAMPTZ,
    error_message TEXT,
    
    -- Metadata
    is_automated BOOLEAN DEFAULT false,
    sent_by UUID REFERENCES users(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_conversation ON whatsapp_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_direction ON whatsapp_messages(direction);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_created ON whatsapp_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_status ON whatsapp_messages(status);

ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own messages" ON whatsapp_messages;
CREATE POLICY "Users can view own messages" ON whatsapp_messages
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can create own messages" ON whatsapp_messages;
CREATE POLICY "Users can create own messages" ON whatsapp_messages
    FOR INSERT WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
