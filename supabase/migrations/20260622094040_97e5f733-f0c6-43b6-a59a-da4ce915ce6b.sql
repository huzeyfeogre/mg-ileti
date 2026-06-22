ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS price text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS long_description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS gallery text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS features text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS recommended_ids uuid[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS slug text;

CREATE UNIQUE INDEX IF NOT EXISTS products_slug_key ON public.products(slug) WHERE slug IS NOT NULL;