
CREATE TABLE public.visits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_token text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visits"
  ON public.visits FOR SELECT
  USING (true);

CREATE POLICY "Anyone can record a visit"
  ON public.visits FOR INSERT
  WITH CHECK (char_length(visitor_token) BETWEEN 8 AND 128);
