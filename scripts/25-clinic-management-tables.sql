CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18),
  phone VARCHAR(20),
  email VARCHAR(255),
  
  -- Endereço
  address_street VARCHAR(255),
  address_number VARCHAR(20),
  address_complement VARCHAR(100),
  address_neighborhood VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(2),
  address_zipcode VARCHAR(10),
  
  -- Configurações
  opening_hours JSONB DEFAULT '{}'::jsonb, -- {monday: [{start: "08:00", end: "12:00"}, {start: "14:00", end: "18:00"}]}
  timezone VARCHAR(50) DEFAULT 'America/Sao_Paulo',
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_primary BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  
  name VARCHAR(100) NOT NULL,
  room_number VARCHAR(20),
  room_type VARCHAR(50) CHECK (room_type IN (
    'consultation', 'procedure', 'surgery', 'exam', 'waiting', 'other'
  )),
  
  -- Capacidade
  capacity INTEGER DEFAULT 1,
  
  -- Equipamentos
  equipment JSONB DEFAULT '[]'::jsonb, -- [{name: 'Ultrassom', model: 'X200'}]
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  current_status VARCHAR(50) DEFAULT 'available' CHECK (current_status IN (
    'available', 'occupied', 'cleaning', 'maintenance', 'blocked'
  )),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
  
  -- Horário
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Domingo
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  
  -- Tipo
  schedule_type VARCHAR(50) DEFAULT 'regular' CHECK (schedule_type IN (
    'regular', 'vacation', 'leave', 'special'
  )),
  
  -- Recorrência
  effective_from DATE NOT NULL,
  effective_until DATE,
  
  -- Configurações
  slot_duration INTEGER DEFAULT 30, -- minutos
  max_patients_per_slot INTEGER DEFAULT 1,
  
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY clinics_select ON clinics
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY clinics_insert ON clinics
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY clinics_update ON clinics
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY clinics_delete ON clinics
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY rooms_select ON rooms
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY rooms_insert ON rooms
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY rooms_update ON rooms
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY rooms_delete ON rooms
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY staff_schedules_select ON staff_schedules
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY staff_schedules_insert ON staff_schedules
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY staff_schedules_update ON staff_schedules
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY staff_schedules_delete ON staff_schedules
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_clinics_tenant ON clinics(tenant_id);
CREATE INDEX idx_rooms_clinic ON rooms(clinic_id);
CREATE INDEX idx_rooms_status ON rooms(current_status);
CREATE INDEX idx_staff_schedules_user ON staff_schedules(user_id);
CREATE INDEX idx_staff_schedules_clinic ON staff_schedules(clinic_id);
CREATE INDEX idx_staff_schedules_day ON staff_schedules(day_of_week);
