'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

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

    // Gerar protocolo e chave de acesso simulados
    const protocol = `${config.environment === 'sandbox' ? 'HOM' : 'PRD'}${Date.now()}`

    let accessKey: string | null = null
    let verificationCode: string | null = null

    if (nfe.invoice_type === 'nfe') {
      // Chave de acesso NFe (44 dígitos)
      accessKey = generateAccessKey({
        uf: config.address_state || 'SP',
        cnpj: config.company_cnpj || '',
        mod: '55',
        serie: nfe.series || '1',
        numero: nfe.invoice_number.replace(/\D/g, '').slice(-9),
        tpEmis: '1',
        cNF: Math.random().toString().slice(2, 10)
      })
    } else {
      // Código de verificação NFSe
      verificationCode = Math.random().toString(36).substring(2, 10).toUpperCase()
    }

    // Gerar XML da nota (simplificado)
    const xmlContent = generateNFeXML(nfe, config)

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
        updated_at = NOW()
      WHERE id = ${invoiceId}
    `

    return {
      success: true,
      message: 'Nota fiscal autorizada com sucesso',
      protocol,
      accessKey,
      verificationCode
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

function generateNFeXML(nfe: any, config: any): string {
  // Gerar XML simplificado (em produção usar biblioteca apropriada)
  const now = new Date().toISOString()

  if (nfe.invoice_type === 'nfse') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<CompNfse xmlns="http://www.abrasf.org.br/nfse.xsd">
  <Nfse>
    <InfNfse>
      <Numero>${nfe.invoice_number}</Numero>
      <CodigoVerificacao>${nfe.verification_code || ''}</CodigoVerificacao>
      <DataEmissao>${now}</DataEmissao>
      <IdentificacaoRps>
        <Numero>${nfe.rps_number || ''}</Numero>
        <Serie>${nfe.rps_series || '1'}</Serie>
        <Tipo>1</Tipo>
      </IdentificacaoRps>
      <Competencia>${now.slice(0, 7)}</Competencia>
      <Servico>
        <Valores>
          <ValorServicos>${nfe.services_value}</ValorServicos>
          <ValorIss>${nfe.iss_value}</ValorIss>
          <Aliquota>${nfe.iss_rate}</Aliquota>
          <ValorLiquidoNfse>${nfe.net_value}</ValorLiquidoNfse>
        </Valores>
        <ItemListaServico>${nfe.services?.[0]?.lc116_code || '4.01'}</ItemListaServico>
        <Discriminacao>${nfe.services?.map((s: any) => s.description).join('; ') || ''}</Discriminacao>
      </Servico>
      <PrestadorServico>
        <IdentificacaoPrestador>
          <CpfCnpj>
            <Cnpj>${config.company_cnpj?.replace(/[^\d]/g, '') || ''}</Cnpj>
          </CpfCnpj>
          <InscricaoMunicipal>${config.company_im || ''}</InscricaoMunicipal>
        </IdentificacaoPrestador>
        <RazaoSocial>${config.company_name || ''}</RazaoSocial>
        <NomeFantasia>${config.company_fantasy_name || config.company_name || ''}</NomeFantasia>
        <Endereco>
          <Endereco>${config.address_street || ''}</Endereco>
          <Numero>${config.address_number || ''}</Numero>
          <Bairro>${config.address_neighborhood || ''}</Bairro>
          <CodigoMunicipio>${config.address_city_code || ''}</CodigoMunicipio>
          <Uf>${config.address_state || ''}</Uf>
          <Cep>${config.address_zipcode || ''}</Cep>
        </Endereco>
      </PrestadorServico>
      <TomadorServico>
        <IdentificacaoTomador>
          <CpfCnpj>
            <Cpf>${nfe.customer_cpf_cnpj?.replace(/[^\d]/g, '') || ''}</Cpf>
          </CpfCnpj>
        </IdentificacaoTomador>
        <RazaoSocial>${nfe.customer_name || ''}</RazaoSocial>
      </TomadorServico>
    </InfNfse>
  </Nfse>
</CompNfse>`
  }

  // XML NFe modelo 55 (simplificado)
  return `<?xml version="1.0" encoding="UTF-8"?>
<NFe xmlns="http://www.portalfiscal.inf.br/nfe">
  <infNFe versao="4.00">
    <ide>
      <cUF>${config.address_state || 'SP'}</cUF>
      <natOp>PRESTACAO DE SERVICOS</natOp>
      <mod>55</mod>
      <serie>${nfe.series || '1'}</serie>
      <nNF>${nfe.invoice_number?.replace(/\D/g, '') || ''}</nNF>
      <dhEmi>${now}</dhEmi>
      <tpNF>1</tpNF>
      <tpEmis>1</tpEmis>
    </ide>
    <emit>
      <CNPJ>${config.company_cnpj?.replace(/[^\d]/g, '') || ''}</CNPJ>
      <xNome>${config.company_name || ''}</xNome>
      <xFant>${config.company_fantasy_name || ''}</xFant>
      <enderEmit>
        <xLgr>${config.address_street || ''}</xLgr>
        <nro>${config.address_number || ''}</nro>
        <xBairro>${config.address_neighborhood || ''}</xBairro>
        <cMun>${config.address_city_code || ''}</cMun>
        <xMun>${config.address_city || ''}</xMun>
        <UF>${config.address_state || ''}</UF>
        <CEP>${config.address_zipcode?.replace(/[^\d]/g, '') || ''}</CEP>
      </enderEmit>
      <IE>${config.company_ie || ''}</IE>
      <CRT>${config.company_crt || '1'}</CRT>
    </emit>
    <dest>
      <CPF>${nfe.customer_cpf_cnpj?.replace(/[^\d]/g, '') || ''}</CPF>
      <xNome>${nfe.customer_name || ''}</xNome>
    </dest>
    <total>
      <ICMSTot>
        <vNF>${nfe.services_value || 0}</vNF>
      </ICMSTot>
    </total>
  </infNFe>
</NFe>`
}
