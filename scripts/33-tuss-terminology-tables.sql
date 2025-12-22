-- =====================================================
-- Migration: Tabelas TUSS com Versionamento Histórico
-- Data: 2025-12
-- Descrição: Cria estrutura para armazenar terminologia
--            TUSS com suporte a múltiplas vigências
-- =====================================================

-- =====================================================
-- TABELA: tuss_terminologia
-- Terminologia Unificada da Saúde Suplementar
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
  porte_anestesico VARCHAR(10),

  -- Registro regulatório (para materiais e medicamentos)
  registro_anvisa VARCHAR(20),
  fabricante VARCHAR(255),
  principio_ativo VARCHAR(255),
  apresentacao VARCHAR(255),

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

  -- Constraint de unicidade por código + tabela + vigência
  CONSTRAINT uk_tuss_codigo_vigencia UNIQUE (codigo_tuss, tabela_origem, vigencia_inicio)
);

-- =====================================================
-- ÍNDICES
-- =====================================================

-- Índice principal para busca por código
CREATE INDEX IF NOT EXISTS idx_tuss_codigo ON tuss_terminologia(codigo_tuss);

-- Índice para filtrar por tabela
CREATE INDEX IF NOT EXISTS idx_tuss_tabela ON tuss_terminologia(tabela_origem);

-- Índice para busca full-text em português
CREATE INDEX IF NOT EXISTS idx_tuss_descricao ON tuss_terminologia
  USING gin(to_tsvector('portuguese', descricao));

-- Índice para consultas por vigência
CREATE INDEX IF NOT EXISTS idx_tuss_vigencia ON tuss_terminologia(vigencia_inicio, vigencia_fim);

-- Índice para filtrar por grupo
CREATE INDEX IF NOT EXISTS idx_tuss_grupo ON tuss_terminologia(grupo);

-- Índice para registros ativos
CREATE INDEX IF NOT EXISTS idx_tuss_ativo ON tuss_terminologia(ativo) WHERE ativo = true;

-- Índice composto para busca de código vigente
-- Nota: A verificação de vigencia_fim >= CURRENT_DATE deve ser feita na query,
-- pois CURRENT_DATE não é IMMUTABLE e não pode ser usado em predicados de índice
CREATE INDEX IF NOT EXISTS idx_tuss_codigo_vigente ON tuss_terminologia(codigo_tuss, tabela_origem, vigencia_fim)
  WHERE ativo = true;

-- Índice para ANVISA (materiais e medicamentos)
CREATE INDEX IF NOT EXISTS idx_tuss_anvisa ON tuss_terminologia(registro_anvisa)
  WHERE registro_anvisa IS NOT NULL;

-- =====================================================
-- FUNÇÕES
-- =====================================================

-- Função para buscar código TUSS vigente em uma data específica
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
  requer_autorizacao BOOLEAN,
  porte_anestesico VARCHAR
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
    t.requer_autorizacao,
    t.porte_anestesico
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

-- =====================================================
-- TABELA: tuss_importacoes
-- Histórico de importações de tabelas TUSS
-- =====================================================
CREATE TABLE IF NOT EXISTS tuss_importacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),

  -- Identificação
  tabela_origem VARCHAR(2) NOT NULL,
  versao VARCHAR(50) NOT NULL,
  fonte VARCHAR(255), -- URL ou nome do arquivo

  -- Vigência
  vigencia_inicio DATE NOT NULL,
  vigencia_fim DATE,

  -- Estatísticas
  total_registros INTEGER DEFAULT 0,
  registros_novos INTEGER DEFAULT 0,
  registros_atualizados INTEGER DEFAULT 0,
  registros_removidos INTEGER DEFAULT 0,
  erros INTEGER DEFAULT 0,

  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN (
    'pending', 'processing', 'completed', 'failed'
  )),

  -- Detalhes
  log_erros JSONB,
  observacoes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tuss_importacoes_user ON tuss_importacoes(user_id);
CREATE INDEX IF NOT EXISTS idx_tuss_importacoes_tabela ON tuss_importacoes(tabela_origem);
CREATE INDEX IF NOT EXISTS idx_tuss_importacoes_status ON tuss_importacoes(status);

-- =====================================================
-- TABELA: tiss_operadoras
-- Cadastro de operadoras de saúde
-- =====================================================
CREATE TABLE IF NOT EXISTS tiss_operadoras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Identificação ANS
  registro_ans VARCHAR(6) NOT NULL,
  razao_social VARCHAR(255) NOT NULL,
  nome_fantasia VARCHAR(255),
  cnpj VARCHAR(14),

  -- Configuração de comunicação
  endpoint_webservice VARCHAR(500),
  endpoint_wsdl VARCHAR(500),
  soap_version VARCHAR(3) DEFAULT '1.1' CHECK (soap_version IN ('1.1', '1.2')),
  namespace_ws VARCHAR(255),

  -- Autenticação
  usa_login_header BOOLEAN DEFAULT true,
  login VARCHAR(100),
  senha_encrypted TEXT, -- Criptografada
  codigo_prestador VARCHAR(50),

  -- Certificado
  requer_certificado BOOLEAN DEFAULT false,
  certificado_tipo VARCHAR(2) CHECK (certificado_tipo IN ('A1', 'A3')),
  certificado_arquivo TEXT, -- Base64 do PFX para A1
  certificado_senha_encrypted TEXT,
  certificado_validade DATE,

  -- Versão TISS
  versao_tiss VARCHAR(10) DEFAULT '4.01.00',

  -- Headers customizados
  headers_customizados JSONB,

  -- Status
  ativo BOOLEAN DEFAULT true,
  ultimo_teste TIMESTAMPTZ,
  ultimo_teste_sucesso BOOLEAN,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT uk_operadora_ans_user UNIQUE (user_id, registro_ans)
);

CREATE INDEX IF NOT EXISTS idx_tiss_operadoras_user ON tiss_operadoras(user_id);
CREATE INDEX IF NOT EXISTS idx_tiss_operadoras_ans ON tiss_operadoras(registro_ans);
CREATE INDEX IF NOT EXISTS idx_tiss_operadoras_ativo ON tiss_operadoras(ativo) WHERE ativo = true;

-- =====================================================
-- TABELA: tiss_glosas_recebidas
-- Histórico de glosas recebidas das operadoras
-- =====================================================
CREATE TABLE IF NOT EXISTS tiss_glosas_recebidas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Referências
  submission_id UUID REFERENCES tiss_submissions(id) ON DELETE SET NULL,
  guide_id UUID REFERENCES tiss_guides(id) ON DELETE SET NULL,

  -- Identificação da glosa
  codigo_glosa VARCHAR(10) NOT NULL,
  descricao_glosa TEXT,
  categoria VARCHAR(50), -- ADMINISTRATIVA, TECNICA, etc.

  -- Item glosado
  sequencial_item INTEGER,
  codigo_procedimento VARCHAR(10),
  descricao_procedimento TEXT,

  -- Valores
  valor_original DECIMAL(10,2),
  valor_glosado DECIMAL(10,2) NOT NULL,

  -- Status do recurso
  status VARCHAR(50) DEFAULT 'pendente' CHECK (status IN (
    'pendente', 'recurso_enviado', 'recurso_aceito', 'recurso_negado', 'aceita'
  )),

  -- Recurso
  recurso_protocolo VARCHAR(50),
  recurso_data TIMESTAMPTZ,
  recurso_justificativa TEXT,
  recurso_anexos JSONB,

  -- Resultado do recurso
  resultado_data TIMESTAMPTZ,
  resultado_valor_recuperado DECIMAL(10,2),
  resultado_observacao TEXT,

  -- Ação automatizada
  acao_sugerida VARCHAR(50),
  recurso_automatico BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tiss_glosas_user ON tiss_glosas_recebidas(user_id);
CREATE INDEX IF NOT EXISTS idx_tiss_glosas_submission ON tiss_glosas_recebidas(submission_id);
CREATE INDEX IF NOT EXISTS idx_tiss_glosas_guide ON tiss_glosas_recebidas(guide_id);
CREATE INDEX IF NOT EXISTS idx_tiss_glosas_codigo ON tiss_glosas_recebidas(codigo_glosa);
CREATE INDEX IF NOT EXISTS idx_tiss_glosas_status ON tiss_glosas_recebidas(status);
CREATE INDEX IF NOT EXISTS idx_tiss_glosas_categoria ON tiss_glosas_recebidas(categoria);

-- =====================================================
-- RLS POLICIES
-- =====================================================

ALTER TABLE tuss_terminologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE tuss_importacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiss_operadoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiss_glosas_recebidas ENABLE ROW LEVEL SECURITY;

-- TUSS Terminologia (leitura pública, escrita restrita)
DROP POLICY IF EXISTS "Anyone can read TUSS" ON tuss_terminologia;
CREATE POLICY "Anyone can read TUSS" ON tuss_terminologia
  FOR SELECT USING (true);

-- TUSS Importações
DROP POLICY IF EXISTS "Users can manage own imports" ON tuss_importacoes;
CREATE POLICY "Users can manage own imports" ON tuss_importacoes
  FOR ALL USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Operadoras
DROP POLICY IF EXISTS "Users can manage own operadoras" ON tiss_operadoras;
CREATE POLICY "Users can manage own operadoras" ON tiss_operadoras
  FOR ALL USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Glosas
DROP POLICY IF EXISTS "Users can manage own glosas" ON tiss_glosas_recebidas;
CREATE POLICY "Users can manage own glosas" ON tiss_glosas_recebidas
  FOR ALL USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_tuss_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_tuss_term_updated ON tuss_terminologia;
CREATE TRIGGER trigger_tuss_term_updated
  BEFORE UPDATE ON tuss_terminologia
  FOR EACH ROW EXECUTE FUNCTION update_tuss_updated_at();

DROP TRIGGER IF EXISTS trigger_tuss_import_updated ON tuss_importacoes;
CREATE TRIGGER trigger_tuss_import_updated
  BEFORE UPDATE ON tuss_importacoes
  FOR EACH ROW EXECUTE FUNCTION update_tuss_updated_at();

DROP TRIGGER IF EXISTS trigger_tiss_operadoras_updated ON tiss_operadoras;
CREATE TRIGGER trigger_tiss_operadoras_updated
  BEFORE UPDATE ON tiss_operadoras
  FOR EACH ROW EXECUTE FUNCTION update_tuss_updated_at();

DROP TRIGGER IF EXISTS trigger_tiss_glosas_updated ON tiss_glosas_recebidas;
CREATE TRIGGER trigger_tiss_glosas_updated
  BEFORE UPDATE ON tiss_glosas_recebidas
  FOR EACH ROW EXECUTE FUNCTION update_tuss_updated_at();

-- =====================================================
-- COMENTÁRIOS
-- =====================================================

COMMENT ON TABLE tuss_terminologia IS 'Terminologia Unificada da Saúde Suplementar (TUSS) com versionamento histórico';
COMMENT ON COLUMN tuss_terminologia.tabela_origem IS '18=Taxas/Diárias, 19=Materiais/OPME, 20=Medicamentos, 22=Procedimentos';
COMMENT ON COLUMN tuss_terminologia.vigencia_inicio IS 'Data de início da vigência deste código';
COMMENT ON COLUMN tuss_terminologia.vigencia_fim IS 'Data fim da vigência (NULL = ainda vigente)';

COMMENT ON TABLE tuss_importacoes IS 'Histórico de importações de tabelas TUSS';
COMMENT ON TABLE tiss_operadoras IS 'Cadastro de operadoras de saúde com configurações de integração';
COMMENT ON TABLE tiss_glosas_recebidas IS 'Histórico de glosas recebidas e status de recursos';
