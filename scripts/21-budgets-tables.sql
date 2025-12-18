CREATE TABLE IF NOT EXISTS budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  
  budget_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN (
    'draft', 'pending_approval', 'approved', 'rejected',
    'partially_executed', 'fully_executed', 'cancelled', 'expired'
  )),
  
  -- Valores
  total_amount DECIMAL(12, 2) NOT NULL,
  discount_amount DECIMAL(12, 2) DEFAULT 0,
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  final_amount DECIMAL(12, 2) NOT NULL,
  
  -- Parcelamento
  payment_type VARCHAR(50) DEFAULT 'cash' CHECK (payment_type IN (
    'cash', 'installment', 'insurance', 'mixed'
  )),
  installments INTEGER DEFAULT 1,
  installment_amount DECIMAL(12, 2),
  
  -- Datas
  valid_until DATE NOT NULL,
  approved_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ,
  
  -- Assinaturas
  patient_signature_url TEXT,
  patient_signed_at TIMESTAMPTZ,
  professional_signature_url TEXT,
  professional_signed_at TIMESTAMPTZ,
  
  -- Termos
  terms_and_conditions TEXT,
  patient_accepted_terms BOOLEAN DEFAULT false,
  
  -- Observações
  notes TEXT,
  rejection_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  item_type VARCHAR(50) NOT NULL CHECK (item_type IN (
    'procedure', 'material', 'medication', 'exam', 'surgery', 'consultation', 'other'
  )),
  
  -- Descrição
  code VARCHAR(20), -- TUSS code se aplicável
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Quantidade e valores
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  
  -- Dentária
  tooth_number VARCHAR(2),
  tooth_face VARCHAR(20),
  
  -- Ordem
  sequence_order INTEGER DEFAULT 0,
  
  -- Execução
  is_executed BOOLEAN DEFAULT false,
  executed_at TIMESTAMPTZ,
  appointment_id UUID REFERENCES appointments(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY budgets_select ON budgets
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY budgets_insert ON budgets
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY budgets_update ON budgets
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY budgets_delete ON budgets
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY budget_items_select ON budget_items
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY budget_items_insert ON budget_items
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY budget_items_update ON budget_items
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY budget_items_delete ON budget_items
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_budgets_tenant ON budgets(tenant_id);
CREATE INDEX idx_budgets_patient ON budgets(patient_id);
CREATE INDEX idx_budgets_status ON budgets(status);
CREATE INDEX idx_budgets_valid_until ON budgets(valid_until);
CREATE INDEX idx_budget_items_budget ON budget_items(budget_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_budget_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER budgets_updated_at BEFORE UPDATE ON budgets
  FOR EACH ROW EXECUTE FUNCTION update_budget_timestamp();
