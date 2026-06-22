
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

INSERT INTO public.user_roles (user_id, role)
VALUES ('243e9b5d-9d9f-4921-b2ea-3941bf231b9b', 'admin')
ON CONFLICT DO NOTHING;

DROP POLICY "Authenticated can insert services" ON public.services;
DROP POLICY "Authenticated can update services" ON public.services;
DROP POLICY "Authenticated can delete services" ON public.services;
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Authenticated can insert repaired_devices" ON public.repaired_devices;
DROP POLICY "Authenticated can update repaired_devices" ON public.repaired_devices;
DROP POLICY "Authenticated can delete repaired_devices" ON public.repaired_devices;
CREATE POLICY "Admins can insert repaired_devices" ON public.repaired_devices FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update repaired_devices" ON public.repaired_devices FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete repaired_devices" ON public.repaired_devices FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Authenticated can insert phones_for_sale" ON public.phones_for_sale;
DROP POLICY "Authenticated can update phones_for_sale" ON public.phones_for_sale;
DROP POLICY "Authenticated can delete phones_for_sale" ON public.phones_for_sale;
CREATE POLICY "Admins can insert phones_for_sale" ON public.phones_for_sale FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update phones_for_sale" ON public.phones_for_sale FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete phones_for_sale" ON public.phones_for_sale FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Authenticated can insert product_items" ON public.product_items;
DROP POLICY "Authenticated can update product_items" ON public.product_items;
DROP POLICY "Authenticated can delete product_items" ON public.product_items;
CREATE POLICY "Admins can insert product_items" ON public.product_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update product_items" ON public.product_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete product_items" ON public.product_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Authenticated can insert products" ON public.products;
DROP POLICY "Authenticated can update products" ON public.products;
DROP POLICY "Authenticated can delete products" ON public.products;
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
