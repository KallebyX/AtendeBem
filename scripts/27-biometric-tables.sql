CREATE TABLE IF NOT EXISTS biometric_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Tipo de biometria
  biometric_type VARCHAR(50) NOT NULL CHECK (biometric_type IN (
    'fingerprint', 'facial', 'iris', 'voice', 'palm'
  )),
  
  -- Template biométrico (dados criptografados)
  template_data TEXT NOT NULL,
  template_format VARCHAR(50), -- ISO, ANSI, etc
  
  -- Metadata do dispositivo
  capture_device VARCHAR(100),
  device_serial VARCHAR(100),
  capture_quality INTEGER CHECK (capture_quality BETWEEN 0 AND 100),
  
  -- Específico para impressão digital
  finger_position VARCHAR(50), -- thumb_right, index_left, etc
  
  -- Específico para facial
  face_angle VARCHAR(20), -- frontal, left_profile, right_profile
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  verified_count INTEGER DEFAULT 0,
  last_verified_at TIMESTAMPTZ,
  
  -- Segurança
  encryption_key_id VARCHAR(100),
  hash_algorithm VARCHAR(50) DEFAULT 'SHA-256',
  
  -- Conformidade LGPD
  consent_given BOOLEAN DEFAULT false,
  consent_date TIMESTAMPTZ,
  consent_ip_address INET,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(tenant_id, patient_id, biometric_type, finger_position)
);

CREATE TABLE IF NOT EXISTS biometric_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES biometric_templates(id) ON DELETE CASCADE,
  
  -- Resultado da verificação
  verification_result BOOLEAN NOT NULL,
  match_score INTEGER CHECK (match_score BETWEEN 0 AND 100),
  
  -- Contexto
  verification_type VARCHAR(50) CHECK (verification_type IN (
    'authentication', 'authorization', 'attendance', 'prescription_signature'
  )),
  
  -- Detalhes do atendimento (se aplicável)
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  prescription_id UUID REFERENCES digital_prescriptions(id) ON DELETE SET NULL,
  
  -- Dispositivo usado
  device_info JSONB DEFAULT '{}'::jsonb,
  
  -- Localização
  ip_address INET,
  location JSONB,
  
  -- Auditoria
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS biometric_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  
  -- Detalhes da ação
  details JSONB DEFAULT '{}'::jsonb,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE biometric_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE biometric_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE biometric_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY biometric_templates_select ON biometric_templates
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY biometric_templates_insert ON biometric_templates
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY biometric_templates_update ON biometric_templates
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY biometric_templates_delete ON biometric_templates
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY biometric_verifications_select ON biometric_verifications
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY biometric_verifications_insert ON biometric_verifications
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY biometric_audit_log_select ON biometric_audit_log
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY biometric_audit_log_insert ON biometric_audit_log
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_biometric_templates_tenant ON biometric_templates(tenant_id);
CREATE INDEX idx_biometric_templates_patient ON biometric_templates(patient_id);
CREATE INDEX idx_biometric_templates_type ON biometric_templates(biometric_type);
CREATE INDEX idx_biometric_verifications_template ON biometric_verifications(template_id);
CREATE INDEX idx_biometric_verifications_tenant ON biometric_verifications(tenant_id);
CREATE INDEX idx_biometric_audit_tenant ON biometric_audit_log(tenant_id);
CREATE INDEX idx_biometric_audit_created ON biometric_audit_log(created_at);

-- Função para registrar auditoria automaticamente
CREATE OR REPLACE FUNCTION log_biometric_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO biometric_audit_log (
    tenant_id, action, entity_type, entity_id, details
  ) VALUES (
    NEW.tenant_id,
    TG_OP || '_' || TG_TABLE_NAME,
    TG_TABLE_NAME,
    NEW.id,
    jsonb_build_object('operation', TG_OP)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers de auditoria
CREATE TRIGGER biometric_templates_audit
  AFTER INSERT OR UPDATE ON biometric_templates
  FOR EACH ROW
  EXECUTE FUNCTION log_biometric_action();

CREATE TRIGGER biometric_verifications_audit
  AFTER INSERT ON biometric_verifications
  FOR EACH ROW
  EXECUTE FUNCTION log_biometric_action();
