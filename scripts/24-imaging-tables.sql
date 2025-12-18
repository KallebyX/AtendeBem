CREATE TABLE IF NOT EXISTS medical_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  
  -- Identificação
  study_instance_uid VARCHAR(255) UNIQUE, -- DICOM UID
  accession_number VARCHAR(50),
  
  -- Tipo de exame
  modality VARCHAR(50) NOT NULL, -- 'CR', 'CT', 'MR', 'US', 'XA', 'DX', etc
  study_description VARCHAR(255),
  body_part VARCHAR(100),
  
  -- Status
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN (
    'scheduled', 'in_progress', 'completed', 'reported', 'cancelled'
  )),
  
  -- Datas
  study_date DATE,
  study_time TIME,
  acquired_at TIMESTAMPTZ,
  reported_at TIMESTAMPTZ,
  
  -- Arquivos DICOM
  dicom_files JSONB DEFAULT '[]'::jsonb, -- [{series_uid, instance_uid, file_url, thumbnail_url}]
  total_images INTEGER DEFAULT 0,
  
  -- Visualização
  viewer_url TEXT, -- URL do viewer DICOM web
  thumbnail_url TEXT,
  
  -- Laudo
  report TEXT,
  radiologist_name VARCHAR(255),
  radiologist_crm VARCHAR(20),
  
  -- Observações
  clinical_indication TEXT,
  technique TEXT,
  findings TEXT,
  conclusion TEXT,
  
  -- Metadados DICOM
  dicom_metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS image_annotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id UUID NOT NULL REFERENCES medical_images(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  annotation_type VARCHAR(50) NOT NULL, -- 'measurement', 'arrow', 'circle', 'text', 'roi'
  
  -- Coordenadas (JSON com estrutura específica por tipo)
  coordinates JSONB NOT NULL,
  
  -- Medidas
  measurement_value DECIMAL(10, 2),
  measurement_unit VARCHAR(20),
  
  -- Texto
  label TEXT,
  color VARCHAR(20) DEFAULT '#FF0000',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE medical_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_annotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY medical_images_select ON medical_images
  FOR SELECT USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY medical_images_insert ON medical_images
  FOR INSERT WITH CHECK (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY medical_images_update ON medical_images
  FOR UPDATE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY medical_images_delete ON medical_images
  FOR DELETE USING (tenant_id IN (SELECT id FROM tenants WHERE id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY image_annotations_select ON image_annotations
  FOR SELECT USING (image_id IN (SELECT id FROM medical_images WHERE tenant_id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY image_annotations_insert ON image_annotations
  FOR INSERT WITH CHECK (image_id IN (SELECT id FROM medical_images WHERE tenant_id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY image_annotations_update ON image_annotations
  FOR UPDATE USING (image_id IN (SELECT id FROM medical_images WHERE tenant_id = current_setting('app.current_user_tenant', true)::uuid));

CREATE POLICY image_annotations_delete ON image_annotations
  FOR DELETE USING (image_id IN (SELECT id FROM medical_images WHERE tenant_id = current_setting('app.current_user_tenant', true)::uuid));

-- Índices
CREATE INDEX idx_medical_images_tenant ON medical_images(tenant_id);
CREATE INDEX idx_medical_images_patient ON medical_images(patient_id);
CREATE INDEX idx_medical_images_modality ON medical_images(modality);
CREATE INDEX idx_medical_images_status ON medical_images(status);
CREATE INDEX idx_medical_images_study_date ON medical_images(study_date);
CREATE INDEX idx_image_annotations_image ON image_annotations(image_id);
