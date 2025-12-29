-- Migration: Add phone support for IVR system
-- This migration allows signatures to have either email OR phone (or both)

-- 1. Add phone column
ALTER TABLE signatures
ADD COLUMN IF NOT EXISTS phone TEXT;

-- 2. Remove NOT NULL constraint from email (now optional)
ALTER TABLE signatures
ALTER COLUMN email DROP NOT NULL;

-- 3. Add constraint: require name + (email OR phone)
ALTER TABLE signatures
DROP CONSTRAINT IF EXISTS contact_info_required;

ALTER TABLE signatures
ADD CONSTRAINT contact_info_required
CHECK (
  full_name IS NOT NULL AND
  (
    (email IS NOT NULL AND email != '') OR
    (phone IS NOT NULL AND phone != '')
  )
);

-- 4. Add source column to track origin (website vs phone_ivr)
ALTER TABLE signatures
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website' CHECK (source IN ('website', 'phone_ivr'));

-- 5. Add indexes for better query performance (NOT unique - allows duplicates)
CREATE INDEX IF NOT EXISTS idx_signatures_phone
ON signatures(phone)
WHERE phone IS NOT NULL AND phone != '';

CREATE INDEX IF NOT EXISTS idx_signatures_email
ON signatures(email)
WHERE email IS NOT NULL AND email != '';

-- Done! The table now supports both email and phone signatures.
