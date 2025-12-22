"use server"

import { getDb } from "./db"

let tablesInitialized = false

// SQL para criar as tabelas principais
const CREATE_PATIENTS_TABLE = `
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
`

const CREATE_APPOINTMENTS_TABLE = `
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
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
)
`

const CREATE_PRESCRIPTIONS_TABLE = `
CREATE TABLE IF NOT EXISTS medical_prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  patient_id UUID,
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
)
`

const CREATE_SCHEDULE_TABLE = `
CREATE TABLE IF NOT EXISTS appointments_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  patient_id UUID,
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
)
`

const CREATE_AI_TABLES = `
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(255) DEFAULT 'Nova conversa',
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
`

// Migrações para adicionar colunas que podem estar faltando
const MIGRATIONS = [
  // Adicionar colunas laterality e location à tabela procedures
  `ALTER TABLE procedures ADD COLUMN IF NOT EXISTS laterality VARCHAR(50)`,
  `ALTER TABLE procedures ADD COLUMN IF NOT EXISTS location VARCHAR(100)`,
  // Adicionar colunas context e urgency à tabela appointments
  `ALTER TABLE appointments ADD COLUMN IF NOT EXISTS context VARCHAR(50)`,
  `ALTER TABLE appointments ADD COLUMN IF NOT EXISTS urgency VARCHAR(50)`,
]

export async function ensureTablesExist() {
  if (tablesInitialized) {
    return { success: true, message: "Tables already initialized" }
  }

  try {
    const sql = await getDb()

    // Criar tabelas uma por uma
    await sql.unsafe(CREATE_PATIENTS_TABLE)
    await sql.unsafe(CREATE_APPOINTMENTS_TABLE)
    await sql.unsafe(CREATE_PRESCRIPTIONS_TABLE)
    await sql.unsafe(CREATE_SCHEDULE_TABLE)

    // Criar tabelas de IA (múltiplos statements)
    const aiStatements = CREATE_AI_TABLES.split(";").filter((s) => s.trim())
    for (const stmt of aiStatements) {
      if (stmt.trim()) {
        await sql.unsafe(stmt)
      }
    }

    // Executar migrações para adicionar colunas faltantes
    for (const migration of MIGRATIONS) {
      try {
        await sql.unsafe(migration)
      } catch (migrationError: any) {
        // Ignorar erros de coluna já existente
        if (!migrationError.message.includes("already exists")) {
          console.warn("[db-init] Migration warning:", migrationError.message)
        }
      }
    }

    tablesInitialized = true
    console.log("[db-init] All tables created successfully")
    return { success: true, message: "Tables created successfully" }
  } catch (error: any) {
    console.error("[db-init] Error creating tables:", error.message)
    // Se o erro for que a tabela já existe, ignorar
    if (error.message.includes("already exists")) {
      tablesInitialized = true
      return { success: true, message: "Tables already exist" }
    }
    return { success: false, error: error.message }
  }
}

export async function setUserContext(userId: string) {
  try {
    const sql = await getDb()
    await sql.unsafe(`SET LOCAL app.current_user_id = '${userId}'`)
  } catch (error) {
    // This error was causing "syntax error at or near $1" in production
    console.warn("[db-init] Could not set user context (non-critical):", error)
  }
}

export async function setTenantContext(tenantId: string) {
  try {
    const sql = await getDb()
    await sql.unsafe(`SET LOCAL app.current_tenant_id = '${tenantId}'`)
  } catch (error) {
    console.warn("[db-init] Could not set tenant context (non-critical):", error)
  }
}

export async function getUserTenantId(userId: string): Promise<string | null> {
  try {
    const sql = await getDb()
    const result = await sql`
      SELECT tenant_id FROM users WHERE id = ${userId}
    `
    return result[0]?.tenant_id || null
  } catch (error) {
    console.warn("[db-init] Could not get user tenant_id:", error)
    return null
  }
}

export async function setFullContext(userId: string) {
  try {
    const sql = await getDb()

    // Set user context
    await sql.unsafe(`SET LOCAL app.current_user_id = '${userId}'`)

    // Get and set tenant context
    const result = await sql`
      SELECT tenant_id FROM users WHERE id = ${userId}
    `
    const tenantId = result[0]?.tenant_id || '00000000-0000-0000-0000-000000000001'
    await sql.unsafe(`SET LOCAL app.current_tenant_id = '${tenantId}'`)

    return tenantId
  } catch (error) {
    console.warn("[db-init] Could not set full context:", error)
    return '00000000-0000-0000-0000-000000000001'
  }
}
