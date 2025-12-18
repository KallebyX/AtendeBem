-- Migration: Tabelas de Gestão de Estoque (MOD-EST)
-- Data: 2025-12-17
-- Removed tenant_id dependency - using user_id for data isolation

DROP TABLE IF EXISTS inventory_alerts CASCADE;
DROP TABLE IF EXISTS inventory_movements CASCADE;
DROP TABLE IF EXISTS inventory_items CASCADE;

CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
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

DROP INDEX IF EXISTS idx_inventory_items_user;
DROP INDEX IF EXISTS idx_inventory_items_category;
DROP INDEX IF EXISTS idx_inventory_items_stock;
DROP INDEX IF EXISTS idx_inventory_items_sku;

CREATE INDEX idx_inventory_items_user ON inventory_items(user_id);
CREATE INDEX idx_inventory_items_category ON inventory_items(category);
CREATE INDEX idx_inventory_items_stock ON inventory_items(current_stock);
CREATE INDEX idx_inventory_items_sku ON inventory_items(sku);

ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "inventory_select" ON inventory_items;
CREATE POLICY "inventory_select" ON inventory_items
    FOR SELECT USING (
        user_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::uuid
    );

DROP POLICY IF EXISTS "inventory_insert" ON inventory_items;
CREATE POLICY "inventory_insert" ON inventory_items
    FOR INSERT WITH CHECK (
        user_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::uuid
    );

DROP POLICY IF EXISTS "inventory_update" ON inventory_items;
CREATE POLICY "inventory_update" ON inventory_items
    FOR UPDATE USING (
        user_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::uuid
    );

DROP POLICY IF EXISTS "inventory_delete" ON inventory_items;
CREATE POLICY "inventory_delete" ON inventory_items
    FOR DELETE USING (
        user_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::uuid
    );

-- Movimentações de estoque
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

DROP INDEX IF EXISTS idx_inventory_movements_user;
DROP INDEX IF EXISTS idx_inventory_movements_item;
DROP INDEX IF EXISTS idx_inventory_movements_type;
DROP INDEX IF EXISTS idx_inventory_movements_created;

CREATE INDEX idx_inventory_movements_user ON inventory_movements(user_id);
CREATE INDEX idx_inventory_movements_item ON inventory_movements(item_id);
CREATE INDEX idx_inventory_movements_type ON inventory_movements(type);
CREATE INDEX idx_inventory_movements_created ON inventory_movements(created_at DESC);

ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "movements_select" ON inventory_movements;
CREATE POLICY "movements_select" ON inventory_movements
    FOR SELECT USING (
        user_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::uuid
    );

DROP POLICY IF EXISTS "movements_insert" ON inventory_movements;
CREATE POLICY "movements_insert" ON inventory_movements
    FOR INSERT WITH CHECK (
        user_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::uuid
    );

-- Alertas de estoque
CREATE TABLE inventory_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
    
    alert_type VARCHAR(50) NOT NULL, -- low_stock, expired, expiring_soon
    alert_message TEXT,
    is_resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

DROP INDEX IF EXISTS idx_inventory_alerts_user;
DROP INDEX IF EXISTS idx_inventory_alerts_item;
DROP INDEX IF EXISTS idx_inventory_alerts_resolved;

CREATE INDEX idx_inventory_alerts_user ON inventory_alerts(user_id);
CREATE INDEX idx_inventory_alerts_item ON inventory_alerts(item_id);
CREATE INDEX idx_inventory_alerts_resolved ON inventory_alerts(is_resolved, created_at DESC);

ALTER TABLE inventory_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "alerts_select" ON inventory_alerts;
CREATE POLICY "alerts_select" ON inventory_alerts
    FOR SELECT USING (
        user_id = NULLIF(current_setting('app.current_user_id', TRUE), '')::uuid
    );
