
-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

-- SERVICES
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Smartphone',
  bullets TEXT[] NOT NULL DEFAULT '{}',
  time_estimate TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update services" ON public.services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete services" ON public.services FOR DELETE TO authenticated USING (true);
CREATE TRIGGER set_services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- REPAIRED DEVICES
CREATE TABLE public.repaired_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Smartphone',
  models TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.repaired_devices TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.repaired_devices TO authenticated;
GRANT ALL ON public.repaired_devices TO service_role;
ALTER TABLE public.repaired_devices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view repaired_devices" ON public.repaired_devices FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert repaired_devices" ON public.repaired_devices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update repaired_devices" ON public.repaired_devices FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete repaired_devices" ON public.repaired_devices FOR DELETE TO authenticated USING (true);
CREATE TRIGGER set_repaired_devices_updated BEFORE UPDATE ON public.repaired_devices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PRODUCTS
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'ShoppingBag',
  image_url TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update products" ON public.products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete products" ON public.products FOR DELETE TO authenticated USING (true);
CREATE TRIGGER set_products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PHONES FOR SALE
CREATE TABLE public.phones_for_sale (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  storage TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '',
  condition TEXT NOT NULL DEFAULT 'İyi',
  battery TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  warranty BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.phones_for_sale TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.phones_for_sale TO authenticated;
GRANT ALL ON public.phones_for_sale TO service_role;
ALTER TABLE public.phones_for_sale ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view phones_for_sale" ON public.phones_for_sale FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert phones_for_sale" ON public.phones_for_sale FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update phones_for_sale" ON public.phones_for_sale FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete phones_for_sale" ON public.phones_for_sale FOR DELETE TO authenticated USING (true);
CREATE TRIGGER set_phones_for_sale_updated BEFORE UPDATE ON public.phones_for_sale FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
