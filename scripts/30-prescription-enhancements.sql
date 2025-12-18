CREATE TABLE IF NOT EXISTS prescription_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  user_id UUID NOT NULL,
  
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100), -- antibiotico, controlado, cronico, etc
  
  -- Medicamentos padrão do template
  medications JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{name, dosage, instructions, duration_days}]
  
  -- Instruções padrão
  general_instructions TEXT,
  
  -- Metadata
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  is_public BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prescription_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prescription_id UUID NOT NULL,
  tenant_id UUID NOT NULL,
  
  action VARCHAR(50) NOT NULL CHECK (action IN (
    'created', 'signed', 'sent', 'viewed', 'printed', 'cancelled', 'amended'
  )),
  
  performed_by UUID,
  
  details JSONB DEFAULT '{}'::jsonb,
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS controlled_substances_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  prescription_id UUID NOT NULL,
  
  -- Substância controlada
  substance_name VARCHAR(255) NOT NULL,
  substance_portaria VARCHAR(50), -- Portaria 344/98 categoria (A1, B1, C1, etc)
  
  -- Paciente
  patient_id UUID NOT NULL,
  patient_name VARCHAR(255),
  patient_cpf VARCHAR(14),
  
  -- Prescritor
  prescriber_id UUID NOT NULL,
  prescriber_name VARCHAR(255),
  prescriber_crm VARCHAR(20),
  prescriber_uf VARCHAR(2),
  
  -- Detalhes da prescrição
  quantity_prescribed VARCHAR(100),
  dosage VARCHAR(255),
  prescription_date DATE NOT NULL,
  
  -- Notificação de Receita (quando aplicável)
  notification_number VARCHAR(50),
  notification_type VARCHAR(10), -- A, B, C, Especial
  
  -- Auditoria
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE prescription_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE controlled_substances_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS prescription_templates_select ON prescription_templates;
DROP POLICY IF EXISTS prescription_templates_insert ON prescription_templates;
DROP POLICY IF EXISTS prescription_templates_update ON prescription_templates;
DROP POLICY IF EXISTS prescription_templates_delete ON prescription_templates;
DROP POLICY IF EXISTS prescription_history_select ON prescription_history;
DROP POLICY IF EXISTS prescription_history_insert ON prescription_history;
DROP POLICY IF EXISTS controlled_substances_log_select ON controlled_substances_log;
DROP POLICY IF EXISTS controlled_substances_log_insert ON controlled_substances_log;

CREATE POLICY prescription_templates_select ON prescription_templates
  FOR SELECT USING (
    tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid)
    OR is_public = true
  );

CREATE POLICY prescription_templates_insert ON prescription_templates
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY prescription_templates_update ON prescription_templates
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY prescription_templates_delete ON prescription_templates
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY prescription_history_select ON prescription_history
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY prescription_history_insert ON prescription_history
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY controlled_substances_log_select ON controlled_substances_log
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY controlled_substances_log_insert ON controlled_substances_log
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
DROP INDEX IF EXISTS idx_prescription_templates_tenant;
DROP INDEX IF EXISTS idx_prescription_templates_category;
DROP INDEX IF EXISTS idx_prescription_history_prescription;
DROP INDEX IF EXISTS idx_prescription_history_action;
DROP INDEX IF EXISTS idx_controlled_substances_tenant;
DROP INDEX IF EXISTS idx_controlled_substances_patient;
DROP INDEX IF EXISTS idx_controlled_substances_prescriber;
DROP INDEX IF EXISTS idx_controlled_substances_date;

CREATE INDEX idx_prescription_templates_tenant ON prescription_templates(tenant_id);
CREATE INDEX idx_prescription_templates_category ON prescription_templates(category);
CREATE INDEX idx_prescription_history_prescription ON prescription_history(prescription_id);
CREATE INDEX idx_prescription_history_action ON prescription_history(action);
CREATE INDEX idx_controlled_substances_tenant ON controlled_substances_log(tenant_id);
CREATE INDEX idx_controlled_substances_patient ON controlled_substances_log(patient_id);
CREATE INDEX idx_controlled_substances_prescriber ON controlled_substances_log(prescriber_id);
CREATE INDEX idx_controlled_substances_date ON controlled_substances_log(prescription_date);

-- Seed templates comuns
INSERT INTO prescription_templates (tenant_id, user_id, name, category, medications, general_instructions, is_public) 
SELECT 
  (SELECT id FROM tenants LIMIT 1),
  (SELECT id FROM users LIMIT 1),
  'Antibiótico Amoxicilina',
  'antibiotico',
  '[{"name": "Amoxicilina 500mg", "dosage": "1 cápsula", "instructions": "Via oral, de 8 em 8 horas", "duration_days": 7}]'::jsonb,
  'Tomar após as refeições. Não interromper o tratamento antes do prazo.',
  true
WHERE EXISTS (SELECT 1 FROM tenants LIMIT 1);

INSERT INTO prescription_templates (tenant_id, user_id, name, category, medications, general_instructions, is_public) 
SELECT 
  (SELECT id FROM tenants LIMIT 1),
  (SELECT id FROM users LIMIT 1),
  'Analgésico + Anti-inflamatório',
  'dor',
  '[{"name": "Dipirona 500mg", "dosage": "1 comprimido", "instructions": "Via oral, de 6 em 6 horas se dor", "duration_days": 5}, {"name": "Ibuprofeno 400mg", "dosage": "1 comprimido", "instructions": "Via oral, de 8 em 8 horas após refeição", "duration_days": 5}]'::jsonb,
  'Tomar anti-inflamatório sempre após refeição. Não exceder 4 doses diárias de dipirona.',
  true
WHERE EXISTS (SELECT 1 FROM tenants LIMIT 1);

INSERT INTO prescription_templates (tenant_id, user_id, name, category, medications, general_instructions, is_public) 
SELECT 
  (SELECT id FROM tenants LIMIT 1),
  (SELECT id FROM users LIMIT 1),
  'Hipertensão - Losartana',
  'cronico',
  '[{"name": "Losartana Potássica 50mg", "dosage": "1 comprimido", "instructions": "Via oral, 1x ao dia pela manhã", "duration_days": 30}]'::jsonb,
  'Uso contínuo. Não interromper sem orientação médica. Retorno em 30 dias.',
  true
WHERE EXISTS (SELECT 1 FROM tenants LIMIT 1);

-- Trigger para registrar histórico automaticamente
CREATE OR REPLACE FUNCTION log_prescription_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO prescription_history (
    prescription_id, tenant_id, action, details
  ) VALUES (
    NEW.id,
    NEW.tenant_id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'created'
      WHEN NEW.status = 'signed' AND OLD.status != 'signed' THEN 'signed'
      WHEN NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN 'cancelled'
      ELSE 'amended'
    END,
    jsonb_build_object('operation', TG_OP)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists before creating
DROP TRIGGER IF EXISTS prescription_audit_trail ON digital_prescriptions;

CREATE TRIGGER prescription_audit_trail
  AFTER INSERT OR UPDATE ON digital_prescriptions
  FOR EACH ROW
  EXECUTE FUNCTION log_prescription_action();
