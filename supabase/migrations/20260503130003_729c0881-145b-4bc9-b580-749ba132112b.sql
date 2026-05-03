CREATE TABLE public.experience_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  experience_id UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  visitor_name TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_experience_replies_experience_id ON public.experience_replies(experience_id);
CREATE INDEX idx_experience_replies_created_at ON public.experience_replies(created_at);

ALTER TABLE public.experience_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view replies"
ON public.experience_replies
FOR SELECT
USING (true);

CREATE POLICY "Anyone can submit replies"
ON public.experience_replies
FOR INSERT
WITH CHECK (
  char_length(visitor_name) >= 1 AND char_length(visitor_name) <= 80
  AND char_length(comment) >= 1 AND char_length(comment) <= 500
);

CREATE POLICY "Admins can delete replies"
ON public.experience_replies
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

ALTER PUBLICATION supabase_realtime ADD TABLE public.experience_replies;