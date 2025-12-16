-- Tabela para armazenar sessões de assinatura digital
-- Necessária para o fluxo OAuth PKCE do VIDaaS

CREATE TABLE IF NOT EXISTS signature_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code_verifier TEXT NOT NULL,
  prescription_id UUID,
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, expired, failed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '10 minutes'),
  UNIQUE(user_id)
);

-- Índice para busca por usuário
CREATE INDEX IF NOT EXISTS idx_signature_sessions_user ON signature_sessions(user_id);

-- Índice para limpeza de sessões expiradas
CREATE INDEX IF NOT EXISTS idx_signature_sessions_expires ON signature_sessions(expires_at);

-- Adicionar colunas de assinatura digital na tabela de usuários se não existirem
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'cpf') THEN
    ALTER TABLE users ADD COLUMN cpf VARCHAR(14);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'has_digital_certificate') THEN
    ALTER TABLE users ADD COLUMN has_digital_certificate BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'certificate_provider') THEN
    ALTER TABLE users ADD COLUMN certificate_provider VARCHAR(50);
  END IF;
END $$;

-- Adicionar colunas de diagnóstico na tabela de atendimentos se não existirem
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'diagnosis') THEN
    ALTER TABLE appointments ADD COLUMN diagnosis TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'treatment_plan') THEN
    ALTER TABLE appointments ADD COLUMN treatment_plan TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'main_complaint') THEN
    ALTER TABLE appointments ADD COLUMN main_complaint TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'clinical_history') THEN
    ALTER TABLE appointments ADD COLUMN clinical_history TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'appointments' AND column_name = 'physical_exam') THEN
    ALTER TABLE appointments ADD COLUMN physical_exam TEXT;
  END IF;
END $$;

-- Função para limpar sessões expiradas (executar via cron)
CREATE OR REPLACE FUNCTION cleanup_expired_signature_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM signature_sessions WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- Comentários para documentação
COMMENT ON TABLE signature_sessions IS 'Armazena sessões temporárias para fluxo de assinatura digital OAuth PKCE';
COMMENT ON COLUMN signature_sessions.code_verifier IS 'Code verifier do PKCE, usado para trocar authorization code por access token';
COMMENT ON COLUMN signature_sessions.status IS 'Status da sessão: pending, completed, expired, failed';
