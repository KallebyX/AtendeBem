-- AtendeBem Sample Data
-- Version 1.0 - Initial Seed

-- Insert sample user (password: senha123)
INSERT INTO users (id, email, name, crm, crm_uf, specialty, phone)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'dr.silva@exemplo.com', 'Dr. João Silva', '123456', 'SP', 'Clínica Médica', '(11) 98765-4321'),
    ('a0000000-0000-0000-0000-000000000002', 'dra.santos@exemplo.com', 'Dra. Maria Santos', '654321', 'RJ', 'Pediatria', '(21) 91234-5678')
ON CONFLICT (email) DO NOTHING;

-- Insert user settings
INSERT INTO user_settings (user_id, theme, clinic_name, clinic_address)
VALUES 
    ('a0000000-0000-0000-0000-000000000001', 'light', 'Clínica Saúde Total', 'Av. Paulista, 1000 - São Paulo, SP'),
    ('a0000000-0000-0000-0000-000000000002', 'light', 'Consultório Pediátrico', 'Rua das Crianças, 50 - Rio de Janeiro, RJ')
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample appointments
INSERT INTO appointments (user_id, patient_name, patient_cpf, patient_age, patient_gender, appointment_type, specialty, main_complaint, diagnosis)
VALUES 
    (
        'a0000000-0000-0000-0000-000000000001',
        'Carlos Oliveira',
        '123.456.789-00',
        45,
        'Masculino',
        'consulta',
        'Clínica Médica',
        'Dor de cabeça recorrente',
        'Cefaleia tensional'
    ),
    (
        'a0000000-0000-0000-0000-000000000001',
        'Ana Costa',
        '987.654.321-00',
        32,
        'Feminino',
        'retorno',
        'Clínica Médica',
        'Acompanhamento de hipertensão',
        'Hipertensão arterial controlada'
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        'Pedro Mendes',
        '456.789.123-00',
        5,
        'Masculino',
        'consulta',
        'Pediatria',
        'Febre e tosse',
        'Infecção viral de vias aéreas superiores'
    );

-- Insert sample document templates
INSERT INTO document_templates (user_id, template_type, name, content, is_favorite)
VALUES 
    (
        'a0000000-0000-0000-0000-000000000001',
        'prescription',
        'Tratamento Hipertensão',
        '{"medications": [{"name": "Losartana 50mg", "dosage": "1 comprimido", "frequency": "1x ao dia", "duration": "30 dias"}]}'::jsonb,
        true
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        'prescription',
        'Tratamento Gripe Infantil',
        '{"medications": [{"name": "Paracetamol Gotas", "dosage": "15 gotas", "frequency": "De 6/6h se febre", "duration": "5 dias"}]}'::jsonb,
        true
    );

-- Insert sample AI conversation
INSERT INTO ai_conversations (id, user_id, title)
VALUES 
    ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Dúvida sobre prescrição');

INSERT INTO ai_messages (conversation_id, role, content)
VALUES 
    ('b0000000-0000-0000-0000-000000000001', 'user', 'Qual a dosagem recomendada de amoxicilina para infecção respiratória?'),
    ('b0000000-0000-0000-0000-000000000001', 'assistant', 'Para infecções respiratórias em adultos, a dosagem usual de amoxicilina é de 500mg a 875mg, de 8 em 8 horas ou de 12 em 12 horas, por 7 a 10 dias. A dosagem exata deve considerar a gravidade da infecção e características do paciente.');
