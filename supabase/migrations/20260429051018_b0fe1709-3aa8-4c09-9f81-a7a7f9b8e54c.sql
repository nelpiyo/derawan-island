
-- Create experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_name TEXT NOT NULL,
  comment TEXT NOT NULL,
  photo_url TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view experiences"
  ON public.experiences FOR SELECT
  USING (true);

-- Public insert (with basic length validation via trigger)
CREATE POLICY "Anyone can submit experiences"
  ON public.experiences FOR INSERT
  WITH CHECK (
    char_length(visitor_name) BETWEEN 1 AND 80
    AND char_length(comment) BETWEEN 1 AND 1000
    AND (location IS NULL OR char_length(location) <= 120)
  );

-- Storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('experience-photos', 'experience-photos', true);

-- Storage policies: public read, public upload
CREATE POLICY "Public can view experience photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'experience-photos');

CREATE POLICY "Anyone can upload experience photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'experience-photos');

-- Index for ordering
CREATE INDEX experiences_created_at_idx ON public.experiences (created_at DESC);
