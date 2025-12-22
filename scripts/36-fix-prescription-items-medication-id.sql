-- Migration: Fix prescription_items.medication_id constraint
-- Description: Make medication_id nullable since medications are entered as free text
--              and not selected from the medications table

-- Drop the NOT NULL constraint on medication_id if it exists
ALTER TABLE prescription_items
ALTER COLUMN medication_id DROP NOT NULL;

-- Add a comment explaining the column purpose
COMMENT ON COLUMN prescription_items.medication_id IS
'Optional reference to medications table. Nullable because medications can be entered as free text via medication_name';
