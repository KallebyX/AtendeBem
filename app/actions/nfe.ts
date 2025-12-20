"use server"

import { getDb } from "@/lib/db"
import { verifyToken } from "@/lib/session"
import { cookies } from "next/headers"
import { setUserContext } from "@/lib/db-init"

export async function getNFeConfiguration() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT * FROM nfe_configuration
      WHERE tenant_id = ${user.tenant_id}
    `

    return { success: true, data: result[0] || null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateNFeConfiguration(data: {
  company_name: string
  company_cnpj: string
  company_ie?: string
  company_im?: string
  company_regime_tributario?: string
  address?: any
  phone?: string
  email?: string
  environment?: "sandbox" | "production"
  api_brasil_token?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    // Verificar se já existe configuração
    const existing = await db`
      SELECT id FROM nfe_configuration WHERE tenant_id = ${user.tenant_id}
    `

    if (existing.length > 0) {
      // UPDATE
      const result = await db`
        UPDATE nfe_configuration
        SET 
          company_name = ${data.company_name},
          company_cnpj = ${data.company_cnpj},
          company_ie = COALESCE(${data.company_ie || null}, company_ie),
          company_im = COALESCE(${data.company_im || null}, company_im),
          company_regime_tributario = COALESCE(${data.company_regime_tributario || null}, company_regime_tributario),
          address_street = COALESCE(${data.address?.street || null}, address_street),
          address_number = COALESCE(${data.address?.number || null}, address_number),
          address_city = COALESCE(${data.address?.city || null}, address_city),
          address_state = COALESCE(${data.address?.state || null}, address_state),
          address_zipcode = COALESCE(${data.address?.zipcode || null}, address_zipcode),
          phone = COALESCE(${data.phone || null}, phone),
          email = COALESCE(${data.email || null}, email),
          environment = COALESCE(${data.environment || null}, environment),
          api_brasil_token = COALESCE(${data.api_brasil_token || null}, api_brasil_token),
          updated_at = NOW()
        WHERE tenant_id = ${user.tenant_id}
        RETURNING *
      `
      return { success: true, data: result[0] }
    } else {
      // INSERT
      const result = await db`
        INSERT INTO nfe_configuration (
          tenant_id, company_name, company_cnpj, company_ie, company_im,
          company_regime_tributario, address_street, address_number,
          address_city, address_state, address_zipcode, phone, email,
          environment, api_brasil_token
        ) VALUES (
          ${user.tenant_id}, ${data.company_name}, ${data.company_cnpj},
          ${data.company_ie || null}, ${data.company_im || null},
          ${data.company_regime_tributario || "1"}, ${data.address?.street || null},
          ${data.address?.number || null}, ${data.address?.city || null},
          ${data.address?.state || null}, ${data.address?.zipcode || null},
          ${data.phone || null}, ${data.email || null}, ${data.environment || "sandbox"},
          ${data.api_brasil_token || null}
        ) RETURNING *
      `
      return { success: true, data: result[0] }
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function createNFe(data: {
  patient_id: string
  appointment_id?: string
  services: any[]
  customer_name?: string
  customer_cpf_cnpj?: string
  invoice_type?: "nfe" | "nfse"
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar dados do paciente
    const patient = await db`
      SELECT name, cpf FROM patients WHERE id = ${data.patient_id}
    `

    if (!patient.length) return { error: "Paciente não encontrado" }

    // Buscar configuração NFe
    const config = await db`
      SELECT * FROM nfe_configuration WHERE tenant_id = ${user.tenant_id}
    `

    if (!config.length) {
      return { error: "Configuração NFe não encontrada. Configure primeiro." }
    }

    const invoiceType = data.invoice_type || "nfse"

    // Calcular valores
    const servicesValue = data.services.reduce((sum: number, s: any) => sum + s.quantity * s.unit_price, 0)

    // Impostos simplificados (em produção, calcular baseado em regime tributário)
    const issRate = 2.0 // 2% ISS exemplo
    const issValue = servicesValue * (issRate / 100)
    const netValue = servicesValue - issValue

    // Gerar número da nota
    let invoiceNumber: string
    if (invoiceType === "nfe") {
      const nextNumber = await db`SELECT get_next_nfe_number(${user.tenant_id}::uuid) as number`
      invoiceNumber = `NFE-${config[0].nfe_series}-${String(nextNumber[0].number).padStart(9, "0")}`
    } else {
      const nextRps = await db`SELECT get_next_rps_number(${user.tenant_id}::uuid) as number`
      invoiceNumber = `NFSE-${config[0].nfse_rps_series}-${String(nextRps[0].number).padStart(6, "0")}`
    }

    const result = await db`
      INSERT INTO nfe_invoices (
        tenant_id, user_id, invoice_number, invoice_type, series,
        appointment_id, patient_id, customer_name, customer_cpf_cnpj,
        services, services_value, iss_value, iss_rate, net_value, status
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${invoiceNumber}, ${invoiceType},
        ${invoiceType === "nfe" ? config[0].nfe_series : config[0].nfse_rps_series},
        ${data.appointment_id || null}, ${data.patient_id},
        ${data.customer_name || patient[0].name}, ${data.customer_cpf_cnpj || patient[0].cpf || null},
        ${JSON.stringify(data.services)}, ${servicesValue}, ${issValue},
        ${issRate}, ${netValue}, 'draft'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getNFeInvoices(filters?: {
  patient_id?: string
  status?: string
  invoice_type?: string
  start_date?: string
  end_date?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT n.*, p.name as patient_name
      FROM nfe_invoices n
      JOIN patients p ON n.patient_id = p.id
      WHERE n.tenant_id = ${user.tenant_id}
        ${filters?.patient_id ? db`AND n.patient_id = ${filters.patient_id}` : db``}
        ${filters?.status ? db`AND n.status = ${filters.status}` : db``}
        ${filters?.invoice_type ? db`AND n.invoice_type = ${filters.invoice_type}` : db``}
        ${filters?.start_date ? db`AND n.created_at >= ${filters.start_date}` : db``}
        ${filters?.end_date ? db`AND n.created_at <= ${filters.end_date}` : db``}
      ORDER BY n.created_at DESC
      LIMIT 100
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getNFes(filters?: {
  patient_id?: string
  status?: string
  invoice_type?: string
  start_date?: string
  end_date?: string
}) {
  return getNFeInvoices(filters)
}

export async function sendNFeToAPI(invoice_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar nota e configuração
    const invoice = await db`
      SELECT * FROM nfe_invoices WHERE id = ${invoice_id} AND tenant_id = ${user.tenant_id}
    `

    if (!invoice.length) return { error: "Nota fiscal não encontrada" }

    const config = await db`
      SELECT * FROM nfe_configuration WHERE tenant_id = ${user.tenant_id}
    `

    if (!config.length || !config[0].api_brasil_token) {
      return { error: "Token API Brasil não configurado" }
    }

    // Atualizar status
    await db`
      UPDATE nfe_invoices
      SET status = 'processing', sent_at = NOW()
      WHERE id = ${invoice_id}
    `

    // Em produção, fazer chamada real para API Brasil:
    // const response = await fetch('https://api.apibrasil.io/nfse/emitir', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${config[0].api_brasil_token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ ... })
    // })

    // Simular sucesso
    const simulatedProtocol = `PROT-${Date.now()}`
    const simulatedAccessKey = String(Math.random()).slice(2, 46).padEnd(44, "0")

    await db`
      UPDATE nfe_invoices
      SET status = 'authorized',
          authorization_protocol = ${simulatedProtocol},
          authorization_date = NOW(),
          access_key = ${simulatedAccessKey},
          updated_at = NOW()
      WHERE id = ${invoice_id}
    `

    return {
      success: true,
      message: "Nota fiscal enviada com sucesso",
      protocol: simulatedProtocol,
    }
  } catch (error: any) {
    // Registrar erro
    await setUserContext((await verifyToken((await cookies()).get("session")?.value || ""))?.id || "")
    const db = getDb()
    await db`
      UPDATE nfe_invoices
      SET status = 'error', error_message = ${error.message}
      WHERE id = ${invoice_id}
    `

    return { error: error.message }
  }
}

export async function cancelNFe(invoice_id: string, reason: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      UPDATE nfe_invoices
      SET status = 'cancelled',
          cancellation_date = NOW(),
          cancellation_reason = ${reason},
          updated_at = NOW()
      WHERE id = ${invoice_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}
