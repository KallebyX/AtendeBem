-- Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS appointments_schedule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    appointment_type VARCHAR(100) NOT NULL, -- consulta, retorno, exame
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, confirmed, completed, cancelled, no_show
    value DECIMAL(10, 2), -- valor da consulta
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, partially_paid, cancelled
    payment_method VARCHAR(50), -- dinheiro, cartão, pix, plano de saúde
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Pagamentos
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_schedule_id UUID REFERENCES appointments_schedule(id) ON DELETE SET NULL,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'completed', -- completed, pending, refunded, cancelled
    transaction_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Exames do Paciente
CREATE TABLE IF NOT EXISTS patient_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id),
    exam_type VARCHAR(255) NOT NULL,
    exam_name VARCHAR(500) NOT NULL,
    exam_date DATE NOT NULL,
    result_date DATE,
    result_summary TEXT,
    result_file_url TEXT,
    laboratory VARCHAR(255),
    requested_by VARCHAR(255),
    status VARCHAR(50) DEFAULT 'requested', -- requested, scheduled, completed, cancelled
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_appointments_schedule_user ON appointments_schedule(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_schedule_patient ON appointments_schedule(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_schedule_date ON appointments_schedule(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_schedule_status ON appointments_schedule(status);
CREATE INDEX IF NOT EXISTS idx_payments_patient ON payments(patient_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_patient_exams_patient ON patient_exams(patient_id);
CREATE INDEX IF NOT EXISTS idx_patient_exams_user ON patient_exams(user_id);

-- Triggers
DROP TRIGGER IF EXISTS update_appointments_schedule_updated_at ON appointments_schedule;
CREATE TRIGGER update_appointments_schedule_updated_at BEFORE UPDATE ON appointments_schedule
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_patient_exams_updated_at ON patient_exams;
CREATE TRIGGER update_patient_exams_updated_at BEFORE UPDATE ON patient_exams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
