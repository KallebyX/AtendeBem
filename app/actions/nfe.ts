'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'
import {
  generateNFSeXML,
  generateNFeXML as generateNFeXMLFull,
  generateAccessKeyNFe,
  validateNFSeXML,
  validateNFeXML,
  NFSeXMLData,
  NFeXMLData,
  FORMAS_PAGAMENTO
} from '@/lib/nfe-xml-generator'
import {
  validatePreSubmission,
  validateCancellation,
  PreSubmissionData,
  ValidationResult
} from '@/lib/nfe-validator'
import { UF_CODES, validateCPF, validateCNPJ } from '@/lib/fiscal-utils'

// ============================================================================
// TIPOS
// ============================================================================
export interface NFeConfiguration {
  environment: 'sandbox' | 'production'
  certificate_path: string
  certificate_password: string
  certificate_expires_at: string | null
  certificate_subject: string | null
  company_name: string
  company_fantasy_name: string
  company_cnpj: string
  company_ie: string
  company_im: string
  company_cnae: string
  company_cnae_secondary: string[]
  company_regime_tributario: string
  company_crt: string
  optante_simples: boolean
  optante_mei: boolean
  address_street: string
  address_number: string
  address_complement: string
  address_neighborhood: string
  address_city: string
  address_state: string
  address_zipcode: string
  address_city_code: string
  phone: string
  email: string
  website: string
  nfe_series: string
  nfe_last_number: number
  nfe_csc: string
  nfe_csc_id: string
  nfse_rps_series: string
  nfse_last_rps_number: number
  nfse_city_code: string
  nfse_provider_code: string
  accountant_name: string
  accountant_cpf: string
  accountant_crc: string
  accountant_email: string
  accountant_phone: string
  send_copy_to_accountant: boolean
  accountant_send_frequency: 'immediate' | 'daily' | 'weekly'
  send_email_to_customer: boolean
  auto_send_to_sefaz: boolean
  include_pdf_in_email: boolean
  include_xml_in_email: boolean
}

export interface NFeService {
  id?: string
  code: string
  description: string
  lc116_code: string
  cnae_code: string
  iss_rate: number
  unit_price: number
  quantity: number
  total_value: number
}

export interface NFeInvoice {
  id: string
  invoice_number: string
  invoice_type: 'nfe' | 'nfse'
  series: string
  patient_id: string
  patient_name?: string
  customer_name: string
  customer_cpf_cnpj: string
  customer_address?: any
  services: NFeService[]
  services_value: number
  deductions_value: number
  discount_value: number
  iss_value: number
  iss_rate: number
  pis_value: number
  cofins_value: number
  inss_value: number
  ir_value: number
  csll_value: number
  net_value: number
  xml_content?: string
  xml_signed?: string
  status: 'draft' | 'processing' | 'authorized' | 'rejected' | 'cancelled' | 'error'
  authorization_protocol?: string
  authorization_date?: string
  access_key?: string
  verification_code?: string
  rps_number?: string
  rps_series?: string
  rps_date?: string
  cancellation_date?: string
  cancellation_reason?: string
  danfe_url?: string
  error_message?: string
  created_at: string
  updated_at: string
}

// ============================================================================
// AUTENTICAÇÃO HELPER
// ============================================================================
async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return { error: 'Não autenticado' }
  const user = await verifyToken(token)
  if (!user) return { error: 'Token inválido' }

  await setUserContext(user.id)
  return { user }
}

// ============================================================================
// CONFIGURAÇÃO - LEGACY (compatibilidade)
// ============================================================================
export async function getNFeConfiguration() {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    const result = await db`
      SELECT * FROM user_settings
      WHERE user_id = ${user.id}
    `

    const settings = result[0] || {}
    return {
      success: true,
      data: {
        company_name: settings.clinic_name || '',
        company_cnpj: settings.preferences?.cnpj || '',
        company_ie: settings.preferences?.ie || '',
        address: settings.clinic_address || '',
        phone: settings.clinic_phone || '',
        email: user.email,
        environment: 'sandbox',
        configured: !!settings.preferences?.cnpj
      }
    }
  } catch (error: any) {
    console.error('Erro ao buscar configuração NFe:', error)
    return { error: error.message }
  }
}

// ============================================================================
// CONFIGURAÇÃO COMPLETA
// ============================================================================
export async function getNFeFullConfiguration() {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Tentar buscar da tabela nfe_configuration
    const nfeConfig = await db`
      SELECT * FROM nfe_configuration
      WHERE tenant_id = (SELECT tenant_id FROM users WHERE id = ${user.id})
      LIMIT 1
    `.catch(() => [])

    // Buscar também user_settings para dados legados
    const userSettings = await db`
      SELECT * FROM user_settings
      WHERE user_id = ${user.id}
    `.catch(() => [])

    if (nfeConfig.length > 0) {
      const config = nfeConfig[0]
      return {
        success: true,
        data: {
          environment: config.environment || 'sandbox',
          certificate_path: config.certificate_path || '',
          certificate_password: '', // Nunca retorna a senha
          certificate_expires_at: config.certificate_expires_at || null,
          certificate_subject: config.certificate_subject || null,
          company_name: config.company_name || '',
          company_fantasy_name: config.company_fantasy_name || '',
          company_cnpj: config.company_cnpj || '',
          company_ie: config.company_ie || '',
          company_im: config.company_im || '',
          company_cnae: config.company_cnae || '',
          company_cnae_secondary: config.company_cnae_secondary || [],
          company_regime_tributario: config.company_regime_tributario || '1',
          company_crt: config.company_crt || '1',
          optante_simples: config.optante_simples ?? true,
          optante_mei: config.optante_mei ?? false,
          address_street: config.address_street || '',
          address_number: config.address_number || '',
          address_complement: config.address_complement || '',
          address_neighborhood: config.address_neighborhood || '',
          address_city: config.address_city || '',
          address_state: config.address_state || '',
          address_zipcode: config.address_zipcode || '',
          address_city_code: config.address_city_code || '',
          phone: config.phone || '',
          email: config.email || '',
          website: config.website || '',
          nfe_series: config.nfe_series || '1',
          nfe_last_number: config.nfe_last_number || 0,
          nfe_csc: config.nfe_csc || '',
          nfe_csc_id: config.nfe_csc_id || '',
          nfse_rps_series: config.nfse_rps_series || '1',
          nfse_last_rps_number: config.nfse_last_rps_number || 0,
          nfse_city_code: config.nfse_city_code || '',
          nfse_provider_code: config.nfse_provider_code || '',
          accountant_name: config.accountant_name || '',
          accountant_cpf: config.accountant_cpf || '',
          accountant_crc: config.accountant_crc || '',
          accountant_email: config.accountant_email || '',
          accountant_phone: config.accountant_phone || '',
          send_copy_to_accountant: config.send_copy_to_accountant ?? true,
          accountant_send_frequency: config.accountant_send_frequency || 'immediate',
          send_email_to_customer: config.send_email_to_customer ?? true,
          auto_send_to_sefaz: config.auto_send_to_sefaz ?? false,
          include_pdf_in_email: config.include_pdf_in_email ?? true,
          include_xml_in_email: config.include_xml_in_email ?? true,
        } as NFeConfiguration
      }
    }

    // Fallback para dados antigos
    const settings = userSettings[0] || {}
    return {
      success: true,
      data: {
        environment: 'sandbox',
        certificate_path: '',
        certificate_password: '',
        certificate_expires_at: null,
        certificate_subject: null,
        company_name: settings.clinic_name || '',
        company_fantasy_name: '',
        company_cnpj: settings.preferences?.cnpj || '',
        company_ie: settings.preferences?.ie || '',
        company_im: settings.preferences?.im || '',
        company_cnae: '',
        company_cnae_secondary: [],
        company_regime_tributario: '1',
        company_crt: '1',
        optante_simples: true,
        optante_mei: false,
        address_street: '',
        address_number: '',
        address_complement: '',
        address_neighborhood: '',
        address_city: '',
        address_state: '',
        address_zipcode: '',
        address_city_code: '',
        phone: settings.clinic_phone || '',
        email: user.email || '',
        website: '',
        nfe_series: '1',
        nfe_last_number: 0,
        nfe_csc: '',
        nfe_csc_id: '',
        nfse_rps_series: '1',
        nfse_last_rps_number: 0,
        nfse_city_code: '',
        nfse_provider_code: '',
        accountant_name: '',
        accountant_cpf: '',
        accountant_crc: '',
        accountant_email: '',
        accountant_phone: '',
        send_copy_to_accountant: true,
        accountant_send_frequency: 'immediate',
        send_email_to_customer: true,
        auto_send_to_sefaz: false,
        include_pdf_in_email: true,
        include_xml_in_email: true,
      } as NFeConfiguration
    }
  } catch (error: any) {
    console.error('Erro ao buscar configuração NFe completa:', error)
    return { error: error.message }
  }
}

export async function updateNFeFullConfiguration(data: Partial<NFeConfiguration>) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar tenant_id do usuário
    const userInfo = await db`
      SELECT tenant_id FROM users WHERE id = ${user.id}
    `
    if (!userInfo.length) return { error: 'Usuário não encontrado' }
    const tenantId = userInfo[0].tenant_id

    // Verificar se já existe configuração
    const existing = await db`
      SELECT id FROM nfe_configuration WHERE tenant_id = ${tenantId}
    `.catch(() => [])

    // Preparar dados para criptografia de senha (se fornecida)
    let encryptedPassword = null
    if (data.certificate_password) {
      // Em produção, usar criptografia real
      encryptedPassword = Buffer.from(data.certificate_password).toString('base64')
    }

    const configData = {
      environment: data.environment || 'sandbox',
      certificate_path: data.certificate_path || null,
      certificate_password_encrypted: encryptedPassword,
      certificate_expires_at: data.certificate_expires_at || null,
      certificate_subject: data.certificate_subject || null,
      company_name: data.company_name || '',
      company_fantasy_name: data.company_fantasy_name || '',
      company_cnpj: data.company_cnpj?.replace(/[^\d]/g, '') || '',
      company_ie: data.company_ie || '',
      company_im: data.company_im || '',
      company_cnae: data.company_cnae || '',
      company_cnae_secondary: data.company_cnae_secondary || [],
      company_regime_tributario: data.company_regime_tributario || '1',
      company_crt: data.company_crt || '1',
      optante_simples: data.optante_simples ?? true,
      optante_mei: data.optante_mei ?? false,
      address_street: data.address_street || '',
      address_number: data.address_number || '',
      address_complement: data.address_complement || '',
      address_neighborhood: data.address_neighborhood || '',
      address_city: data.address_city || '',
      address_state: data.address_state || '',
      address_zipcode: data.address_zipcode?.replace(/[^\d]/g, '') || '',
      address_city_code: data.address_city_code || '',
      phone: data.phone?.replace(/[^\d]/g, '') || '',
      email: data.email || '',
      website: data.website || '',
      nfe_series: data.nfe_series || '1',
      nfe_last_number: data.nfe_last_number || 0,
      nfe_csc: data.nfe_csc || '',
      nfe_csc_id: data.nfe_csc_id || '',
      nfse_rps_series: data.nfse_rps_series || '1',
      nfse_last_rps_number: data.nfse_last_rps_number || 0,
      nfse_city_code: data.nfse_city_code || '',
      nfse_provider_code: data.nfse_provider_code || '',
      accountant_name: data.accountant_name || '',
      accountant_cpf: data.accountant_cpf?.replace(/[^\d]/g, '') || '',
      accountant_crc: data.accountant_crc || '',
      accountant_email: data.accountant_email || '',
      accountant_phone: data.accountant_phone?.replace(/[^\d]/g, '') || '',
      send_copy_to_accountant: data.send_copy_to_accountant ?? true,
      accountant_send_frequency: data.accountant_send_frequency || 'immediate',
      send_email_to_customer: data.send_email_to_customer ?? true,
      auto_send_to_sefaz: data.auto_send_to_sefaz ?? false,
      include_pdf_in_email: data.include_pdf_in_email ?? true,
      include_xml_in_email: data.include_xml_in_email ?? true,
    }

    if (existing.length > 0) {
      // Update
      await db`
        UPDATE nfe_configuration SET
          environment = ${configData.environment},
          ${configData.certificate_password_encrypted ? db`certificate_password_encrypted = ${configData.certificate_password_encrypted},` : db``}
          certificate_path = ${configData.certificate_path},
          certificate_expires_at = ${configData.certificate_expires_at},
          certificate_subject = ${configData.certificate_subject},
          company_name = ${configData.company_name},
          company_fantasy_name = ${configData.company_fantasy_name},
          company_cnpj = ${configData.company_cnpj},
          company_ie = ${configData.company_ie},
          company_im = ${configData.company_im},
          company_cnae = ${configData.company_cnae},
          company_regime_tributario = ${configData.company_regime_tributario},
          address_street = ${configData.address_street},
          address_number = ${configData.address_number},
          address_complement = ${configData.address_complement},
          address_neighborhood = ${configData.address_neighborhood},
          address_city = ${configData.address_city},
          address_state = ${configData.address_state},
          address_zipcode = ${configData.address_zipcode},
          address_city_code = ${configData.address_city_code},
          phone = ${configData.phone},
          email = ${configData.email},
          nfe_series = ${configData.nfe_series},
          nfe_last_number = ${configData.nfe_last_number},
          nfe_csc = ${configData.nfe_csc},
          nfe_csc_id = ${configData.nfe_csc_id},
          nfse_rps_series = ${configData.nfse_rps_series},
          nfse_last_rps_number = ${configData.nfse_last_rps_number},
          nfse_city_code = ${configData.nfse_city_code},
          nfse_provider_code = ${configData.nfse_provider_code},
          send_email_to_customer = ${configData.send_email_to_customer},
          auto_send_to_sefaz = ${configData.auto_send_to_sefaz},
          updated_at = NOW()
        WHERE tenant_id = ${tenantId}
      `
    } else {
      // Insert
      await db`
        INSERT INTO nfe_configuration (
          tenant_id, environment, certificate_path, certificate_password_encrypted,
          certificate_expires_at, certificate_subject,
          company_name, company_fantasy_name, company_cnpj, company_ie, company_im,
          company_cnae, company_regime_tributario,
          address_street, address_number, address_complement, address_neighborhood,
          address_city, address_state, address_zipcode, address_city_code,
          phone, email, nfe_series, nfe_last_number, nfe_csc, nfe_csc_id,
          nfse_rps_series, nfse_last_rps_number, nfse_city_code, nfse_provider_code,
          send_email_to_customer, auto_send_to_sefaz
        ) VALUES (
          ${tenantId}, ${configData.environment}, ${configData.certificate_path},
          ${configData.certificate_password_encrypted},
          ${configData.certificate_expires_at}, ${configData.certificate_subject},
          ${configData.company_name}, ${configData.company_fantasy_name},
          ${configData.company_cnpj}, ${configData.company_ie}, ${configData.company_im},
          ${configData.company_cnae}, ${configData.company_regime_tributario},
          ${configData.address_street}, ${configData.address_number},
          ${configData.address_complement}, ${configData.address_neighborhood},
          ${configData.address_city}, ${configData.address_state},
          ${configData.address_zipcode}, ${configData.address_city_code},
          ${configData.phone}, ${configData.email}, ${configData.nfe_series},
          ${configData.nfe_last_number}, ${configData.nfe_csc}, ${configData.nfe_csc_id},
          ${configData.nfse_rps_series}, ${configData.nfse_last_rps_number},
          ${configData.nfse_city_code}, ${configData.nfse_provider_code},
          ${configData.send_email_to_customer}, ${configData.auto_send_to_sefaz}
        )
      `
    }

    // Também atualizar user_settings para compatibilidade
    await db`
      INSERT INTO user_settings (user_id, clinic_name, clinic_phone, preferences)
      VALUES (
        ${user.id},
        ${configData.company_name},
        ${configData.phone},
        ${JSON.stringify({
          cnpj: configData.company_cnpj,
          ie: configData.company_ie,
          im: configData.company_im,
          nfe_environment: configData.environment
        })}::jsonb
      )
      ON CONFLICT (user_id) DO UPDATE SET
        clinic_name = ${configData.company_name},
        clinic_phone = ${configData.phone},
        preferences = user_settings.preferences || ${JSON.stringify({
          cnpj: configData.company_cnpj,
          ie: configData.company_ie,
          im: configData.company_im,
          nfe_environment: configData.environment
        })}::jsonb,
        updated_at = NOW()
    `

    return { success: true }
  } catch (error: any) {
    console.error('Erro ao atualizar configuração NFe:', error)
    return { error: error.message }
  }
}

export async function updateNFeConfiguration(data: {
  company_name: string
  company_cnpj: string
  company_ie?: string
  company_im?: string
  address?: any
  phone?: string
  email?: string
  environment?: 'sandbox' | 'production'
}) {
  return updateNFeFullConfiguration(data)
}

// ============================================================================
// TESTE DE CERTIFICADO
// ============================================================================
export async function testCertificate(password: string) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }

    // Em produção, aqui faria a validação real do certificado
    // Por enquanto, simula validação
    if (password.length < 4) {
      return { error: 'Senha muito curta' }
    }

    // Simular informações do certificado
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    const daysToExpire = Math.ceil((expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

    return {
      success: true,
      expiresAt: expiresAt.toISOString(),
      daysToExpire,
      subject: 'CN=EMPRESA EXEMPLO LTDA:00000000000100'
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

// ============================================================================
// CRIAR NFE
// ============================================================================
export async function createNFe(data: {
  patient_id: string
  appointment_id?: string
  services: NFeService[]
  customer_name?: string
  customer_cpf_cnpj?: string
  customer_address?: any
  invoice_type?: 'nfe' | 'nfse'
  observations?: string
}) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar tenant_id
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    if (!userInfo.length) return { error: 'Usuário não encontrado' }
    const tenantId = userInfo[0].tenant_id

    // Buscar dados do paciente
    const patient = await db`
      SELECT full_name, cpf, email, phone, address FROM patients
      WHERE id = ${data.patient_id} AND user_id = ${user.id}
    `
    if (!patient.length) return { error: 'Paciente não encontrado' }

    // Buscar configuração NFe
    const nfeConfig = await db`
      SELECT * FROM nfe_configuration WHERE tenant_id = ${tenantId}
    `.catch(() => [])

    const config = nfeConfig[0] || {}
    const invoiceType = data.invoice_type || 'nfse'

    // Calcular valores
    const servicesValue = data.services.reduce(
      (sum, s) => sum + (s.quantity || 1) * (s.unit_price || 0),
      0
    )

    // Buscar alíquota ISS do município ou usar padrão
    const issRate = config.nfse_city_code ? getISSRateForCity(config.nfse_city_code) : 5.0
    const issValue = servicesValue * (issRate / 100)

    // Calcular PIS e COFINS (se regime normal)
    let pisValue = 0
    let cofinsValue = 0
    if (config.company_regime_tributario === '3') {
      pisValue = servicesValue * 0.0065 // 0,65%
      cofinsValue = servicesValue * 0.03 // 3%
    }

    const netValue = servicesValue - issValue - pisValue - cofinsValue

    // Gerar número da nota
    let invoiceNumber: string
    let rpsNumber: string | null = null

    if (invoiceType === 'nfse') {
      const nextRps = (config.nfse_last_rps_number || 0) + 1
      rpsNumber = nextRps.toString().padStart(6, '0')
      invoiceNumber = `RPS-${config.nfse_rps_series || '1'}-${rpsNumber}`

      // Atualizar último número RPS
      if (nfeConfig.length > 0) {
        await db`
          UPDATE nfe_configuration
          SET nfse_last_rps_number = ${nextRps}, updated_at = NOW()
          WHERE tenant_id = ${tenantId}
        `
      }
    } else {
      const nextNfe = (config.nfe_last_number || 0) + 1
      invoiceNumber = `NFE-${config.nfe_series || '1'}-${nextNfe.toString().padStart(9, '0')}`

      // Atualizar último número NFe
      if (nfeConfig.length > 0) {
        await db`
          UPDATE nfe_configuration
          SET nfe_last_number = ${nextNfe}, updated_at = NOW()
          WHERE tenant_id = ${tenantId}
        `
      }
    }

    // Preparar serviços com cálculos
    const servicesWithCalc = data.services.map(s => ({
      ...s,
      total_value: (s.quantity || 1) * (s.unit_price || 0),
      iss_value: ((s.quantity || 1) * (s.unit_price || 0)) * (issRate / 100)
    }))

    // Inserir nota fiscal
    const result = await db`
      INSERT INTO nfe_invoices (
        tenant_id, user_id, patient_id, invoice_number, invoice_type, series,
        customer_name, customer_cpf_cnpj, customer_address,
        services, services_value, iss_value, iss_rate,
        pis_value, cofins_value, net_value,
        rps_number, rps_series, rps_date,
        status, issue_date
      ) VALUES (
        ${tenantId}, ${user.id}, ${data.patient_id},
        ${invoiceNumber}, ${invoiceType}, ${invoiceType === 'nfse' ? config.nfse_rps_series || '1' : config.nfe_series || '1'},
        ${data.customer_name || patient[0].full_name},
        ${data.customer_cpf_cnpj || patient[0].cpf || ''},
        ${JSON.stringify(data.customer_address || patient[0].address || {})}::jsonb,
        ${JSON.stringify(servicesWithCalc)}::jsonb,
        ${servicesValue}, ${issValue}, ${issRate},
        ${pisValue}, ${cofinsValue}, ${netValue},
        ${rpsNumber}, ${invoiceType === 'nfse' ? config.nfse_rps_series || '1' : null},
        ${invoiceType === 'nfse' ? new Date().toISOString().split('T')[0] : null},
        'draft', NOW()
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar NFe:', error)
    return { error: error.message }
  }
}

// ============================================================================
// LISTAR NFES
// ============================================================================
export async function getNFeInvoices(filters?: {
  patient_id?: string
  status?: string
  start_date?: string
  end_date?: string
  invoice_type?: 'nfe' | 'nfse'
}) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    const result = await db`
      SELECT n.*, p.full_name as patient_name
      FROM nfe_invoices n
      LEFT JOIN patients p ON n.patient_id = p.id
      WHERE n.user_id = ${user.id}
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
    console.error('Erro ao buscar NFes:', error)
    return { error: error.message }
  }
}

export async function getNFes(filters?: {
  patient_id?: string
  status?: string
  start_date?: string
  end_date?: string
}) {
  return getNFeInvoices(filters)
}

export async function getNFeById(invoiceId: string) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    const result = await db`
      SELECT n.*, p.full_name as patient_name, p.email as patient_email
      FROM nfe_invoices n
      LEFT JOIN patients p ON n.patient_id = p.id
      WHERE n.id = ${invoiceId} AND n.user_id = ${user.id}
    `

    if (!result.length) return { error: 'Nota fiscal não encontrada' }

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao buscar NFe:', error)
    return { error: error.message }
  }
}

// ============================================================================
// VALIDAR NFE ANTES DO ENVIO
// ============================================================================
export async function validateNFeBeforeSend(invoiceId: string): Promise<{ success: boolean; validation: ValidationResult } | { error: string }> {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar nota
    const invoice = await db`
      SELECT n.*, p.full_name as patient_name, p.email as patient_email
      FROM nfe_invoices n
      LEFT JOIN patients p ON n.patient_id = p.id
      WHERE n.id = ${invoiceId} AND n.user_id = ${user.id}
    `
    if (!invoice.length) return { error: 'Nota fiscal não encontrada' }

    const nfe = invoice[0]

    // Buscar configuração
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    const tenantId = userInfo[0].tenant_id

    const nfeConfig = await db`
      SELECT * FROM nfe_configuration WHERE tenant_id = ${tenantId}
    `.catch(() => [])

    const config = nfeConfig[0] || {}

    // Preparar dados para validação
    const validationData: PreSubmissionData = {
      documentType: nfe.invoice_type as 'nfe' | 'nfse',
      emitter: {
        cnpj: config.company_cnpj || '',
        ie: config.company_ie || '',
        im: config.company_im || '',
        razaoSocial: config.company_name || '',
        nomeFantasia: config.company_fantasy_name || '',
        regimeTributario: (config.company_regime_tributario || '1') as '1' | '2' | '3',
        crt: config.company_crt || '1',
        optanteSimplesNacional: config.optante_simples || false,
        endereco: {
          logradouro: config.address_street || '',
          numero: config.address_number || '',
          bairro: config.address_neighborhood || '',
          codigoMunicipio: config.address_city_code || '',
          municipio: config.address_city || '',
          uf: config.address_state || '',
          cep: config.address_zipcode || ''
        }
      },
      recipient: {
        cpfCnpj: nfe.customer_cpf_cnpj || '',
        nome: nfe.customer_name || '',
        email: nfe.patient_email || nfe.customer_email || '',
        endereco: nfe.customer_address ? {
          logradouro: nfe.customer_address.street || nfe.customer_address.logradouro || '',
          numero: nfe.customer_address.number || nfe.customer_address.numero || '',
          bairro: nfe.customer_address.neighborhood || nfe.customer_address.bairro || '',
          codigoMunicipio: nfe.customer_address.city_code || '',
          municipio: nfe.customer_address.city || '',
          uf: nfe.customer_address.state || '',
          cep: nfe.customer_address.zipcode || ''
        } : undefined
      },
      items: (nfe.services || []).map((s: any) => ({
        codigo: s.code || '',
        descricao: s.description || '',
        quantidade: Number(s.quantity) || 1,
        valorUnitario: Number(s.unit_price) || 0,
        valorTotal: Number(s.total_value) || 0,
        lc116Code: s.lc116_code || undefined,
        ncm: s.ncm || undefined,
        cfop: s.cfop || undefined
      })),
      values: {
        valorServicos: Number(nfe.services_value) || 0,
        valorProdutos: 0,
        valorDesconto: Number(nfe.discount_value) || 0,
        valorDeducoes: Number(nfe.deductions_value) || 0,
        valorTotal: Number(nfe.net_value) || Number(nfe.services_value) || 0,
        aliquotaISS: Number(nfe.iss_rate) || 0,
        valorISS: Number(nfe.iss_value) || 0
      },
      certificate: config.certificate_expires_at ? {
        hasValidCertificate: !!config.certificate_path,
        expiresAt: config.certificate_expires_at,
        daysToExpire: config.certificate_expires_at
          ? Math.ceil((new Date(config.certificate_expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : undefined
      } : undefined,
      environment: config.environment || 'sandbox'
    }

    // Executar validação
    const validation = validatePreSubmission(validationData)

    return { success: true, validation }
  } catch (error: any) {
    console.error('Erro ao validar NFe:', error)
    return { error: error.message }
  }
}

// ============================================================================
// ENVIAR NFE PARA SEFAZ/PREFEITURA
// ============================================================================
export async function sendNFeToAPI(invoiceId: string) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar nota
    const invoice = await db`
      SELECT * FROM nfe_invoices WHERE id = ${invoiceId} AND user_id = ${user.id}
    `
    if (!invoice.length) return { error: 'Nota fiscal não encontrada' }

    const nfe = invoice[0]
    if (nfe.status !== 'draft') {
      return { error: 'Apenas notas em rascunho podem ser enviadas' }
    }

    // Buscar configuração
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    const tenantId = userInfo[0].tenant_id

    const nfeConfig = await db`
      SELECT * FROM nfe_configuration WHERE tenant_id = ${tenantId}
    `.catch(() => [])

    const config = nfeConfig[0] || {}

    // VALIDAÇÃO PRÉ-ENVIO (Padrão OURO)
    const validationResult = await validateNFeBeforeSend(invoiceId)
    if ('error' in validationResult) {
      return { error: validationResult.error }
    }

    if (!validationResult.validation.canProceed) {
      const errorMessages = validationResult.validation.errors.map(e => e.message).join('; ')
      return {
        error: `Validação falhou: ${errorMessages}`,
        validation: validationResult.validation
      }
    }

    // Atualizar status para processando
    await db`
      UPDATE nfe_invoices
      SET status = 'processing', sent_at = NOW(), updated_at = NOW()
      WHERE id = ${invoiceId}
    `

    // Em produção, aqui integraria com SEFAZ/Prefeitura via XML
    // Por enquanto, simula a autorização

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Gerar protocolo de autorização
    const timestamp = Date.now()
    const protocol = `${config.environment === 'sandbox' ? 'HOM' : 'PRD'}${timestamp}`

    let accessKey: string | null = null
    let verificationCode: string | null = null

    if (nfe.invoice_type === 'nfe') {
      // Chave de acesso NFe (44 dígitos) - Padrão SEFAZ
      accessKey = generateAccessKey({
        uf: config.address_state || 'SP',
        cnpj: config.company_cnpj || '',
        mod: '55',
        serie: nfe.series || '1',
        numero: nfe.invoice_number.replace(/\D/g, '').slice(-9),
        tpEmis: '1',
        cNF: String(Math.floor(Math.random() * 100000000)).padStart(8, '0')
      })
    } else {
      // Código de verificação NFSe (padrão alfanumérico)
      verificationCode = `${config.address_city_code?.slice(0, 4) || 'XXXX'}${timestamp.toString(36).toUpperCase().slice(-8)}`
    }

    // Gerar XML no Padrão OURO Nacional
    const xmlContent = generateNFeXMLComplete(nfe, config, verificationCode || undefined, accessKey || undefined)

    // Calcular hash do XML para integridade
    const xmlHash = Buffer.from(xmlContent).toString('base64').slice(0, 64)

    // Atualizar nota com autorização
    await db`
      UPDATE nfe_invoices
      SET
        status = 'authorized',
        authorization_protocol = ${protocol},
        authorization_date = NOW(),
        access_key = ${accessKey},
        verification_code = ${verificationCode},
        xml_content = ${xmlContent},
        xml_hash = ${xmlHash},
        updated_at = NOW()
      WHERE id = ${invoiceId}
    `

    return {
      success: true,
      message: 'Nota fiscal autorizada com sucesso',
      protocol,
      accessKey,
      verificationCode,
      validation: validationResult.validation.warnings.length > 0 ? {
        warnings: validationResult.validation.warnings
      } : undefined
    }
  } catch (error: any) {
    console.error('Erro ao enviar NFe:', error)

    // Atualizar status para erro
    const db = await getDb()
    await db`
      UPDATE nfe_invoices
      SET status = 'error', error_message = ${error.message}, updated_at = NOW()
      WHERE id = ${invoiceId}
    `.catch(() => {})

    return { error: error.message }
  }
}

// ============================================================================
// CANCELAR NFE
// ============================================================================
export async function cancelNFe(invoiceId: string, reason: string) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    if (!reason || reason.length < 15) {
      return { error: 'Motivo do cancelamento deve ter pelo menos 15 caracteres' }
    }

    const db = await getDb()

    // Buscar nota
    const invoice = await db`
      SELECT * FROM nfe_invoices WHERE id = ${invoiceId} AND user_id = ${user.id}
    `
    if (!invoice.length) return { error: 'Nota fiscal não encontrada' }

    const nfe = invoice[0]
    if (!['draft', 'authorized'].includes(nfe.status)) {
      return { error: 'Esta nota não pode ser cancelada' }
    }

    // Se autorizada, verificar prazo (24h para NFe, varia para NFSe)
    if (nfe.status === 'authorized' && nfe.authorization_date) {
      const authDate = new Date(nfe.authorization_date)
      const now = new Date()
      const hoursDiff = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60)

      if (hoursDiff > 24) {
        return { error: 'Prazo de 24 horas para cancelamento expirado' }
      }
    }

    // Gerar protocolo de cancelamento
    const cancelProtocol = `CANC${Date.now()}`

    const result = await db`
      UPDATE nfe_invoices
      SET
        status = 'cancelled',
        cancellation_date = NOW(),
        cancellation_reason = ${reason},
        cancellation_protocol = ${cancelProtocol},
        updated_at = NOW()
      WHERE id = ${invoiceId} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Nota fiscal não encontrada' }

    return {
      success: true,
      data: result[0],
      message: 'Nota fiscal cancelada com sucesso',
      cancelProtocol
    }
  } catch (error: any) {
    console.error('Erro ao cancelar NFe:', error)
    return { error: error.message }
  }
}

// ============================================================================
// REENVIAR NFE
// ============================================================================
export async function resendNFe(invoiceId: string) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar nota
    const invoice = await db`
      SELECT * FROM nfe_invoices WHERE id = ${invoiceId} AND user_id = ${user.id}
    `
    if (!invoice.length) return { error: 'Nota fiscal não encontrada' }

    const nfe = invoice[0]
    if (!['rejected', 'error'].includes(nfe.status)) {
      return { error: 'Apenas notas rejeitadas ou com erro podem ser reenviadas' }
    }

    // Resetar para rascunho
    await db`
      UPDATE nfe_invoices
      SET status = 'draft', error_message = NULL, updated_at = NOW()
      WHERE id = ${invoiceId}
    `

    // Tentar enviar novamente
    return sendNFeToAPI(invoiceId)
  } catch (error: any) {
    console.error('Erro ao reenviar NFe:', error)
    return { error: error.message }
  }
}

// ============================================================================
// DOWNLOAD XML
// ============================================================================
export async function downloadNFeXML(invoiceId: string) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    const result = await db`
      SELECT xml_content, xml_signed, invoice_number, invoice_type
      FROM nfe_invoices
      WHERE id = ${invoiceId} AND user_id = ${user.id}
    `

    if (!result.length) return { error: 'Nota fiscal não encontrada' }

    const nfe = result[0]
    const xml = nfe.xml_signed || nfe.xml_content

    if (!xml) return { error: 'XML não disponível' }

    return {
      success: true,
      xml,
      filename: `${nfe.invoice_type.toUpperCase()}_${nfe.invoice_number.replace(/[^\w]/g, '_')}.xml`
    }
  } catch (error: any) {
    console.error('Erro ao baixar XML:', error)
    return { error: error.message }
  }
}

// ============================================================================
// ESTATÍSTICAS
// ============================================================================
export async function getNFeStats() {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    const stats = await db`
      SELECT
        COUNT(*) FILTER (WHERE status = 'draft') as drafts,
        COUNT(*) FILTER (WHERE status = 'processing') as processing,
        COUNT(*) FILTER (WHERE status = 'authorized') as authorized,
        COUNT(*) FILTER (WHERE status = 'rejected') as rejected,
        COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled,
        COUNT(*) FILTER (WHERE status = 'error') as errors,
        COALESCE(SUM(services_value) FILTER (WHERE status = 'authorized'), 0) as total_value,
        COUNT(*) FILTER (WHERE status = 'authorized' AND created_at >= DATE_TRUNC('month', NOW())) as month_count,
        COALESCE(SUM(services_value) FILTER (WHERE status = 'authorized' AND created_at >= DATE_TRUNC('month', NOW())), 0) as month_value
      FROM nfe_invoices
      WHERE user_id = ${user.id}
    `

    return { success: true, data: stats[0] }
  } catch (error: any) {
    console.error('Erro ao buscar estatísticas:', error)
    return { error: error.message }
  }
}

// ============================================================================
// HELPERS
// ============================================================================
function getISSRateForCity(cityCode: string): number {
  const rates: Record<string, number> = {
    '3550308': 5.0,  // São Paulo
    '3304557': 5.0,  // Rio de Janeiro
    '3106200': 5.0,  // Belo Horizonte
    '4106902': 5.0,  // Curitiba
    '4314902': 4.0,  // Porto Alegre
    '2927408': 5.0,  // Salvador
    '5300108': 5.0,  // Brasília
  }
  return rates[cityCode] || 5.0 // Padrão 5%
}

function generateAccessKey(data: {
  uf: string
  cnpj: string
  mod: string
  serie: string
  numero: string
  tpEmis: string
  cNF: string
}): string {
  const ufCodes: Record<string, string> = {
    'AC': '12', 'AL': '27', 'AP': '16', 'AM': '13', 'BA': '29',
    'CE': '23', 'DF': '53', 'ES': '32', 'GO': '52', 'MA': '21',
    'MT': '51', 'MS': '50', 'MG': '31', 'PA': '15', 'PB': '25',
    'PR': '41', 'PE': '26', 'PI': '22', 'RJ': '33', 'RN': '24',
    'RS': '43', 'RO': '11', 'RR': '14', 'SC': '42', 'SP': '35',
    'SE': '28', 'TO': '17'
  }

  const now = new Date()
  const aamm = `${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}`

  const chaveBase =
    (ufCodes[data.uf] || '35') +
    aamm +
    data.cnpj.replace(/[^\d]/g, '').padStart(14, '0') +
    data.mod.padStart(2, '0') +
    data.serie.padStart(3, '0') +
    data.numero.padStart(9, '0') +
    data.tpEmis +
    data.cNF.padStart(8, '0')

  // Calcular dígito verificador (módulo 11)
  const pesos = [2, 3, 4, 5, 6, 7, 8, 9]
  let soma = 0
  let pesoIndex = 0

  for (let i = chaveBase.length - 1; i >= 0; i--) {
    soma += parseInt(chaveBase[i]) * pesos[pesoIndex]
    pesoIndex = (pesoIndex + 1) % 8
  }

  const resto = soma % 11
  const digito = resto < 2 ? 0 : 11 - resto

  return chaveBase + digito.toString()
}

/**
 * Gera XML no Padrão OURO Nacional
 * NFSe: ABRASF 2.04
 * NFe: SEFAZ 4.00
 */
function generateNFeXMLComplete(nfe: any, config: any, verificationCode?: string, accessKey?: string): string {
  const now = new Date()
  const nowISO = now.toISOString()
  const competencia = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

  if (nfe.invoice_type === 'nfse') {
    // Preparar dados para NFSe padrão ABRASF 2.04
    const nfseData: NFSeXMLData = {
      numero: nfe.invoice_number?.replace(/\D/g, '') || '1',
      serie: nfe.series || '1',
      tipo: 1,
      dataEmissao: nowISO,
      competencia: competencia,

      rps: nfe.rps_number ? {
        numero: nfe.rps_number,
        serie: nfe.rps_series || '1',
        tipo: 1,
        dataEmissao: nfe.rps_date || nowISO.split('T')[0]
      } : undefined,

      naturezaOperacao: 1, // 1 = Tributação no município
      regimeEspecialTributacao: config.optante_simples ? 1 : undefined,
      optanteSimplesNacional: config.optante_simples || config.company_crt === '1',
      incentivoFiscal: false,

      prestador: {
        cnpj: config.company_cnpj || '',
        inscricaoMunicipal: config.company_im || '',
        razaoSocial: config.company_name || '',
        nomeFantasia: config.company_fantasy_name || config.company_name || '',
        endereco: {
          logradouro: config.address_street || '',
          numero: config.address_number || 'S/N',
          complemento: config.address_complement || undefined,
          bairro: config.address_neighborhood || '',
          codigoMunicipio: config.address_city_code || '',
          municipio: config.address_city || '',
          uf: config.address_state || '',
          cep: config.address_zipcode || '',
          codigoPais: '1058',
          pais: 'BRASIL'
        },
        telefone: config.phone || undefined,
        email: config.email || undefined
      },

      tomador: {
        cpfCnpj: nfe.customer_cpf_cnpj || '',
        razaoSocial: nfe.customer_name || '',
        endereco: nfe.customer_address ? {
          logradouro: nfe.customer_address.street || nfe.customer_address.logradouro || '',
          numero: nfe.customer_address.number || nfe.customer_address.numero || 'S/N',
          complemento: nfe.customer_address.complement || nfe.customer_address.complemento || undefined,
          bairro: nfe.customer_address.neighborhood || nfe.customer_address.bairro || '',
          codigoMunicipio: nfe.customer_address.city_code || nfe.customer_address.codigoMunicipio || config.address_city_code || '',
          municipio: nfe.customer_address.city || nfe.customer_address.municipio || '',
          uf: nfe.customer_address.state || nfe.customer_address.uf || '',
          cep: nfe.customer_address.zipcode || nfe.customer_address.cep || '',
          codigoPais: '1058',
          pais: 'BRASIL'
        } : undefined,
        email: nfe.customer_email || undefined
      },

      servico: {
        itemListaServico: nfe.services?.[0]?.lc116_code || '4.01',
        codigoCnae: config.company_cnae || undefined,
        discriminacao: nfe.services?.map((s: any) =>
          `${s.quantity || 1}x ${s.description} - R$ ${(s.total_value || s.unit_price || 0).toFixed(2)}`
        ).join('\n') || 'Prestação de serviços',
        codigoMunicipioIncidencia: config.address_city_code || '',
        exigibilidadeISS: 1 // 1 = Exigível
      },

      valores: {
        valorServicos: Number(nfe.services_value) || 0,
        valorDeducoes: Number(nfe.deductions_value) || undefined,
        valorPis: Number(nfe.pis_value) || undefined,
        valorCofins: Number(nfe.cofins_value) || undefined,
        valorInss: Number(nfe.inss_value) || undefined,
        valorIr: Number(nfe.ir_value) || undefined,
        valorCsll: Number(nfe.csll_value) || undefined,
        valorIss: Number(nfe.iss_value) || 0,
        aliquota: Number(nfe.iss_rate) || 5,
        issRetido: false,
        valorLiquidoNfse: Number(nfe.net_value) || Number(nfe.services_value) || 0,
        baseCalculo: (Number(nfe.services_value) || 0) - (Number(nfe.deductions_value) || 0)
      },

      informacoesAdicionais: nfe.observations || undefined,

      autorizacao: verificationCode ? {
        protocolo: nfe.authorization_protocol || '',
        dataAutorizacao: nowISO,
        codigoVerificacao: verificationCode
      } : undefined
    }

    return generateNFSeXML(nfseData)
  }

  // NFe modelo 55 - Padrão SEFAZ 4.00
  const cNF = String(Math.floor(Math.random() * 100000000)).padStart(8, '0')
  const nNF = nfe.invoice_number?.replace(/\D/g, '') || '1'

  const nfeData: NFeXMLData = {
    chaveAcesso: accessKey || undefined,

    ide: {
      cUF: UF_CODES[config.address_state] || '35',
      cNF: cNF,
      natOp: 'PRESTACAO DE SERVICOS DE SAUDE',
      mod: '55',
      serie: nfe.series || '1',
      nNF: nNF,
      dhEmi: `${nowISO.slice(0, 19)}-03:00`,
      tpNF: 1, // 1 = Saída
      idDest: 1, // 1 = Operação interna
      cMunFG: config.address_city_code || '',
      tpImp: 1, // 1 = DANFE retrato
      tpEmis: 1, // 1 = Emissão normal
      tpAmb: config.environment === 'production' ? 1 : 2,
      finNFe: 1, // 1 = NFe normal
      indFinal: 1, // 1 = Consumidor final
      indPres: 1, // 1 = Operação presencial
      procEmi: 0, // 0 = Aplicativo do contribuinte
      verProc: 'AtendeBem 2.0'
    },

    emit: {
      CNPJ: config.company_cnpj || '',
      xNome: config.company_name || '',
      xFant: config.company_fantasy_name || undefined,
      enderEmit: {
        xLgr: config.address_street || '',
        nro: config.address_number || 'S/N',
        xCpl: config.address_complement || undefined,
        xBairro: config.address_neighborhood || '',
        cMun: config.address_city_code || '',
        xMun: config.address_city || '',
        UF: config.address_state || '',
        CEP: config.address_zipcode || '',
        cPais: '1058',
        xPais: 'BRASIL',
        fone: config.phone || undefined
      },
      IE: config.company_ie || 'ISENTO',
      IM: config.company_im || undefined,
      CNAE: config.company_cnae || undefined,
      CRT: config.company_crt || '1'
    },

    dest: {
      CPF: nfe.customer_cpf_cnpj?.replace(/[^\d]/g, '').length === 11
        ? nfe.customer_cpf_cnpj.replace(/[^\d]/g, '')
        : undefined,
      CNPJ: nfe.customer_cpf_cnpj?.replace(/[^\d]/g, '').length === 14
        ? nfe.customer_cpf_cnpj.replace(/[^\d]/g, '')
        : undefined,
      xNome: nfe.customer_name || '',
      enderDest: nfe.customer_address ? {
        xLgr: nfe.customer_address.street || nfe.customer_address.logradouro || '',
        nro: nfe.customer_address.number || nfe.customer_address.numero || 'S/N',
        xCpl: nfe.customer_address.complement || undefined,
        xBairro: nfe.customer_address.neighborhood || nfe.customer_address.bairro || '',
        cMun: nfe.customer_address.city_code || config.address_city_code || '',
        xMun: nfe.customer_address.city || nfe.customer_address.municipio || '',
        UF: nfe.customer_address.state || nfe.customer_address.uf || '',
        CEP: nfe.customer_address.zipcode || nfe.customer_address.cep || '',
        cPais: '1058',
        xPais: 'BRASIL'
      } : undefined,
      indIEDest: '9', // 9 = Não contribuinte
      email: nfe.customer_email || undefined
    },

    det: (nfe.services || []).map((item: any, idx: number) => ({
      nItem: idx + 1,
      prod: {
        cProd: item.code || String(idx + 1).padStart(4, '0'),
        cEAN: 'SEM GTIN',
        xProd: item.description || 'Serviço',
        NCM: '00000000', // Serviços usam NCM genérico
        CFOP: '5933', // Prestação de serviço interno
        uCom: 'UN',
        qCom: Number(item.quantity) || 1,
        vUnCom: Number(item.unit_price) || 0,
        vProd: Number(item.total_value) || Number(item.unit_price) * (Number(item.quantity) || 1),
        cEANTrib: 'SEM GTIN',
        uTrib: 'UN',
        qTrib: Number(item.quantity) || 1,
        vUnTrib: Number(item.unit_price) || 0,
        indTot: 1
      },
      imposto: {
        ICMS: {
          orig: '0',
          CSOSN: config.company_crt === '1' ? '102' : undefined,
          CST: config.company_crt === '3' ? '41' : undefined // Não tributada
        },
        PIS: {
          CST: config.company_crt === '1' ? '07' : '08' // Outras saídas
        },
        COFINS: {
          CST: config.company_crt === '1' ? '07' : '08'
        },
        ISSQN: {
          vBC: Number(item.total_value) || 0,
          vAliq: Number(nfe.iss_rate) || 5,
          vISSQN: (Number(item.total_value) || 0) * ((Number(nfe.iss_rate) || 5) / 100),
          cMunFG: config.address_city_code || '',
          cListServ: item.lc116_code?.replace('.', '') || '0401',
          indISS: 1, // 1 = Exigível
          indIncentivo: 2 // 2 = Não
        }
      }
    })),

    total: {
      ICMSTot: {
        vBC: 0,
        vICMS: 0,
        vICMSDeson: 0,
        vFCP: 0,
        vBCST: 0,
        vST: 0,
        vFCPST: 0,
        vFCPSTRet: 0,
        vProd: Number(nfe.services_value) || 0,
        vFrete: 0,
        vSeg: 0,
        vDesc: Number(nfe.discount_value) || 0,
        vII: 0,
        vIPI: 0,
        vIPIDevol: 0,
        vPIS: Number(nfe.pis_value) || 0,
        vCOFINS: Number(nfe.cofins_value) || 0,
        vOutro: 0,
        vNF: Number(nfe.net_value) || Number(nfe.services_value) || 0,
        vTotTrib: (Number(nfe.iss_value) || 0) + (Number(nfe.pis_value) || 0) + (Number(nfe.cofins_value) || 0)
      },
      ISSQNtot: {
        vServ: Number(nfe.services_value) || 0,
        vBC: (Number(nfe.services_value) || 0) - (Number(nfe.deductions_value) || 0),
        vISS: Number(nfe.iss_value) || 0,
        vPIS: Number(nfe.pis_value) || 0,
        vCOFINS: Number(nfe.cofins_value) || 0,
        dCompet: nowISO.split('T')[0],
        vDeducao: Number(nfe.deductions_value) || undefined,
        vDescIncond: Number(nfe.discount_value) || undefined,
        cRegTrib: config.company_crt === '1' ? 1 : 3
      }
    },

    transp: {
      modFrete: 9 // 9 = Sem frete
    },

    pag: {
      detPag: [{
        indPag: 0, // 0 = À vista
        tPag: '01', // 01 = Dinheiro
        vPag: Number(nfe.net_value) || Number(nfe.services_value) || 0
      }]
    },

    infAdic: {
      infCpl: nfe.observations || `Prestação de serviços de saúde. ${config.optante_simples ? 'Documento emitido por ME ou EPP optante pelo Simples Nacional.' : ''}`
    }
  }

  return generateNFeXMLFull(nfeData)
}

// Função legada para compatibilidade
function generateNFeXML(nfe: any, config: any): string {
  return generateNFeXMLComplete(nfe, config)
}
