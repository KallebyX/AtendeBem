-- Script para habilitar a extensão pgcrypto
-- Necessária para a função gen_random_bytes usada na geração de tokens de validação

-- Habilita a extensão pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Recria a função generate_validation_token() para garantir que funcione corretamente
CREATE OR REPLACE FUNCTION generate_validation_token()
RETURNS TEXT AS $$
DECLARE
    token TEXT;
    exists_flag BOOLEAN;
BEGIN
    LOOP
        -- Gera um token aleatório de 32 caracteres usando pgcrypto
        token := encode(gen_random_bytes(24), 'base64');
        token := replace(token, '/', '_');
        token := replace(token, '+', '-');
        token := substring(token, 1, 32);

        -- Verifica se já existe
        SELECT EXISTS(SELECT 1 FROM digital_prescriptions WHERE validation_token = token) INTO exists_flag;
        EXIT WHEN NOT exists_flag;
    END LOOP;

    RETURN token;
END;
$$ LANGUAGE plpgsql;

-- Comentário explicativo
COMMENT ON EXTENSION pgcrypto IS 'Extensão criptográfica do PostgreSQL - necessária para gen_random_bytes()';
