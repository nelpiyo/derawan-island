CREATE OR REPLACE FUNCTION public.delete_experience_with_token(_id uuid, _token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_photo_url text;
  v_deleted int;
  v_object_path text;
BEGIN
  IF _id IS NULL THEN
    RETURN false;
  END IF;

  IF public.has_role(auth.uid(), 'admin') THEN
    SELECT photo_url INTO v_photo_url
    FROM public.experiences
    WHERE id = _id;
  ELSE
    IF _token IS NULL OR length(_token) < 10 THEN
      RETURN false;
    END IF;

    SELECT photo_url INTO v_photo_url
    FROM public.experiences
    WHERE id = _id AND delete_token = encode(digest(_token, 'sha256'), 'hex');
  END IF;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  IF public.has_role(auth.uid(), 'admin') THEN
    DELETE FROM public.experiences
    WHERE id = _id;
  ELSE
    DELETE FROM public.experiences
    WHERE id = _id AND delete_token = encode(digest(_token, 'sha256'), 'hex');
  END IF;

  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  IF v_deleted = 0 THEN
    RETURN false;
  END IF;

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

GRANT EXECUTE ON FUNCTION public.delete_experience_with_token(uuid, text) TO anon, authenticated;