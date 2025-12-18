/**
 * Gerador de PDF Avançado com QRCode e Numeração Sequencial
 * Suporta: Recibos, Receitas, Atestados, Relatórios
 */

import QRCode from "qrcode"

export interface DocumentSequence {
  type: "receipt" | "prescription" | "certificate" | "report"
  year: number
  month: number
  sequence: number
}

/**
 * Gerar número sequencial para documentos
 * Formato: TIPO-YYYY-MM-NNNNNN
 * Exemplo: REC-2025-12-000001
 */
export async function generateDocumentNumber(
  userId: string,
  type: "receipt" | "prescription" | "certificate" | "report"
): Promise<string> {
  const { getDb } = await import("./db")
  const sql = await getDb()

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1

  // Buscar último número da sequência
  const result = await sql`
    SELECT COALESCE(MAX(CAST(sequence_number AS INTEGER)), 0) as last_sequence
    FROM document_sequences
    WHERE user_id = ${userId}
      AND document_type = ${type}
      AND year = ${year}
      AND month = ${month}
  `

  const nextSequence = (result[0]?.last_sequence || 0) + 1

  // Inserir novo número
  await sql`
    INSERT INTO document_sequences (user_id, document_type, year, month, sequence_number)
    VALUES (${userId}, ${type}, ${year}, ${month}, ${nextSequence})
  `

  // Formato: REC-2025-12-000001
  const prefix = {
    receipt: "REC",
    prescription: "PRE",
    certificate: "CER",
    report: "REL",
  }[type]

  return `${prefix}-${year}-${String(month).padStart(2, "0")}-${String(nextSequence).padStart(6, "0")}`
}

/**
 * Gerar QR Code com URL de validação
 */
export async function generateQRCode(data: string): Promise<string> {
  return await QRCode.toDataURL(data, {
    errorCorrectionLevel: "H",
    type: "image/png",
    width: 200,
    margin: 1,
  })
}

/**
 * Interface para Recibo
 */
export interface ReceiptData {
  // Numeração
  documentNumber: string
  issueDate: string

  // Prestador
  providerName: string
  providerCRM: string
  providerCRMUF: string
  providerCPF: string
  providerCNPJ?: string
  providerAddress?: string
  providerPhone?: string

  // Pagador
  payerName: string
  payerCPF?: string

  // Valores
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  subtotal: number
  discount?: number
  total: number

  // Pagamento
  paymentMethod: "dinheiro" | "pix" | "cartao_credito" | "cartao_debito" | "transferencia" | "outros"
  paymentDetails?: string

  // Observações
  notes?: string

  // Validação
  validationUrl: string
  qrCodeDataUrl: string

  // Assinatura
  isDigitallySigned: boolean
  signatureTimestamp?: string
  signatureHash?: string
}

/**
 * Gerar HTML de recibo profissional
 */
export function generateReceiptHTML(data: ReceiptData): string {
  const extenso = numeroExtenso(data.total)

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recibo ${data.documentNumber}</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            border-bottom: 2px solid #0066cc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #0066cc;
            font-size: 24pt;
            margin: 0;
        }
        
        .document-number {
            font-size: 14pt;
            font-weight: bold;
            color: #666;
            margin-top: 10px;
        }
        
        .provider-info {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        
        .provider-info h3 {
            margin-top: 0;
            color: #0066cc;
        }
        
        .section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-weight: bold;
            font-size: 14pt;
            color: #0066cc;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        table th {
            background-color: #0066cc;
            color: white;
            padding: 10px;
            text-align: left;
        }
        
        table td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
        
        table tr:last-child td {
            border-bottom: none;
        }
        
        .totals {
            text-align: right;
            font-size: 14pt;
        }
        
        .totals .total-row {
            font-weight: bold;
            font-size: 16pt;
            color: #0066cc;
            border-top: 2px solid #0066cc;
            padding-top: 10px;
            margin-top: 10px;
        }
        
        .value-in-full {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #0066cc;
            margin: 20px 0;
            font-style: italic;
        }
        
        .qr-code-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
        
        .qr-code {
            text-align: center;
        }
        
        .qr-code img {
            width: 150px;
            height: 150px;
        }
        
        .signature-section {
            margin-top: 40px;
            padding-top: 20px;
            text-align: center;
        }
        
        .signature-line {
            border-top: 1px solid #333;
            width: 300px;
            margin: 40px auto 10px;
        }
        
        .digital-signature {
            background-color: #e8f5e9;
            border: 2px solid #4caf50;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
        
        .digital-signature h4 {
            margin: 0 0 10px 0;
            color: #2e7d32;
        }
        
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 10pt;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }
        
        @media print {
            body {
                padding: 0;
            }
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>RECIBO</h1>
        <div class="document-number">Nº ${data.documentNumber}</div>
        <div>Emitido em: ${new Date(data.issueDate).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}</div>
    </div>
    
    <div class="provider-info">
        <h3>${data.providerName}</h3>
        <p>
            CRM: ${data.providerCRM}/${data.providerCRMUF}<br>
            CPF/CNPJ: ${data.providerCPF}${data.providerCNPJ ? ` / ${data.providerCNPJ}` : ""}<br>
            ${data.providerAddress ? `Endereço: ${data.providerAddress}<br>` : ""}
            ${data.providerPhone ? `Telefone: ${data.providerPhone}` : ""}
        </p>
    </div>
    
    <div class="section">
        <div class="section-title">Dados do Pagador</div>
        <p>
            <strong>Nome:</strong> ${data.payerName}<br>
            ${data.payerCPF ? `<strong>CPF:</strong> ${data.payerCPF}` : ""}
        </p>
    </div>
    
    <div class="section">
        <div class="section-title">Discriminação dos Serviços</div>
        <table>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th style="text-align: center; width: 80px;">Qtd</th>
                    <th style="text-align: right; width: 120px;">Valor Unit.</th>
                    <th style="text-align: right; width: 120px;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${data.items
                  .map(
                    (item) => `
                <tr>
                    <td>${item.description}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right;">R$ ${item.unitPrice.toFixed(2)}</td>
                    <td style="text-align: right;">R$ ${item.total.toFixed(2)}</td>
                </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    </div>
    
    <div class="totals">
        ${data.subtotal !== data.total ? `<div>Subtotal: R$ ${data.subtotal.toFixed(2)}</div>` : ""}
        ${data.discount ? `<div>Desconto: R$ ${data.discount.toFixed(2)}</div>` : ""}
        <div class="total-row">
            Total: R$ ${data.total.toFixed(2)}
        </div>
    </div>
    
    <div class="value-in-full">
        Valor por extenso: <strong>${extenso}</strong>
    </div>
    
    <div class="section">
        <div class="section-title">Forma de Pagamento</div>
        <p>
            ${
              {
                dinheiro: "💵 Dinheiro",
                pix: "📱 PIX",
                cartao_credito: "💳 Cartão de Crédito",
                cartao_debito: "💳 Cartão de Débito",
                transferencia: "🏦 Transferência Bancária",
                outros: "Outros",
              }[data.paymentMethod]
            }
            ${data.paymentDetails ? `- ${data.paymentDetails}` : ""}
        </p>
    </div>
    
    ${data.notes ? `<div class="section"><div class="section-title">Observações</div><p>${data.notes}</p></div>` : ""}
    
    <div class="qr-code-section">
        <div style="flex: 1;">
            <p style="font-size: 10pt; color: #666;">
                <strong>Validação:</strong> Este recibo pode ser validado em:<br>
                <a href="${data.validationUrl}">${data.validationUrl}</a>
            </p>
        </div>
        <div class="qr-code">
            <img src="${data.qrCodeDataUrl}" alt="QR Code de validação">
            <p style="font-size: 9pt; color: #666;">Escaneie para validar</p>
        </div>
    </div>
    
    ${
      data.isDigitallySigned
        ? `
    <div class="digital-signature">
        <h4>✓ Documento Assinado Digitalmente</h4>
        <p style="margin: 0; font-size: 10pt;">
            Assinado em: ${data.signatureTimestamp ? new Date(data.signatureTimestamp).toLocaleString("pt-BR") : "N/A"}<br>
            Hash: ${data.signatureHash ? data.signatureHash.substring(0, 40) + "..." : "N/A"}
        </p>
    </div>
    `
        : `
    <div class="signature-section">
        <div class="signature-line"></div>
        <div>${data.providerName}</div>
        <div>${data.providerCRM}/${data.providerCRMUF}</div>
    </div>
    `
    }
    
    <div class="footer">
        <p>Recibo gerado pelo sistema AtendeBem em ${new Date().toLocaleString("pt-BR")}</p>
        <p style="font-size: 9pt;">
            Este documento tem validade jurídica conforme Lei 10.406/2002 (Código Civil), Art. 319-320
        </p>
    </div>
</body>
</html>
  `
}

/**
 * Converter número para extenso (simplificado)
 */
function numeroExtenso(valor: number): string {
  const reais = Math.floor(valor)
  const centavos = Math.round((valor - reais) * 100)

  // Simplificado - em produção usar biblioteca como 'numero-por-extenso'
  const reaisExtenso = reais.toString()
  const centavosExtenso = centavos.toString()

  let texto = ""

  if (reais === 0) {
    texto = "zero reais"
  } else if (reais === 1) {
    texto = "um real"
  } else {
    texto = `${reaisExtenso} reais` // TODO: implementar conversão completa
  }

  if (centavos > 0) {
    if (centavos === 1) {
      texto += " e um centavo"
    } else {
      texto += ` e ${centavosExtenso} centavos`
    }
  }

  return texto
}

/**
 * Migração SQL para tabela de sequências
 */
export const documentSequencesMigration = `
CREATE TABLE IF NOT EXISTS document_sequences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    document_type VARCHAR(20) NOT NULL CHECK (document_type IN ('receipt', 'prescription', 'certificate', 'report')),
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    sequence_number INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, document_type, year, month, sequence_number)
);

CREATE INDEX idx_document_sequences_user_type ON document_sequences(user_id, document_type, year, month);
`
