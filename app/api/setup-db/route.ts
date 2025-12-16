import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

// SQL para criar todas as tabelas necessárias
const CREATE_TABLES_SQL = `
-- Tabela de usuários (médicos)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  crm VARCHAR(50),
  crm_state VARCHAR(2),
  specialty VARCHAR(100),
  phone VARCHAR(20),
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pacientes
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(2),
  cep VARCHAR(10),
  insurance_provider VARCHAR(100),
  insurance_number VARCHAR(50),
  blood_type VARCHAR(5),
  allergies TEXT,
  chronic_conditions TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, cpf)
);

-- Tabela de atendimentos
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_name VARCHAR(255),
  patient_cpf VARCHAR(14),
  patient_age INTEGER,
  patient_gender VARCHAR(20),
  appointment_type VARCHAR(50),
  specialty VARCHAR(100),
  main_complaint TEXT,
  clinical_history TEXT,
  physical_exam TEXT,
  diagnosis TEXT,
  treatment_plan TEXT,
  prescriptions JSONB DEFAULT '[]',
  exams_requested JSONB DEFAULT '[]',
  referrals JSONB DEFAULT '[]',
  observations TEXT,
  status VARCHAR(20) DEFAULT 'completed',
  appointment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS appointments_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  appointment_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'scheduled',
  value DECIMAL(10,2),
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de receitas médicas
CREATE TABLE IF NOT EXISTS medical_prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  patient_name VARCHAR(255),
  patient_cpf VARCHAR(14),
  prescription_date DATE DEFAULT CURRENT_DATE,
  medications JSONB DEFAULT '[]',
  instructions TEXT,
  diagnosis TEXT,
  cid_code VARCHAR(10),
  is_controlled BOOLEAN DEFAULT false,
  signature_status VARCHAR(20) DEFAULT 'pending',
  signature_date TIMESTAMP WITH TIME ZONE,
  signature_certificate TEXT,
  pdf_url TEXT,
  validation_token VARCHAR(100) UNIQUE,
  valid_until DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de exames de pacientes
CREATE TABLE IF NOT EXISTS patient_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_type VARCHAR(100),
  exam_name VARCHAR(255),
  exam_date DATE,
  laboratory VARCHAR(255),
  results TEXT,
  observations TEXT,
  file_url TEXT,
  status VARCHAR(20) DEFAULT 'requested',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de histórico médico
CREATE TABLE IF NOT EXISTS patient_medical_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  diagnosis_date DATE,
  diagnosis TEXT,
  cid_code VARCHAR(10),
  treatment TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pagamentos
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50),
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'completed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de conversas com IA
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) DEFAULT 'Nova conversa',
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens da IA
CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de templates de documentos
CREATE TABLE IF NOT EXISTS document_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_type VARCHAR(50),
  name VARCHAR(255),
  content TEXT,
  is_favorite BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de configurações do usuário
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(20) DEFAULT 'system',
  notifications_enabled BOOLEAN DEFAULT true,
  clinic_name VARCHAR(255),
  clinic_address TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de sessões de assinatura digital
CREATE TABLE IF NOT EXISTS signature_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prescription_id UUID REFERENCES medical_prescriptions(id) ON DELETE CASCADE,
  document_type VARCHAR(50) DEFAULT 'prescription',
  vidaas_session_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  cpf VARCHAR(14),
  certificate_info JSONB,
  signed_document_url TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_patients_cpf ON patients(cpf);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_prescriptions_user_id ON medical_prescriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON medical_prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_schedule_user_id ON appointments_schedule(user_id);
CREATE INDEX IF NOT EXISTS idx_schedule_date ON appointments_schedule(appointment_date);
`;

export async function GET(request: Request) {
  // Verificar chave de segurança
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")
  
  if (key !== "atendebem-setup-2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const sql = await getDb()
    
    // Executar cada statement separadamente
    const statements = CREATE_TABLES_SQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    const results = []
    
    for (const statement of statements) {
      try {
        await sql.unsafe(statement)
        results.push({ statement: statement.substring(0, 50) + '...', status: 'success' })
      } catch (error: any) {
        results.push({ 
          statement: statement.substring(0, 50) + '...', 
          status: 'error', 
          error: error.message 
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed",
      results
    })
  } catch (error: any) {
    console.error("Database setup error:", error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
