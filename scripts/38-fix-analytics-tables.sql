-- Migration: Correção das tabelas de Analytics para suportar user_id
-- Data: 2025-12-22

-- Adicionar política para user_id nas tabelas de analytics
DROP POLICY IF EXISTS "Users can view own events by user_id" ON analytics_events;
CREATE POLICY "Users can view own events by user_id" ON analytics_events
    FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can create own events by user_id" ON analytics_events;
CREATE POLICY "Users can create own events by user_id" ON analytics_events
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can view own reports by user_id" ON saved_reports;
CREATE POLICY "Users can view own reports by user_id" ON saved_reports
    FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own reports by user_id" ON saved_reports;
CREATE POLICY "Users can manage own reports by user_id" ON saved_reports
    FOR ALL USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- Adicionar colunas adicionais para analytics se não existirem
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS session_id VARCHAR(255);
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS ip_address INET;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_created ON analytics_events(user_id, created_at DESC);
