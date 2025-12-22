/**
 * Gerador de XML NFe/NFSe - Padrão OURO Nacional
 *
 * Conformidade:
 * - NFe: Manual de Orientação do Contribuinte (MOC) versão 7.0
 * - NFSe: ABRASF versão 2.04
 * - Validação de schemas XSD
 *
 * @author Sistema AtendeBem
 * @version 2.0.0
 */

import { UF_CODES } from './fiscal-utils'

// ============================================================================
// TIPOS PARA XML
// ============================================================================

export interface NFSeXMLData {
  // Identificação
  numero: string
  serie: string
  tipo: number // 1-RPS, 2-Nota Fiscal Conjugada, 3-Cupom
  dataEmissao: string // YYYY-MM-DDTHH:MM:SS
  competencia: string // YYYY-MM

  // RPS
  rps?: {
    numero: string
    serie: string
    tipo: number // 1-Recibo Provisório de Serviços
    dataEmissao: string
  }

  // Natureza da Operação
  naturezaOperacao: number // 1-Tributação no município, 2-Tributação fora, 3-Isenção, etc

  // Regime Especial
  regimeEspecialTributacao?: number // 1-ME/EPP SN, 2-Estimativa, 3-Sociedade Profissionais, etc
  optanteSimplesNacional: boolean
  incentivoFiscal: boolean

  // Prestador (Emitente)
  prestador: {
    cnpj: string
    inscricaoMunicipal: string
    razaoSocial: string
    nomeFantasia?: string
    endereco: {
      logradouro: string
      numero: string
      complemento?: string
      bairro: string
      codigoMunicipio: string // Código IBGE 7 dígitos
      municipio: string
      uf: string
      cep: string
      codigoPais?: string // 1058 = Brasil
      pais?: string
    }
    telefone?: string
    email?: string
  }

  // Tomador (Cliente)
  tomador: {
    cpfCnpj: string
    inscricaoMunicipal?: string
    razaoSocial: string
    endereco?: {
      logradouro: string
      numero: string
      complemento?: string
      bairro: string
      codigoMunicipio: string
      municipio: string
      uf: string
      cep: string
      codigoPais?: string
      pais?: string
    }
    telefone?: string
    email?: string
  }

  // Serviço
  servico: {
    itemListaServico: string // Código LC 116 (ex: "4.01")
    codigoCnae?: string
    codigoTributacaoMunicipio?: string
    discriminacao: string
    codigoMunicipioIncidencia: string
    exigibilidadeISS: number // 1-Exigível, 2-Não incidência, 3-Isenção, etc
    municipioIncidencia?: string
  }

  // Valores
  valores: {
    valorServicos: number
    valorDeducoes?: number
    valorPis?: number
    valorCofins?: number
    valorInss?: number
    valorIr?: number
    valorCsll?: number
    outrasRetencoes?: number
    valorIss?: number
    aliquota: number // Em percentual (ex: 5 para 5%)
    descontoIncondicionado?: number
    descontoCondicionado?: number
    issRetido: boolean
    valorLiquidoNfse?: number
    valorIssRetido?: number
    baseCalculo?: number
  }

  // Informações Adicionais
  informacoesAdicionais?: string

  // Autorizacao (após processamento)
  autorizacao?: {
    protocolo: string
    dataAutorizacao: string
    codigoVerificacao: string
  }
}

export interface NFeXMLData {
  // Identificação
  chaveAcesso?: string

  ide: {
    cUF: string // Código UF (35 = SP)
    cNF: string // Código numérico aleatório (8 dígitos)
    natOp: string // Natureza da operação
    mod: string // Modelo (55 = NFe, 65 = NFCe)
    serie: string
    nNF: string // Número da NFe
    dhEmi: string // Data/hora emissão YYYY-MM-DDTHH:MM:SS-03:00
    dhSaiEnt?: string // Data/hora saída/entrada
    tpNF: number // 0-Entrada, 1-Saída
    idDest: number // 1-Interna, 2-Interestadual, 3-Exterior
    cMunFG: string // Código município fato gerador (7 dígitos IBGE)
    tpImp: number // 0-Sem DANFE, 1-Retrato, 2-Paisagem, etc
    tpEmis: number // 1-Normal, 2-FS-IA, 3-SCAN, etc
    cDV?: string // Dígito verificador chave acesso
    tpAmb: number // 1-Produção, 2-Homologação
    finNFe: number // 1-Normal, 2-Complementar, 3-Ajuste, 4-Devolução
    indFinal: number // 0-Normal, 1-Consumidor Final
    indPres: number // 0-Não presencial, 1-Presencial, etc
    procEmi: number // 0-Aplicativo Contribuinte
    verProc: string // Versão do processo de emissão
  }

  // Emitente
  emit: {
    CNPJ: string
    xNome: string
    xFant?: string
    enderEmit: {
      xLgr: string
      nro: string
      xCpl?: string
      xBairro: string
      cMun: string
      xMun: string
      UF: string
      CEP: string
      cPais: string // 1058 = Brasil
      xPais: string
      fone?: string
    }
    IE: string
    IM?: string
    CNAE?: string
    CRT: string // 1-SN, 2-SN Excesso, 3-Normal
  }

  // Destinatário
  dest?: {
    CPF?: string
    CNPJ?: string
    xNome: string
    enderDest?: {
      xLgr: string
      nro: string
      xCpl?: string
      xBairro: string
      cMun: string
      xMun: string
      UF: string
      CEP: string
      cPais: string
      xPais: string
      fone?: string
    }
    indIEDest: string // 1-Contribuinte, 2-Isento, 9-Não contribuinte
    IE?: string
    email?: string
  }

  // Produtos/Serviços
  det: Array<{
    nItem: number
    prod: {
      cProd: string
      cEAN: string // GTIN (ou "SEM GTIN")
      xProd: string
      NCM: string
      CFOP: string
      uCom: string
      qCom: number
      vUnCom: number
      vProd: number
      cEANTrib: string
      uTrib: string
      qTrib: number
      vUnTrib: number
      indTot: number // 0-Não compõe total, 1-Compõe total
    }
    imposto: {
      // ICMS
      ICMS?: {
        orig: string // Origem (0-Nacional, 1-Estrangeira Importação Direta, etc)
        CST?: string // CST
        CSOSN?: string // CSOSN (Simples Nacional)
        vBC?: number
        pICMS?: number
        vICMS?: number
      }
      // IPI (se aplicável)
      IPI?: {
        CST: string
        vBC?: number
        pIPI?: number
        vIPI?: number
      }
      // PIS
      PIS: {
        CST: string
        vBC?: number
        pPIS?: number
        vPIS?: number
      }
      // COFINS
      COFINS: {
        CST: string
        vBC?: number
        pCOFINS?: number
        vCOFINS?: number
      }
      // ISSQN (para serviços)
      ISSQN?: {
        vBC: number
        vAliq: number
        vISSQN: number
        cMunFG: string
        cListServ: string // Código LC 116
        indISS: number // 1-Exigível, 2-Não incidência, etc
        indIncentivo: number // 1-Sim, 2-Não
      }
    }
    infAdProd?: string
  }>

  // Totais
  total: {
    ICMSTot: {
      vBC: number
      vICMS: number
      vICMSDeson: number
      vFCPUFDest?: number
      vICMSUFDest?: number
      vICMSUFRemet?: number
      vFCP: number
      vBCST: number
      vST: number
      vFCPST: number
      vFCPSTRet: number
      vProd: number
      vFrete: number
      vSeg: number
      vDesc: number
      vII: number
      vIPI: number
      vIPIDevol: number
      vPIS: number
      vCOFINS: number
      vOutro: number
      vNF: number
      vTotTrib?: number
    }
    ISSQNtot?: {
      vServ: number
      vBC: number
      vISS: number
      vPIS: number
      vCOFINS: number
      dCompet: string
      vDeducao?: number
      vOutro?: number
      vDescIncond?: number
      vDescCond?: number
      vISSRet?: number
      cRegTrib: number // 1-ME/EPP SN, 2-Empresa SN excesso, etc
    }
  }

  // Transporte
  transp: {
    modFrete: number // 0-Emitente, 1-Destinatário, 2-Terceiros, 9-Sem Frete
    transporta?: {
      CNPJ?: string
      CPF?: string
      xNome?: string
      IE?: string
      xEnder?: string
      xMun?: string
      UF?: string
    }
  }

  // Pagamento
  pag: {
    detPag: Array<{
      indPag?: number // 0-À Vista, 1-À Prazo
      tPag: string // 01-Dinheiro, 02-Cheque, 03-Cartão Crédito, etc
      vPag: number
      card?: {
        tpIntegra: number // 1-Integrado, 2-Não integrado
        CNPJ?: string
        tBand?: string
        cAut?: string
      }
    }>
    vTroco?: number
  }

  // Informações Adicionais
  infAdic?: {
    infAdFisco?: string
    infCpl?: string
  }

  // Responsável Técnico
  infRespTec?: {
    CNPJ: string
    xContato: string
    email: string
    fone: string
    idCSRT?: string
    hashCSRT?: string
  }
}

// ============================================================================
// GERADOR XML NFSe - PADRÃO ABRASF 2.04
// ============================================================================

export function generateNFSeXML(data: NFSeXMLData): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<CompNfse xmlns="http://www.abrasf.org.br/nfse.xsd" versao="2.04">
  <Nfse versao="2.04">
    <InfNfse Id="NFSe${data.numero}">
      <Numero>${escapeXml(data.numero)}</Numero>
      ${data.autorizacao?.codigoVerificacao ? `<CodigoVerificacao>${escapeXml(data.autorizacao.codigoVerificacao)}</CodigoVerificacao>` : ''}
      <DataEmissao>${escapeXml(data.dataEmissao)}</DataEmissao>
      <NaturezaOperacao>${data.naturezaOperacao}</NaturezaOperacao>
      <RegimeEspecialTributacao>${data.regimeEspecialTributacao || 1}</RegimeEspecialTributacao>
      <OptanteSimplesNacional>${data.optanteSimplesNacional ? '1' : '2'}</OptanteSimplesNacional>
      <IncentivoFiscal>${data.incentivoFiscal ? '1' : '2'}</IncentivoFiscal>
      <Competencia>${escapeXml(data.competencia)}</Competencia>
      ${data.rps ? `
      <IdentificacaoRps>
        <Numero>${escapeXml(data.rps.numero)}</Numero>
        <Serie>${escapeXml(data.rps.serie)}</Serie>
        <Tipo>${data.rps.tipo}</Tipo>
      </IdentificacaoRps>
      <DataEmissaoRps>${escapeXml(data.rps.dataEmissao)}</DataEmissaoRps>
      ` : ''}
      <Servico>
        <Valores>
          <ValorServicos>${formatDecimal(data.valores.valorServicos)}</ValorServicos>
          ${data.valores.valorDeducoes ? `<ValorDeducoes>${formatDecimal(data.valores.valorDeducoes)}</ValorDeducoes>` : ''}
          ${data.valores.valorPis ? `<ValorPis>${formatDecimal(data.valores.valorPis)}</ValorPis>` : ''}
          ${data.valores.valorCofins ? `<ValorCofins>${formatDecimal(data.valores.valorCofins)}</ValorCofins>` : ''}
          ${data.valores.valorInss ? `<ValorInss>${formatDecimal(data.valores.valorInss)}</ValorInss>` : ''}
          ${data.valores.valorIr ? `<ValorIr>${formatDecimal(data.valores.valorIr)}</ValorIr>` : ''}
          ${data.valores.valorCsll ? `<ValorCsll>${formatDecimal(data.valores.valorCsll)}</ValorCsll>` : ''}
          ${data.valores.outrasRetencoes ? `<OutrasRetencoes>${formatDecimal(data.valores.outrasRetencoes)}</OutrasRetencoes>` : ''}
          <IssRetido>${data.valores.issRetido ? '1' : '2'}</IssRetido>
          ${data.valores.valorIss ? `<ValorIss>${formatDecimal(data.valores.valorIss)}</ValorIss>` : ''}
          ${data.valores.valorIssRetido ? `<ValorIssRetido>${formatDecimal(data.valores.valorIssRetido)}</ValorIssRetido>` : ''}
          ${data.valores.baseCalculo ? `<BaseCalculo>${formatDecimal(data.valores.baseCalculo)}</BaseCalculo>` : `<BaseCalculo>${formatDecimal(data.valores.valorServicos - (data.valores.valorDeducoes || 0))}</BaseCalculo>`}
          <Aliquota>${formatDecimal(data.valores.aliquota / 100, 4)}</Aliquota>
          ${data.valores.valorLiquidoNfse ? `<ValorLiquidoNfse>${formatDecimal(data.valores.valorLiquidoNfse)}</ValorLiquidoNfse>` : ''}
          ${data.valores.descontoIncondicionado ? `<DescontoIncondicionado>${formatDecimal(data.valores.descontoIncondicionado)}</DescontoIncondicionado>` : ''}
          ${data.valores.descontoCondicionado ? `<DescontoCondicionado>${formatDecimal(data.valores.descontoCondicionado)}</DescontoCondicionado>` : ''}
        </Valores>
        <ItemListaServico>${escapeXml(data.servico.itemListaServico.replace('.', ''))}</ItemListaServico>
        ${data.servico.codigoCnae ? `<CodigoCnae>${escapeXml(data.servico.codigoCnae.replace(/[^\d]/g, ''))}</CodigoCnae>` : ''}
        ${data.servico.codigoTributacaoMunicipio ? `<CodigoTributacaoMunicipio>${escapeXml(data.servico.codigoTributacaoMunicipio)}</CodigoTributacaoMunicipio>` : ''}
        <Discriminacao>${escapeXml(data.servico.discriminacao)}</Discriminacao>
        <CodigoMunicipio>${escapeXml(data.servico.codigoMunicipioIncidencia)}</CodigoMunicipio>
        ${data.servico.municipioIncidencia ? `<MunicipioIncidencia>${escapeXml(data.servico.municipioIncidencia)}</MunicipioIncidencia>` : ''}
        <ExigibilidadeISS>${data.servico.exigibilidadeISS}</ExigibilidadeISS>
      </Servico>
      <PrestadorServico>
        <IdentificacaoPrestador>
          <CpfCnpj>
            <Cnpj>${escapeXml(data.prestador.cnpj.replace(/[^\d]/g, ''))}</Cnpj>
          </CpfCnpj>
          <InscricaoMunicipal>${escapeXml(data.prestador.inscricaoMunicipal)}</InscricaoMunicipal>
        </IdentificacaoPrestador>
        <RazaoSocial>${escapeXml(data.prestador.razaoSocial)}</RazaoSocial>
        ${data.prestador.nomeFantasia ? `<NomeFantasia>${escapeXml(data.prestador.nomeFantasia)}</NomeFantasia>` : ''}
        <Endereco>
          <Endereco>${escapeXml(data.prestador.endereco.logradouro)}</Endereco>
          <Numero>${escapeXml(data.prestador.endereco.numero)}</Numero>
          ${data.prestador.endereco.complemento ? `<Complemento>${escapeXml(data.prestador.endereco.complemento)}</Complemento>` : ''}
          <Bairro>${escapeXml(data.prestador.endereco.bairro)}</Bairro>
          <CodigoMunicipio>${escapeXml(data.prestador.endereco.codigoMunicipio)}</CodigoMunicipio>
          <Uf>${escapeXml(data.prestador.endereco.uf)}</Uf>
          <CodigoPais>${data.prestador.endereco.codigoPais || '1058'}</CodigoPais>
          <Cep>${escapeXml(data.prestador.endereco.cep.replace(/[^\d]/g, ''))}</Cep>
        </Endereco>
        ${data.prestador.telefone ? `<Contato><Telefone>${escapeXml(data.prestador.telefone.replace(/[^\d]/g, ''))}</Telefone>${data.prestador.email ? `<Email>${escapeXml(data.prestador.email)}</Email>` : ''}</Contato>` : ''}
      </PrestadorServico>
      <TomadorServico>
        <IdentificacaoTomador>
          <CpfCnpj>
            ${data.tomador.cpfCnpj.replace(/[^\d]/g, '').length === 11
              ? `<Cpf>${escapeXml(data.tomador.cpfCnpj.replace(/[^\d]/g, ''))}</Cpf>`
              : `<Cnpj>${escapeXml(data.tomador.cpfCnpj.replace(/[^\d]/g, ''))}</Cnpj>`
            }
          </CpfCnpj>
          ${data.tomador.inscricaoMunicipal ? `<InscricaoMunicipal>${escapeXml(data.tomador.inscricaoMunicipal)}</InscricaoMunicipal>` : ''}
        </IdentificacaoTomador>
        <RazaoSocial>${escapeXml(data.tomador.razaoSocial)}</RazaoSocial>
        ${data.tomador.endereco ? `
        <Endereco>
          <Endereco>${escapeXml(data.tomador.endereco.logradouro)}</Endereco>
          <Numero>${escapeXml(data.tomador.endereco.numero)}</Numero>
          ${data.tomador.endereco.complemento ? `<Complemento>${escapeXml(data.tomador.endereco.complemento)}</Complemento>` : ''}
          <Bairro>${escapeXml(data.tomador.endereco.bairro)}</Bairro>
          <CodigoMunicipio>${escapeXml(data.tomador.endereco.codigoMunicipio)}</CodigoMunicipio>
          <Uf>${escapeXml(data.tomador.endereco.uf)}</Uf>
          <CodigoPais>${data.tomador.endereco.codigoPais || '1058'}</CodigoPais>
          <Cep>${escapeXml(data.tomador.endereco.cep.replace(/[^\d]/g, ''))}</Cep>
        </Endereco>
        ` : ''}
        ${data.tomador.telefone || data.tomador.email ? `
        <Contato>
          ${data.tomador.telefone ? `<Telefone>${escapeXml(data.tomador.telefone.replace(/[^\d]/g, ''))}</Telefone>` : ''}
          ${data.tomador.email ? `<Email>${escapeXml(data.tomador.email)}</Email>` : ''}
        </Contato>
        ` : ''}
      </TomadorServico>
      ${data.informacoesAdicionais ? `
      <InformacoesComplementares>${escapeXml(data.informacoesAdicionais)}</InformacoesComplementares>
      ` : ''}
    </InfNfse>
  </Nfse>
</CompNfse>`

  return xml.replace(/^\s*[\r\n]/gm, '') // Remove linhas vazias
}

// ============================================================================
// GERADOR XML NFe - PADRÃO SEFAZ 4.00
// ============================================================================

export function generateNFeXML(data: NFeXMLData): string {
  // Gerar chave de acesso se não fornecida
  const chaveAcesso = data.chaveAcesso || generateAccessKeyNFe(data)
  const chaveAcessoSemDV = chaveAcesso.slice(0, 43)
  const digitoVerificador = chaveAcesso.slice(43)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<NFe xmlns="http://www.portalfiscal.inf.br/nfe">
  <infNFe versao="4.00" Id="NFe${chaveAcesso}">
    <ide>
      <cUF>${escapeXml(data.ide.cUF)}</cUF>
      <cNF>${escapeXml(data.ide.cNF.padStart(8, '0'))}</cNF>
      <natOp>${escapeXml(data.ide.natOp)}</natOp>
      <mod>${escapeXml(data.ide.mod)}</mod>
      <serie>${escapeXml(data.ide.serie)}</serie>
      <nNF>${escapeXml(data.ide.nNF)}</nNF>
      <dhEmi>${escapeXml(data.ide.dhEmi)}</dhEmi>
      ${data.ide.dhSaiEnt ? `<dhSaiEnt>${escapeXml(data.ide.dhSaiEnt)}</dhSaiEnt>` : ''}
      <tpNF>${data.ide.tpNF}</tpNF>
      <idDest>${data.ide.idDest}</idDest>
      <cMunFG>${escapeXml(data.ide.cMunFG)}</cMunFG>
      <tpImp>${data.ide.tpImp}</tpImp>
      <tpEmis>${data.ide.tpEmis}</tpEmis>
      <cDV>${digitoVerificador}</cDV>
      <tpAmb>${data.ide.tpAmb}</tpAmb>
      <finNFe>${data.ide.finNFe}</finNFe>
      <indFinal>${data.ide.indFinal}</indFinal>
      <indPres>${data.ide.indPres}</indPres>
      <procEmi>${data.ide.procEmi}</procEmi>
      <verProc>${escapeXml(data.ide.verProc)}</verProc>
    </ide>
    <emit>
      <CNPJ>${escapeXml(data.emit.CNPJ.replace(/[^\d]/g, ''))}</CNPJ>
      <xNome>${escapeXml(data.emit.xNome)}</xNome>
      ${data.emit.xFant ? `<xFant>${escapeXml(data.emit.xFant)}</xFant>` : ''}
      <enderEmit>
        <xLgr>${escapeXml(data.emit.enderEmit.xLgr)}</xLgr>
        <nro>${escapeXml(data.emit.enderEmit.nro)}</nro>
        ${data.emit.enderEmit.xCpl ? `<xCpl>${escapeXml(data.emit.enderEmit.xCpl)}</xCpl>` : ''}
        <xBairro>${escapeXml(data.emit.enderEmit.xBairro)}</xBairro>
        <cMun>${escapeXml(data.emit.enderEmit.cMun)}</cMun>
        <xMun>${escapeXml(data.emit.enderEmit.xMun)}</xMun>
        <UF>${escapeXml(data.emit.enderEmit.UF)}</UF>
        <CEP>${escapeXml(data.emit.enderEmit.CEP.replace(/[^\d]/g, ''))}</CEP>
        <cPais>${data.emit.enderEmit.cPais || '1058'}</cPais>
        <xPais>${escapeXml(data.emit.enderEmit.xPais || 'BRASIL')}</xPais>
        ${data.emit.enderEmit.fone ? `<fone>${escapeXml(data.emit.enderEmit.fone.replace(/[^\d]/g, ''))}</fone>` : ''}
      </enderEmit>
      <IE>${escapeXml(data.emit.IE.replace(/[^\d]/g, ''))}</IE>
      ${data.emit.IM ? `<IM>${escapeXml(data.emit.IM)}</IM>` : ''}
      ${data.emit.CNAE ? `<CNAE>${escapeXml(data.emit.CNAE.replace(/[^\d]/g, ''))}</CNAE>` : ''}
      <CRT>${escapeXml(data.emit.CRT)}</CRT>
    </emit>
    ${data.dest ? `
    <dest>
      ${data.dest.CPF ? `<CPF>${escapeXml(data.dest.CPF.replace(/[^\d]/g, ''))}</CPF>` : ''}
      ${data.dest.CNPJ ? `<CNPJ>${escapeXml(data.dest.CNPJ.replace(/[^\d]/g, ''))}</CNPJ>` : ''}
      <xNome>${escapeXml(data.dest.xNome)}</xNome>
      ${data.dest.enderDest ? `
      <enderDest>
        <xLgr>${escapeXml(data.dest.enderDest.xLgr)}</xLgr>
        <nro>${escapeXml(data.dest.enderDest.nro)}</nro>
        ${data.dest.enderDest.xCpl ? `<xCpl>${escapeXml(data.dest.enderDest.xCpl)}</xCpl>` : ''}
        <xBairro>${escapeXml(data.dest.enderDest.xBairro)}</xBairro>
        <cMun>${escapeXml(data.dest.enderDest.cMun)}</cMun>
        <xMun>${escapeXml(data.dest.enderDest.xMun)}</xMun>
        <UF>${escapeXml(data.dest.enderDest.UF)}</UF>
        <CEP>${escapeXml(data.dest.enderDest.CEP.replace(/[^\d]/g, ''))}</CEP>
        <cPais>${data.dest.enderDest.cPais || '1058'}</cPais>
        <xPais>${escapeXml(data.dest.enderDest.xPais || 'BRASIL')}</xPais>
        ${data.dest.enderDest.fone ? `<fone>${escapeXml(data.dest.enderDest.fone.replace(/[^\d]/g, ''))}</fone>` : ''}
      </enderDest>
      ` : ''}
      <indIEDest>${escapeXml(data.dest.indIEDest)}</indIEDest>
      ${data.dest.IE ? `<IE>${escapeXml(data.dest.IE)}</IE>` : ''}
      ${data.dest.email ? `<email>${escapeXml(data.dest.email)}</email>` : ''}
    </dest>
    ` : ''}
    ${data.det.map((item, index) => `
    <det nItem="${item.nItem || index + 1}">
      <prod>
        <cProd>${escapeXml(item.prod.cProd)}</cProd>
        <cEAN>${escapeXml(item.prod.cEAN || 'SEM GTIN')}</cEAN>
        <xProd>${escapeXml(item.prod.xProd)}</xProd>
        <NCM>${escapeXml(item.prod.NCM.replace(/[^\d]/g, ''))}</NCM>
        <CFOP>${escapeXml(item.prod.CFOP)}</CFOP>
        <uCom>${escapeXml(item.prod.uCom)}</uCom>
        <qCom>${formatDecimal(item.prod.qCom, 4)}</qCom>
        <vUnCom>${formatDecimal(item.prod.vUnCom, 10)}</vUnCom>
        <vProd>${formatDecimal(item.prod.vProd)}</vProd>
        <cEANTrib>${escapeXml(item.prod.cEANTrib || 'SEM GTIN')}</cEANTrib>
        <uTrib>${escapeXml(item.prod.uTrib)}</uTrib>
        <qTrib>${formatDecimal(item.prod.qTrib, 4)}</qTrib>
        <vUnTrib>${formatDecimal(item.prod.vUnTrib, 10)}</vUnTrib>
        <indTot>${item.prod.indTot}</indTot>
      </prod>
      <imposto>
        ${item.imposto.ICMS ? `
        <ICMS>
          ${generateICMSXML(item.imposto.ICMS, data.emit.CRT)}
        </ICMS>
        ` : ''}
        ${item.imposto.IPI ? `
        <IPI>
          <CST>${escapeXml(item.imposto.IPI.CST)}</CST>
          ${item.imposto.IPI.vBC ? `<vBC>${formatDecimal(item.imposto.IPI.vBC)}</vBC>` : ''}
          ${item.imposto.IPI.pIPI ? `<pIPI>${formatDecimal(item.imposto.IPI.pIPI)}</pIPI>` : ''}
          ${item.imposto.IPI.vIPI ? `<vIPI>${formatDecimal(item.imposto.IPI.vIPI)}</vIPI>` : ''}
        </IPI>
        ` : ''}
        <PIS>
          ${generatePISXML(item.imposto.PIS)}
        </PIS>
        <COFINS>
          ${generateCOFINSXML(item.imposto.COFINS)}
        </COFINS>
        ${item.imposto.ISSQN ? `
        <ISSQN>
          <vBC>${formatDecimal(item.imposto.ISSQN.vBC)}</vBC>
          <vAliq>${formatDecimal(item.imposto.ISSQN.vAliq)}</vAliq>
          <vISSQN>${formatDecimal(item.imposto.ISSQN.vISSQN)}</vISSQN>
          <cMunFG>${escapeXml(item.imposto.ISSQN.cMunFG)}</cMunFG>
          <cListServ>${escapeXml(item.imposto.ISSQN.cListServ)}</cListServ>
          <indISS>${item.imposto.ISSQN.indISS}</indISS>
          <indIncentivo>${item.imposto.ISSQN.indIncentivo}</indIncentivo>
        </ISSQN>
        ` : ''}
      </imposto>
      ${item.infAdProd ? `<infAdProd>${escapeXml(item.infAdProd)}</infAdProd>` : ''}
    </det>
    `).join('')}
    <total>
      <ICMSTot>
        <vBC>${formatDecimal(data.total.ICMSTot.vBC)}</vBC>
        <vICMS>${formatDecimal(data.total.ICMSTot.vICMS)}</vICMS>
        <vICMSDeson>${formatDecimal(data.total.ICMSTot.vICMSDeson)}</vICMSDeson>
        ${data.total.ICMSTot.vFCPUFDest !== undefined ? `<vFCPUFDest>${formatDecimal(data.total.ICMSTot.vFCPUFDest)}</vFCPUFDest>` : ''}
        ${data.total.ICMSTot.vICMSUFDest !== undefined ? `<vICMSUFDest>${formatDecimal(data.total.ICMSTot.vICMSUFDest)}</vICMSUFDest>` : ''}
        ${data.total.ICMSTot.vICMSUFRemet !== undefined ? `<vICMSUFRemet>${formatDecimal(data.total.ICMSTot.vICMSUFRemet)}</vICMSUFRemet>` : ''}
        <vFCP>${formatDecimal(data.total.ICMSTot.vFCP)}</vFCP>
        <vBCST>${formatDecimal(data.total.ICMSTot.vBCST)}</vBCST>
        <vST>${formatDecimal(data.total.ICMSTot.vST)}</vST>
        <vFCPST>${formatDecimal(data.total.ICMSTot.vFCPST)}</vFCPST>
        <vFCPSTRet>${formatDecimal(data.total.ICMSTot.vFCPSTRet)}</vFCPSTRet>
        <vProd>${formatDecimal(data.total.ICMSTot.vProd)}</vProd>
        <vFrete>${formatDecimal(data.total.ICMSTot.vFrete)}</vFrete>
        <vSeg>${formatDecimal(data.total.ICMSTot.vSeg)}</vSeg>
        <vDesc>${formatDecimal(data.total.ICMSTot.vDesc)}</vDesc>
        <vII>${formatDecimal(data.total.ICMSTot.vII)}</vII>
        <vIPI>${formatDecimal(data.total.ICMSTot.vIPI)}</vIPI>
        <vIPIDevol>${formatDecimal(data.total.ICMSTot.vIPIDevol)}</vIPIDevol>
        <vPIS>${formatDecimal(data.total.ICMSTot.vPIS)}</vPIS>
        <vCOFINS>${formatDecimal(data.total.ICMSTot.vCOFINS)}</vCOFINS>
        <vOutro>${formatDecimal(data.total.ICMSTot.vOutro)}</vOutro>
        <vNF>${formatDecimal(data.total.ICMSTot.vNF)}</vNF>
        ${data.total.ICMSTot.vTotTrib !== undefined ? `<vTotTrib>${formatDecimal(data.total.ICMSTot.vTotTrib)}</vTotTrib>` : ''}
      </ICMSTot>
      ${data.total.ISSQNtot ? `
      <ISSQNtot>
        <vServ>${formatDecimal(data.total.ISSQNtot.vServ)}</vServ>
        <vBC>${formatDecimal(data.total.ISSQNtot.vBC)}</vBC>
        <vISS>${formatDecimal(data.total.ISSQNtot.vISS)}</vISS>
        <vPIS>${formatDecimal(data.total.ISSQNtot.vPIS)}</vPIS>
        <vCOFINS>${formatDecimal(data.total.ISSQNtot.vCOFINS)}</vCOFINS>
        <dCompet>${escapeXml(data.total.ISSQNtot.dCompet)}</dCompet>
        ${data.total.ISSQNtot.vDeducao ? `<vDeducao>${formatDecimal(data.total.ISSQNtot.vDeducao)}</vDeducao>` : ''}
        ${data.total.ISSQNtot.vOutro ? `<vOutro>${formatDecimal(data.total.ISSQNtot.vOutro)}</vOutro>` : ''}
        ${data.total.ISSQNtot.vDescIncond ? `<vDescIncond>${formatDecimal(data.total.ISSQNtot.vDescIncond)}</vDescIncond>` : ''}
        ${data.total.ISSQNtot.vDescCond ? `<vDescCond>${formatDecimal(data.total.ISSQNtot.vDescCond)}</vDescCond>` : ''}
        ${data.total.ISSQNtot.vISSRet ? `<vISSRet>${formatDecimal(data.total.ISSQNtot.vISSRet)}</vISSRet>` : ''}
        <cRegTrib>${data.total.ISSQNtot.cRegTrib}</cRegTrib>
      </ISSQNtot>
      ` : ''}
    </total>
    <transp>
      <modFrete>${data.transp.modFrete}</modFrete>
      ${data.transp.transporta ? `
      <transporta>
        ${data.transp.transporta.CNPJ ? `<CNPJ>${escapeXml(data.transp.transporta.CNPJ.replace(/[^\d]/g, ''))}</CNPJ>` : ''}
        ${data.transp.transporta.CPF ? `<CPF>${escapeXml(data.transp.transporta.CPF.replace(/[^\d]/g, ''))}</CPF>` : ''}
        ${data.transp.transporta.xNome ? `<xNome>${escapeXml(data.transp.transporta.xNome)}</xNome>` : ''}
        ${data.transp.transporta.IE ? `<IE>${escapeXml(data.transp.transporta.IE)}</IE>` : ''}
        ${data.transp.transporta.xEnder ? `<xEnder>${escapeXml(data.transp.transporta.xEnder)}</xEnder>` : ''}
        ${data.transp.transporta.xMun ? `<xMun>${escapeXml(data.transp.transporta.xMun)}</xMun>` : ''}
        ${data.transp.transporta.UF ? `<UF>${escapeXml(data.transp.transporta.UF)}</UF>` : ''}
      </transporta>
      ` : ''}
    </transp>
    <pag>
      ${data.pag.detPag.map(pag => `
      <detPag>
        ${pag.indPag !== undefined ? `<indPag>${pag.indPag}</indPag>` : ''}
        <tPag>${escapeXml(pag.tPag)}</tPag>
        <vPag>${formatDecimal(pag.vPag)}</vPag>
        ${pag.card ? `
        <card>
          <tpIntegra>${pag.card.tpIntegra}</tpIntegra>
          ${pag.card.CNPJ ? `<CNPJ>${escapeXml(pag.card.CNPJ.replace(/[^\d]/g, ''))}</CNPJ>` : ''}
          ${pag.card.tBand ? `<tBand>${escapeXml(pag.card.tBand)}</tBand>` : ''}
          ${pag.card.cAut ? `<cAut>${escapeXml(pag.card.cAut)}</cAut>` : ''}
        </card>
        ` : ''}
      </detPag>
      `).join('')}
      ${data.pag.vTroco ? `<vTroco>${formatDecimal(data.pag.vTroco)}</vTroco>` : ''}
    </pag>
    ${data.infAdic ? `
    <infAdic>
      ${data.infAdic.infAdFisco ? `<infAdFisco>${escapeXml(data.infAdic.infAdFisco)}</infAdFisco>` : ''}
      ${data.infAdic.infCpl ? `<infCpl>${escapeXml(data.infAdic.infCpl)}</infCpl>` : ''}
    </infAdic>
    ` : ''}
    ${data.infRespTec ? `
    <infRespTec>
      <CNPJ>${escapeXml(data.infRespTec.CNPJ.replace(/[^\d]/g, ''))}</CNPJ>
      <xContato>${escapeXml(data.infRespTec.xContato)}</xContato>
      <email>${escapeXml(data.infRespTec.email)}</email>
      <fone>${escapeXml(data.infRespTec.fone.replace(/[^\d]/g, ''))}</fone>
      ${data.infRespTec.idCSRT ? `<idCSRT>${escapeXml(data.infRespTec.idCSRT)}</idCSRT>` : ''}
      ${data.infRespTec.hashCSRT ? `<hashCSRT>${escapeXml(data.infRespTec.hashCSRT)}</hashCSRT>` : ''}
    </infRespTec>
    ` : ''}
  </infNFe>
</NFe>`

  return xml.replace(/^\s*[\r\n]/gm, '')
}

// ============================================================================
// GERADORES AUXILIARES DE IMPOSTOS
// ============================================================================

function generateICMSXML(icms: any, crt: string): string {
  // Simples Nacional usa CSOSN, outros usam CST
  if (crt === '1' || crt === '2') {
    // Simples Nacional
    const csosn = icms.CSOSN || '102' // 102 = Tributada sem permissão de crédito

    if (csosn === '101') {
      return `<ICMSSN101>
        <orig>${icms.orig || '0'}</orig>
        <CSOSN>101</CSOSN>
        <pCredSN>${formatDecimal(icms.pCredSN || 0)}</pCredSN>
        <vCredICMSSN>${formatDecimal(icms.vCredICMSSN || 0)}</vCredICMSSN>
      </ICMSSN101>`
    } else if (csosn === '102' || csosn === '103' || csosn === '300' || csosn === '400') {
      return `<ICMSSN102>
        <orig>${icms.orig || '0'}</orig>
        <CSOSN>${csosn}</CSOSN>
      </ICMSSN102>`
    } else if (csosn === '201') {
      return `<ICMSSN201>
        <orig>${icms.orig || '0'}</orig>
        <CSOSN>201</CSOSN>
        <modBCST>${icms.modBCST || '4'}</modBCST>
        <vBCST>${formatDecimal(icms.vBCST || 0)}</vBCST>
        <pICMSST>${formatDecimal(icms.pICMSST || 0)}</pICMSST>
        <vICMSST>${formatDecimal(icms.vICMSST || 0)}</vICMSST>
        <pCredSN>${formatDecimal(icms.pCredSN || 0)}</pCredSN>
        <vCredICMSSN>${formatDecimal(icms.vCredICMSSN || 0)}</vCredICMSSN>
      </ICMSSN201>`
    } else {
      return `<ICMSSN102>
        <orig>${icms.orig || '0'}</orig>
        <CSOSN>102</CSOSN>
      </ICMSSN102>`
    }
  } else {
    // Regime Normal
    const cst = icms.CST || '00'

    if (cst === '00') {
      return `<ICMS00>
        <orig>${icms.orig || '0'}</orig>
        <CST>00</CST>
        <modBC>${icms.modBC || '3'}</modBC>
        <vBC>${formatDecimal(icms.vBC || 0)}</vBC>
        <pICMS>${formatDecimal(icms.pICMS || 0)}</pICMS>
        <vICMS>${formatDecimal(icms.vICMS || 0)}</vICMS>
      </ICMS00>`
    } else if (cst === '10') {
      return `<ICMS10>
        <orig>${icms.orig || '0'}</orig>
        <CST>10</CST>
        <modBC>${icms.modBC || '3'}</modBC>
        <vBC>${formatDecimal(icms.vBC || 0)}</vBC>
        <pICMS>${formatDecimal(icms.pICMS || 0)}</pICMS>
        <vICMS>${formatDecimal(icms.vICMS || 0)}</vICMS>
        <modBCST>${icms.modBCST || '4'}</modBCST>
        <vBCST>${formatDecimal(icms.vBCST || 0)}</vBCST>
        <pICMSST>${formatDecimal(icms.pICMSST || 0)}</pICMSST>
        <vICMSST>${formatDecimal(icms.vICMSST || 0)}</vICMSST>
      </ICMS10>`
    } else if (cst === '20') {
      return `<ICMS20>
        <orig>${icms.orig || '0'}</orig>
        <CST>20</CST>
        <modBC>${icms.modBC || '3'}</modBC>
        <pRedBC>${formatDecimal(icms.pRedBC || 0)}</pRedBC>
        <vBC>${formatDecimal(icms.vBC || 0)}</vBC>
        <pICMS>${formatDecimal(icms.pICMS || 0)}</pICMS>
        <vICMS>${formatDecimal(icms.vICMS || 0)}</vICMS>
      </ICMS20>`
    } else if (cst === '40' || cst === '41' || cst === '50') {
      return `<ICMS40>
        <orig>${icms.orig || '0'}</orig>
        <CST>${cst}</CST>
      </ICMS40>`
    } else if (cst === '60') {
      return `<ICMS60>
        <orig>${icms.orig || '0'}</orig>
        <CST>60</CST>
        <vBCSTRet>${formatDecimal(icms.vBCSTRet || 0)}</vBCSTRet>
        <vICMSSTRet>${formatDecimal(icms.vICMSSTRet || 0)}</vICMSSTRet>
      </ICMS60>`
    } else {
      return `<ICMS40>
        <orig>${icms.orig || '0'}</orig>
        <CST>41</CST>
      </ICMS40>`
    }
  }
}

function generatePISXML(pis: any): string {
  const cst = pis.CST || '07'

  if (['01', '02'].includes(cst)) {
    return `<PISAliq>
      <CST>${escapeXml(cst)}</CST>
      <vBC>${formatDecimal(pis.vBC || 0)}</vBC>
      <pPIS>${formatDecimal(pis.pPIS || 0)}</pPIS>
      <vPIS>${formatDecimal(pis.vPIS || 0)}</vPIS>
    </PISAliq>`
  } else if (cst === '03') {
    return `<PISQtde>
      <CST>03</CST>
      <qBCProd>${formatDecimal(pis.qBCProd || 0, 4)}</qBCProd>
      <vAliqProd>${formatDecimal(pis.vAliqProd || 0, 4)}</vAliqProd>
      <vPIS>${formatDecimal(pis.vPIS || 0)}</vPIS>
    </PISQtde>`
  } else if (['04', '05', '06', '07', '08', '09'].includes(cst)) {
    return `<PISNT>
      <CST>${escapeXml(cst)}</CST>
    </PISNT>`
  } else {
    return `<PISOutr>
      <CST>${escapeXml(cst)}</CST>
      <vBC>${formatDecimal(pis.vBC || 0)}</vBC>
      <pPIS>${formatDecimal(pis.pPIS || 0)}</pPIS>
      <vPIS>${formatDecimal(pis.vPIS || 0)}</vPIS>
    </PISOutr>`
  }
}

function generateCOFINSXML(cofins: any): string {
  const cst = cofins.CST || '07'

  if (['01', '02'].includes(cst)) {
    return `<COFINSAliq>
      <CST>${escapeXml(cst)}</CST>
      <vBC>${formatDecimal(cofins.vBC || 0)}</vBC>
      <pCOFINS>${formatDecimal(cofins.pCOFINS || 0)}</pCOFINS>
      <vCOFINS>${formatDecimal(cofins.vCOFINS || 0)}</vCOFINS>
    </COFINSAliq>`
  } else if (cst === '03') {
    return `<COFINSQtde>
      <CST>03</CST>
      <qBCProd>${formatDecimal(cofins.qBCProd || 0, 4)}</qBCProd>
      <vAliqProd>${formatDecimal(cofins.vAliqProd || 0, 4)}</vAliqProd>
      <vCOFINS>${formatDecimal(cofins.vCOFINS || 0)}</vCOFINS>
    </COFINSQtde>`
  } else if (['04', '05', '06', '07', '08', '09'].includes(cst)) {
    return `<COFINSNT>
      <CST>${escapeXml(cst)}</CST>
    </COFINSNT>`
  } else {
    return `<COFINSOutr>
      <CST>${escapeXml(cst)}</CST>
      <vBC>${formatDecimal(cofins.vBC || 0)}</vBC>
      <pCOFINS>${formatDecimal(cofins.pCOFINS || 0)}</pCOFINS>
      <vCOFINS>${formatDecimal(cofins.vCOFINS || 0)}</vCOFINS>
    </COFINSOutr>`
  }
}

// ============================================================================
// GERADOR DE CHAVE DE ACESSO NFe
// ============================================================================

export function generateAccessKeyNFe(data: NFeXMLData): string {
  const cUF = data.ide.cUF.padStart(2, '0')

  const now = new Date(data.ide.dhEmi)
  const AAMM = `${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}`

  const CNPJ = data.emit.CNPJ.replace(/[^\d]/g, '').padStart(14, '0')
  const mod = data.ide.mod.padStart(2, '0')
  const serie = data.ide.serie.padStart(3, '0')
  const nNF = data.ide.nNF.padStart(9, '0')
  const tpEmis = data.ide.tpEmis.toString()
  const cNF = data.ide.cNF.padStart(8, '0')

  const chaveBase = cUF + AAMM + CNPJ + mod + serie + nNF + tpEmis + cNF

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

// ============================================================================
// UTILITÁRIOS
// ============================================================================

function escapeXml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatDecimal(value: number, decimals: number = 2): string {
  const num = Number(value) || 0
  return num.toFixed(decimals)
}

// ============================================================================
// VALIDADOR DE XML
// ============================================================================

export interface XMLValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export function validateNFSeXML(data: NFSeXMLData): XMLValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validações obrigatórias
  if (!data.numero) errors.push('Número da nota é obrigatório')
  if (!data.dataEmissao) errors.push('Data de emissão é obrigatória')
  if (!data.competencia) errors.push('Competência é obrigatória')

  // Prestador
  if (!data.prestador.cnpj) errors.push('CNPJ do prestador é obrigatório')
  else if (data.prestador.cnpj.replace(/[^\d]/g, '').length !== 14) {
    errors.push('CNPJ do prestador deve ter 14 dígitos')
  }
  if (!data.prestador.inscricaoMunicipal) errors.push('Inscrição Municipal é obrigatória')
  if (!data.prestador.razaoSocial) errors.push('Razão Social do prestador é obrigatória')
  if (!data.prestador.endereco.codigoMunicipio) errors.push('Código do município do prestador é obrigatório')

  // Tomador
  if (!data.tomador.cpfCnpj) errors.push('CPF/CNPJ do tomador é obrigatório')
  else {
    const docLength = data.tomador.cpfCnpj.replace(/[^\d]/g, '').length
    if (docLength !== 11 && docLength !== 14) {
      errors.push('CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos')
    }
  }
  if (!data.tomador.razaoSocial) errors.push('Nome/Razão Social do tomador é obrigatório')

  // Serviço
  if (!data.servico.itemListaServico) errors.push('Código do serviço LC 116 é obrigatório')
  if (!data.servico.discriminacao) errors.push('Discriminação dos serviços é obrigatória')
  if (!data.servico.codigoMunicipioIncidencia) errors.push('Código do município de incidência é obrigatório')

  // Valores
  if (data.valores.valorServicos <= 0) errors.push('Valor dos serviços deve ser maior que zero')
  if (data.valores.aliquota < 2 || data.valores.aliquota > 5) {
    warnings.push('Alíquota ISS deve estar entre 2% e 5% (verificar legislação municipal)')
  }

  // Alertas
  if (!data.tomador.endereco) warnings.push('Endereço do tomador não informado')
  if (!data.tomador.email) warnings.push('Email do tomador não informado')

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function validateNFeXML(data: NFeXMLData): XMLValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // IDE
  if (!data.ide.cUF) errors.push('Código da UF é obrigatório')
  if (!data.ide.cNF) errors.push('Código numérico é obrigatório')
  if (!data.ide.natOp) errors.push('Natureza da operação é obrigatória')
  if (!data.ide.serie) errors.push('Série é obrigatória')
  if (!data.ide.nNF) errors.push('Número da NFe é obrigatório')
  if (!data.ide.dhEmi) errors.push('Data/hora de emissão é obrigatória')
  if (!data.ide.cMunFG) errors.push('Código do município do fato gerador é obrigatório')

  // Emitente
  if (!data.emit.CNPJ) errors.push('CNPJ do emitente é obrigatório')
  else if (data.emit.CNPJ.replace(/[^\d]/g, '').length !== 14) {
    errors.push('CNPJ do emitente deve ter 14 dígitos')
  }
  if (!data.emit.xNome) errors.push('Nome do emitente é obrigatório')
  if (!data.emit.IE) errors.push('Inscrição Estadual é obrigatória')
  if (!data.emit.CRT) errors.push('Código de Regime Tributário é obrigatório')
  if (!data.emit.enderEmit.cMun) errors.push('Código do município do emitente é obrigatório')

  // Destinatário
  if (data.dest) {
    if (!data.dest.CPF && !data.dest.CNPJ) {
      errors.push('CPF ou CNPJ do destinatário é obrigatório')
    }
    if (!data.dest.xNome) errors.push('Nome do destinatário é obrigatório')
  }

  // Produtos/Serviços
  if (!data.det || data.det.length === 0) {
    errors.push('Deve haver pelo menos um produto/serviço')
  } else {
    data.det.forEach((item, idx) => {
      if (!item.prod.cProd) errors.push(`Item ${idx + 1}: Código do produto é obrigatório`)
      if (!item.prod.xProd) errors.push(`Item ${idx + 1}: Descrição é obrigatória`)
      if (!item.prod.NCM) errors.push(`Item ${idx + 1}: NCM é obrigatório`)
      if (!item.prod.CFOP) errors.push(`Item ${idx + 1}: CFOP é obrigatório`)
      if (item.prod.qCom <= 0) errors.push(`Item ${idx + 1}: Quantidade deve ser maior que zero`)
      if (item.prod.vProd <= 0) errors.push(`Item ${idx + 1}: Valor total deve ser maior que zero`)
    })
  }

  // Totais
  if (data.total.ICMSTot.vNF <= 0) {
    errors.push('Valor total da nota deve ser maior que zero')
  }

  // Pagamento
  if (!data.pag || !data.pag.detPag || data.pag.detPag.length === 0) {
    errors.push('Forma de pagamento é obrigatória')
  }

  // Alertas
  if (!data.dest?.email) warnings.push('Email do destinatário não informado')
  if (!data.infAdic?.infCpl) warnings.push('Informações complementares não informadas')

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

// ============================================================================
// CONSTANTES DE PAGAMENTO
// ============================================================================

export const FORMAS_PAGAMENTO = [
  { code: '01', name: 'Dinheiro' },
  { code: '02', name: 'Cheque' },
  { code: '03', name: 'Cartão de Crédito' },
  { code: '04', name: 'Cartão de Débito' },
  { code: '05', name: 'Crédito Loja' },
  { code: '10', name: 'Vale Alimentação' },
  { code: '11', name: 'Vale Refeição' },
  { code: '12', name: 'Vale Presente' },
  { code: '13', name: 'Vale Combustível' },
  { code: '14', name: 'Duplicata Mercantil' },
  { code: '15', name: 'Boleto Bancário' },
  { code: '16', name: 'Depósito Bancário' },
  { code: '17', name: 'Pagamento Instantâneo (PIX)' },
  { code: '18', name: 'Transferência bancária, Carteira Digital' },
  { code: '19', name: 'Programa de fidelidade, Cashback, Crédito Virtual' },
  { code: '90', name: 'Sem pagamento' },
  { code: '99', name: 'Outros' },
]

export const BANDEIRAS_CARTAO = [
  { code: '01', name: 'Visa' },
  { code: '02', name: 'Mastercard' },
  { code: '03', name: 'American Express' },
  { code: '04', name: 'Sorocred' },
  { code: '05', name: 'Diners Club' },
  { code: '06', name: 'Elo' },
  { code: '07', name: 'Hipercard' },
  { code: '08', name: 'Aura' },
  { code: '09', name: 'Cabal' },
  { code: '99', name: 'Outros' },
]
