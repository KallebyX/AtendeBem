-- Tabela de Receitas Digitais com Assinatura ICP-Brasil
CREATE TABLE IF NOT EXISTS digital_prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES medical_prescriptions(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Dados do Médico
    doctor_name VARCHAR(255) NOT NULL,
    doctor_crm VARCHAR(50) NOT NULL,
    doctor_crm_uf VARCHAR(2) NOT NULL,
    doctor_specialty VARCHAR(255),
    
    -- Dados do Paciente
    patient_name VARCHAR(255) NOT NULL,
    patient_cpf VARCHAR(14) NOT NULL,
    patient_date_of_birth DATE NOT NULL,
    
    -- Dados da Prescrição
    prescription_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    validity_days INTEGER DEFAULT 30,
    valid_until DATE,
    
    -- Assinatura Digital ICP-Brasil
    is_digitally_signed BOOLEAN DEFAULT false,
    signature_certificate_serial VARCHAR(255),
    signature_certificate_issuer TEXT,
    signature_timestamp TIMESTAMP WITH TIME ZONE,
    signature_hash VARCHAR(255),
    digital_signature_data TEXT, -- Base64 do certificado digital
    
    -- PDF e QR Code
    pdf_url TEXT,
    pdf_hash VARCHAR(255), -- SHA-256 do PDF para integridade
    qr_code_data TEXT, -- URL de validação
    qr_code_image TEXT, -- Base64 da imagem do QR Code
    
    -- Status e Controle
    status VARCHAR(50) DEFAULT 'pending_signature', -- pending_signature, signed, validated, revoked
    is_controlled_substance BOOLEAN DEFAULT false,
    prescription_type VARCHAR(50) DEFAULT 'simple', -- simple, controlled_b1, controlled_b2, special
    
    -- Validação
    validation_token VARCHAR(100) UNIQUE,
    validated_at TIMESTAMP WITH TIME ZONE,
    validated_by VARCHAR(255),
    
    -- Rastreabilidade
    ip_address INET,
    user_agent TEXT,
    geolocation JSONB,
    
    -- Renovação
    is_renewal BOOLEAN DEFAULT false,
    original_prescription_id UUID REFERENCES digital_prescriptions(id),
    
    -- Metadados
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Log de Assinaturas (auditoria completa)
CREATE TABLE IF NOT EXISTS digital_signature_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    digital_prescription_id UUID NOT NULL REFERENCES digital_prescriptions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL, -- sign, validate, revoke, view
    action_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    certificate_details JSONB,
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    metadata JSONB
);

-- Índices para performance e busca
CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_patient ON digital_prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_user ON digital_prescriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_validation_token ON digital_prescriptions(validation_token);
CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_status ON digital_prescriptions(status);
CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_signature_timestamp ON digital_prescriptions(signature_timestamp);
CREATE INDEX IF NOT EXISTS idx_digital_signature_logs_prescription ON digital_signature_logs(digital_prescription_id);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_digital_prescriptions_updated_at ON digital_prescriptions;
CREATE TRIGGER update_digital_prescriptions_updated_at BEFORE UPDATE ON digital_prescriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para gerar token de validação único
CREATE OR REPLACE FUNCTION generate_validation_token()
RETURNS TEXT AS $$
DECLARE
    token TEXT;
    exists BOOLEAN;
BEGIN
    LOOP
        -- Gera um token aleatório de 32 caracteres
        token := encode(gen_random_bytes(24), 'base64');
        token := replace(token, '/', '_');
        token := replace(token, '+', '-');
        token := substring(token, 1, 32);
        
        -- Verifica se já existe
        SELECT EXISTS(SELECT 1 FROM digital_prescriptions WHERE validation_token = token) INTO exists;
        EXIT WHEN NOT exists;
    END LOOP;
    
    RETURN token;
END;
$$ LANGUAGE plpgsql;

-- Trigger para gerar token automaticamente
CREATE OR REPLACE FUNCTION set_validation_token()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.validation_token IS NULL THEN
        NEW.validation_token := generate_validation_token();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_validation_token_trigger ON digital_prescriptions;
CREATE TRIGGER set_validation_token_trigger
    BEFORE INSERT ON digital_prescriptions
    FOR EACH ROW EXECUTE FUNCTION set_validation_token();
