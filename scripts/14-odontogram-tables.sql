-- Migration: Tabelas do Odontograma Digital (MOD-ODO)
-- Data: 2025-12-17

CREATE TABLE IF NOT EXISTS odontograms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    
    -- Dados do odontograma (32 dentes)
    teeth_data JSONB DEFAULT '{}'::jsonb,
    -- { "11": { status: "healthy|caries|filling|missing|...", faces: {...}, notes: "" }, ... }
    
    clinical_notes TEXT,
    treatment_plan TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_odontograms_tenant ON odontograms(tenant_id);
CREATE INDEX IF NOT EXISTS idx_odontograms_patient ON odontograms(patient_id);
CREATE INDEX IF NOT EXISTS idx_odontograms_created ON odontograms(created_at DESC);

ALTER TABLE odontograms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own odontograms" ON odontograms;
CREATE POLICY "Users can view own odontograms" ON odontograms
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own odontograms" ON odontograms;
CREATE POLICY "Users can manage own odontograms" ON odontograms
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Procedimentos odontológicos por dente
CREATE TABLE IF NOT EXISTS odontogram_procedures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    odontogram_id UUID NOT NULL REFERENCES odontograms(id) ON DELETE CASCADE,
    
    tooth_number VARCHAR(2) NOT NULL, -- 11-18, 21-28, 31-38, 41-48
    tooth_face VARCHAR(20), -- oclusal, vestibular, lingual, mesial, distal
    procedure_code VARCHAR(20), -- TUSS odontológico
    procedure_name VARCHAR(200),
    status VARCHAR(50) DEFAULT 'planned', -- planned, in_progress, completed
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_odontogram_procedures_odontogram ON odontogram_procedures(odontogram_id);
CREATE INDEX IF NOT EXISTS idx_odontogram_procedures_tooth ON odontogram_procedures(tooth_number);

ALTER TABLE odontogram_procedures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own procedures" ON odontogram_procedures;
CREATE POLICY "Users can manage own procedures" ON odontogram_procedures
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
