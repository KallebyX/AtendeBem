/**
 * AWS S3 Client para armazenamento de arquivos
 * Upload de exames, documentos, PDFs assinados, backups
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// Validar configuração
const isConfigured =
  process.env.AWS_REGION &&
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.S3_BUCKET

if (!isConfigured) {
  console.warn("⚠️  AWS S3 não configurado. Upload de arquivos desabilitado.")
}

const s3Client = isConfigured
  ? new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })
  : null

const BUCKET = process.env.S3_BUCKET || "atendebem-dev"

export interface UploadFileOptions {
  file: Buffer
  key: string // caminho no S3: "exams/patient-123/xray-2025.pdf"
  contentType: string
  metadata?: Record<string, string>
  encrypt?: boolean
}

/**
 * Upload de arquivo para S3 com criptografia
 */
export async function uploadFile(options: UploadFileOptions): Promise<string> {
  if (!s3Client) {
    throw new Error("AWS S3 não configurado")
  }

  const { file, key, contentType, metadata, encrypt = true } = options

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: metadata,
    ServerSideEncryption: encrypt ? "AES256" : undefined,
    ACL: "private", // Nunca público
  })

  await s3Client.send(command)

  // Retorna URL CDN se configurado, senão URL S3 padrão
  const cdnUrl = process.env.S3_CDN_URL
  return cdnUrl ? `${cdnUrl}/${key}` : `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

/**
 * Download de arquivo (retorna Buffer)
 */
export async function downloadFile(key: string): Promise<Buffer> {
  if (!s3Client) {
    throw new Error("AWS S3 não configurado")
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  })

  const response = await s3Client.send(command)

  if (!response.Body) {
    throw new Error("Arquivo não encontrado")
  }

  // Converter stream para buffer
  const chunks: Uint8Array[] = []
  for await (const chunk of response.Body as any) {
    chunks.push(chunk)
  }

  return Buffer.concat(chunks)
}

/**
 * Gerar URL assinada temporária (para visualização segura)
 */
export async function getSignedDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
  if (!s3Client) {
    throw new Error("AWS S3 não configurado")
  }

  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  })

  return await getSignedUrl(s3Client, command, { expiresIn })
}

/**
 * Verificar se arquivo existe
 */
export async function fileExists(key: string): Promise<boolean> {
  if (!s3Client) return false

  try {
    const command = new HeadObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
    await s3Client.send(command)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Deletar arquivo
 */
export async function deleteFile(key: string): Promise<void> {
  if (!s3Client) {
    throw new Error("AWS S3 não configurado")
  }

  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  })

  await s3Client.send(command)
}

/**
 * Helpers para organizar arquivos por tipo
 */
export const s3Paths = {
  exam: (patientId: string, filename: string) => `exams/${patientId}/${filename}`,
  prescription: (userId: string, filename: string) => `prescriptions/${userId}/${filename}`,
  receipt: (userId: string, filename: string) => `receipts/${userId}/${filename}`,
  avatar: (userId: string, filename: string) => `avatars/${userId}/${filename}`,
  document: (type: string, id: string, filename: string) => `documents/${type}/${id}/${filename}`,
  backup: (filename: string) => `backups/${filename}`,
  telemedicine: (sessionId: string, filename: string) => `telemedicine/${sessionId}/${filename}`,
}
