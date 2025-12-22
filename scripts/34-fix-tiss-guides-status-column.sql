-- Migration: Add missing status column to tiss_guides table
-- This column is required for guide workflow (draft, pending, sent, processed, etc.)

-- Add status column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tiss_guides' AND column_name = 'status'
  ) THEN
    ALTER TABLE tiss_guides
    ADD COLUMN status VARCHAR(50) DEFAULT 'draft'
    CHECK (status IN ('draft', 'pending', 'sent', 'processing', 'processed', 'accepted', 'rejected', 'error'));

    -- Create index for status column
    CREATE INDEX IF NOT EXISTS idx_tiss_guides_status ON tiss_guides(status);

    RAISE NOTICE 'Column status added to tiss_guides table';
  ELSE
    RAISE NOTICE 'Column status already exists in tiss_guides table';
  END IF;
END $$;

-- Update existing guides without status to 'draft'
UPDATE tiss_guides SET status = 'draft' WHERE status IS NULL;
