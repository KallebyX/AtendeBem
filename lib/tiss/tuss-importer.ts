/**
 * Importador de Tabelas TUSS
 *
 * Suporta importação das tabelas ANS:
 * - Tabela 18: Taxas e Diárias
 * - Tabela 19: Materiais e OPME
 * - Tabela 20: Medicamentos
 * - Tabela 22: Procedimentos e Eventos em Saúde
 *
 * Características:
 * - Versionamento histórico (vigência)
 * - Importação incremental
 * - Suporte a CSV e XML
 * - Validação de integridade
 */

import { parse } from 'csv-parse/sync'
import type {
  TUSSProcedimento,
  TUSSMaterial,
  TUSSMedicamento,
  TipoTabela
} from './types'

/**
 * Resultado de uma operação de importação
 */
export interface TUSSImportResult {
  tabela: TipoTabela
  totalRegistros: number
  novos: number
  atualizados: number
  removidos: number
  erros: Array<{
    linha: number
    erro: string
    dados?: any
  }>
  vigenciaInicio: string
  vigenciaFim?: string
}

/**
 * Opções de importação
 */
export interface TUSSImportOptions {
  vigenciaInicio: string
  vigenciaFim?: string
  substituirExistentes?: boolean
  marcarDescontinuados?: boolean
}

/**
 * Registro genérico da TUSS para banco de dados
 */
export interface TUSSRecord {
  id?: string
  codigo_tuss: string
  descricao: string
  tabela_origem: TipoTabela
  grupo?: string
  subgrupo?: string
  capitulo?: string
  vigencia_inicio: string
  vigencia_fim?: string
  valor_referencia?: number
  unidade_medida?: string
  registro_anvisa?: string
  requer_autorizacao: boolean
  cbos_permitidos?: string[]
  dados_extras?: Record<string, any>
  ativo: boolean
  created_at?: string
  updated_at?: string
}

/**
 * Parser de CSV genérico
 */
function parseCSV(content: string, delimiter = ';'): any[] {
  return parse(content, {
    delimiter,
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
    relaxColumnCount: true,
    encoding: 'latin1'
  })
}

/**
 * Limpa e normaliza string
 */
function normalizeString(str: string | undefined | null): string {
  if (!str) return ''
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Valida código TUSS
 */
function validarCodigoTUSS(codigo: string): boolean {
  // Código TUSS deve ter 8 a 10 dígitos
  return /^\d{8,10}$/.test(codigo.replace(/\D/g, ''))
}

/**
 * Importador de Tabela 22 - Procedimentos
 */
export function importarProcedimentos(
  csvContent: string,
  options: TUSSImportOptions
): { records: TUSSRecord[]; errors: TUSSImportResult['erros'] } {
  const records: TUSSRecord[] = []
  const errors: TUSSImportResult['erros'] = []

  try {
    const rows = parseCSV(csvContent)

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const linha = i + 2 // +2 porque CSV começa em 1 e tem header

      try {
        // Mapeia campos comuns de CSVs da ANS
        const codigo = (row['CODIGO'] || row['CD_PROCEDIMENTO'] || row['codigo'] || '').replace(/\D/g, '')
        const descricao = row['DESCRICAO'] || row['DS_PROCEDIMENTO'] || row['descricao'] || ''
        const grupo = row['GRUPO'] || row['DS_GRUPO'] || row['grupo'] || ''
        const subgrupo = row['SUBGRUPO'] || row['DS_SUBGRUPO'] || row['subgrupo'] || ''
        const capitulo = row['CAPITULO'] || row['DS_CAPITULO'] || row['capitulo'] || ''
        const porteAnestesico = row['PORTE'] || row['PORTE_ANESTESICO'] || row['porte'] || ''
        const requerAutorizacao = (row['REQUER_AUTORIZACAO'] || row['AUT_PREVIA'] || 'N').toUpperCase() === 'S'

        if (!codigo) {
          errors.push({ linha, erro: 'Código ausente', dados: row })
          continue
        }

        if (!validarCodigoTUSS(codigo)) {
          errors.push({ linha, erro: `Código inválido: ${codigo}`, dados: row })
          continue
        }

        if (!descricao) {
          errors.push({ linha, erro: 'Descrição ausente', dados: row })
          continue
        }

        records.push({
          codigo_tuss: codigo,
          descricao: normalizeString(descricao),
          tabela_origem: '22',
          grupo: normalizeString(grupo),
          subgrupo: normalizeString(subgrupo),
          capitulo: normalizeString(capitulo),
          vigencia_inicio: options.vigenciaInicio,
          vigencia_fim: options.vigenciaFim,
          requer_autorizacao: requerAutorizacao,
          dados_extras: {
            porte_anestesico: porteAnestesico
          },
          ativo: true
        })
      } catch (err: any) {
        errors.push({ linha, erro: err.message, dados: row })
      }
    }
  } catch (err: any) {
    errors.push({ linha: 0, erro: `Erro ao parsear CSV: ${err.message}` })
  }

  return { records, errors }
}

/**
 * Importador de Tabela 19 - Materiais e OPME
 */
export function importarMateriais(
  csvContent: string,
  options: TUSSImportOptions
): { records: TUSSRecord[]; errors: TUSSImportResult['erros'] } {
  const records: TUSSRecord[] = []
  const errors: TUSSImportResult['erros'] = []

  try {
    const rows = parseCSV(csvContent)

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const linha = i + 2

      try {
        const codigo = (row['CODIGO'] || row['CD_MATERIAL'] || row['codigo'] || '').replace(/\D/g, '')
        const descricao = row['DESCRICAO'] || row['DS_MATERIAL'] || row['descricao'] || ''
        const grupo = row['GRUPO'] || row['DS_GRUPO'] || row['grupo'] || ''
        const registroAnvisa = row['REGISTRO_ANVISA'] || row['REG_ANVISA'] || row['anvisa'] || ''
        const fabricante = row['FABRICANTE'] || row['DS_FABRICANTE'] || ''

        if (!codigo) {
          errors.push({ linha, erro: 'Código ausente', dados: row })
          continue
        }

        if (!descricao) {
          errors.push({ linha, erro: 'Descrição ausente', dados: row })
          continue
        }

        records.push({
          codigo_tuss: codigo,
          descricao: normalizeString(descricao),
          tabela_origem: '19',
          grupo: normalizeString(grupo),
          vigencia_inicio: options.vigenciaInicio,
          vigencia_fim: options.vigenciaFim,
          registro_anvisa: registroAnvisa,
          requer_autorizacao: true, // Materiais geralmente requerem
          dados_extras: {
            fabricante: normalizeString(fabricante)
          },
          ativo: true
        })
      } catch (err: any) {
        errors.push({ linha, erro: err.message, dados: row })
      }
    }
  } catch (err: any) {
    errors.push({ linha: 0, erro: `Erro ao parsear CSV: ${err.message}` })
  }

  return { records, errors }
}

/**
 * Importador de Tabela 20 - Medicamentos
 */
export function importarMedicamentos(
  csvContent: string,
  options: TUSSImportOptions
): { records: TUSSRecord[]; errors: TUSSImportResult['erros'] } {
  const records: TUSSRecord[] = []
  const errors: TUSSImportResult['erros'] = []

  try {
    const rows = parseCSV(csvContent)

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const linha = i + 2

      try {
        const codigo = (row['CODIGO'] || row['CD_MEDICAMENTO'] || row['codigo'] || '').replace(/\D/g, '')
        const descricao = row['DESCRICAO'] || row['DS_MEDICAMENTO'] || row['descricao'] || ''
        const principioAtivo = row['PRINCIPIO_ATIVO'] || row['DS_PRINCIPIO_ATIVO'] || ''
        const apresentacao = row['APRESENTACAO'] || row['DS_APRESENTACAO'] || ''
        const unidadeMedida = row['UNIDADE'] || row['DS_UNIDADE_MEDIDA'] || ''
        const registroAnvisa = row['REGISTRO_ANVISA'] || row['REG_ANVISA'] || ''

        if (!codigo) {
          errors.push({ linha, erro: 'Código ausente', dados: row })
          continue
        }

        if (!descricao) {
          errors.push({ linha, erro: 'Descrição ausente', dados: row })
          continue
        }

        records.push({
          codigo_tuss: codigo,
          descricao: normalizeString(descricao),
          tabela_origem: '20',
          vigencia_inicio: options.vigenciaInicio,
          vigencia_fim: options.vigenciaFim,
          unidade_medida: normalizeString(unidadeMedida),
          registro_anvisa: registroAnvisa,
          requer_autorizacao: false,
          dados_extras: {
            principio_ativo: normalizeString(principioAtivo),
            apresentacao: normalizeString(apresentacao)
          },
          ativo: true
        })
      } catch (err: any) {
        errors.push({ linha, erro: err.message, dados: row })
      }
    }
  } catch (err: any) {
    errors.push({ linha: 0, erro: `Erro ao parsear CSV: ${err.message}` })
  }

  return { records, errors }
}

/**
 * Importador de Tabela 18 - Taxas e Diárias
 */
export function importarTaxasDiarias(
  csvContent: string,
  options: TUSSImportOptions
): { records: TUSSRecord[]; errors: TUSSImportResult['erros'] } {
  const records: TUSSRecord[] = []
  const errors: TUSSImportResult['erros'] = []

  try {
    const rows = parseCSV(csvContent)

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const linha = i + 2

      try {
        const codigo = (row['CODIGO'] || row['CD_TAXA'] || row['codigo'] || '').replace(/\D/g, '')
        const descricao = row['DESCRICAO'] || row['DS_TAXA'] || row['descricao'] || ''
        const grupo = row['GRUPO'] || row['DS_GRUPO'] || row['grupo'] || ''

        if (!codigo) {
          errors.push({ linha, erro: 'Código ausente', dados: row })
          continue
        }

        if (!descricao) {
          errors.push({ linha, erro: 'Descrição ausente', dados: row })
          continue
        }

        records.push({
          codigo_tuss: codigo,
          descricao: normalizeString(descricao),
          tabela_origem: '18',
          grupo: normalizeString(grupo),
          vigencia_inicio: options.vigenciaInicio,
          vigencia_fim: options.vigenciaFim,
          requer_autorizacao: false,
          ativo: true
        })
      } catch (err: any) {
        errors.push({ linha, erro: err.message, dados: row })
      }
    }
  } catch (err: any) {
    errors.push({ linha: 0, erro: `Erro ao parsear CSV: ${err.message}` })
  }

  return { records, errors }
}

/**
 * Importador principal que detecta o tipo de tabela
 */
export function importarTabelaTUSS(
  tabela: TipoTabela,
  csvContent: string,
  options: TUSSImportOptions
): { records: TUSSRecord[]; errors: TUSSImportResult['erros'] } {
  switch (tabela) {
    case '18':
      return importarTaxasDiarias(csvContent, options)
    case '19':
      return importarMateriais(csvContent, options)
    case '20':
      return importarMedicamentos(csvContent, options)
    case '22':
      return importarProcedimentos(csvContent, options)
    default:
      return {
        records: [],
        errors: [{ linha: 0, erro: `Tabela não suportada: ${tabela}` }]
      }
  }
}

/**
 * Converte registro TUSS para formato de inserção SQL
 */
export function toSQLInsert(record: TUSSRecord): {
  columns: string[]
  values: any[]
} {
  return {
    columns: [
      'codigo_tuss',
      'descricao',
      'tabela_origem',
      'grupo',
      'subgrupo',
      'capitulo',
      'vigencia_inicio',
      'vigencia_fim',
      'valor_referencia',
      'unidade_medida',
      'registro_anvisa',
      'requer_autorizacao',
      'cbos_permitidos',
      'dados_extras',
      'ativo'
    ],
    values: [
      record.codigo_tuss,
      record.descricao,
      record.tabela_origem,
      record.grupo || null,
      record.subgrupo || null,
      record.capitulo || null,
      record.vigencia_inicio,
      record.vigencia_fim || null,
      record.valor_referencia || null,
      record.unidade_medida || null,
      record.registro_anvisa || null,
      record.requer_autorizacao,
      record.cbos_permitidos ? JSON.stringify(record.cbos_permitidos) : null,
      record.dados_extras ? JSON.stringify(record.dados_extras) : null,
      record.ativo
    ]
  }
}

/**
 * Gera SQL de criação da tabela TUSS
 */
export function generateTUSSTableSQL(): string {
  return `
-- =====================================================
-- TABELA: tuss_terminologia
-- Terminologia Unificada da Saúde Suplementar
-- Com suporte a versionamento histórico (vigência)
-- =====================================================

CREATE TABLE IF NOT EXISTS tuss_terminologia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identificação
  codigo_tuss VARCHAR(10) NOT NULL,
  descricao TEXT NOT NULL,
  tabela_origem VARCHAR(2) NOT NULL CHECK (tabela_origem IN ('18', '19', '20', '22', '90', '98')),

  -- Classificação hierárquica
  grupo VARCHAR(255),
  subgrupo VARCHAR(255),
  capitulo VARCHAR(255),

  -- Vigência (para versionamento histórico)
  vigencia_inicio DATE NOT NULL,
  vigencia_fim DATE,

  -- Valores e unidades
  valor_referencia DECIMAL(12,4),
  unidade_medida VARCHAR(50),

  -- Registro regulatório
  registro_anvisa VARCHAR(20),

  -- Autorização
  requer_autorizacao BOOLEAN DEFAULT false,
  cbos_permitidos JSONB,

  -- Dados extras (flexível por tipo de tabela)
  dados_extras JSONB,

  -- Status
  ativo BOOLEAN DEFAULT true,

  -- Auditoria
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint de unicidade por código + vigência
  CONSTRAINT uk_tuss_codigo_vigencia UNIQUE (codigo_tuss, tabela_origem, vigencia_inicio)
);

-- Índices para busca eficiente
CREATE INDEX IF NOT EXISTS idx_tuss_codigo ON tuss_terminologia(codigo_tuss);
CREATE INDEX IF NOT EXISTS idx_tuss_tabela ON tuss_terminologia(tabela_origem);
CREATE INDEX IF NOT EXISTS idx_tuss_descricao ON tuss_terminologia USING gin(to_tsvector('portuguese', descricao));
CREATE INDEX IF NOT EXISTS idx_tuss_vigencia ON tuss_terminologia(vigencia_inicio, vigencia_fim);
CREATE INDEX IF NOT EXISTS idx_tuss_grupo ON tuss_terminologia(grupo);
CREATE INDEX IF NOT EXISTS idx_tuss_ativo ON tuss_terminologia(ativo);

-- Índice para busca de código vigente em uma data específica
CREATE INDEX IF NOT EXISTS idx_tuss_codigo_vigente ON tuss_terminologia(codigo_tuss, tabela_origem)
  WHERE ativo = true AND (vigencia_fim IS NULL OR vigencia_fim >= CURRENT_DATE);

-- Função para buscar código TUSS vigente em uma data
CREATE OR REPLACE FUNCTION buscar_tuss_vigente(
  p_codigo VARCHAR,
  p_tabela VARCHAR DEFAULT NULL,
  p_data DATE DEFAULT CURRENT_DATE
) RETURNS TABLE (
  id UUID,
  codigo_tuss VARCHAR,
  descricao TEXT,
  tabela_origem VARCHAR,
  grupo VARCHAR,
  subgrupo VARCHAR,
  valor_referencia DECIMAL,
  requer_autorizacao BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.codigo_tuss,
    t.descricao,
    t.tabela_origem,
    t.grupo,
    t.subgrupo,
    t.valor_referencia,
    t.requer_autorizacao
  FROM tuss_terminologia t
  WHERE t.codigo_tuss = p_codigo
    AND t.ativo = true
    AND t.vigencia_inicio <= p_data
    AND (t.vigencia_fim IS NULL OR t.vigencia_fim >= p_data)
    AND (p_tabela IS NULL OR t.tabela_origem = p_tabela)
  ORDER BY t.vigencia_inicio DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Função para pesquisa de procedimentos com full-text search
CREATE OR REPLACE FUNCTION pesquisar_tuss(
  p_termo TEXT,
  p_tabela VARCHAR DEFAULT NULL,
  p_limite INT DEFAULT 50
) RETURNS TABLE (
  id UUID,
  codigo_tuss VARCHAR,
  descricao TEXT,
  tabela_origem VARCHAR,
  grupo VARCHAR,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.codigo_tuss,
    t.descricao,
    t.tabela_origem,
    t.grupo,
    ts_rank(to_tsvector('portuguese', t.descricao), plainto_tsquery('portuguese', p_termo)) as rank
  FROM tuss_terminologia t
  WHERE t.ativo = true
    AND (t.vigencia_fim IS NULL OR t.vigencia_fim >= CURRENT_DATE)
    AND (p_tabela IS NULL OR t.tabela_origem = p_tabela)
    AND (
      t.codigo_tuss ILIKE p_termo || '%'
      OR to_tsvector('portuguese', t.descricao) @@ plainto_tsquery('portuguese', p_termo)
    )
  ORDER BY rank DESC, t.descricao
  LIMIT p_limite;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_tuss_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_tuss_updated_at ON tuss_terminologia;
CREATE TRIGGER trigger_tuss_updated_at
  BEFORE UPDATE ON tuss_terminologia
  FOR EACH ROW EXECUTE FUNCTION update_tuss_updated_at();

-- Comentários
COMMENT ON TABLE tuss_terminologia IS 'Terminologia Unificada da Saúde Suplementar (TUSS) com versionamento histórico';
COMMENT ON COLUMN tuss_terminologia.tabela_origem IS '18=Taxas/Diárias, 19=Materiais/OPME, 20=Medicamentos, 22=Procedimentos';
COMMENT ON COLUMN tuss_terminologia.vigencia_inicio IS 'Data de início da vigência deste código';
COMMENT ON COLUMN tuss_terminologia.vigencia_fim IS 'Data fim da vigência (NULL = ainda vigente)';
`
}

/**
 * Gera estatísticas de uma importação
 */
export function gerarRelatorioImportacao(result: TUSSImportResult): string {
  const linhas = [
    `=== Relatório de Importação TUSS ===`,
    ``,
    `Tabela: ${result.tabela}`,
    `Vigência: ${result.vigenciaInicio}${result.vigenciaFim ? ` até ${result.vigenciaFim}` : ' (sem fim definido)'}`,
    ``,
    `Resumo:`,
    `  Total de registros processados: ${result.totalRegistros}`,
    `  Novos registros: ${result.novos}`,
    `  Registros atualizados: ${result.atualizados}`,
    `  Registros marcados como descontinuados: ${result.removidos}`,
    `  Erros encontrados: ${result.erros.length}`,
    ``
  ]

  if (result.erros.length > 0) {
    linhas.push(`Erros (primeiros 10):`)
    for (const erro of result.erros.slice(0, 10)) {
      linhas.push(`  Linha ${erro.linha}: ${erro.erro}`)
    }
  }

  return linhas.join('\n')
}

/**
 * Valida integridade dos dados importados
 */
export function validarIntegridade(records: TUSSRecord[]): {
  valido: boolean
  alertas: string[]
} {
  const alertas: string[] = []
  const codigosVisto = new Set<string>()

  for (const record of records) {
    // Verifica duplicatas
    const chave = `${record.codigo_tuss}_${record.tabela_origem}`
    if (codigosVisto.has(chave)) {
      alertas.push(`Código duplicado: ${record.codigo_tuss} (tabela ${record.tabela_origem})`)
    }
    codigosVisto.add(chave)

    // Verifica descrição muito curta
    if (record.descricao.length < 5) {
      alertas.push(`Descrição muito curta: ${record.codigo_tuss}`)
    }

    // Verifica formato do código
    if (!/^\d{8,10}$/.test(record.codigo_tuss)) {
      alertas.push(`Formato de código inválido: ${record.codigo_tuss}`)
    }
  }

  return {
    valido: alertas.length === 0,
    alertas
  }
}
