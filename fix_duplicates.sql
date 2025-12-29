-- STEP 1: Find all duplicate emails
-- Run this first to see what duplicates exist
SELECT email, COUNT(*) as count
FROM signatures
WHERE email IS NOT NULL AND email != ''
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- STEP 2: See full details of duplicates (to decide which to keep)
-- This shows all rows with duplicate emails
WITH duplicates AS (
  SELECT email
  FROM signatures
  WHERE email IS NOT NULL AND email != ''
  GROUP BY email
  HAVING COUNT(*) > 1
)
SELECT s.*
FROM signatures s
INNER JOIN duplicates d ON s.email = d.email
ORDER BY s.email, s.created_at;

-- STEP 3: Remove duplicates - Keep the FIRST signature for each email
-- This deletes all duplicates except the earliest one (by created_at)
DELETE FROM signatures
WHERE id IN (
  SELECT id
  FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC) as row_num
    FROM signatures
    WHERE email IS NOT NULL AND email != ''
  ) t
  WHERE row_num > 1
);

-- STEP 4: After running the above, run this to verify no duplicates remain
SELECT email, COUNT(*) as count
FROM signatures
WHERE email IS NOT NULL AND email != ''
GROUP BY email
HAVING COUNT(*) > 1;
-- Should return 0 rows

-- STEP 5: Now run the original migration
-- Add phone column
ALTER TABLE signatures
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Remove NOT NULL from email
ALTER TABLE signatures
ALTER COLUMN email DROP NOT NULL;

-- Add constraint requiring name + (email OR phone)
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

-- Unique index on phone
CREATE UNIQUE INDEX IF NOT EXISTS idx_signatures_phone_unique
ON signatures(phone)
WHERE phone IS NOT NULL AND phone != '';

-- Unique index on email
DROP INDEX IF EXISTS idx_signatures_email;
CREATE UNIQUE INDEX IF NOT EXISTS idx_signatures_email_unique
ON signatures(email)
WHERE email IS NOT NULL AND email != '';

-- Source column
ALTER TABLE signatures
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website' CHECK (source IN ('website', 'phone_ivr'));
