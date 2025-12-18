-- Migration: Tabelas de Gestão de Estoque (MOD-EST)
-- Data: 2025-12-17

CREATE TABLE IF NOT EXISTS inventory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sku VARCHAR(100),
    category VARCHAR(100),
    unit VARCHAR(50) DEFAULT 'un', -- un, cx, fr, ml, kg
    
    -- Estoque
    current_stock INTEGER DEFAULT 0 CHECK (current_stock >= 0),
    min_stock INTEGER DEFAULT 0,
    max_stock INTEGER,
    reorder_point INTEGER,
    
    -- Custos
    unit_cost DECIMAL(10, 2),
    sale_price DECIMAL(10, 2),
    
    -- Fornecedor
    supplier_name VARCHAR(255),
    supplier_contact VARCHAR(255),
    
    -- Controle
    barcode VARCHAR(100),
    location VARCHAR(100),
    expiration_date DATE,
    batch_number VARCHAR(100),
    
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_inventory_items_tenant ON inventory_items(tenant_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_category ON inventory_items(category);
CREATE INDEX IF NOT EXISTS idx_inventory_items_stock ON inventory_items(current_stock);
CREATE INDEX IF NOT EXISTS idx_inventory_items_sku ON inventory_items(sku);

ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own inventory" ON inventory_items;
CREATE POLICY "Users can view own inventory" ON inventory_items
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can manage own inventory" ON inventory_items;
CREATE POLICY "Users can manage own inventory" ON inventory_items
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Movimentações de estoque
CREATE TABLE IF NOT EXISTS inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
    
    type VARCHAR(20) NOT NULL CHECK (type IN ('entry', 'exit', 'adjustment', 'transfer')),
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(10, 2),
    total_cost DECIMAL(10, 2),
    
    reason VARCHAR(255),
    notes TEXT,
    
    -- Relacionamentos
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    supplier_invoice VARCHAR(100),
    
    -- Estoque após movimentação
    stock_after INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inventory_movements_tenant ON inventory_movements(tenant_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_item ON inventory_movements(item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_type ON inventory_movements(type);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_created ON inventory_movements(created_at DESC);

ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own movements" ON inventory_movements;
CREATE POLICY "Users can view own movements" ON inventory_movements
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

DROP POLICY IF EXISTS "Users can create own movements" ON inventory_movements;
CREATE POLICY "Users can create own movements" ON inventory_movements
    FOR INSERT WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Alertas de estoque
CREATE TABLE IF NOT EXISTS inventory_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
    
    alert_type VARCHAR(50) NOT NULL, -- low_stock, expired, expiring_soon
    alert_message TEXT,
    is_resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inventory_alerts_tenant ON inventory_alerts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_inventory_alerts_item ON inventory_alerts(item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_alerts_resolved ON inventory_alerts(is_resolved, created_at DESC);

ALTER TABLE inventory_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own alerts" ON inventory_alerts;
CREATE POLICY "Users can view own alerts" ON inventory_alerts
    FOR SELECT USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
