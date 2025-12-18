-- Recreating anamnesis tables without tenant_id dependency since tenants table doesn't exist in base schema
-- Migration: Tabela de Anamnese Clínica (MOD-ANM)
-- Data: 2025-12-17

-- Drop existing tables to recreate properly
DROP TABLE IF EXISTS anamnesis_templates CASCADE;
DROP TABLE IF EXISTS anamnesis CASCADE;

-- =====================================================
-- TABELA: anamnesis (Anamnese Completa)
-- =====================================================
CREATE TABLE anamnesis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    
    -- Wizard Step 1: Identificação
    identification JSONB DEFAULT '{}'::jsonb,
    -- { age, gender, occupation, marital_status, education, origin }
    
    -- Wizard Step 2: Queixa Principal (QP)
    chief_complaint TEXT,
    chief_complaint_duration VARCHAR(100),
    chief_complaint_severity VARCHAR(20), -- leve, moderada, grave
    
    -- Wizard Step 3: História da Doença Atual (HDA)
    history_present_illness TEXT,
    symptom_onset VARCHAR(100),
    symptom_progression TEXT,
    associated_symptoms TEXT[],
    aggravating_factors TEXT[],
    relieving_factors TEXT[],
    
    -- Wizard Step 4: Antecedentes Pessoais
    past_medical_history JSONB DEFAULT '{}'::jsonb,
    -- { chronic_diseases[], surgeries[], hospitalizations[], allergies[], current_medications[] }
    
    family_history JSONB DEFAULT '{}'::jsonb,
    -- { diseases_in_family[], hereditary_conditions[] }
    
    social_history JSONB DEFAULT '{}'::jsonb,
    -- { smoking, alcohol, drugs, physical_activity, diet, sleep_pattern }
    
    -- Wizard Step 5: Revisão de Sistemas
    systems_review JSONB DEFAULT '{}'::jsonb,
    -- { cardiovascular[], respiratory[], gastrointestinal[], genitourinary[], 
    --   musculoskeletal[], neurological[], dermatological[], psychiatric[] }
    
    -- Wizard Step 6: Exame Físico
    physical_examination JSONB DEFAULT '{}'::jsonb,
    -- { general_appearance, vital_signs: {bp, hr, rr, temp, spo2, weight, height, bmi},
    --   head_neck, cardiovascular, respiratory, abdomen, extremities, neurological }
    
    -- Wizard Step 7: Conduta/Plano
    assessment TEXT, -- Avaliação diagnóstica
    plan TEXT, -- Plano terapêutico
    diagnostic_hypothesis TEXT[], -- Hipóteses diagnósticas
    complementary_exams TEXT[], -- Exames complementares solicitados
    prescriptions TEXT[], -- Prescrições
    referrals TEXT[], -- Encaminhamentos
    follow_up VARCHAR(200), -- Retorno
    
    -- Template usado
    specialty VARCHAR(100), -- Clínico, Cardiologia, Pediatria, etc
    template_id UUID,
    
    -- Status do wizard
    current_step INTEGER DEFAULT 1 CHECK (current_step >= 1 AND current_step <= 7),
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    
    -- Auto-save
    last_autosave TIMESTAMPTZ DEFAULT NOW(),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Índices para performance
CREATE INDEX idx_anamnesis_user ON anamnesis(user_id);
CREATE INDEX idx_anamnesis_patient ON anamnesis(patient_id);
CREATE INDEX idx_anamnesis_appointment ON anamnesis(appointment_id);
CREATE INDEX idx_anamnesis_specialty ON anamnesis(specialty);
CREATE INDEX idx_anamnesis_created ON anamnesis(created_at DESC);
CREATE INDEX idx_anamnesis_completed ON anamnesis(is_completed, completed_at DESC);

-- RLS Policies
ALTER TABLE anamnesis ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own anamnesis" ON anamnesis;
CREATE POLICY "Users can view own anamnesis" ON anamnesis
    FOR SELECT USING (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can create own anamnesis" ON anamnesis;
CREATE POLICY "Users can create own anamnesis" ON anamnesis
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can update own anamnesis" ON anamnesis;
CREATE POLICY "Users can update own anamnesis" ON anamnesis
    FOR UPDATE USING (user_id = current_setting('app.current_user_id', true)::uuid);

DROP POLICY IF EXISTS "Users can delete own anamnesis" ON anamnesis;
CREATE POLICY "Users can delete own anamnesis" ON anamnesis
    FOR DELETE USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- =====================================================
-- TABELA: anamnesis_templates (Templates por Especialidade)
-- =====================================================
CREATE TABLE anamnesis_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    name VARCHAR(200) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Template structure
    sections JSONB DEFAULT '[]'::jsonb,
    -- [ { step: 1, title: "...", fields: [...] }, ... ]
    
    default_values JSONB DEFAULT '{}'::jsonb,
    
    is_public BOOLEAN DEFAULT false, -- Templates públicos (AtendeBem defaults)
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_anamnesis_templates_user ON anamnesis_templates(user_id);
CREATE INDEX idx_anamnesis_templates_specialty ON anamnesis_templates(specialty);
CREATE INDEX idx_anamnesis_templates_public ON anamnesis_templates(is_public, is_active);

ALTER TABLE anamnesis_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own or public templates" ON anamnesis_templates;
CREATE POLICY "Users can view own or public templates" ON anamnesis_templates
    FOR SELECT USING (
        is_public = true 
        OR user_id = current_setting('app.current_user_id', true)::uuid
    );

DROP POLICY IF EXISTS "Users can manage own templates" ON anamnesis_templates;
CREATE POLICY "Users can manage own templates" ON anamnesis_templates
    FOR ALL USING (user_id = current_setting('app.current_user_id', true)::uuid);

-- =====================================================
-- SEED: Templates Padrão
-- =====================================================

-- Template: Anamnese Clínica Geral
INSERT INTO anamnesis_templates (
    user_id,
    name,
    specialty,
    description,
    is_public,
    sections
) VALUES (
    NULL,
    'Anamnese Clínica Geral',
    'Clínica Geral',
    'Template padrão para consultas de clínica geral',
    true,
    '[
        {
            "step": 1,
            "title": "Identificação",
            "fields": ["age", "gender", "occupation", "marital_status", "origin"]
        },
        {
            "step": 2,
            "title": "Queixa Principal",
            "fields": ["chief_complaint", "duration", "severity"]
        },
        {
            "step": 3,
            "title": "História da Doença Atual",
            "fields": ["onset", "progression", "associated_symptoms", "aggravating_factors", "relieving_factors"]
        },
        {
            "step": 4,
            "title": "Antecedentes",
            "fields": ["chronic_diseases", "surgeries", "allergies", "medications", "family_history", "social_history"]
        },
        {
            "step": 5,
            "title": "Revisão de Sistemas",
            "fields": ["cardiovascular", "respiratory", "gastrointestinal", "genitourinary", "neurological"]
        },
        {
            "step": 6,
            "title": "Exame Físico",
            "fields": ["vital_signs", "general_appearance", "systems_examination"]
        },
        {
            "step": 7,
            "title": "Conduta",
            "fields": ["assessment", "diagnostic_hypothesis", "plan", "exams", "prescriptions", "follow_up"]
        }
    ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Template: Anamnese Pediátrica
INSERT INTO anamnesis_templates (
    user_id,
    name,
    specialty,
    description,
    is_public,
    sections
) VALUES (
    NULL,
    'Anamnese Pediátrica',
    'Pediatria',
    'Template especializado para consultas pediátricas',
    true,
    '[
        {
            "step": 1,
            "title": "Identificação",
            "fields": ["age", "gender", "birth_data", "parents_info"]
        },
        {
            "step": 2,
            "title": "Queixa Principal",
            "fields": ["chief_complaint", "duration", "severity"]
        },
        {
            "step": 3,
            "title": "História da Doença Atual",
            "fields": ["onset", "progression", "fever", "feeding", "behavior_changes"]
        },
        {
            "step": 4,
            "title": "Antecedentes",
            "fields": ["prenatal", "birth", "vaccines", "growth", "development", "previous_diseases"]
        },
        {
            "step": 5,
            "title": "Revisão de Sistemas",
            "fields": ["respiratory", "gastrointestinal", "skin", "neurological"]
        },
        {
            "step": 6,
            "title": "Exame Físico",
            "fields": ["vital_signs", "growth_chart", "general_appearance", "systems_examination"]
        },
        {
            "step": 7,
            "title": "Conduta",
            "fields": ["assessment", "diagnostic_hypothesis", "plan", "orientations", "follow_up"]
        }
    ]'::jsonb
) ON CONFLICT DO NOTHING;

-- Template: Anamnese Cardiológica
INSERT INTO anamnesis_templates (
    user_id,
    name,
    specialty,
    description,
    is_public,
    sections
) VALUES (
    NULL,
    'Anamnese Cardiológica',
    'Cardiologia',
    'Template para avaliação cardiológica',
    true,
    '[
        {
            "step": 1,
            "title": "Identificação",
            "fields": ["age", "gender", "occupation", "risk_factors"]
        },
        {
            "step": 2,
            "title": "Queixa Principal",
            "fields": ["chief_complaint", "duration", "triggering_factors"]
        },
        {
            "step": 3,
            "title": "História Cardiológica",
            "fields": ["chest_pain", "dyspnea", "palpitations", "syncope", "edema"]
        },
        {
            "step": 4,
            "title": "Fatores de Risco",
            "fields": ["hypertension", "diabetes", "smoking", "family_history", "cholesterol", "sedentarism"]
        },
        {
            "step": 5,
            "title": "Revisão de Sistemas",
            "fields": ["cardiovascular", "respiratory", "neurological", "vascular"]
        },
        {
            "step": 6,
            "title": "Exame Cardiovascular",
            "fields": ["vital_signs", "heart_auscultation", "peripheral_pulses", "jugular_veins", "edema"]
        },
        {
            "step": 7,
            "title": "Conduta",
            "fields": ["assessment", "risk_stratification", "exams", "medications", "lifestyle_changes", "follow_up"]
        }
    ]'::jsonb
) ON CONFLICT DO NOTHING;
