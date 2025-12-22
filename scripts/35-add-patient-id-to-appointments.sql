-- Migration: Add patient_id to appointments table
-- This fixes the issue where consultations are not properly linked to patients

-- Add patient_id column to appointments table
ALTER TABLE appointments
ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);

-- Update existing appointments to link to patients based on CPF matching
UPDATE appointments a
SET patient_id = p.id
FROM patients p
WHERE a.patient_cpf = p.cpf
  AND a.user_id = p.user_id
  AND a.patient_id IS NULL;

-- Also try to match by name for appointments without CPF
UPDATE appointments a
SET patient_id = p.id
FROM patients p
WHERE a.patient_id IS NULL
  AND a.patient_name = p.full_name
  AND a.user_id = p.user_id;

-- Add patient_id to procedures table as well
ALTER TABLE procedures
ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id) ON DELETE SET NULL;

-- Create index for procedures
CREATE INDEX IF NOT EXISTS idx_procedures_patient_id ON procedures(patient_id);

-- Update existing procedures to link to patients
UPDATE procedures pr
SET patient_id = p.id
FROM patients p
WHERE pr.patient_cpf = p.cpf
  AND pr.user_id = p.user_id
  AND pr.patient_id IS NULL;
