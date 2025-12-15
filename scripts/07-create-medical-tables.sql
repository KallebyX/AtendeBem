-- Updated to use UUID for foreign keys matching the users table structure

-- Tabela de Pacientes
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(2),
    cep VARCHAR(9),
    insurance_provider VARCHAR(255),
    insurance_number VARCHAR(100),
    blood_type VARCHAR(5),
    allergies TEXT,
    chronic_conditions TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de CID-10
CREATE TABLE IF NOT EXISTS cid10_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    subcategory VARCHAR(100),
    is_active BOOLEAN DEFAULT true
);

-- Tabela de CID-11
CREATE TABLE IF NOT EXISTS cid11_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    parent_code VARCHAR(20),
    is_active BOOLEAN DEFAULT true
);

-- Tabela de Medicamentos
CREATE TABLE IF NOT EXISTS medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(500) NOT NULL,
    active_ingredient VARCHAR(500),
    concentration VARCHAR(100),
    pharmaceutical_form VARCHAR(100),
    administration_route VARCHAR(100),
    protocol VARCHAR(500),
    registry_type VARCHAR(50), -- 'NACIONAL' ou 'ESTADUAL_RS'
    is_controlled BOOLEAN DEFAULT false,
    is_high_cost BOOLEAN DEFAULT false,
    sus_available BOOLEAN DEFAULT true,
    anvisa_code VARCHAR(50),
    ean_code VARCHAR(20),
    manufacturer VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Prescrições Médicas
CREATE TABLE IF NOT EXISTS medical_prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    prescription_date DATE NOT NULL DEFAULT CURRENT_DATE,
    cid10_code VARCHAR(10),
    cid10_description TEXT,
    cid11_code VARCHAR(20),
    cid11_description TEXT,
    clinical_indication TEXT,
    notes TEXT,
    valid_until DATE,
    status VARCHAR(50) DEFAULT 'active', -- active, expired, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Itens da Prescrição
CREATE TABLE IF NOT EXISTS prescription_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES medical_prescriptions(id) ON DELETE CASCADE,
    medication_id UUID NOT NULL REFERENCES medications(id),
    medication_name VARCHAR(500) NOT NULL,
    dosage VARCHAR(200) NOT NULL,
    frequency VARCHAR(200) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    administration_instructions TEXT,
    special_warnings TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Histórico Médico do Paciente
CREATE TABLE IF NOT EXISTS patient_medical_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id),
    cid10_code VARCHAR(10),
    cid11_code VARCHAR(20),
    diagnosis TEXT NOT NULL,
    diagnosis_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, resolved, chronic
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_patients_cpf ON patients(cpf);
CREATE INDEX IF NOT EXISTS idx_cid10_code ON cid10_codes(code);
CREATE INDEX IF NOT EXISTS idx_cid11_code ON cid11_codes(code);
CREATE INDEX IF NOT EXISTS idx_medications_name ON medications(name);
CREATE INDEX IF NOT EXISTS idx_medical_prescriptions_patient ON medical_prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_prescriptions_user ON medical_prescriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_prescriptions_appointment ON medical_prescriptions(appointment_id);
CREATE INDEX IF NOT EXISTS idx_prescription_items_prescription ON prescription_items(prescription_id);
CREATE INDEX IF NOT EXISTS idx_patient_history_patient ON patient_medical_history(patient_id);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_patients_updated_at ON patients;
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_medical_prescriptions_updated_at ON medical_prescriptions;
CREATE TRIGGER update_medical_prescriptions_updated_at BEFORE UPDATE ON medical_prescriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
