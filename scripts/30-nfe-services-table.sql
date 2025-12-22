-- Tabela de serviços para NFE
CREATE TABLE IF NOT EXISTS nfe_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Identificação
  code VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,

  -- Códigos Fiscais
  lc116_code VARCHAR(10) NOT NULL, -- Código LC 116/2003
  cnae_code VARCHAR(15), -- Código CNAE

  -- Tributação
  iss_rate DECIMAL(5,2) DEFAULT 2.0, -- Alíquota ISS (%)
  iss_retido BOOLEAN DEFAULT false,

  -- Valores
  unit_price DECIMAL(10,2) DEFAULT 0,

  -- Categoria
  category VARCHAR(100),

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Metadados
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(tenant_id, code)
);

-- RLS
ALTER TABLE nfe_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY nfe_services_select ON nfe_services
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_services_insert ON nfe_services
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_services_update ON nfe_services
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_services_delete ON nfe_services
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_nfe_services_tenant ON nfe_services(tenant_id);
CREATE INDEX idx_nfe_services_code ON nfe_services(code);
CREATE INDEX idx_nfe_services_lc116 ON nfe_services(lc116_code);
CREATE INDEX idx_nfe_services_active ON nfe_services(is_active);

-- Atualizar tabela nfe_configuration com novos campos
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS company_fantasy_name VARCHAR(255);
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS company_crt VARCHAR(2) DEFAULT '1';
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS optante_simples BOOLEAN DEFAULT true;
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS optante_mei BOOLEAN DEFAULT false;
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS website VARCHAR(255);
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS certificate_subject TEXT;

-- Campos do contabilista
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS accountant_name VARCHAR(255);
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS accountant_cpf VARCHAR(14);
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS accountant_crc VARCHAR(20);
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS accountant_email VARCHAR(255);
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS accountant_phone VARCHAR(20);
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS send_copy_to_accountant BOOLEAN DEFAULT true;
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS accountant_send_frequency VARCHAR(20) DEFAULT 'immediate';
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS include_pdf_in_email BOOLEAN DEFAULT true;
ALTER TABLE nfe_configuration ADD COLUMN IF NOT EXISTS include_xml_in_email BOOLEAN DEFAULT true;

-- Atualizar tabela nfe_invoices com issue_date se não existir
ALTER TABLE nfe_invoices ADD COLUMN IF NOT EXISTS issue_date TIMESTAMPTZ DEFAULT NOW();

-- Tabela de histórico de envios de email
CREATE TABLE IF NOT EXISTS nfe_email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  invoice_id UUID NOT NULL REFERENCES nfe_invoices(id) ON DELETE CASCADE,

  -- Destinatário
  recipient_type VARCHAR(20) NOT NULL CHECK (recipient_type IN ('customer', 'accountant', 'other')),
  recipient_email VARCHAR(255) NOT NULL,
  recipient_name VARCHAR(255),

  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'bounced')),

  -- Conteúdo
  subject VARCHAR(500),
  has_pdf BOOLEAN DEFAULT false,
  has_xml BOOLEAN DEFAULT false,

  -- Resposta
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  error_message TEXT,
  sendgrid_message_id VARCHAR(100),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS para email logs
ALTER TABLE nfe_email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY nfe_email_logs_select ON nfe_email_logs
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_email_logs_insert ON nfe_email_logs
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_nfe_email_logs_invoice ON nfe_email_logs(invoice_id);
CREATE INDEX idx_nfe_email_logs_status ON nfe_email_logs(status);

-- Inserir serviços padrão de saúde (será executado por tenant)
-- A inserção real será feita via aplicação quando o tenant for criado
