import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"
import { getDb } from "@/lib/db"
import { createHash } from "crypto"
import {
  generatePKCE,
  getAuthorizationUrl,
  userDiscovery,
  getAccessToken,
  signPDF,
  getPublicCertificate,
  revokeToken,
  type VIDaaSConfig
} from "@/lib/vidaas"

// Configuração do VIDaaS
const vidaasConfig: VIDaaSConfig = {
  clientId: process.env.VIDAAS_CLIENT_ID || "",
  clientSecret: process.env.VIDAAS_CLIENT_SECRET || "",
  redirectUri: process.env.VIDAAS_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/signature/callback`
}

/**
 * Valida se o certificado é ICP-Brasil válido
 * Verifica o emissor do certificado contra lista de ACs credenciadas
 */
function validateICPBrasilCertificate(certificateInfo: any): { valid: boolean; message: string } {
  // Lista de Autoridades Certificadoras ICP-Brasil conhecidas
  const validIssuers = [
    'AC SERASA',
    'AC CERTISIGN',
    'AC VALID',
    'AC SOLUTI',
    'AC SAFEWEB',
    'AC DIGITALSIGN',
    'AC BR RFB',
    'AC CAIXA',
    'AC SERPRO',
    'AC IMPRENSA OFICIAL',
    'VIDAAS',
    'VALID CERTIFICADORA'
  ]

  if (!certificateInfo) {
    return { valid: false, message: 'Informações do certificado não disponíveis' }
  }

  // Para ambiente de homologação VIDaaS, aceitar certificados de teste
  if (process.env.VIDAAS_PRODUCTION !== 'true') {
    return { valid: true, message: 'Certificado válido (ambiente de homologação)' }
  }

  // Verificar se o emissor é uma AC válida
  const issuer = (certificateInfo.issuer || certificateInfo.certificateAlias || '').toUpperCase()
  const isValidIssuer = validIssuers.some(ac => issuer.includes(ac))

  if (!isValidIssuer) {
    return {
      valid: false,
      message: `Certificado não emitido por Autoridade Certificadora ICP-Brasil credenciada. Emissor: ${issuer}`
    }
  }

  return { valid: true, message: 'Certificado ICP-Brasil válido' }
}

/**
 * GET /api/signature
 * Inicia o fluxo de assinatura digital
 */
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const session = await verifySession(token)
    if (!session) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")
    const prescriptionId = searchParams.get("prescriptionId")

    // Verificar se VIDaaS está configurado
    if (!vidaasConfig.clientId || !vidaasConfig.clientSecret) {
      return NextResponse.json({
        error: "Assinatura digital não configurada",
        message: "Configure as variáveis VIDAAS_CLIENT_ID e VIDAAS_CLIENT_SECRET",
        mockMode: true
      }, { status: 503 })
    }

    // Ação: verificar se usuário possui certificado
    if (action === "check-certificate") {
      const sql = await getDb()
      const [user] = await sql`
        SELECT cpf FROM users WHERE id = ${session.id}
      `

      if (!user?.cpf) {
        return NextResponse.json({
          hasCertificate: false,
          message: "CPF não cadastrado no perfil"
        })
      }

      try {
        const discovery = await userDiscovery(vidaasConfig, user.cpf)
        return NextResponse.json({
          hasCertificate: discovery.status === "S",
          certificates: discovery.slots || [],
          message: discovery.status === "S" 
            ? "Certificado digital encontrado" 
            : "Nenhum certificado digital encontrado para este CPF"
        })
      } catch (error) {
        return NextResponse.json({
          hasCertificate: false,
          message: "Erro ao verificar certificado digital"
        })
      }
    }

    // Ação: iniciar autorização
    if (action === "authorize") {
      const { codeVerifier, codeChallenge } = generatePKCE()

      // Salvar code_verifier na sessão para uso posterior
      const sql = await getDb()
      await sql`
        INSERT INTO signature_sessions (user_id, code_verifier, prescription_id, status)
        VALUES (${session.id}, ${codeVerifier}, ${prescriptionId}, 'pending')
        ON CONFLICT (user_id) DO UPDATE SET 
          code_verifier = ${codeVerifier},
          prescription_id = ${prescriptionId},
          status = 'pending',
          updated_at = NOW()
      `

      const authUrl = getAuthorizationUrl(vidaasConfig, codeChallenge, {
        scope: "single_signature",
        lifetime: 300, // 5 minutos
        state: prescriptionId || undefined
      })

      return NextResponse.json({
        authorizationUrl: authUrl,
        message: "Escaneie o QR Code com o app VIDaaS para autorizar a assinatura"
      })
    }

    return NextResponse.json({ error: "Ação não especificada" }, { status: 400 })
  } catch (error: any) {
    console.error("[API] Signature error:", error)
    return NextResponse.json({ error: error.message || "Erro interno" }, { status: 500 })
  }
}

/**
 * POST /api/signature
 * Processa callback de autorização e realiza assinatura
 */
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const session = await verifySession(token)
    if (!session) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    const data = await request.json()
    const { action, authorizationCode, prescriptionId, pdfBase64 } = data

    const sql = await getDb()

    // Ação: trocar código por token e assinar
    if (action === "sign") {
      // Recuperar code_verifier da sessão
      const [signatureSession] = await sql`
        SELECT code_verifier, prescription_id FROM signature_sessions
        WHERE user_id = ${session.id} AND status = 'pending'
      `

      if (!signatureSession) {
        return NextResponse.json({
          error: "Sessão de assinatura não encontrada ou expirada"
        }, { status: 400 })
      }

      let tokenResponse
      let certInfo
      let signedPdf

      try {
        // Trocar código por access_token
        tokenResponse = await getAccessToken(
          vidaasConfig,
          authorizationCode,
          signatureSession.code_verifier
        )

        // Obter certificado público
        certInfo = await getPublicCertificate(tokenResponse.access_token)

        // Validar certificado ICP-Brasil
        const certValidation = validateICPBrasilCertificate({
          issuer: certInfo.certificateAlias,
          certificateAlias: certInfo.certificateAlias
        })

        if (!certValidation.valid) {
          // Revogar token em caso de certificado inválido
          await revokeToken(vidaasConfig, tokenResponse.access_token)

          await sql`
            UPDATE signature_sessions
            SET status = 'failed', updated_at = NOW()
            WHERE user_id = ${session.id}
          `

          // Registrar log de falha
          await sql`
            INSERT INTO digital_signature_logs (
              digital_prescription_id, user_id, action, success, error_message, certificate_details
            ) VALUES (
              ${prescriptionId},
              ${session.id},
              'sign',
              false,
              ${certValidation.message},
              ${JSON.stringify({ certificateAlias: certInfo.certificateAlias })}
            )
          `

          return NextResponse.json({
            error: certValidation.message,
            code: 'INVALID_CERTIFICATE'
          }, { status: 400 })
        }

        // Assinar o PDF
        signedPdf = await signPDF(
          tokenResponse.access_token,
          pdfBase64,
          prescriptionId,
          `receita_${prescriptionId}.pdf`
        )

      } catch (signError: any) {
        // Registrar log de erro
        await sql`
          INSERT INTO digital_signature_logs (
            digital_prescription_id, user_id, action, success, error_message
          ) VALUES (
            ${prescriptionId},
            ${session.id},
            'sign',
            false,
            ${signError.message || 'Erro durante assinatura'}
          )
        `

        await sql`
          UPDATE signature_sessions
          SET status = 'failed', updated_at = NOW()
          WHERE user_id = ${session.id}
        `

        throw signError
      }

      // Gerar hash SHA-256 do PDF assinado
      const pdfHash = createHash('sha256')
        .update(Buffer.from(signedPdf, 'base64'))
        .digest('hex')

      // Gerar hash da assinatura
      const signatureHash = createHash('sha256')
        .update(signedPdf)
        .digest('hex')

      // Buscar dados da receita para gerar URL de validação
      const [prescription] = await sql`
        SELECT validation_token FROM digital_prescriptions
        WHERE id = ${prescriptionId}
      `

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.atendebem.io'
      const qrCodeUrl = `${baseUrl}/validar/${prescription?.validation_token || ''}`

      // Atualizar receita com dados da assinatura
      await sql`
        UPDATE digital_prescriptions
        SET
          is_digitally_signed = true,
          signature_certificate_serial = ${certInfo.certificateAlias},
          signature_certificate_issuer = ${'VIDaaS - Valid Certificadora'},
          signature_timestamp = NOW(),
          signature_hash = ${signatureHash},
          digital_signature_data = ${signedPdf.substring(0, 2000)},
          pdf_hash = ${pdfHash},
          qr_code_data = ${qrCodeUrl},
          status = 'signed',
          metadata = ${JSON.stringify({
            icpBrasil: true,
            signatureFormat: 'PAdES_AD_RB',
            authorizedCPF: tokenResponse.authorized_identification,
            signedAt: new Date().toISOString()
          })}
        WHERE id = ${prescriptionId} AND user_id = ${session.id}
      `

      // Atualizar sessão de assinatura
      await sql`
        UPDATE signature_sessions
        SET status = 'completed', updated_at = NOW()
        WHERE user_id = ${session.id}
      `

      // Registrar log de sucesso
      await sql`
        INSERT INTO digital_signature_logs (
          digital_prescription_id, user_id, action, success, certificate_details, metadata
        ) VALUES (
          ${prescriptionId},
          ${session.id},
          'sign',
          true,
          ${JSON.stringify({
            certificateAlias: certInfo.certificateAlias,
            provider: 'VIDaaS - Valid Certificadora',
            cpf: tokenResponse.authorized_identification,
            icpBrasil: true
          })},
          ${JSON.stringify({
            signatureHash,
            pdfHash,
            signatureFormat: 'PAdES_AD_RB',
            timestamp: new Date().toISOString()
          })}
        )
      `

      // Revogar token após uso (boa prática de segurança)
      try {
        await revokeToken(vidaasConfig, tokenResponse.access_token)
      } catch (revokeError) {
        console.warn('[API] Failed to revoke token:', revokeError)
      }

      return NextResponse.json({
        success: true,
        signedPdf,
        signatureHash,
        pdfHash,
        certificate: {
          alias: certInfo.certificateAlias,
          provider: "VIDaaS - Valid Certificadora",
          cpf: tokenResponse.authorized_identification
        },
        validation: {
          qrCodeUrl,
          token: prescription?.validation_token
        },
        message: "Documento assinado digitalmente com certificado ICP-Brasil"
      })
    }

    // Ação: assinatura mock (para desenvolvimento/testes)
    if (action === "sign-mock") {
      // Simular assinatura para ambiente de desenvolvimento
      const mockSignatureHash = createHash('sha256')
        .update(`mock-signature-${prescriptionId}-${Date.now()}`)
        .digest('hex')

      const mockPdfHash = createHash('sha256')
        .update(`mock-pdf-${prescriptionId}-${Date.now()}`)
        .digest('hex')

      const mockSignature = {
        certificateSerial: `DEV-${Date.now().toString(36).toUpperCase()}`,
        certificateIssuer: "AtendeBem Development CA (Não válido para produção)",
        signatureHash: mockSignatureHash,
        pdfHash: mockPdfHash,
        timestamp: new Date().toISOString(),
        mock: true
      }

      // Buscar dados da receita para gerar URL de validação
      const [prescription] = await sql`
        SELECT validation_token FROM digital_prescriptions
        WHERE id = ${prescriptionId}
      `

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.atendebem.io'
      const qrCodeUrl = `${baseUrl}/validar/${prescription?.validation_token || ''}`

      await sql`
        UPDATE digital_prescriptions
        SET
          is_digitally_signed = true,
          signature_certificate_serial = ${mockSignature.certificateSerial},
          signature_certificate_issuer = ${mockSignature.certificateIssuer},
          signature_timestamp = NOW(),
          signature_hash = ${mockSignature.signatureHash},
          pdf_hash = ${mockSignature.pdfHash},
          qr_code_data = ${qrCodeUrl},
          status = 'signed',
          metadata = ${JSON.stringify({
            mock: true,
            environment: 'development',
            signedAt: mockSignature.timestamp,
            warning: 'Esta assinatura é apenas para testes e não tem validade jurídica'
          })}
        WHERE id = ${prescriptionId} AND user_id = ${session.id}
      `

      await sql`
        INSERT INTO digital_signature_logs (
          digital_prescription_id, user_id, action, success, certificate_details, metadata
        ) VALUES (
          ${prescriptionId},
          ${session.id},
          'sign-mock',
          true,
          ${JSON.stringify({
            ...mockSignature,
            warning: 'Assinatura de desenvolvimento - não válida juridicamente'
          })},
          ${JSON.stringify({
            environment: 'development',
            mockMode: true,
            timestamp: mockSignature.timestamp
          })}
        )
      `

      return NextResponse.json({
        success: true,
        mock: true,
        signature: mockSignature,
        validation: {
          qrCodeUrl,
          token: prescription?.validation_token
        },
        message: "Assinatura mock realizada (ambiente de desenvolvimento). Configure VIDAAS_CLIENT_ID e VIDAAS_CLIENT_SECRET para assinaturas ICP-Brasil válidas."
      })
    }

    return NextResponse.json({ error: "Ação não especificada" }, { status: 400 })
  } catch (error: any) {
    console.error("[API] Signature error:", error)
    return NextResponse.json({ error: error.message || "Erro interno" }, { status: 500 })
  }
}
