import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

// Esta rota executa as migrações necessárias no banco de dados
// Acesse /api/migrate?key=MIGRATE_SECRET_KEY para executar

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")

  // Proteção básica - em produção use uma chave mais segura
  const secretKey = process.env.MIGRATE_SECRET_KEY || "atendebem-migrate-2024"
  
  if (key !== secretKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const sql = await getDb()

    // Criar tabelas na ordem correta de dependências
    const migrations = [
      // 1. Users
      `CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT,
        name TEXT NOT NULL,
        crm TEXT NOT NULL,
        crm_uf VARCHAR(2) NOT NULL,
        specialty TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_login TIMESTAMP WITH TIME ZONE,
        is_active BOOLEAN DEFAULT true,
        profile_image_url TEXT,
        phone TEXT
      )`,

      // 2. Patients
      `CREATE TABLE IF NOT EXISTS patients (
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
        cep VARCHAR(9),
        insurance_provider VARCHAR(255),
        insurance_number VARCHAR(100),
        blood_type VARCHAR(5),
        allergies TEXT,
        chronic_conditions TEXT,
        emergency_contact_name VARCHAR(255),
        emergency_contact_phone VARCHAR(20),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 3. Appointments
      `CREATE TABLE IF NOT EXISTS appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        patient_name TEXT NOT NULL,
        patient_cpf TEXT,
        patient_age INTEGER,
        patient_gender VARCHAR(20),
        appointment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        appointment_type VARCHAR(50) NOT NULL,
        specialty VARCHAR(100) NOT NULL,
        main_complaint TEXT,
        clinical_history TEXT,
        physical_exam TEXT,
        diagnosis TEXT,
        treatment_plan TEXT,
        prescriptions JSONB,
        exams_requested JSONB,
        referrals JSONB,
        observations TEXT,
        status VARCHAR(30) DEFAULT 'completed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 4. Procedures
      `CREATE TABLE IF NOT EXISTS procedures (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
        patient_name TEXT NOT NULL,
        patient_cpf TEXT,
        procedure_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        procedure_type VARCHAR(100),
        procedure_name TEXT NOT NULL,
        procedure_code VARCHAR(20),
        anesthesia_type VARCHAR(50),
        duration_minutes INTEGER,
        description TEXT,
        findings TEXT,
        complications TEXT,
        materials_used JSONB,
        team_members JSONB,
        outcome VARCHAR(50),
        follow_up_needed BOOLEAN DEFAULT false,
        follow_up_date TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 5. Digital Prescriptions
      `CREATE TABLE IF NOT EXISTS digital_prescriptions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
        patient_name TEXT NOT NULL,
        patient_cpf TEXT NOT NULL,
        patient_birth_date DATE,
        cid10_code VARCHAR(10),
        cid10_description TEXT,
        clinical_indication TEXT,
        medications JSONB NOT NULL,
        prescription_type VARCHAR(50) DEFAULT 'simple',
        validity_days INTEGER DEFAULT 30,
        notes TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        signature_status VARCHAR(50) DEFAULT 'unsigned',
        signature_date TIMESTAMP WITH TIME ZONE,
        signature_certificate_info JSONB,
        signed_document_url TEXT,
        qr_code_url TEXT,
        verification_code VARCHAR(50),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 6. Appointments Schedule
      `CREATE TABLE IF NOT EXISTS appointments_schedule (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
        duration_minutes INTEGER DEFAULT 60,
        appointment_type VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'scheduled',
        value DECIMAL(10, 2),
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        notes TEXT,
        reminder_sent BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 7. Payments
      `CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        appointment_schedule_id UUID REFERENCES appointments_schedule(id) ON DELETE SET NULL,
        patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        status VARCHAR(50) DEFAULT 'completed',
        transaction_id VARCHAR(255),
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 8. Patient Exams
      `CREATE TABLE IF NOT EXISTS patient_exams (
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
        status VARCHAR(50) DEFAULT 'requested',
        observations TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 9. Medical Prescriptions
      `CREATE TABLE IF NOT EXISTS medical_prescriptions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
        patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        prescription_date DATE NOT NULL DEFAULT CURRENT_DATE,
        cid10_code VARCHAR(10),
        cid10_description TEXT,
        cid11_code VARCHAR(20),
        cid11_description TEXT,
        clinical_indication TEXT,
        notes TEXT,
        valid_until DATE,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 10. Patient Medical History
      `CREATE TABLE IF NOT EXISTS patient_medical_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        appointment_id UUID REFERENCES appointments(id),
        cid10_code VARCHAR(10),
        cid11_code VARCHAR(20),
        diagnosis TEXT NOT NULL,
        diagnosis_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        notes TEXT,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 11. Audit Logs
      `CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50),
        entity_id UUID,
        details JSONB,
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 12. Signature Sessions
      `CREATE TABLE IF NOT EXISTS signature_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        prescription_id UUID REFERENCES digital_prescriptions(id) ON DELETE CASCADE,
        session_type VARCHAR(50) NOT NULL DEFAULT 'prescription',
        vidaas_session_id TEXT,
        vidaas_auth_url TEXT,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        cpf_signer TEXT NOT NULL,
        document_hash TEXT,
        signed_document_url TEXT,
        certificate_info JSONB,
        error_message TEXT,
        expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,

      // 13. User Settings
      `CREATE TABLE IF NOT EXISTS user_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        theme VARCHAR(10) DEFAULT 'light',
        notifications_enabled BOOLEAN DEFAULT true,
        email_notifications BOOLEAN DEFAULT true,
        default_consultation_duration INTEGER DEFAULT 30,
        signature_image_url TEXT,
        clinic_name TEXT,
        clinic_address TEXT,
        clinic_phone TEXT,
        preferences JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,
    ]

    const results = []

    for (let i = 0; i < migrations.length; i++) {
      try {
        await sql.unsafe(migrations[i])
        results.push({ index: i + 1, status: "success" })
      } catch (error: any) {
        // Ignorar erros de tabela já existente
        if (!error.message?.includes("already exists")) {
          results.push({ index: i + 1, status: "error", message: error.message })
        } else {
          results.push({ index: i + 1, status: "exists" })
        }
      }
    }

    // Criar índices
    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id)",
      "CREATE INDEX IF NOT EXISTS idx_patients_cpf ON patients(cpf)",
      "CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id)",
      "CREATE INDEX IF NOT EXISTS idx_procedures_user_id ON procedures(user_id)",
      "CREATE INDEX IF NOT EXISTS idx_digital_prescriptions_user ON digital_prescriptions(user_id)",
    ]

    for (const idx of indexes) {
      try {
        await sql.unsafe(idx)
      } catch (e) {
        // Ignorar erros de índice
      }
    }

    return NextResponse.json({
      success: true,
      message: "Migrations completed",
      results,
    })
  } catch (error: any) {
    console.error("Migration error:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
