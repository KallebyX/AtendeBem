-- Recreating TISS tables with all columns correctly defined including payment_status
-- TISS Submission and Guides Tables
-- Para integração completa com operadoras de saúde

-- Drop existing tables to recreate with correct schema
DROP TABLE IF EXISTS tiss_guides CASCADE;
DROP TABLE IF EXISTS tiss_submissions CASCADE;

-- =====================================================
-- TABELA: tiss_submissions (Lotes de Envio TISS)
-- =====================================================
CREATE TABLE tiss_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  guide_ids JSONB DEFAULT '[]'::jsonb,
  
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

-- =====================================================
-- TABELA: tiss_guides (Guias TISS Individuais)
-- =====================================================
CREATE TABLE tiss_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
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
  procedures JSONB NOT NULL,
  
  -- Valores
  total_value DECIMAL(10,2) NOT NULL,
  
  -- Datas
  issue_date DATE NOT NULL,
  execution_date DATE,
  
  -- Indicação clínica
  clinical_indication TEXT,
  observations TEXT,

  -- Status da guia (workflow)
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
    'draft', 'pending', 'sent', 'processing', 'processed', 'accepted', 'rejected', 'error'
  )),

  -- Status de pagamento - coluna adicionada corretamente
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

-- Índices para performance
DROP INDEX IF EXISTS idx_tiss_submissions_user;
DROP INDEX IF EXISTS idx_tiss_submissions_status;
DROP INDEX IF EXISTS idx_tiss_submissions_lote;
DROP INDEX IF EXISTS idx_tiss_guides_user;
DROP INDEX IF EXISTS idx_tiss_guides_submission;
DROP INDEX IF EXISTS idx_tiss_guides_appointment;
DROP INDEX IF EXISTS idx_tiss_guides_patient;
DROP INDEX IF EXISTS idx_tiss_guides_payment;
DROP INDEX IF EXISTS idx_tiss_guides_status;

CREATE INDEX idx_tiss_submissions_user ON tiss_submissions(user_id);
CREATE INDEX idx_tiss_submissions_status ON tiss_submissions(status);
CREATE INDEX idx_tiss_submissions_lote ON tiss_submissions(lote_number);
CREATE INDEX idx_tiss_guides_user ON tiss_guides(user_id);
CREATE INDEX idx_tiss_guides_submission ON tiss_guides(submission_id);
CREATE INDEX idx_tiss_guides_appointment ON tiss_guides(appointment_id);
CREATE INDEX idx_tiss_guides_patient ON tiss_guides(patient_id);
CREATE INDEX idx_tiss_guides_payment ON tiss_guides(payment_status);
CREATE INDEX idx_tiss_guides_status ON tiss_guides(status);

-- RLS Policies
ALTER TABLE tiss_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiss_guides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own submissions" ON tiss_submissions;
CREATE POLICY "Users can view own submissions" ON tiss_submissions
    FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can create own submissions" ON tiss_submissions;
CREATE POLICY "Users can create own submissions" ON tiss_submissions
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can update own submissions" ON tiss_submissions;
CREATE POLICY "Users can update own submissions" ON tiss_submissions
    FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can view own guides" ON tiss_guides;
CREATE POLICY "Users can view own guides" ON tiss_guides
    FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can create own guides" ON tiss_guides;
CREATE POLICY "Users can create own guides" ON tiss_guides
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can update own guides" ON tiss_guides;
CREATE POLICY "Users can update own guides" ON tiss_guides
    FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);
