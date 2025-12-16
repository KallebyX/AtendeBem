/**
 * Biblioteca para geração de PDFs profissionais
 * Usa jsPDF para geração client-side
 */

export interface PrescriptionPDFData {
  // Dados do médico
  doctorName: string
  doctorCRM: string
  doctorCRMUF: string
  doctorSpecialty: string
  clinicName?: string
  clinicAddress?: string
  clinicPhone?: string
  clinicEmail?: string

  // Dados do paciente
  patientName: string
  patientCPF?: string
  patientDateOfBirth?: string
  patientAge?: number

  // Dados da receita
  prescriptionId: string
  prescriptionDate: string
  validUntil: string
  validationToken?: string

  // Diagnóstico
  cid10Code?: string
  cid10Description?: string
  clinicalIndication?: string

  // Medicamentos
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    duration: string
    quantity: number
    instructions?: string
  }>

  // Assinatura
  isDigitallySigned: boolean
  signatureTimestamp?: string
  certificateIssuer?: string
  signatureHash?: string

  // Notas
  notes?: string
}

export interface AppointmentPDFData {
  // Dados do médico
  doctorName: string
  doctorCRM: string
  doctorCRMUF: string
  doctorSpecialty: string

  // Dados do paciente
  patientName: string
  patientCPF?: string
  patientAge?: number
  patientGender?: string

  // Dados do atendimento
  appointmentId: string
  appointmentDate: string
  appointmentType: string

  // Procedimentos
  procedures: Array<{
    code: string
    name: string
    laterality?: string
    location?: string
  }>

  // Diagnóstico e tratamento
  mainComplaint?: string
  clinicalHistory?: string
  physicalExam?: string
  diagnosis?: string
  treatmentPlan?: string
  observations?: string
}

/**
 * Gera HTML para receita médica digital
 */
export function generatePrescriptionHTML(data: PrescriptionPDFData): string {
  const qrCodeUrl = data.validationToken 
    ? `https://atendebem.com.br/validar/${data.validationToken}`
    : null

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receita Digital - ${data.prescriptionId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #1a1a1a;
      padding: 20mm;
      max-width: 210mm;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #2dd4bf;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .logo-section h1 {
      color: #0f172a;
      font-size: 24pt;
      font-weight: 700;
    }
    .logo-section h1 span { color: #2dd4bf; }
    .logo-section p {
      color: #64748b;
      font-size: 10pt;
    }
    .doctor-info {
      text-align: right;
    }
    .doctor-info h2 {
      color: #0f172a;
      font-size: 14pt;
      font-weight: 600;
    }
    .doctor-info p {
      color: #64748b;
      font-size: 10pt;
    }
    .patient-section {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .patient-section h3 {
      color: #0f172a;
      font-size: 12pt;
      margin-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
    }
    .patient-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .patient-grid p {
      font-size: 11pt;
    }
    .patient-grid strong {
      color: #64748b;
      font-weight: 500;
    }
    .prescription-title {
      text-align: center;
      margin: 25px 0;
    }
    .prescription-title h2 {
      color: #0f172a;
      font-size: 16pt;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .diagnosis-section {
      background: #fef3c7;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #f59e0b;
    }
    .diagnosis-section h4 {
      color: #92400e;
      font-size: 11pt;
      margin-bottom: 5px;
    }
    .medications-section {
      margin-bottom: 25px;
    }
    .medications-section h3 {
      color: #0f172a;
      font-size: 13pt;
      margin-bottom: 15px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
    }
    .medication-item {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
    }
    .medication-item h4 {
      color: #0f172a;
      font-size: 12pt;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .medication-details {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      font-size: 10pt;
    }
    .medication-details span {
      background: #f1f5f9;
      padding: 5px 10px;
      border-radius: 4px;
    }
    .medication-instructions {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed #e2e8f0;
      font-size: 10pt;
      color: #64748b;
    }
    .notes-section {
      background: #f0fdf4;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #22c55e;
    }
    .signature-section {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .signature-info {
      flex: 1;
    }
    .signature-info h4 {
      color: #0f172a;
      font-size: 12pt;
      margin-bottom: 5px;
    }
    .signature-info p {
      font-size: 10pt;
      color: #64748b;
    }
    .signature-badge {
      background: ${data.isDigitallySigned ? '#dcfce7' : '#fef3c7'};
      color: ${data.isDigitallySigned ? '#166534' : '#92400e'};
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 10pt;
      font-weight: 600;
    }
    .qr-section {
      text-align: center;
      margin-top: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
    }
    .qr-section p {
      font-size: 9pt;
      color: #64748b;
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 9pt;
      color: #94a3b8;
    }
    .validity {
      background: #dbeafe;
      color: #1e40af;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 10pt;
      font-weight: 500;
      display: inline-block;
      margin-top: 10px;
    }
    @media print {
      body { padding: 10mm; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-section">
      <h1>Atende<span>Bem</span></h1>
      <p>Menos burocracia. Mais medicina.</p>
      ${data.clinicName ? `<p style="margin-top: 5px;">${data.clinicName}</p>` : ''}
      ${data.clinicAddress ? `<p>${data.clinicAddress}</p>` : ''}
    </div>
    <div class="doctor-info">
      <h2>Dr(a). ${data.doctorName}</h2>
      <p>CRM ${data.doctorCRM}/${data.doctorCRMUF}</p>
      <p>${data.doctorSpecialty}</p>
      ${data.clinicPhone ? `<p>Tel: ${data.clinicPhone}</p>` : ''}
    </div>
  </div>

  <div class="patient-section">
    <h3>Dados do Paciente</h3>
    <div class="patient-grid">
      <p><strong>Nome:</strong> ${data.patientName}</p>
      <p><strong>CPF:</strong> ${data.patientCPF || 'Não informado'}</p>
      <p><strong>Data de Nascimento:</strong> ${data.patientDateOfBirth || 'Não informada'}</p>
      <p><strong>Idade:</strong> ${data.patientAge ? data.patientAge + ' anos' : 'Não informada'}</p>
    </div>
  </div>

  <div class="prescription-title">
    <h2>Receita Médica Digital</h2>
    <span class="validity">Válida até: ${data.validUntil}</span>
  </div>

  ${data.cid10Code ? `
  <div class="diagnosis-section">
    <h4>Diagnóstico (CID-10)</h4>
    <p><strong>${data.cid10Code}</strong> - ${data.cid10Description || ''}</p>
    ${data.clinicalIndication ? `<p style="margin-top: 5px;"><em>Indicação clínica: ${data.clinicalIndication}</em></p>` : ''}
  </div>
  ` : ''}

  <div class="medications-section">
    <h3>Medicamentos Prescritos</h3>
    ${data.medications.map((med, index) => `
    <div class="medication-item">
      <h4>${index + 1}. ${med.name}</h4>
      <div class="medication-details">
        <span><strong>Dose:</strong> ${med.dosage}</span>
        <span><strong>Frequência:</strong> ${med.frequency}</span>
        <span><strong>Duração:</strong> ${med.duration}</span>
        <span><strong>Quantidade:</strong> ${med.quantity}</span>
      </div>
      ${med.instructions ? `
      <div class="medication-instructions">
        <strong>Instruções:</strong> ${med.instructions}
      </div>
      ` : ''}
    </div>
    `).join('')}
  </div>

  ${data.notes ? `
  <div class="notes-section">
    <h4>Observações</h4>
    <p>${data.notes}</p>
  </div>
  ` : ''}

  <div class="signature-section">
    <div class="signature-info">
      <h4>Dr(a). ${data.doctorName}</h4>
      <p>CRM ${data.doctorCRM}/${data.doctorCRMUF}</p>
      <p>${data.doctorSpecialty}</p>
      ${data.isDigitallySigned ? `
      <p style="margin-top: 10px; font-size: 9pt;">
        Assinado digitalmente em: ${data.signatureTimestamp}<br>
        Certificadora: ${data.certificateIssuer}<br>
        Hash: ${data.signatureHash?.substring(0, 32)}...
      </p>
      ` : ''}
    </div>
    <div class="signature-badge">
      ${data.isDigitallySigned ? '✓ ASSINADO DIGITALMENTE' : '⚠ PENDENTE ASSINATURA'}
    </div>
  </div>

  ${qrCodeUrl ? `
  <div class="qr-section">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrCodeUrl)}" alt="QR Code de Validação" />
    <p>Escaneie para validar esta receita<br>${qrCodeUrl}</p>
  </div>
  ` : ''}

  <div class="footer">
    <p>Documento gerado pelo sistema AtendeBem em ${data.prescriptionDate}</p>
    <p>ID da Receita: ${data.prescriptionId}</p>
    <p>Este documento possui validade legal quando assinado digitalmente com certificado ICP-Brasil</p>
  </div>
</body>
</html>
`
}

/**
 * Gera HTML para relatório de atendimento
 */
export function generateAppointmentHTML(data: AppointmentPDFData): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atendimento - ${data.appointmentId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
      padding: 15mm;
      max-width: 210mm;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #2dd4bf;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .logo h1 { color: #0f172a; font-size: 20pt; }
    .logo h1 span { color: #2dd4bf; }
    .doctor-info { text-align: right; font-size: 10pt; }
    .section {
      margin-bottom: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
    }
    .section h3 {
      color: #0f172a;
      font-size: 12pt;
      margin-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .procedure-item {
      background: #fff;
      border: 1px solid #e2e8f0;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .procedure-code {
      background: #dbeafe;
      color: #1e40af;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 9pt;
      font-weight: 600;
    }
    .text-content {
      background: #fff;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      white-space: pre-wrap;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 9pt;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      padding-top: 15px;
    }
    @media print {
      body { padding: 10mm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <h1>Atende<span>Bem</span></h1>
      <p style="color: #64748b; font-size: 10pt;">Relatório de Atendimento</p>
    </div>
    <div class="doctor-info">
      <strong>Dr(a). ${data.doctorName}</strong><br>
      CRM ${data.doctorCRM}/${data.doctorCRMUF}<br>
      ${data.doctorSpecialty}
    </div>
  </div>

  <div class="section">
    <h3>Dados do Paciente</h3>
    <div class="grid-2">
      <p><strong>Nome:</strong> ${data.patientName}</p>
      <p><strong>CPF:</strong> ${data.patientCPF || '-'}</p>
      <p><strong>Idade:</strong> ${data.patientAge ? data.patientAge + ' anos' : '-'}</p>
      <p><strong>Sexo:</strong> ${data.patientGender || '-'}</p>
    </div>
  </div>

  <div class="section">
    <h3>Informações do Atendimento</h3>
    <div class="grid-2">
      <p><strong>Data:</strong> ${data.appointmentDate}</p>
      <p><strong>Tipo:</strong> ${data.appointmentType}</p>
      <p><strong>ID:</strong> ${data.appointmentId}</p>
    </div>
  </div>

  ${data.procedures.length > 0 ? `
  <div class="section">
    <h3>Procedimentos Realizados (${data.procedures.length})</h3>
    ${data.procedures.map(proc => `
    <div class="procedure-item">
      <span class="procedure-code">${proc.code}</span>
      <span style="margin-left: 10px;">${proc.name}</span>
      ${proc.laterality ? `<span style="margin-left: 10px; color: #64748b;">(${proc.laterality})</span>` : ''}
    </div>
    `).join('')}
  </div>
  ` : ''}

  ${data.mainComplaint ? `
  <div class="section">
    <h3>Queixa Principal</h3>
    <div class="text-content">${data.mainComplaint}</div>
  </div>
  ` : ''}

  ${data.clinicalHistory ? `
  <div class="section">
    <h3>História Clínica</h3>
    <div class="text-content">${data.clinicalHistory}</div>
  </div>
  ` : ''}

  ${data.physicalExam ? `
  <div class="section">
    <h3>Exame Físico</h3>
    <div class="text-content">${data.physicalExam}</div>
  </div>
  ` : ''}

  ${data.diagnosis ? `
  <div class="section">
    <h3>Diagnóstico</h3>
    <div class="text-content">${data.diagnosis}</div>
  </div>
  ` : ''}

  ${data.treatmentPlan ? `
  <div class="section">
    <h3>Plano de Tratamento</h3>
    <div class="text-content">${data.treatmentPlan}</div>
  </div>
  ` : ''}

  ${data.observations ? `
  <div class="section">
    <h3>Observações</h3>
    <div class="text-content">${data.observations}</div>
  </div>
  ` : ''}

  <div class="footer">
    <p>Documento gerado pelo sistema AtendeBem</p>
    <p>Este documento é parte do prontuário eletrônico do paciente</p>
  </div>
</body>
</html>
`
}

/**
 * Converte dados para CSV
 */
export function generateCSV(data: any[], columns: { key: string; header: string }[]): string {
  const headers = columns.map(c => `"${c.header}"`).join(',')
  const rows = data.map(row => 
    columns.map(c => {
      const value = row[c.key]
      if (value === null || value === undefined) return '""'
      if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`
      return `"${value}"`
    }).join(',')
  )
  return [headers, ...rows].join('\n')
}

/**
 * Gera XML TISS para procedimentos
 */
export function generateTISSXML(procedures: any[], doctorInfo: any): string {
  const now = new Date().toISOString()
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<ans:mensagemTISS xmlns:ans="http://www.ans.gov.br/padroes/tiss/schemas" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <ans:cabecalho>
    <ans:identificacaoTransacao>
      <ans:tipoTransacao>ENVIO_LOTE_GUIAS</ans:tipoTransacao>
      <ans:sequencialTransacao>1</ans:sequencialTransacao>
      <ans:dataRegistroTransacao>${now.split('T')[0]}</ans:dataRegistroTransacao>
      <ans:horaRegistroTransacao>${now.split('T')[1].substring(0, 8)}</ans:horaRegistroTransacao>
    </ans:identificacaoTransacao>
    <ans:origem>
      <ans:identificacaoPrestador>
        <ans:CNPJ>${doctorInfo.cnpj || '00000000000000'}</ans:CNPJ>
      </ans:identificacaoPrestador>
    </ans:origem>
    <ans:destino>
      <ans:registroANS>000000</ans:registroANS>
    </ans:destino>
    <ans:versaoPadrao>4.01.00</ans:versaoPadrao>
  </ans:cabecalho>
  <ans:prestadorParaOperadora>
    <ans:loteGuias>
      <ans:numeroLote>1</ans:numeroLote>
      ${procedures.map((proc, index) => `
      <ans:guiasTISS>
        <ans:guiaSP-SADT>
          <ans:cabecalhoGuia>
            <ans:registroANS>000000</ans:registroANS>
            <ans:numeroGuiaPrestador>${index + 1}</ans:numeroGuiaPrestador>
          </ans:cabecalhoGuia>
          <ans:dadosAutorizacao>
            <ans:numeroGuiaOperadora>0</ans:numeroGuiaOperadora>
            <ans:dataAutorizacao>${now.split('T')[0]}</ans:dataAutorizacao>
          </ans:dadosAutorizacao>
          <ans:procedimentosExecutados>
            <ans:procedimentoExecutado>
              <ans:dataExecucao>${proc.procedure_date?.split('T')[0] || now.split('T')[0]}</ans:dataExecucao>
              <ans:procedimento>
                <ans:codigoTabela>22</ans:codigoTabela>
                <ans:codigoProcedimento>${proc.procedure_code}</ans:codigoProcedimento>
                <ans:descricaoProcedimento>${proc.procedure_name}</ans:descricaoProcedimento>
              </ans:procedimento>
              <ans:quantidadeExecutada>1</ans:quantidadeExecutada>
            </ans:procedimentoExecutado>
          </ans:procedimentosExecutados>
        </ans:guiaSP-SADT>
      </ans:guiasTISS>
      `).join('')}
    </ans:loteGuias>
  </ans:prestadorParaOperadora>
</ans:mensagemTISS>`
}
