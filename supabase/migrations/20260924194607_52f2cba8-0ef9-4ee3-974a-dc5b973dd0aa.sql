CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
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
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL CHECK (char_length(title) <= 200),
  subtitle text CHECK (char_length(subtitle) <= 200),
  author text NOT NULL CHECK (char_length(author) <= 150),
  description text NOT NULL CHECK (char_length(description) <= 3000),
  price_cents integer CHECK (price_cents IS NULL OR price_cents >= 0),
  currency text CHECK (currency IS NULL OR currency ~ '^[A-Z]{3}$'),
  cover_url text,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can view active products"
ON public.products FOR SELECT TO anon, authenticated
USING (is_active = true);
CREATE POLICY "Admins can view all products"
ON public.products FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage products"
ON public.products FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  purchaser_first_name text NOT NULL CHECK (char_length(purchaser_first_name) BETWEEN 1 AND 100),
  purchaser_last_name text NOT NULL CHECK (char_length(purchaser_last_name) BETWEEN 1 AND 100),
  purchaser_email text NOT NULL CHECK (char_length(purchaser_email) <= 255),
  purchaser_phone text CHECK (char_length(purchaser_phone) <= 40),
  country text NOT NULL CHECK (char_length(country) <= 100),
  address text NOT NULL CHECK (char_length(address) <= 300),
  city text NOT NULL CHECK (char_length(city) <= 120),
  region text NOT NULL CHECK (char_length(region) <= 120),
  postal_code text NOT NULL CHECK (char_length(postal_code) <= 30),
  order_notes text CHECK (char_length(order_notes) <= 1000),
  product_id uuid NOT NULL REFERENCES public.products(id),
  quantity integer NOT NULL CHECK (quantity BETWEEN 1 AND 20),
  subtotal_cents integer NOT NULL CHECK (subtotal_cents >= 0),
  shipping_cents integer CHECK (shipping_cents IS NULL OR shipping_cents >= 0),
  total_cents integer CHECK (total_cents IS NULL OR total_cents >= 0),
  currency text NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
  payment_reference text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage orders"
ON public.orders FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER orders_set_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.products (slug, title, subtitle, author, description, price_cents, currency, cover_url, is_active)
VALUES (
  'beyond-the-echoes-of-black-history',
  'Beyond the Echoes of Black History',
  'Great Black Inventions',
  'James E. Craver',
  'A historical record of Black American innovation, invention, scientific achievement, engineering, and perseverance across generations.',
  NULL,
  NULL,
  '/__l5e/assets-v1/9e8ebc96-0846-4d5a-a0e5-51495133d06c/beyond-the-echoes-cover.png',
  false
);