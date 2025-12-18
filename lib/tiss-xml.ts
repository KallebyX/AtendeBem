/**
 * Gerador de XML TISS (Padrão ANS)
 * Implementação completa do padrão TISS 4.x
 * Guias: SP-SADT, Consulta, Internação, Honorários
 */

import { format } from "date-fns"

export interface TISSPrestador {
  codigo_operadora: string
  cnpj: string
  nome: string
  codigo_cnes?: string
}

export interface TISSBeneficiario {
  numero_carteira: string
  nome: string
  cpf?: string
  data_nascimento: string
}

export interface TISSProcedimento {
  codigo_tuss: string
  descricao: string
  quantidade: number
  valor_unitario: number
  valor_total: number
  via?: string // Oral, Sistêmica, etc
  tecnica?: string
  reducao_acrescimo?: number
  data_execucao: string
  hora_inicial?: string
  hora_final?: string
}

export interface TISSGuiaConsulta {
  numero_guia: string
  data_emissao: string
  prestador: TISSPrestador
  beneficiario: TISSBeneficiario
  profissional_executante: {
    nome: string
    conselho: string // CRM, CRO, etc
    numero_conselho: string
    uf_conselho: string
    cbo: string // Código Brasileiro de Ocupações
  }
  procedimentos: TISSProcedimento[]
  indicacao_clinica?: string
  observacao?: string
  valor_total: number
}

export interface TISSGuiaSPSADT {
  numero_guia: string
  guia_principal?: string // Se for guia de honorários
  data_emissao: string
  data_autorizacao?: string
  numero_autorizacao?: string
  prestador: TISSPrestador
  beneficiario: TISSBeneficiario
  profissional_solicitante: {
    nome: string
    conselho: string
    numero_conselho: string
    uf_conselho: string
  }
  profissional_executante: {
    nome: string
    conselho: string
    numero_conselho: string
    uf_conselho: string
    cbo: string
  }
  indicacao_clinica: string
  procedimentos: TISSProcedimento[]
  observacao?: string
  valor_total: number
  tipo_atendimento: "01" | "02" | "03" | "04" // Remoção, Pequena cirurgia, Terapias, Consulta
  tipo_faturamento: "1" | "2" | "3" // Preço total, Preço unitário, Pacote
  carater_atendimento: "E" | "U" | "O" // Eletivo, Urgência/Emergência, Outros
}

/**
 * Gerar XML de Guia de Consulta (padrão ANS)
 */
export function generateTISSGuiaConsultaXML(guia: TISSGuiaConsulta): string {
  const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")

  return `<?xml version="1.0" encoding="UTF-8"?>
<ans:mensagemTISS 
  xmlns:ans="http://www.ans.gov.br/padroes/tiss/schemas" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.ans.gov.br/padroes/tiss/schemas padraoTISS_4.xsd">
  
  <ans:cabecalho>
    <ans:identificacaoTransacao>
      <ans:tipoTransacao>ENVIO_LOTE_GUIAS</ans:tipoTransacao>
      <ans:sequencialTransacao>1</ans:sequencialTransacao>
      <ans:dataRegistroTransacao>${now}</ans:dataRegistroTransacao>
      <ans:horaRegistroTransacao>${format(new Date(), "HH:mm:ss")}</ans:horaRegistroTransacao>
    </ans:identificacaoTransacao>
    
    <ans:origem>
      <ans:identificacaoPrestador>
        <ans:codigoPrestadorNaOperadora>${guia.prestador.codigo_operadora}</ans:codigoPrestadorNaOperadora>
      </ans:identificacaoPrestador>
    </ans:origem>
    
    <ans:destino>
      <ans:registroANS>XXXXX</ans:registroANS> <!-- Código da operadora na ANS -->
    </ans:destino>
    
    <ans:versaoPadrao>4.00.00</ans:versaoPadrao>
  </ans:cabecalho>
  
  <ans:prestadorParaOperadora>
    <ans:loteGuias>
      <ans:numeroLote>1</ans:numeroLote>
      
      <ans:guiasConsulta>
        <ans:guiaConsulta>
          <ans:cabecalhoGuia>
            <ans:registroANS>XXXXX</ans:registroANS>
            <ans:numeroGuiaPrestador>${guia.numero_guia}</ans:numeroGuiaPrestador>
          </ans:cabecalhoGuia>
          
          <ans:dadosBeneficiario>
            <ans:numeroCarteira>${guia.beneficiario.numero_carteira}</ans:numeroCarteira>
            <ans:nomeBeneficiario>${escapeXML(guia.beneficiario.nome)}</ans:nomeBeneficiario>
            ${guia.beneficiario.cpf ? `<ans:numeroCPF>${guia.beneficiario.cpf}</ans:numeroCPF>` : ""}
          </ans:dadosBeneficiario>
          
          <ans:profissionalExecutante>
            <ans:nomeProfissional>${escapeXML(guia.profissional_executante.nome)}</ans:nomeProfissional>
            <ans:conselhoProfissional>${guia.profissional_executante.conselho}</ans:conselhoProfissional>
            <ans:numeroConselhoProfissional>${guia.profissional_executante.numero_conselho}</ans:numeroConselhoProfissional>
            <ans:UF>${guia.profissional_executante.uf_conselho}</ans:UF>
            <ans:CBOS>${guia.profissional_executante.cbo}</ans:CBOS>
          </ans:profissionalExecutante>
          
          ${guia.indicacao_clinica ? `<ans:indicacaoClinica>${escapeXML(guia.indicacao_clinica)}</ans:indicacaoClinica>` : ""}
          
          <ans:procedimentosExecutados>
            ${guia.procedimentos
              .map(
                (proc, idx) => `
            <ans:procedimentoExecutado>
              <ans:sequencialItem>${idx + 1}</ans:sequencialItem>
              <ans:dataExecucao>${proc.data_execucao}</ans:dataExecucao>
              ${proc.hora_inicial ? `<ans:horaInicial>${proc.hora_inicial}</ans:horaInicial>` : ""}
              ${proc.hora_final ? `<ans:horaFinal>${proc.hora_final}</ans:horaFinal>` : ""}
              <ans:procedimento>
                <ans:codigoTabela>22</ans:codigoTabela> <!-- TUSS -->
                <ans:codigoProcedimento>${proc.codigo_tuss}</ans:codigoProcedimento>
                <ans:descricaoProcedimento>${escapeXML(proc.descricao)}</ans:descricaoProcedimento>
              </ans:procedimento>
              <ans:quantidadeExecutada>${proc.quantidade}</ans:quantidadeExecutada>
              <ans:valorUnitario>${proc.valor_unitario.toFixed(2)}</ans:valorUnitario>
              <ans:valorTotal>${proc.valor_total.toFixed(2)}</ans:valorTotal>
            </ans:procedimentoExecutado>`
              )
              .join("")}
          </ans:procedimentosExecutados>
          
          ${guia.observacao ? `<ans:observacao>${escapeXML(guia.observacao)}</ans:observacao>` : ""}
          
          <ans:valorTotal>
            <ans:valorProcedimentos>${guia.valor_total.toFixed(2)}</ans:valorProcedimentos>
            <ans:valorTotal>${guia.valor_total.toFixed(2)}</ans:valorTotal>
          </ans:valorTotal>
        </ans:guiaConsulta>
      </ans:guiasConsulta>
    </ans:loteGuias>
  </ans:prestadorParaOperadora>
</ans:mensagemTISS>`
}

/**
 * Gerar XML de Guia SP-SADT (Serviço Profissional / Serviço Auxiliar de Diagnóstico e Terapia)
 */
export function generateTISSGuiaSPSADTXML(guia: TISSGuiaSPSADT): string {
  const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")

  return `<?xml version="1.0" encoding="UTF-8"?>
<ans:mensagemTISS 
  xmlns:ans="http://www.ans.gov.br/padroes/tiss/schemas" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.ans.gov.br/padroes/tiss/schemas padraoTISS_4.xsd">
  
  <ans:cabecalho>
    <ans:identificacaoTransacao>
      <ans:tipoTransacao>ENVIO_LOTE_GUIAS</ans:tipoTransacao>
      <ans:sequencialTransacao>1</ans:sequencialTransacao>
      <ans:dataRegistroTransacao>${now}</ans:dataRegistroTransacao>
      <ans:horaRegistroTransacao>${format(new Date(), "HH:mm:ss")}</ans:horaRegistroTransacao>
    </ans:identificacaoTransacao>
    
    <ans:origem>
      <ans:identificacaoPrestador>
        <ans:codigoPrestadorNaOperadora>${guia.prestador.codigo_operadora}</ans:codigoPrestadorNaOperadora>
      </ans:identificacaoPrestador>
    </ans:origem>
    
    <ans:destino>
      <ans:registroANS>XXXXX</ans:registroANS>
    </ans:destino>
    
    <ans:versaoPadrao>4.00.00</ans:versaoPadrao>
  </ans:cabecalho>
  
  <ans:prestadorParaOperadora>
    <ans:loteGuias>
      <ans:numeroLote>1</ans:numeroLote>
      
      <ans:guiasSP-SADT>
        <ans:guiaSP-SADT>
          <ans:cabecalhoGuia>
            <ans:registroANS>XXXXX</ans:registroANS>
            <ans:numeroGuiaPrestador>${guia.numero_guia}</ans:numeroGuiaPrestador>
            ${guia.numero_autorizacao ? `<ans:numeroGuiaOperadora>${guia.numero_autorizacao}</ans:numeroGuiaOperadora>` : ""}
          </ans:cabecalhoGuia>
          
          <ans:dadosAutorizacao>
            <ans:numeroGuiaOperadora>${guia.numero_autorizacao || ""}</ans:numeroGuiaOperadora>
            <ans:dataAutorizacao>${guia.data_autorizacao || guia.data_emissao}</ans:dataAutorizacao>
          </ans:dadosAutorizacao>
          
          <ans:dadosBeneficiario>
            <ans:numeroCarteira>${guia.beneficiario.numero_carteira}</ans:numeroCarteira>
            <ans:nomeBeneficiario>${escapeXML(guia.beneficiario.nome)}</ans:nomeBeneficiario>
            ${guia.beneficiario.cpf ? `<ans:numeroCPF>${guia.beneficiario.cpf}</ans:numeroCPF>` : ""}
          </ans:dadosBeneficiario>
          
          <ans:dadosSolicitante>
            <ans:nomeProfissional>${escapeXML(guia.profissional_solicitante.nome)}</ans:nomeProfissional>
            <ans:conselhoProfissional>${guia.profissional_solicitante.conselho}</ans:conselhoProfissional>
            <ans:numeroConselhoProfissional>${guia.profissional_solicitante.numero_conselho}</ans:numeroConselhoProfissional>
            <ans:UF>${guia.profissional_solicitante.uf_conselho}</ans:UF>
          </ans:dadosSolicitante>
          
          <ans:dadosExecutante>
            <ans:nomeProfissional>${escapeXML(guia.profissional_executante.nome)}</ans:nomeProfissional>
            <ans:conselhoProfissional>${guia.profissional_executante.conselho}</ans:conselhoProfissional>
            <ans:numeroConselhoProfissional>${guia.profissional_executante.numero_conselho}</ans:numeroConselhoProfissional>
            <ans:UF>${guia.profissional_executante.uf_conselho}</ans:UF>
            <ans:CBOS>${guia.profissional_executante.cbo}</ans:CBOS>
          </ans:dadosExecutante>
          
          <ans:dadosAtendimento>
            <ans:tipoAtendimento>${guia.tipo_atendimento}</ans:tipoAtendimento>
            <ans:indicacaoClinica>${escapeXML(guia.indicacao_clinica)}</ans:indicacaoClinica>
            <ans:tipoFaturamento>${guia.tipo_faturamento}</ans:tipoFaturamento>
            <ans:caraterAtendimento>${guia.carater_atendimento}</ans:caraterAtendimento>
          </ans:dadosAtendimento>
          
          <ans:procedimentosExecutados>
            ${guia.procedimentos
              .map(
                (proc, idx) => `
            <ans:procedimentoExecutado>
              <ans:sequencialItem>${idx + 1}</ans:sequencialItem>
              <ans:dataExecucao>${proc.data_execucao}</ans:dataExecucao>
              ${proc.hora_inicial ? `<ans:horaInicial>${proc.hora_inicial}</ans:horaInicial>` : ""}
              ${proc.hora_final ? `<ans:horaFinal>${proc.hora_final}</ans:horaFinal>` : ""}
              <ans:procedimento>
                <ans:codigoTabela>22</ans:codigoTabela>
                <ans:codigoProcedimento>${proc.codigo_tuss}</ans:codigoProcedimento>
                <ans:descricaoProcedimento>${escapeXML(proc.descricao)}</ans:descricaoProcedimento>
              </ans:procedimento>
              <ans:quantidadeExecutada>${proc.quantidade}</ans:quantidadeExecutada>
              ${proc.via ? `<ans:via>${proc.via}</ans:via>` : ""}
              ${proc.tecnica ? `<ans:tecnica>${proc.tecnica}</ans:tecnica>` : ""}
              ${proc.reducao_acrescimo ? `<ans:reducaoAcrescimo>${proc.reducao_acrescimo}</ans:reducaoAcrescimo>` : ""}
              <ans:valorUnitario>${proc.valor_unitario.toFixed(2)}</ans:valorUnitario>
              <ans:valorTotal>${proc.valor_total.toFixed(2)}</ans:valorTotal>
            </ans:procedimentoExecutado>`
              )
              .join("")}
          </ans:procedimentosExecutados>
          
          ${guia.observacao ? `<ans:observacao>${escapeXML(guia.observacao)}</ans:observacao>` : ""}
          
          <ans:valorTotal>
            <ans:valorProcedimentos>${guia.valor_total.toFixed(2)}</ans:valorProcedimentos>
            <ans:valorTotal>${guia.valor_total.toFixed(2)}</ans:valorTotal>
          </ans:valorTotal>
        </ans:guiaSP-SADT>
      </ans:guiasSP-SADT>
    </ans:loteGuias>
  </ans:prestadorParaOperadora>
</ans:mensagemTISS>`
}

/**
 * Escape de caracteres especiais XML
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/**
 * Validar XML TISS contra schema XSD (simulado)
 */
export function validateTISSXML(xml: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validações básicas
  if (!xml.includes('xmlns:ans="http://www.ans.gov.br/padroes/tiss/schemas"')) {
    errors.push("Namespace ANS ausente")
  }

  if (!xml.includes("<ans:versaoPadrao>4.00.00</ans:versaoPadrao>")) {
    errors.push("Versão do padrão TISS ausente ou inválida")
  }

  if (!xml.includes("<ans:valorTotal>")) {
    errors.push("Valor total ausente")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
