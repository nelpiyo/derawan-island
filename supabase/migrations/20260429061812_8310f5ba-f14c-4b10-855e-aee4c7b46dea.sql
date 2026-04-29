-- Add delete_token column (stores hashed token)
ALTER TABLE public.experiences
ADD COLUMN IF NOT EXISTS delete_token text;

-- Drop old admin delete policy (no longer used)
DROP POLICY IF EXISTS "Admins can delete experiences" ON public.experiences;

-- Secure function: delete an experience only when the provided token matches.
-- Also removes the associated photo from storage if present.
CREATE OR REPLACE FUNCTION public.delete_experience_with_token(_id uuid, _token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_photo_url text;
  v_deleted int;
  v_object_path text;
BEGIN
  IF _token IS NULL OR length(_token) < 10 THEN
    RETURN false;
  END IF;

  SELECT photo_url INTO v_photo_url
  FROM public.experiences
  WHERE id = _id AND delete_token = encode(digest(_token, 'sha256'), 'hex');

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  DELETE FROM public.experiences
  WHERE id = _id AND delete_token = encode(digest(_token, 'sha256'), 'hex');
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  IF v_deleted = 0 THEN
    RETURN false;
  END IF;

  -- Best-effort delete the linked storage object
  IF v_photo_url IS NOT NULL THEN
    v_object_path := regexp_replace(
      v_photo_url,
      '^.*/storage/v1/object/public/experience-photos/',
      ''
    );
    IF v_object_path <> v_photo_url AND length(v_object_path) > 0 THEN
      DELETE FROM storage.objects
      WHERE bucket_id = 'experience-photos' AND name = v_object_path;
    END IF;
  END IF;

  RETURN true;
END;
$$;

-- Ensure pgcrypto is available for digest()
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Allow anonymous + authenticated visitors to call the function
GRANT EXECUTE ON FUNCTION public.delete_experience_with_token(uuid, text) TO anon, authenticated;

-- Update INSERT policy to also accept delete_token (and require it to be a hash-length string when provided)
DROP POLICY IF EXISTS "Anyone can submit experiences" ON public.experiences;
CREATE POLICY "Anyone can submit experiences"
ON public.experiences
FOR INSERT
TO public
WITH CHECK (
  char_length(visitor_name) BETWEEN 1 AND 80
  AND char_length(comment) BETWEEN 1 AND 1000
  AND (location IS NULL OR char_length(location) <= 120)
  AND (delete_token IS NULL OR char_length(delete_token) = 64)
);