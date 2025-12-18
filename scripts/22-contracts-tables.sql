CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  
  contract_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  contract_type VARCHAR(50) NOT NULL CHECK (contract_type IN (
    'treatment_plan', 'service_agreement', 'informed_consent',
    'privacy_policy', 'payment_plan', 'telemedicine_consent', 'other'
  )),
  
  -- Conteúdo
  content TEXT NOT NULL, -- HTML/Markdown do contrato
  template_id UUID, -- Referência ao template usado
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
    'draft', 'pending_signature', 'signed', 'cancelled', 'expired'
  )),
  
  -- Assinatura Paciente
  patient_signed_at TIMESTAMPTZ,
  patient_signature_url TEXT,
  patient_ip_address INET,
  patient_user_agent TEXT,
  
  -- Assinatura Profissional
  professional_signed_at TIMESTAMPTZ,
  professional_signature_url TEXT,
  professional_ip_address INET,
  
  -- Testemunhas (opcional)
  witness1_name VARCHAR(255),
  witness1_signature_url TEXT,
  witness1_signed_at TIMESTAMPTZ,
  witness2_name VARCHAR(255),
  witness2_signature_url TEXT,
  witness2_signed_at TIMESTAMPTZ,
  
  -- Validade
  valid_from DATE,
  valid_until DATE,
  
  -- Anexos
  attachments JSONB DEFAULT '[]'::jsonb,
  
  -- Metadados
  metadata JSONB,
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contract_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  contract_type VARCHAR(50) NOT NULL,
  
  content TEXT NOT NULL, -- Template com variáveis {{patient_name}}, {{date}}, etc
  
  -- Campos dinâmicos
  dynamic_fields JSONB DEFAULT '[]'::jsonb, -- [{name: 'treatment_duration', type: 'number', label: 'Duração do tratamento (meses)'}]
  
  -- Disponibilidade
  is_public BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  -- Versão
  version INTEGER DEFAULT 1,
  previous_version_id UUID REFERENCES contract_templates(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY contracts_select ON contracts
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY contracts_insert ON contracts
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY contracts_update ON contracts
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY contracts_delete ON contracts
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY contract_templates_select ON contract_templates
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid) OR is_public = true);

CREATE POLICY contract_templates_insert ON contract_templates
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY contract_templates_update ON contract_templates
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY contract_templates_delete ON contract_templates
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_contracts_tenant ON contracts(tenant_id);
CREATE INDEX idx_contracts_patient ON contracts(patient_id);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contract_templates_tenant ON contract_templates(tenant_id);
CREATE INDEX idx_contract_templates_type ON contract_templates(contract_type);
CREATE INDEX idx_contract_templates_public ON contract_templates(is_public) WHERE is_public = true;

-- Seed: Templates padrão
INSERT INTO contract_templates (id, name, description, contract_type, content, is_public, tenant_id) VALUES
(
  '10000000-0000-0000-0000-000000000001',
  'Consentimento Informado - Procedimento Geral',
  'Template padrão de consentimento para procedimentos médicos',
  'informed_consent',
  '<h2>TERMO DE CONSENTIMENTO INFORMADO</h2>
<p>Eu, <strong>{{patient_name}}</strong>, portador do CPF <strong>{{patient_cpf}}</strong>, declaro que fui devidamente informado(a) sobre o procedimento: <strong>{{procedure_name}}</strong></p>
<h3>Sobre o Procedimento:</h3>
<p>{{procedure_description}}</p>
<h3>Riscos e Benefícios:</h3>
<p>{{risks_benefits}}</p>
<p>Declaro que todas as minhas dúvidas foram esclarecidas e concordo em realizar o procedimento acima descrito.</p>
<p>Data: {{date}}<br>Local: {{clinic_name}}</p>',
  true,
  NULL
),
(
  '10000000-0000-0000-0000-000000000002',
  'Plano de Tratamento Odontológico',
  'Contrato de plano de tratamento para odontologia',
  'treatment_plan',
  '<h2>PLANO DE TRATAMENTO ODONTOLÓGICO</h2>
<p>Paciente: <strong>{{patient_name}}</strong><br>Data de início: <strong>{{start_date}}</strong></p>
<h3>Descrição do Tratamento:</h3>
<p>{{treatment_description}}</p>
<h3>Procedimentos Planejados:</h3>
{{procedures_list}}
<h3>Valores e Condições:</h3>
<p>Valor total: <strong>R$ {{total_amount}}</strong><br>Forma de pagamento: <strong>{{payment_terms}}</strong></p>
<p>Prazo estimado: <strong>{{duration}}</strong> meses</p>',
  true,
  NULL
),
(
  '10000000-0000-0000-0000-000000000003',
  'Termo de Consentimento - Telemedicina',
  'Consentimento para atendimento por telemedicina',
  'telemedicine_consent',
  '<h2>TERMO DE CONSENTIMENTO - TELEMEDICINA</h2>
<p>Eu, <strong>{{patient_name}}</strong>, concordo em ser atendido(a) por meio de telemedicina (consulta online) pelo Dr(a). <strong>{{doctor_name}}</strong>, CRM <strong>{{crm_number}}</strong>.</p>
<h3>Estou ciente de que:</h3>
<ul>
  <li>A consulta será realizada por videoconferência através da plataforma {{platform_name}}</li>
  <li>Posso interromper a consulta a qualquer momento</li>
  <li>Meus dados médicos serão mantidos em sigilo conforme Lei Geral de Proteção de Dados (LGPD)</li>
  <li>O profissional pode solicitar consulta presencial se julgar necessário</li>
</ul>
<p>Data: {{date}}</p>',
  true,
  NULL
);

