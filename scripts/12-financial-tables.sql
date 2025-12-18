-- Migration: Tabelas do Módulo Financeiro (MOD-FAT)
-- Data: 2025-12-17

-- =====================================================
-- TABELA: financial_transactions
-- =====================================================
CREATE TABLE IF NOT EXISTS financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Tipo e categoria
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    category VARCHAR(100) NOT NULL,
    
    -- Valores
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    description TEXT NOT NULL,
    
    -- Pagamento
    payment_method VARCHAR(100) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'cancelled', 'refunded')),
    due_date DATE NOT NULL,
    paid_date DATE,
    
    -- Relacionamentos
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    
    -- Documentação
    receipt_number VARCHAR(50) UNIQUE,
    invoice_number VARCHAR(50) UNIQUE,
    notes TEXT,
    
    -- Metadados (tags, custom fields, etc)
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_financial_transactions_tenant ON financial_transactions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_user ON financial_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_type ON financial_transactions(type);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_status ON financial_transactions(payment_status);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_dates ON financial_transactions(due_date, paid_date);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_patient ON financial_transactions(patient_id);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_appointment ON financial_transactions(appointment_id);
CREATE INDEX IF NOT EXISTS idx_financial_transactions_created ON financial_transactions(created_at DESC);

-- Row Level Security
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own financial transactions" ON financial_transactions;
CREATE POLICY "Users can view own financial transactions" ON financial_transactions
    FOR SELECT USING (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can create own financial transactions" ON financial_transactions;
CREATE POLICY "Users can create own financial transactions" ON financial_transactions
    FOR INSERT WITH CHECK (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can update own financial transactions" ON financial_transactions;
CREATE POLICY "Users can update own financial transactions" ON financial_transactions
    FOR UPDATE USING (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can delete own financial transactions" ON financial_transactions;
CREATE POLICY "Users can delete own financial transactions" ON financial_transactions
    FOR DELETE USING (
        tenant_id = current_setting('app.current_tenant_id', true)::uuid
    );

-- =====================================================
-- TABELA: revenue_categories
-- =====================================================
CREATE TABLE IF NOT EXISTS revenue_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    color VARCHAR(7) DEFAULT '#0066cc',
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_revenue_categories_tenant ON revenue_categories(tenant_id);
CREATE INDEX IF NOT EXISTS idx_revenue_categories_type ON revenue_categories(type);

ALTER TABLE revenue_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own categories" ON revenue_categories;
CREATE POLICY "Users can view own categories" ON revenue_categories
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own categories" ON revenue_categories;
CREATE POLICY "Users can manage own categories" ON revenue_categories
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- =====================================================
-- TABELA: payment_methods
-- =====================================================
CREATE TABLE IF NOT EXISTS payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('cash', 'credit_card', 'debit_card', 'pix', 'bank_transfer', 'check', 'insurance', 'other')),
    is_active BOOLEAN DEFAULT true,
    fees_percentage DECIMAL(5, 2) DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_methods_tenant ON payment_methods(tenant_id);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payment methods" ON payment_methods;
CREATE POLICY "Users can view own payment methods" ON payment_methods
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own payment methods" ON payment_methods;
CREATE POLICY "Users can manage own payment methods" ON payment_methods
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- =====================================================
-- SEED: Categorias e Métodos de Pagamento Padrão
-- =====================================================

-- Categorias de Receita Padrão
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Consultas', 'income', '#10b981', 'user'),
('00000000-0000-0000-0000-000000000001', 'Procedimentos', 'income', '#3b82f6', 'activity'),
('00000000-0000-0000-0000-000000000001', 'Exames', 'income', '#8b5cf6', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'Retornos', 'income', '#06b6d4', 'repeat'),
('00000000-0000-0000-0000-000000000001', 'Convênios', 'income', '#f59e0b', 'briefcase')
ON CONFLICT DO NOTHING;

-- Categorias de Despesa Padrão
INSERT INTO revenue_categories (tenant_id, name, type, color, icon) VALUES
('00000000-0000-0000-0000-000000000001', 'Salários', 'expense', '#ef4444', 'dollar-sign'),
('00000000-0000-0000-0000-000000000001', 'Aluguel', 'expense', '#dc2626', 'home'),
('00000000-0000-0000-0000-000000000001', 'Materiais', 'expense', '#f97316', 'package'),
('00000000-0000-0000-0000-000000000001', 'Marketing', 'expense', '#ec4899', 'megaphone'),
('00000000-0000-0000-0000-000000000001', 'Impostos', 'expense', '#991b1b', 'file-text'),
('00000000-0000-0000-0000-000000000001', 'Outros', 'expense', '#64748b', 'more-horizontal')
ON CONFLICT DO NOTHING;

-- Métodos de Pagamento Padrão
INSERT INTO payment_methods (tenant_id, name, type, fees_percentage) VALUES
('00000000-0000-0000-0000-000000000001', 'Dinheiro', 'cash', 0),
('00000000-0000-0000-0000-000000000001', 'PIX', 'pix', 0),
('00000000-0000-0000-0000-000000000001', 'Cartão de Crédito', 'credit_card', 3.5),
('00000000-0000-0000-0000-000000000001', 'Cartão de Débito', 'debit_card', 1.5),
('00000000-0000-0000-0000-000000000001', 'Transferência Bancária', 'bank_transfer', 0),
('00000000-0000-0000-0000-000000000001', 'Convênio/Plano', 'insurance', 0),
('00000000-0000-0000-0000-000000000001', 'Cheque', 'check', 0)
ON CONFLICT DO NOTHING;
