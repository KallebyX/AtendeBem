CREATE TABLE IF NOT EXISTS electronic_medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  
  -- Identificação
  record_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Dados Demográficos consolidados
  demographics JSONB DEFAULT '{}'::jsonb,
  
  -- Alergias e Reações Adversas
  allergies JSONB DEFAULT '[]'::jsonb, -- [{allergen, reaction, severity, date_identified}]
  
  -- Problemas Ativos
  active_problems JSONB DEFAULT '[]'::jsonb, -- [{icd10, description, onset_date, status}]
  
  -- Medicamentos em Uso
  current_medications JSONB DEFAULT '[]'::jsonb, -- [{name, dosage, frequency, start_date, prescriber}]
  
  -- Vacinas
  immunizations JSONB DEFAULT '[]'::jsonb, -- [{vaccine, date, dose, lot_number, site}]
  
  -- História Familiar
  family_history JSONB DEFAULT '{}'::jsonb,
  
  -- História Social
  social_history JSONB DEFAULT '{}'::jsonb,
  
  -- Sinais Vitais (últimos registrados)
  last_vital_signs JSONB DEFAULT '{}'::jsonb, -- {bp, hr, temp, weight, height, bmi, date}
  
  -- Resumo Clínico
  clinical_summary TEXT,
  
  -- Plano de Cuidados
  care_plan JSONB DEFAULT '[]'::jsonb,
  
  -- Diretivas Antecipadas
  advance_directives TEXT,
  
  -- Metadados
  last_updated_by UUID REFERENCES users(id),
  data_sources JSONB DEFAULT '[]'::jsonb, -- Fontes que alimentaram o prontuário
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clinical_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  emr_id UUID NOT NULL REFERENCES electronic_medical_records(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  note_type VARCHAR(50) NOT NULL CHECK (note_type IN (
    'progress', 'soap', 'consultation', 'admission', 'discharge',
    'procedure', 'emergency', 'telephone', 'other'
  )),
  
  -- Conteúdo
  subject VARCHAR(255),
  content TEXT NOT NULL,
  
  -- SOAP estruturado (se aplicável)
  soap_subjective TEXT,
  soap_objective TEXT,
  soap_assessment TEXT,
  soap_plan TEXT,
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
    'draft', 'signed', 'amended', 'deleted'
  )),
  
  signed_at TIMESTAMPTZ,
  
  -- Anexos
  attachments JSONB DEFAULT '[]'::jsonb,
  
  -- Revisões
  amendment_reason TEXT,
  original_note_id UUID REFERENCES clinical_notes(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS problem_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emr_id UUID NOT NULL REFERENCES electronic_medical_records(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  -- Problema
  icd10_code VARCHAR(10),
  description VARCHAR(255) NOT NULL,
  
  -- Classificação
  problem_type VARCHAR(50) CHECK (problem_type IN (
    'diagnosis', 'symptom', 'condition', 'finding'
  )),
  
  severity VARCHAR(20) CHECK (severity IN ('mild', 'moderate', 'severe', 'critical')),
  
  -- Status
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN (
    'active', 'inactive', 'resolved', 'ruled_out'
  )),
  
  -- Datas
  onset_date DATE,
  resolution_date DATE,
  
  -- Observações
  notes TEXT,
  
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE electronic_medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_list ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS emr_select ON electronic_medical_records;
DROP POLICY IF EXISTS emr_insert ON electronic_medical_records;
DROP POLICY IF EXISTS emr_update ON electronic_medical_records;
DROP POLICY IF EXISTS emr_delete ON electronic_medical_records;
DROP POLICY IF EXISTS clinical_notes_select ON clinical_notes;
DROP POLICY IF EXISTS clinical_notes_insert ON clinical_notes;
DROP POLICY IF EXISTS clinical_notes_update ON clinical_notes;
DROP POLICY IF EXISTS clinical_notes_delete ON clinical_notes;
DROP POLICY IF EXISTS problem_list_select ON problem_list;
DROP POLICY IF EXISTS problem_list_insert ON problem_list;
DROP POLICY IF EXISTS problem_list_update ON problem_list;
DROP POLICY IF EXISTS problem_list_delete ON problem_list;

CREATE POLICY emr_select ON electronic_medical_records
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY emr_insert ON electronic_medical_records
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY emr_update ON electronic_medical_records
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY emr_delete ON electronic_medical_records
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY clinical_notes_select ON clinical_notes
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY clinical_notes_insert ON clinical_notes
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY clinical_notes_update ON clinical_notes
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY clinical_notes_delete ON clinical_notes
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY problem_list_select ON problem_list
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY problem_list_insert ON problem_list
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY problem_list_update ON problem_list
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY problem_list_delete ON problem_list
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
DROP INDEX IF EXISTS idx_emr_tenant;
DROP INDEX IF EXISTS idx_emr_patient;
DROP INDEX IF EXISTS idx_clinical_notes_emr;
DROP INDEX IF EXISTS idx_clinical_notes_appointment;
DROP INDEX IF EXISTS idx_clinical_notes_type;
DROP INDEX IF EXISTS idx_problem_list_emr;
DROP INDEX IF EXISTS idx_problem_list_status;

CREATE INDEX idx_emr_tenant ON electronic_medical_records(tenant_id);
CREATE INDEX idx_emr_patient ON electronic_medical_records(patient_id);
CREATE INDEX idx_clinical_notes_emr ON clinical_notes(emr_id);
CREATE INDEX idx_clinical_notes_appointment ON clinical_notes(appointment_id);
CREATE INDEX idx_clinical_notes_type ON clinical_notes(note_type);
CREATE INDEX idx_problem_list_emr ON problem_list(emr_id);
CREATE INDEX idx_problem_list_status ON problem_list(status);

-- Função para auto-criar EMR quando patient é criado
CREATE OR REPLACE FUNCTION create_emr_for_patient()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO electronic_medical_records (
    tenant_id, patient_id, record_number
  ) VALUES (
    NEW.tenant_id, 
    NEW.id, 
    'EMR-' || substring(NEW.tenant_id::text, 1, 8) || '-' || substring(NEW.id::text, 1, 8)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para criar EMR automaticamente
CREATE TRIGGER auto_create_emr
  AFTER INSERT ON patients
  FOR EACH ROW
  EXECUTE FUNCTION create_emr_for_patient();
