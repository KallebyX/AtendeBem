-- Removendo dependência de tenant_id, adicionando DROP POLICY IF EXISTS, e usando apenas user_id
DROP TABLE IF EXISTS lab_templates CASCADE;
DROP TABLE IF EXISTS lab_exams CASCADE;
DROP TABLE IF EXISTS lab_orders CASCADE;

CREATE TABLE IF NOT EXISTS lab_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  
  order_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Laboratório
  lab_name VARCHAR(255) NOT NULL,
  lab_cnpj VARCHAR(18),
  lab_contact VARCHAR(100),
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
    'pending', 'sent', 'in_progress', 'partial_results', 
    'completed', 'cancelled', 'error'
  )),
  
  -- Datas
  ordered_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  expected_result_date DATE,
  completed_at TIMESTAMPTZ,
  
  -- Integração
  external_order_id VARCHAR(255),
  integration_type VARCHAR(50),
  
  -- Observações
  clinical_indication TEXT,
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lab_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES lab_orders(id) ON DELETE CASCADE,
  
  exam_code VARCHAR(20),
  exam_name VARCHAR(255) NOT NULL,
  exam_type VARCHAR(100),
  
  -- Resultados
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
    'pending', 'collected', 'processing', 'completed', 'cancelled'
  )),
  
  result_value VARCHAR(255),
  result_unit VARCHAR(50),
  reference_range VARCHAR(100),
  result_text TEXT,
  is_abnormal BOOLEAN DEFAULT false,
  
  -- Arquivos
  result_file_url TEXT,
  result_file_type VARCHAR(50),
  
  -- Datas
  collected_at TIMESTAMPTZ,
  resulted_at TIMESTAMPTZ,
  
  -- Observações
  lab_observations TEXT,
  critical_result BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lab_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  
  exams JSONB NOT NULL,
  
  is_public BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS lab_orders_select ON lab_orders;
DROP POLICY IF EXISTS lab_orders_insert ON lab_orders;
DROP POLICY IF EXISTS lab_orders_update ON lab_orders;
DROP POLICY IF EXISTS lab_orders_delete ON lab_orders;
DROP POLICY IF EXISTS lab_exams_select ON lab_exams;
DROP POLICY IF EXISTS lab_exams_insert ON lab_exams;
DROP POLICY IF EXISTS lab_exams_update ON lab_exams;
DROP POLICY IF EXISTS lab_exams_delete ON lab_exams;
DROP POLICY IF EXISTS lab_templates_select ON lab_templates;
DROP POLICY IF EXISTS lab_templates_insert ON lab_templates;
DROP POLICY IF EXISTS lab_templates_update ON lab_templates;
DROP POLICY IF EXISTS lab_templates_delete ON lab_templates;

CREATE POLICY lab_orders_select ON lab_orders
  FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY lab_orders_insert ON lab_orders
  FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY lab_orders_update ON lab_orders
  FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY lab_orders_delete ON lab_orders
  FOR DELETE USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY lab_exams_select ON lab_exams
  FOR SELECT USING (order_id IN (SELECT id FROM lab_orders WHERE user_id = current_setting('app.current_user_id', true)::uuid));

CREATE POLICY lab_exams_insert ON lab_exams
  FOR INSERT WITH CHECK (order_id IN (SELECT id FROM lab_orders WHERE user_id = current_setting('app.current_user_id', true)::uuid));

CREATE POLICY lab_exams_update ON lab_exams
  FOR UPDATE USING (order_id IN (SELECT id FROM lab_orders WHERE user_id = current_setting('app.current_user_id', true)::uuid));

CREATE POLICY lab_exams_delete ON lab_exams
  FOR DELETE USING (order_id IN (SELECT id FROM lab_orders WHERE user_id = current_setting('app.current_user_id', true)::uuid));

CREATE POLICY lab_templates_select ON lab_templates
  FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid OR is_public = true);

CREATE POLICY lab_templates_insert ON lab_templates
  FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY lab_templates_update ON lab_templates
  FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY lab_templates_delete ON lab_templates
  FOR DELETE USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Índices
DROP INDEX IF EXISTS idx_lab_orders_user;
DROP INDEX IF EXISTS idx_lab_orders_patient;
DROP INDEX IF EXISTS idx_lab_orders_status;
DROP INDEX IF EXISTS idx_lab_exams_order;
DROP INDEX IF EXISTS idx_lab_exams_status;

CREATE INDEX idx_lab_orders_user ON lab_orders(user_id);
CREATE INDEX idx_lab_orders_patient ON lab_orders(patient_id);
CREATE INDEX idx_lab_orders_status ON lab_orders(status);
CREATE INDEX idx_lab_exams_order ON lab_exams(order_id);
CREATE INDEX idx_lab_exams_status ON lab_exams(status);

-- Templates padrão
INSERT INTO lab_templates (name, description, category, exams, is_public, user_id) VALUES
('Hemograma Completo', 'Exame de sangue básico', 'rotina', 
 '[{"code": "40301010", "name": "Hemograma completo", "type": "sangue"}]'::jsonb, true, NULL),
('Checkup Anual', 'Exames de rotina anuais', 'checkup',
 '[{"code": "40301010", "name": "Hemograma completo", "type": "sangue"},
   {"code": "40301150", "name": "Glicemia de jejum", "type": "sangue"},
   {"code": "40301400", "name": "Colesterol total", "type": "sangue"},
   {"code": "40302180", "name": "Creatinina", "type": "sangue"}]'::jsonb, true, NULL),
('Pré-Operatório', 'Exames para cirurgia', 'pré-operatório',
 '[{"code": "40301010", "name": "Hemograma completo", "type": "sangue"},
   {"code": "40302350", "name": "Coagulograma", "type": "sangue"},
   {"code": "40301150", "name": "Glicemia de jejum", "type": "sangue"}]'::jsonb, true, NULL)
ON CONFLICT DO NOTHING;
