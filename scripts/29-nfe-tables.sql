CREATE TABLE IF NOT EXISTS nfe_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Identificação
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  invoice_type VARCHAR(20) NOT NULL CHECK (invoice_type IN ('nfe', 'nfse')),
  series VARCHAR(10) DEFAULT '1',
  
  -- Relacionamento
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  
  -- Dados do Tomador (paciente/responsável)
  customer_name VARCHAR(255) NOT NULL,
  customer_cpf_cnpj VARCHAR(18) NOT NULL,
  customer_address JSONB,
  
  -- Serviços
  services JSONB NOT NULL, -- Array de serviços prestados
  
  -- Valores
  services_value DECIMAL(10,2) NOT NULL,
  deductions_value DECIMAL(10,2) DEFAULT 0,
  discount_value DECIMAL(10,2) DEFAULT 0,
  
  -- Impostos
  iss_value DECIMAL(10,2) DEFAULT 0,
  iss_rate DECIMAL(5,2) DEFAULT 0,
  pis_value DECIMAL(10,2) DEFAULT 0,
  cofins_value DECIMAL(10,2) DEFAULT 0,
  inss_value DECIMAL(10,2) DEFAULT 0,
  ir_value DECIMAL(10,2) DEFAULT 0,
  csll_value DECIMAL(10,2) DEFAULT 0,
  
  net_value DECIMAL(10,2) NOT NULL,
  
  -- XML NFe/NFSe
  xml_content TEXT,
  xml_signed TEXT,
  xml_hash VARCHAR(64),
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
    'draft', 'processing', 'authorized', 'rejected', 'cancelled', 'error'
  )),
  
  -- SEFAZ/Prefeitura
  authorization_protocol VARCHAR(50),
  authorization_date TIMESTAMPTZ,
  access_key VARCHAR(44), -- Chave de acesso NFe (44 dígitos)
  verification_code VARCHAR(10), -- Código de verificação NFSe
  
  -- RPS (NFSe)
  rps_number VARCHAR(50),
  rps_series VARCHAR(10),
  rps_date DATE,
  
  -- Cancelamento
  cancellation_date TIMESTAMPTZ,
  cancellation_reason TEXT,
  cancellation_protocol VARCHAR(50),
  
  -- Transmissão
  sent_at TIMESTAMPTZ,
  response_message TEXT,
  error_message TEXT,
  
  -- PDF DANFE
  danfe_url TEXT,
  
  -- Integração API Brasil
  api_brasil_id VARCHAR(100),
  api_brasil_response JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS nfe_configuration (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Ambiente
  environment VARCHAR(20) DEFAULT 'sandbox' CHECK (environment IN ('sandbox', 'production')),
  
  -- Certificado Digital A1
  certificate_path TEXT,
  certificate_password_encrypted TEXT,
  certificate_expires_at DATE,
  
  -- Dados do Emissor
  company_name VARCHAR(255) NOT NULL,
  company_cnpj VARCHAR(18) NOT NULL,
  company_ie VARCHAR(20), -- Inscrição Estadual
  company_im VARCHAR(20), -- Inscrição Municipal
  company_cnae VARCHAR(10),
  company_regime_tributario VARCHAR(2), -- 1=Simples Nacional, 3=Normal
  
  -- Endereço
  address_street VARCHAR(255),
  address_number VARCHAR(20),
  address_complement VARCHAR(100),
  address_neighborhood VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(2),
  address_zipcode VARCHAR(10),
  address_city_code VARCHAR(10), -- Código IBGE
  
  -- Contato
  phone VARCHAR(20),
  email VARCHAR(255),
  
  -- Configurações NFe
  nfe_series VARCHAR(10) DEFAULT '1',
  nfe_last_number INTEGER DEFAULT 0,
  nfe_csc VARCHAR(50), -- Código de Segurança do Contribuinte
  nfe_csc_id VARCHAR(10),
  
  -- Configurações NFSe
  nfse_rps_series VARCHAR(10) DEFAULT '1',
  nfse_last_rps_number INTEGER DEFAULT 0,
  nfse_last_nfse_number INTEGER DEFAULT 0,
  nfse_city_code VARCHAR(10),
  nfse_provider_code VARCHAR(20), -- Código da prefeitura
  
  -- API Brasil
  api_brasil_token TEXT,
  api_brasil_endpoint TEXT DEFAULT 'https://api.apibrasil.io',
  
  -- Opções
  send_email_to_customer BOOLEAN DEFAULT true,
  auto_send_to_sefaz BOOLEAN DEFAULT false,
  
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(tenant_id)
);

-- RLS Policies
ALTER TABLE nfe_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfe_configuration ENABLE ROW LEVEL SECURITY;

CREATE POLICY nfe_invoices_select ON nfe_invoices
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_invoices_insert ON nfe_invoices
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_invoices_update ON nfe_invoices
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_invoices_delete ON nfe_invoices
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_configuration_select ON nfe_configuration
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_configuration_insert ON nfe_configuration
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY nfe_configuration_update ON nfe_configuration
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_nfe_invoices_tenant ON nfe_invoices(tenant_id);
CREATE INDEX idx_nfe_invoices_patient ON nfe_invoices(patient_id);
CREATE INDEX idx_nfe_invoices_status ON nfe_invoices(status);
CREATE INDEX idx_nfe_invoices_type ON nfe_invoices(invoice_type);
CREATE INDEX idx_nfe_invoices_created ON nfe_invoices(created_at);
CREATE INDEX idx_nfe_configuration_tenant ON nfe_configuration(tenant_id);

-- Função para gerar próximo número NFe
CREATE OR REPLACE FUNCTION get_next_nfe_number(tenant_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  next_number INTEGER;
BEGIN
  UPDATE nfe_configuration
  SET nfe_last_number = nfe_last_number + 1,
      updated_at = NOW()
  WHERE nfe_configuration.tenant_id = tenant_uuid
  RETURNING nfe_last_number INTO next_number;
  
  RETURN next_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para gerar próximo número RPS
CREATE OR REPLACE FUNCTION get_next_rps_number(tenant_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  next_number INTEGER;
BEGIN
  UPDATE nfe_configuration
  SET nfse_last_rps_number = nfse_last_rps_number + 1,
      updated_at = NOW()
  WHERE nfe_configuration.tenant_id = tenant_uuid
  RETURNING nfse_last_rps_number INTO next_number;
  
  RETURN next_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
