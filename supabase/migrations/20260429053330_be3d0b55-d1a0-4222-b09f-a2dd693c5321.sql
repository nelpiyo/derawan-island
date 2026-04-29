ALTER TABLE public.experiences REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.experiences;