CREATE TABLE IF NOT EXISTS tiss_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Identificação
  submission_number VARCHAR(50) UNIQUE NOT NULL,
  lote_number VARCHAR(50) NOT NULL,
  
  -- Tipo de guia
  guide_type VARCHAR(50) NOT NULL CHECK (guide_type IN (
    'consulta', 'sp_sadt', 'internacao', 'honorarios', 'odonto'
  )),
  
  -- Operadora
  operadora_codigo VARCHAR(10) NOT NULL,
  operadora_nome VARCHAR(255),
  
  -- XML
  xml_content TEXT NOT NULL,
  xml_hash VARCHAR(64), -- SHA-256 do XML
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
    'pending', 'sent', 'accepted', 'rejected', 'processing', 'processed', 'error'
  )),
  
  -- Protocolo ANS
  protocol_number VARCHAR(50),
  protocol_date TIMESTAMPTZ,
  
  -- Resposta da operadora
  response_xml TEXT,
  response_date TIMESTAMPTZ,
  rejection_reason TEXT,
  
  -- Valores
  total_guides INTEGER DEFAULT 0,
  total_value DECIMAL(10,2),
  
  -- Guias incluídas neste lote
  guide_ids JSONB DEFAULT '[]'::jsonb, -- Array de IDs das guias
  
  -- FTP/Transmissão
  transmission_method VARCHAR(50) DEFAULT 'manual' CHECK (transmission_method IN (
    'manual', 'ftp', 'webservice', 'email'
  )),
  sent_at TIMESTAMPTZ,
  sent_to VARCHAR(255),
  
  -- Auditoria
  validation_errors JSONB DEFAULT '[]'::jsonb,
  xsd_validation_passed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tiss_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  submission_id UUID REFERENCES tiss_submissions(id) ON DELETE SET NULL,
  
  -- Relação com atendimento
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  
  -- Número da guia
  guide_number VARCHAR(50) UNIQUE NOT NULL,
  guide_type VARCHAR(50) NOT NULL,
  
  -- Dados do beneficiário
  beneficiary_card_number VARCHAR(50),
  beneficiary_name VARCHAR(255) NOT NULL,
  beneficiary_cpf VARCHAR(14),
  
  -- Profissional executante
  professional_name VARCHAR(255) NOT NULL,
  professional_council VARCHAR(20) NOT NULL, -- CRM, CRO, etc
  professional_number VARCHAR(20) NOT NULL,
  professional_uf VARCHAR(2) NOT NULL,
  professional_cbo VARCHAR(10),
  
  -- Procedimentos
  procedures JSONB NOT NULL, -- Array de procedimentos
  
  -- Valores
  total_value DECIMAL(10,2) NOT NULL,
  
  -- Datas
  issue_date DATE NOT NULL,
  execution_date DATE,
  
  -- Indicação clínica
  clinical_indication TEXT,
  observations TEXT,
  
  -- Status de pagamento
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'authorized', 'paid', 'denied', 'gloss'
  )),
  
  authorized_value DECIMAL(10,2),
  paid_value DECIMAL(10,2),
  gloss_value DECIMAL(10,2),
  gloss_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE tiss_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiss_guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY tiss_submissions_select ON tiss_submissions
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY tiss_submissions_insert ON tiss_submissions
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY tiss_submissions_update ON tiss_submissions
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY tiss_submissions_delete ON tiss_submissions
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY tiss_guides_select ON tiss_guides
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY tiss_guides_insert ON tiss_guides
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY tiss_guides_update ON tiss_guides
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY tiss_guides_delete ON tiss_guides
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_tiss_submissions_tenant ON tiss_submissions(tenant_id);
CREATE INDEX idx_tiss_submissions_status ON tiss_submissions(status);
CREATE INDEX idx_tiss_submissions_lote ON tiss_submissions(lote_number);
CREATE INDEX idx_tiss_guides_tenant ON tiss_guides(tenant_id);
CREATE INDEX idx_tiss_guides_submission ON tiss_guides(submission_id);
CREATE INDEX idx_tiss_guides_appointment ON tiss_guides(appointment_id);
CREATE INDEX idx_tiss_guides_patient ON tiss_guides(patient_id);
CREATE INDEX idx_tiss_guides_payment ON tiss_guides(payment_status);

-- Função para gerar número de lote sequencial
CREATE OR REPLACE FUNCTION generate_tiss_lote_number(tenant_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  lote_count INTEGER;
  tenant_prefix TEXT;
BEGIN
  -- Set search path to ensure tenant_id is available
  PERFORM set_config('search_path', 'public', false);
  
  SELECT COUNT(*) INTO lote_count
  FROM tiss_submissions
  WHERE tiss_submissions.tenant_id = tenant_uuid;
  
  tenant_prefix := substring(tenant_uuid::text, 1, 8);
  
  RETURN 'LOTE-' || tenant_prefix || '-' || LPAD((lote_count + 1)::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
