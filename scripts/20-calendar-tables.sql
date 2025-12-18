CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Data/hora
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  all_day BOOLEAN DEFAULT false,
  timezone VARCHAR(50) DEFAULT 'America/Sao_Paulo',
  
  -- Tipo de evento
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
    'appointment', 'procedure', 'surgery', 'exam',
    'meeting', 'break', 'personal', 'blocked'
  )),
  
  -- Status
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN (
    'scheduled', 'confirmed', 'in_progress', 'completed',
    'cancelled', 'no_show', 'rescheduled'
  )),
  
  -- Localização
  location VARCHAR(255),
  room VARCHAR(100),
  
  -- Google Calendar
  google_calendar_id VARCHAR(255),
  google_event_id VARCHAR(255),
  google_meet_link TEXT,
  
  -- Recorrência
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT, -- RRULE format
  recurrence_end_date DATE,
  
  -- Lembretes
  reminders JSONB DEFAULT '[]'::jsonb, -- [{type: 'email', minutes: 60}, {type: 'sms', minutes: 1440}]
  
  -- Participantes
  attendees JSONB DEFAULT '[]'::jsonb, -- [{email: 'email@example.com', name: 'Nome', response: 'accepted'}]
  
  -- Metadados
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  color VARCHAR(20),
  notes TEXT,
  metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY calendar_events_select ON calendar_events
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY calendar_events_insert ON calendar_events
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY calendar_events_update ON calendar_events
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY calendar_events_delete ON calendar_events
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_calendar_events_tenant ON calendar_events(tenant_id);
CREATE INDEX idx_calendar_events_user ON calendar_events(user_id);
CREATE INDEX idx_calendar_events_patient ON calendar_events(patient_id);
CREATE INDEX idx_calendar_events_start_time ON calendar_events(start_time);
CREATE INDEX idx_calendar_events_end_time ON calendar_events(end_time);
CREATE INDEX idx_calendar_events_status ON calendar_events(status);
CREATE INDEX idx_calendar_events_google ON calendar_events(google_event_id) WHERE google_event_id IS NOT NULL;

-- Função para verificar conflitos de agenda
CREATE OR REPLACE FUNCTION check_calendar_conflicts(
  p_user_id UUID,
  p_start_time TIMESTAMPTZ,
  p_end_time TIMESTAMPTZ,
  p_exclude_event_id UUID DEFAULT NULL
) RETURNS TABLE(conflict_event_id UUID, conflict_title VARCHAR, conflict_start TIMESTAMPTZ, conflict_end TIMESTAMPTZ) AS $$
BEGIN
  RETURN QUERY
  SELECT id, title, start_time, end_time
  FROM calendar_events
  WHERE user_id = p_user_id
    AND status NOT IN ('cancelled', 'rescheduled')
    AND (id != p_exclude_event_id OR p_exclude_event_id IS NULL)
    AND (
      (start_time < p_end_time AND end_time > p_start_time)
    );
END;
$$ LANGUAGE plpgsql;
