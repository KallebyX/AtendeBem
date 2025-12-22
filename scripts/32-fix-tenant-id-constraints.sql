-- Migration: Fix tenant_id constraints and other schema issues
-- Data: 2025-12-22
-- Descrição: Corrige erros de tenant_id em tabelas multi-tenant, adiciona cost_price
--            e expande CHECK constraint de contracts

-- =====================================================
-- 1. FUNÇÃO PARA AUTO-SETAR tenant_id A PARTIR DO USUÁRIO
-- =====================================================

CREATE OR REPLACE FUNCTION public.auto_set_tenant_id_from_user()
RETURNS TRIGGER AS $$
DECLARE
    v_tenant_id UUID;
BEGIN
    -- Se tenant_id já foi fornecido, usa ele
    IF NEW.tenant_id IS NOT NULL THEN
        RETURN NEW;
    END IF;

    -- Tenta obter do contexto da aplicação primeiro
    BEGIN
        v_tenant_id := current_setting('app.current_tenant_id', true)::uuid;
    EXCEPTION WHEN OTHERS THEN
        v_tenant_id := NULL;
    END;

    -- Se não tem no contexto, busca do usuário
    IF v_tenant_id IS NULL AND NEW.user_id IS NOT NULL THEN
        SELECT tenant_id INTO v_tenant_id
        FROM users
        WHERE id = NEW.user_id;
    END IF;

    -- Se ainda não encontrou, usa o tenant default
    IF v_tenant_id IS NULL THEN
        v_tenant_id := '00000000-0000-0000-0000-000000000001'::uuid;
    END IF;

    NEW.tenant_id := v_tenant_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.auto_set_tenant_id_from_user IS 'Auto-popula tenant_id baseado no user_id ou contexto da aplicação';

-- =====================================================
-- 2. TRIGGERS PARA AUTO-SET tenant_id EM CADA TABELA
-- =====================================================

-- Telemedicine Sessions
DROP TRIGGER IF EXISTS trg_telemedicine_sessions_tenant ON telemedicine_sessions;
CREATE TRIGGER trg_telemedicine_sessions_tenant
    BEFORE INSERT ON telemedicine_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_set_tenant_id_from_user();

-- Telemedicine Waiting Room
DROP TRIGGER IF EXISTS trg_telemedicine_waiting_room_tenant ON telemedicine_waiting_room;
CREATE TRIGGER trg_telemedicine_waiting_room_tenant
    BEFORE INSERT ON telemedicine_waiting_room
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_set_tenant_id_from_user();

-- Biometric Templates
DROP TRIGGER IF EXISTS trg_biometric_templates_tenant ON biometric_templates;
CREATE TRIGGER trg_biometric_templates_tenant
    BEFORE INSERT ON biometric_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_set_tenant_id_from_user();

-- Biometric Verifications (precisa de função especial pois não tem user_id direto)
CREATE OR REPLACE FUNCTION public.auto_set_tenant_id_for_biometric_verification()
RETURNS TRIGGER AS $$
DECLARE
    v_tenant_id UUID;
BEGIN
    IF NEW.tenant_id IS NOT NULL THEN
        RETURN NEW;
    END IF;

    -- Busca tenant_id do template relacionado
    SELECT tenant_id INTO v_tenant_id
    FROM biometric_templates
    WHERE id = NEW.template_id;

    IF v_tenant_id IS NULL THEN
        v_tenant_id := '00000000-0000-0000-0000-000000000001'::uuid;
    END IF;

    NEW.tenant_id := v_tenant_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_biometric_verifications_tenant ON biometric_verifications;
CREATE TRIGGER trg_biometric_verifications_tenant
    BEFORE INSERT ON biometric_verifications
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_set_tenant_id_for_biometric_verification();

-- Clinics
DROP TRIGGER IF EXISTS trg_clinics_tenant ON clinics;
CREATE TRIGGER trg_clinics_tenant
    BEFORE INSERT ON clinics
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_set_tenant_id_from_user();

-- Rooms (precisa de função especial pois referencia clinic)
CREATE OR REPLACE FUNCTION public.auto_set_tenant_id_for_room()
RETURNS TRIGGER AS $$
DECLARE
    v_tenant_id UUID;
BEGIN
    IF NEW.tenant_id IS NOT NULL THEN
        RETURN NEW;
    END IF;

    -- Busca tenant_id da clínica relacionada
    SELECT tenant_id INTO v_tenant_id
    FROM clinics
    WHERE id = NEW.clinic_id;

    IF v_tenant_id IS NULL THEN
        v_tenant_id := '00000000-0000-0000-0000-000000000001'::uuid;
    END IF;

    NEW.tenant_id := v_tenant_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_rooms_tenant ON rooms;
CREATE TRIGGER trg_rooms_tenant
    BEFORE INSERT ON rooms
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_set_tenant_id_for_room();

-- Staff Schedules
DROP TRIGGER IF EXISTS trg_staff_schedules_tenant ON staff_schedules;
CREATE TRIGGER trg_staff_schedules_tenant
    BEFORE INSERT ON staff_schedules
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_set_tenant_id_from_user();

-- Medical Images
DROP TRIGGER IF EXISTS trg_medical_images_tenant ON medical_images;
CREATE TRIGGER trg_medical_images_tenant
    BEFORE INSERT ON medical_images
    FOR EACH ROW
    EXECUTE FUNCTION public.auto_set_tenant_id_from_user();

-- =====================================================
-- 3. ADICIONAR COLUNA cost_price EM inventory_items
-- =====================================================

-- Adicionar cost_price como alias/cópia de unit_cost
ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS cost_price DECIMAL(10, 2);

-- Sincronizar valores existentes
UPDATE inventory_items
SET cost_price = unit_cost
WHERE cost_price IS NULL AND unit_cost IS NOT NULL;

-- Criar trigger para manter sincronia entre unit_cost e cost_price
CREATE OR REPLACE FUNCTION sync_inventory_cost()
RETURNS TRIGGER AS $$
BEGIN
    -- Se cost_price foi definido, sincroniza com unit_cost
    IF NEW.cost_price IS DISTINCT FROM OLD.cost_price THEN
        NEW.unit_cost := NEW.cost_price;
    -- Se unit_cost foi definido, sincroniza com cost_price
    ELSIF NEW.unit_cost IS DISTINCT FROM OLD.unit_cost THEN
        NEW.cost_price := NEW.unit_cost;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_inventory_cost ON inventory_items;
CREATE TRIGGER trg_sync_inventory_cost
    BEFORE INSERT OR UPDATE ON inventory_items
    FOR EACH ROW
    EXECUTE FUNCTION sync_inventory_cost();

-- =====================================================
-- 4. CORRIGIR CHECK CONSTRAINT DE contracts
-- =====================================================

-- Remover constraint antiga
ALTER TABLE contracts DROP CONSTRAINT IF EXISTS contracts_contract_type_check;

-- Adicionar constraint expandida
ALTER TABLE contracts ADD CONSTRAINT contracts_contract_type_check
CHECK (contract_type IN (
    -- Tipos originais
    'treatment_plan',
    'service_agreement',
    'informed_consent',
    'privacy_policy',
    'payment_plan',
    'telemedicine_consent',
    'other',
    -- Novos tipos adicionais
    'service',
    'employment',
    'partnership',
    'subscription',
    'lease',
    'rental',
    'maintenance',
    'consulting',
    'medical_record_release',
    'data_processing',
    'terms_of_service',
    'liability_waiver'
));

-- =====================================================
-- 5. ADICIONAR user_id EM TABELAS QUE NÃO TÊM
-- =====================================================

-- Adicionar user_id em clinics se não existir
ALTER TABLE clinics ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- Adicionar user_id em rooms se não existir
ALTER TABLE rooms ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- Adicionar user_id em telemedicine_waiting_room se não existir
ALTER TABLE telemedicine_waiting_room ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id) ON DELETE SET NULL;

-- =====================================================
-- 6. ATUALIZAR RLS POLICIES PARA USAR user_id ALÉM DE tenant_id
-- =====================================================

-- Clinics - permitir acesso por user_id OU tenant_id
DROP POLICY IF EXISTS clinics_select ON clinics;
CREATE POLICY clinics_select ON clinics
    FOR SELECT USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS clinics_insert ON clinics;
CREATE POLICY clinics_insert ON clinics
    FOR INSERT WITH CHECK (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS clinics_update ON clinics;
CREATE POLICY clinics_update ON clinics
    FOR UPDATE USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS clinics_delete ON clinics;
CREATE POLICY clinics_delete ON clinics
    FOR DELETE USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

-- Rooms - permitir acesso por user_id OU tenant_id
DROP POLICY IF EXISTS rooms_select ON rooms;
CREATE POLICY rooms_select ON rooms
    FOR SELECT USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS rooms_insert ON rooms;
CREATE POLICY rooms_insert ON rooms
    FOR INSERT WITH CHECK (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS rooms_update ON rooms;
CREATE POLICY rooms_update ON rooms
    FOR UPDATE USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS rooms_delete ON rooms;
CREATE POLICY rooms_delete ON rooms
    FOR DELETE USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

-- Telemedicine Sessions - permitir acesso por user_id
DROP POLICY IF EXISTS "Users can view own sessions" ON telemedicine_sessions;
CREATE POLICY "Users can view own sessions" ON telemedicine_sessions
    FOR SELECT USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS "Users can manage own sessions" ON telemedicine_sessions;
CREATE POLICY "Users can manage own sessions" ON telemedicine_sessions
    FOR ALL USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

-- Medical Images - permitir acesso por user_id
DROP POLICY IF EXISTS medical_images_select ON medical_images;
CREATE POLICY medical_images_select ON medical_images
    FOR SELECT USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS medical_images_insert ON medical_images;
CREATE POLICY medical_images_insert ON medical_images
    FOR INSERT WITH CHECK (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS medical_images_update ON medical_images;
CREATE POLICY medical_images_update ON medical_images
    FOR UPDATE USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS medical_images_delete ON medical_images;
CREATE POLICY medical_images_delete ON medical_images
    FOR DELETE USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

-- Biometric Templates - permitir acesso por user_id
DROP POLICY IF EXISTS biometric_templates_select ON biometric_templates;
CREATE POLICY biometric_templates_select ON biometric_templates
    FOR SELECT USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS biometric_templates_insert ON biometric_templates;
CREATE POLICY biometric_templates_insert ON biometric_templates
    FOR INSERT WITH CHECK (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS biometric_templates_update ON biometric_templates;
CREATE POLICY biometric_templates_update ON biometric_templates
    FOR UPDATE USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

DROP POLICY IF EXISTS biometric_templates_delete ON biometric_templates;
CREATE POLICY biometric_templates_delete ON biometric_templates
    FOR DELETE USING (
        user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid
        OR tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
    );

-- =====================================================
-- 7. ÍNDICES PARA user_id NAS NOVAS COLUNAS
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_clinics_user ON clinics(user_id);
CREATE INDEX IF NOT EXISTS idx_rooms_user ON rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_rooms_tenant ON rooms(tenant_id);
CREATE INDEX IF NOT EXISTS idx_telemedicine_waiting_room_user ON telemedicine_waiting_room(user_id);

-- =====================================================
-- 8. COMENTÁRIOS
-- =====================================================

COMMENT ON FUNCTION public.auto_set_tenant_id_from_user IS 'Trigger function que auto-popula tenant_id baseado no user_id do registro';
COMMENT ON FUNCTION public.auto_set_tenant_id_for_biometric_verification IS 'Trigger function que auto-popula tenant_id para verificações biométricas';
COMMENT ON FUNCTION public.auto_set_tenant_id_for_room IS 'Trigger function que auto-popula tenant_id para salas baseado na clínica';
COMMENT ON FUNCTION sync_inventory_cost IS 'Mantém sincronia entre unit_cost e cost_price em inventory_items';
