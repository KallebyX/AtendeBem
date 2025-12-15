import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Helper function to set the current user context for RLS
export async function setUserContext(userId: string) {
  await sql`SELECT set_config('app.current_user_id', ${userId}, true)`
}

// Database query helpers
export const db = {
  // Users
  async getUser(userId: string) {
    await setUserContext(userId)
    const result = await sql`
      SELECT * FROM users WHERE id = ${userId}
    `
    return result[0]
  },

  async updateUser(userId: string, data: any) {
    await setUserContext(userId)
    const result = await sql`
      UPDATE users 
      SET 
        name = COALESCE(${data.name}, name),
        phone = COALESCE(${data.phone}, phone),
        profile_image_url = COALESCE(${data.profile_image_url}, profile_image_url),
        updated_at = NOW()
      WHERE id = ${userId}
      RETURNING *
    `
    return result[0]
  },

  // Appointments
  async getAppointments(userId: string, limit = 50, offset = 0) {
    await setUserContext(userId)
    return await sql`
      SELECT * FROM appointments 
      WHERE user_id = ${userId}
      ORDER BY appointment_date DESC
      LIMIT ${limit} OFFSET ${offset}
    `
  },

  async getAppointment(userId: string, appointmentId: string) {
    await setUserContext(userId)
    const result = await sql`
      SELECT * FROM appointments 
      WHERE id = ${appointmentId} AND user_id = ${userId}
    `
    return result[0]
  },

  async createAppointment(userId: string, data: any) {
    await setUserContext(userId)
    const result = await sql`
      INSERT INTO appointments (
        user_id, patient_name, patient_cpf, patient_age, patient_gender,
        appointment_type, specialty, main_complaint, clinical_history,
        physical_exam, diagnosis, treatment_plan, prescriptions, 
        exams_requested, referrals, observations
      )
      VALUES (
        ${userId}, ${data.patient_name}, ${data.patient_cpf}, ${data.patient_age},
        ${data.patient_gender}, ${data.appointment_type}, ${data.specialty},
        ${data.main_complaint}, ${data.clinical_history}, ${data.physical_exam},
        ${data.diagnosis}, ${data.treatment_plan}, ${JSON.stringify(data.prescriptions || [])},
        ${JSON.stringify(data.exams_requested || [])}, ${JSON.stringify(data.referrals || [])},
        ${data.observations}
      )
      RETURNING *
    `
    return result[0]
  },

  async updateAppointment(userId: string, appointmentId: string, data: any) {
    await setUserContext(userId)
    const result = await sql`
      UPDATE appointments
      SET
        patient_name = COALESCE(${data.patient_name}, patient_name),
        main_complaint = COALESCE(${data.main_complaint}, main_complaint),
        diagnosis = COALESCE(${data.diagnosis}, diagnosis),
        treatment_plan = COALESCE(${data.treatment_plan}, treatment_plan),
        status = COALESCE(${data.status}, status),
        updated_at = NOW()
      WHERE id = ${appointmentId} AND user_id = ${userId}
      RETURNING *
    `
    return result[0]
  },

  // AI Conversations
  async getConversations(userId: string) {
    await setUserContext(userId)
    return await sql`
      SELECT * FROM ai_conversations 
      WHERE user_id = ${userId} AND is_archived = false
      ORDER BY updated_at DESC
    `
  },

  async createConversation(userId: string, title?: string) {
    await setUserContext(userId)
    const result = await sql`
      INSERT INTO ai_conversations (user_id, title)
      VALUES (${userId}, ${title || "Nova conversa"})
      RETURNING *
    `
    return result[0]
  },

  async addMessage(userId: string, conversationId: string, role: "user" | "assistant", content: string) {
    await setUserContext(userId)
    const result = await sql`
      INSERT INTO ai_messages (conversation_id, role, content)
      VALUES (${conversationId}, ${role}, ${content})
      RETURNING *
    `
    return result[0]
  },

  async getMessages(userId: string, conversationId: string) {
    await setUserContext(userId)
    return await sql`
      SELECT m.* FROM ai_messages m
      JOIN ai_conversations c ON m.conversation_id = c.id
      WHERE c.id = ${conversationId} AND c.user_id = ${userId}
      ORDER BY m.created_at ASC
    `
  },

  // Templates
  async getTemplates(userId: string, templateType?: string) {
    await setUserContext(userId)
    if (templateType) {
      return await sql`
        SELECT * FROM document_templates 
        WHERE user_id = ${userId} AND template_type = ${templateType}
        ORDER BY is_favorite DESC, usage_count DESC
      `
    }
    return await sql`
      SELECT * FROM document_templates 
      WHERE user_id = ${userId}
      ORDER BY is_favorite DESC, usage_count DESC
    `
  },

  // User Settings
  async getSettings(userId: string) {
    await setUserContext(userId)
    const result = await sql`
      SELECT * FROM user_settings WHERE user_id = ${userId}
    `
    return result[0]
  },

  async updateSettings(userId: string, settings: any) {
    await setUserContext(userId)
    const result = await sql`
      INSERT INTO user_settings (user_id, theme, notifications_enabled, clinic_name, clinic_address, preferences)
      VALUES (${userId}, ${settings.theme}, ${settings.notifications_enabled}, 
              ${settings.clinic_name}, ${settings.clinic_address}, ${JSON.stringify(settings.preferences || {})})
      ON CONFLICT (user_id) 
      DO UPDATE SET
        theme = COALESCE(${settings.theme}, user_settings.theme),
        notifications_enabled = COALESCE(${settings.notifications_enabled}, user_settings.notifications_enabled),
        clinic_name = COALESCE(${settings.clinic_name}, user_settings.clinic_name),
        clinic_address = COALESCE(${settings.clinic_address}, user_settings.clinic_address),
        preferences = COALESCE(${JSON.stringify(settings.preferences || {})}, user_settings.preferences),
        updated_at = NOW()
      RETURNING *
    `
    return result[0]
  },

  // Statistics
  async getStats(userId: string) {
    await setUserContext(userId)
    const [appointmentsCount] = await sql`
      SELECT COUNT(*) as count FROM appointments WHERE user_id = ${userId}
    `
    const [thisMonthCount] = await sql`
      SELECT COUNT(*) as count FROM appointments 
      WHERE user_id = ${userId} 
      AND appointment_date >= DATE_TRUNC('month', CURRENT_DATE)
    `
    return {
      totalAppointments: appointmentsCount.count,
      thisMonth: thisMonthCount.count,
    }
  },
}
