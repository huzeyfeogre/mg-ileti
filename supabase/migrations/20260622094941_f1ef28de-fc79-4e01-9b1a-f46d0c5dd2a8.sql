CREATE TABLE IF NOT EXISTS public.product_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  features text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS product_items_product_id_idx ON public.product_items(product_id);

GRANT SELECT ON public.product_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_items TO authenticated;
GRANT ALL ON public.product_items TO service_role;

ALTER TABLE public.product_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product_items" ON public.product_items FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert product_items" ON public.product_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update product_items" ON public.product_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete product_items" ON public.product_items FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_product_items_updated_at BEFORE UPDATE ON public.product_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();