-- AtendeBem - Script completo de seed com todos os dados de teste
-- Este script cria usuários com senhas, pacientes, agendamentos e dados completos

-- Limpar dados existentes (cuidado em produção!)
DELETE FROM prescription_items WHERE 1=1;
DELETE FROM digital_prescriptions WHERE 1=1;
DELETE FROM medical_prescriptions WHERE 1=1;
DELETE FROM payments WHERE 1=1;
DELETE FROM appointments_schedule WHERE 1=1;
DELETE FROM patient_exams WHERE 1=1;
DELETE FROM patient_medical_history WHERE 1=1;
DELETE FROM patients WHERE 1=1;
DELETE FROM ai_messages WHERE 1=1;
DELETE FROM ai_conversations WHERE 1=1;
DELETE FROM appointments WHERE 1=1;
DELETE FROM user_settings WHERE 1=1;
DELETE FROM users WHERE 1=1;

-- Fixed all UUIDs to use valid hexadecimal format (0-9, a-f only)

-- Usuários de teste
-- Senha: teste123 (hash bcrypt)
INSERT INTO users (id, email, name, password_hash, crm, crm_uf, specialty, phone, is_active)
VALUES 
  (
    'a0000000-0000-0000-0000-000000000001', 
    'medico@teste.com', 
    'Dr. João Silva', 
    '$2a$10$rQEY7qXJPvHIqXDC8M8hXOqJQwPvNnNnwJz7F4kf4kCmCK4Rz1Z.a',
    '123456', 
    'SP', 
    'Clínica Médica', 
    '(11) 98765-4321',
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000002', 
    'pediatra@teste.com', 
    'Dra. Maria Santos', 
    '$2a$10$rQEY7qXJPvHIqXDC8M8hXOqJQwPvNnNnwJz7F4kf4kCmCK4Rz1Z.a',
    '654321', 
    'RJ', 
    'Pediatria', 
    '(21) 91234-5678',
    true
  )
ON CONFLICT (id) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  crm = EXCLUDED.crm,
  crm_uf = EXCLUDED.crm_uf,
  specialty = EXCLUDED.specialty;

-- Configurações dos usuários
INSERT INTO user_settings (user_id, theme, clinic_name, clinic_address, clinic_phone, default_consultation_duration)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', 'light', 'Clínica Saúde Total', 'Av. Paulista, 1000 - São Paulo, SP', '(11) 3456-7890', 30),
  ('a0000000-0000-0000-0000-000000000002', 'light', 'Consultório Pediátrico', 'Rua das Crianças, 50 - Rio de Janeiro, RJ', '(21) 2345-6789', 45)
ON CONFLICT (user_id) DO UPDATE SET
  clinic_name = EXCLUDED.clinic_name,
  clinic_address = EXCLUDED.clinic_address;

-- Pacientes com UUIDs válidos (usando 'b' em vez de 'p')
INSERT INTO patients (id, user_id, full_name, cpf, date_of_birth, gender, phone, email, address, city, state, cep, blood_type, allergies, chronic_conditions, insurance_provider, insurance_number, emergency_contact_name, emergency_contact_phone, is_active)
VALUES 
  (
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Carlos Oliveira Santos',
    '123.456.789-00',
    '1978-05-15',
    'Masculino',
    '(11) 99876-5432',
    'carlos.oliveira@email.com',
    'Rua das Flores, 123',
    'São Paulo',
    'SP',
    '01234-567',
    'O+',
    'Penicilina',
    'Hipertensão arterial',
    'Unimed',
    '123456789',
    'Maria Oliveira',
    '(11) 98765-4321',
    true
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'Ana Paula Costa',
    '987.654.321-00',
    '1985-08-22',
    'Feminino',
    '(11) 98765-1234',
    'ana.costa@email.com',
    'Av. Brasil, 456',
    'São Paulo',
    'SP',
    '04567-890',
    'A+',
    NULL,
    'Diabetes tipo 2',
    'Bradesco Saúde',
    '987654321',
    'José Costa',
    '(11) 91234-5678',
    true
  ),
  (
    'b0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'Roberto Mendes Silva',
    '456.789.123-00',
    '1960-03-10',
    'Masculino',
    '(11) 97654-3210',
    'roberto.mendes@email.com',
    'Rua Augusta, 789',
    'São Paulo',
    'SP',
    '01305-100',
    'B-',
    'Sulfa, Dipirona',
    'Hipertensão, Colesterol alto',
    'SulAmérica',
    '456789123',
    'Lucia Mendes',
    '(11) 96543-2109',
    true
  ),
  (
    'b0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    'Juliana Ferreira Lima',
    '321.654.987-00',
    '1992-11-30',
    'Feminino',
    '(11) 95432-1098',
    'juliana.ferreira@email.com',
    'Rua Oscar Freire, 1000',
    'São Paulo',
    'SP',
    '01426-001',
    'AB+',
    NULL,
    NULL,
    'Amil',
    '321654987',
    'Paulo Lima',
    '(11) 94321-0987',
    true
  ),
  (
    'b0000000-0000-0000-0000-000000000005',
    'a0000000-0000-0000-0000-000000000001',
    'Fernando Gomes Pereira',
    '654.321.789-00',
    '1975-07-18',
    'Masculino',
    '(11) 93210-9876',
    'fernando.gomes@email.com',
    'Av. Rebouças, 2000',
    'São Paulo',
    'SP',
    '05402-100',
    'O-',
    'Aspirina',
    'Asma',
    'Porto Seguro',
    '654321789',
    'Sandra Pereira',
    '(11) 92109-8765',
    true
  )
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email;

-- Agendamentos com UUIDs válidos (usando 'c' em vez de 'ag')
INSERT INTO appointments_schedule (id, user_id, patient_id, appointment_date, appointment_type, duration_minutes, status, value, payment_status, payment_method, notes)
VALUES 
  (
    'c0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    NOW() + INTERVAL '1 day' + INTERVAL '9 hours',
    'Consulta',
    30,
    'agendado',
    250.00,
    'pendente',
    NULL,
    'Retorno hipertensão'
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000002',
    NOW() + INTERVAL '1 day' + INTERVAL '10 hours',
    'Consulta',
    30,
    'agendado',
    250.00,
    'pendente',
    NULL,
    'Acompanhamento diabetes'
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000003',
    NOW() + INTERVAL '2 days' + INTERVAL '14 hours',
    'Retorno',
    30,
    'agendado',
    150.00,
    'pago',
    'cartao_credito',
    'Resultados de exames'
  ),
  (
    'c0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000004',
    NOW() + INTERVAL '3 days' + INTERVAL '11 hours',
    'Primeira Consulta',
    45,
    'confirmado',
    300.00,
    'pendente',
    NULL,
    'Nova paciente - check-up geral'
  ),
  (
    'c0000000-0000-0000-0000-000000000005',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000005',
    NOW() + INTERVAL '5 days' + INTERVAL '15 hours',
    'Consulta',
    30,
    'agendado',
    250.00,
    'pendente',
    NULL,
    'Controle asma'
  ),
  (
    'c0000000-0000-0000-0000-000000000006',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    NOW() + INTERVAL '2 hours',
    'Consulta',
    30,
    'confirmado',
    250.00,
    'pendente',
    NULL,
    'Consulta de rotina'
  )
ON CONFLICT (id) DO UPDATE SET
  appointment_date = EXCLUDED.appointment_date,
  status = EXCLUDED.status;

-- Atendimentos com UUIDs válidos (usando 'd' em vez de 'at')
INSERT INTO appointments (id, user_id, patient_name, patient_cpf, patient_age, patient_gender, appointment_date, appointment_type, specialty, main_complaint, clinical_history, physical_exam, diagnosis, treatment_plan, status)
VALUES 
  (
    'd0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Carlos Oliveira Santos',
    '123.456.789-00',
    46,
    'Masculino',
    NOW() - INTERVAL '7 days',
    'consulta',
    'Clínica Médica',
    'Cefaleia persistente há 3 dias',
    'Paciente relata dores de cabeça frequentes, principalmente no final do dia. Nega náuseas ou alterações visuais.',
    'PA: 140x90 mmHg. FC: 78 bpm. Sem alterações neurológicas focais.',
    'Cefaleia tensional. Hipertensão arterial sistêmica.',
    'Ajuste de medicação anti-hipertensiva. Orientações sobre estresse e postura.',
    'completed'
  ),
  (
    'd0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'Ana Paula Costa',
    '987.654.321-00',
    38,
    'Feminino',
    NOW() - INTERVAL '14 days',
    'retorno',
    'Clínica Médica',
    'Acompanhamento de diabetes',
    'Paciente em tratamento de diabetes tipo 2 há 2 anos. Em uso de Metformina 850mg 2x/dia.',
    'PA: 120x80 mmHg. Peso: 68kg. IMC: 26.5. Glicemia capilar: 145 mg/dL.',
    'Diabetes mellitus tipo 2 em controle parcial.',
    'Manter Metformina. Reforçar orientações dietéticas. Solicitar hemoglobina glicada.',
    'completed'
  ),
  (
    'd0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'Roberto Mendes Silva',
    '456.789.123-00',
    64,
    'Masculino',
    NOW() - INTERVAL '21 days',
    'consulta',
    'Clínica Médica',
    'Dor torácica ao esforço',
    'Paciente com histórico de hipertensão e dislipidemia. Refere dor em aperto no peito ao subir escadas.',
    'PA: 150x95 mmHg. FC: 82 bpm. Ausculta cardíaca: bulhas rítmicas, sem sopros.',
    'Angina estável. Hipertensão mal controlada.',
    'Encaminhamento para cardiologista. Ajuste de anti-hipertensivos. ECG solicitado.',
    'completed'
  )
ON CONFLICT (id) DO UPDATE SET
  diagnosis = EXCLUDED.diagnosis,
  status = EXCLUDED.status;

-- Pagamentos com UUIDs válidos (usando 'e' em vez de 'pay')
INSERT INTO payments (id, user_id, patient_id, appointment_schedule_id, amount, payment_method, payment_date, status)
VALUES 
  (
    'e0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000003',
    'c0000000-0000-0000-0000-000000000003',
    150.00,
    'cartao_credito',
    NOW() - INTERVAL '1 day',
    'pago'
  )
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status;

-- Exames com UUIDs válidos (usando 'f' em vez de 'ex')
INSERT INTO patient_exams (id, user_id, patient_id, exam_name, exam_type, exam_date, result_date, laboratory, status, result_summary)
VALUES 
  (
    'f0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    'Hemograma Completo',
    'Laboratorial',
    NOW() - INTERVAL '10 days',
    NOW() - INTERVAL '7 days',
    'Laboratório Fleury',
    'concluido',
    'Hemácias: 4.8 milhões/mm³. Hemoglobina: 14.2 g/dL. Leucócitos: 7.500/mm³. Plaquetas: 250.000/mm³. Valores dentro da normalidade.'
  ),
  (
    'f0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000002',
    'Hemoglobina Glicada (HbA1c)',
    'Laboratorial',
    NOW() - INTERVAL '15 days',
    NOW() - INTERVAL '12 days',
    'DASA',
    'concluido',
    'HbA1c: 7.2%. Controle glicêmico adequado, porém próximo do limite superior recomendado.'
  ),
  (
    'f0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000003',
    'Eletrocardiograma',
    'Cardiológico',
    NOW() - INTERVAL '20 days',
    NOW() - INTERVAL '20 days',
    'Hospital Sírio-Libanês',
    'concluido',
    'Ritmo sinusal. FC: 75 bpm. Eixo normal. Sem alterações isquêmicas agudas.'
  ),
  (
    'f0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    'Glicemia de Jejum',
    'Laboratorial',
    NOW() - INTERVAL '5 days',
    NULL,
    'Laboratório a]b',
    'pendente',
    NULL
  )
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status;

-- Histórico médico com UUIDs válidos (usando '0' prefixo numérico)
INSERT INTO patient_medical_history (id, patient_id, diagnosis, diagnosis_date, cid10_code, status, notes, created_by)
VALUES 
  (
    '00000000-0000-0000-0001-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    'Hipertensão arterial sistêmica',
    '2020-03-15',
    'I10',
    'em_tratamento',
    'Diagnosticado há 4 anos. Em uso contínuo de Losartana 50mg.',
    'a0000000-0000-0000-0000-000000000001'
  ),
  (
    '00000000-0000-0000-0001-000000000002',
    'b0000000-0000-0000-0000-000000000002',
    'Diabetes mellitus tipo 2',
    '2022-06-20',
    'E11',
    'em_tratamento',
    'Diagnóstico inicial com HbA1c de 8.5%. Em uso de Metformina.',
    'a0000000-0000-0000-0000-000000000001'
  ),
  (
    '00000000-0000-0000-0001-000000000003',
    'b0000000-0000-0000-0000-000000000003',
    'Dislipidemia',
    '2019-11-10',
    'E78.0',
    'em_tratamento',
    'Colesterol total elevado. Em uso de estatina.',
    'a0000000-0000-0000-0000-000000000001'
  ),
  (
    '00000000-0000-0000-0001-000000000004',
    'b0000000-0000-0000-0000-000000000005',
    'Asma brônquica',
    '2015-04-22',
    'J45',
    'controlado',
    'Asma leve persistente. Uso de bombinha de resgate quando necessário.',
    'a0000000-0000-0000-0000-000000000001'
  )
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status;
