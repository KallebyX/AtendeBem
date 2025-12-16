import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"
import { getDb } from "@/lib/db"
import {
  generatePKCE,
  getAuthorizationUrl,
  userDiscovery,
  getAccessToken,
  signPDF,
  getPublicCertificate,
  type VIDaaSConfig
} from "@/lib/vidaas"

// Configuração do VIDaaS (deve ser movida para variáveis de ambiente)
const vidaasConfig: VIDaaSConfig = {
  clientId: process.env.VIDAAS_CLIENT_ID || "",
  clientSecret: process.env.VIDAAS_CLIENT_SECRET || "",
  redirectUri: process.env.VIDAAS_REDIRECT_URI || ""
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

      // Trocar código por access_token
      const tokenResponse = await getAccessToken(
        vidaasConfig,
        authorizationCode,
        signatureSession.code_verifier
      )

      // Obter certificado público
      const certInfo = await getPublicCertificate(tokenResponse.access_token)

      // Assinar o PDF
      const signedPdf = await signPDF(
        tokenResponse.access_token,
        pdfBase64,
        prescriptionId,
        `receita_${prescriptionId}.pdf`
      )

      // Atualizar receita com dados da assinatura
      await sql`
        UPDATE digital_prescriptions
        SET 
          is_digitally_signed = true,
          signature_certificate_serial = ${certInfo.certificateAlias},
          signature_certificate_issuer = 'VIDaaS - Valid Certificadora',
          signature_timestamp = NOW(),
          signature_hash = ${tokenResponse.access_token.substring(0, 64)},
          digital_signature_data = ${signedPdf.substring(0, 1000)},
          status = 'signed'
        WHERE id = ${prescriptionId} AND user_id = ${session.id}
      `

      // Atualizar sessão de assinatura
      await sql`
        UPDATE signature_sessions
        SET status = 'completed', updated_at = NOW()
        WHERE user_id = ${session.id}
      `

      // Registrar log
      await sql`
        INSERT INTO digital_signature_logs (
          digital_prescription_id, user_id, action, success, certificate_details
        ) VALUES (
          ${prescriptionId},
          ${session.id},
          'sign',
          true,
          ${JSON.stringify({
            certificateAlias: certInfo.certificateAlias,
            provider: 'VIDaaS',
            cpf: tokenResponse.authorized_identification
          })}
        )
      `

      return NextResponse.json({
        success: true,
        signedPdf,
        certificate: {
          alias: certInfo.certificateAlias,
          provider: "VIDaaS - Valid Certificadora"
        },
        message: "Documento assinado digitalmente com sucesso"
      })
    }

    // Ação: assinatura mock (para desenvolvimento/testes)
    if (action === "sign-mock") {
      // Simular assinatura para ambiente de desenvolvimento
      const mockSignature = {
        certificateSerial: `MOCK-${Date.now()}`,
        certificateIssuer: "AtendeBem Development CA",
        signatureHash: require('crypto').randomBytes(32).toString('hex'),
        timestamp: new Date().toISOString()
      }

      await sql`
        UPDATE digital_prescriptions
        SET 
          is_digitally_signed = true,
          signature_certificate_serial = ${mockSignature.certificateSerial},
          signature_certificate_issuer = ${mockSignature.certificateIssuer},
          signature_timestamp = NOW(),
          signature_hash = ${mockSignature.signatureHash},
          status = 'signed'
        WHERE id = ${prescriptionId} AND user_id = ${session.id}
      `

      await sql`
        INSERT INTO digital_signature_logs (
          digital_prescription_id, user_id, action, success, certificate_details
        ) VALUES (
          ${prescriptionId},
          ${session.id},
          'sign-mock',
          true,
          ${JSON.stringify(mockSignature)}
        )
      `

      return NextResponse.json({
        success: true,
        mock: true,
        signature: mockSignature,
        message: "Assinatura mock realizada (ambiente de desenvolvimento)"
      })
    }

    return NextResponse.json({ error: "Ação não especificada" }, { status: 400 })
  } catch (error: any) {
    console.error("[API] Signature error:", error)
    return NextResponse.json({ error: error.message || "Erro interno" }, { status: 500 })
  }
}
