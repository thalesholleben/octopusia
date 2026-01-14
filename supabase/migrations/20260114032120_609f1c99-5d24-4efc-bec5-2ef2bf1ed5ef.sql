-- Create finance_records table
CREATE TABLE public.finance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  valor DECIMAL(12,2) NOT NULL,
  de TEXT NOT NULL,
  para TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida')),
  categoria TEXT NOT NULL,
  data_comprovante DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_alerts table
CREATE TABLE public.ai_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  aviso TEXT NOT NULL,
  prioridade TEXT NOT NULL CHECK (prioridade IN ('baixa', 'media', 'alta')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.finance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for finance_records
CREATE POLICY "Users can view their own records" 
ON public.finance_records FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own records" 
ON public.finance_records FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own records" 
ON public.finance_records FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own records" 
ON public.finance_records FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for ai_alerts
CREATE POLICY "Users can view their own alerts" 
ON public.ai_alerts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own alerts" 
ON public.ai_alerts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" 
ON public.ai_alerts FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts" 
ON public.ai_alerts FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Trigger for auto-creating profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'display_name');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_ai_alerts_updated_at
  BEFORE UPDATE ON public.ai_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();