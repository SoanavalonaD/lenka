-- Schema PostgreSQL pour Lenkā Madagascar
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  name VARCHAR(160) NOT NULL,
  collection VARCHAR(120) NOT NULL,
  category VARCHAR(60) NOT NULL, -- 'Cabas', 'Bandoulières', 'Pochettes', 'Lunch bags'
  price_mga INTEGER NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  material_details TEXT NOT NULL,
  care_instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  dimensions VARCHAR(120) NOT NULL,
  weaving_hours INTEGER NOT NULL DEFAULT 24,
  origin_region VARCHAR(120) NOT NULL DEFAULT 'Analamanga & Boeny, Madagascar',
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT false,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS shipping_zones (
  id SERIAL PRIMARY KEY,
  code VARCHAR(60) UNIQUE NOT NULL,
  name VARCHAR(140) NOT NULL,
  fee_mga INTEGER NOT NULL,
  delivery_estimate VARCHAR(140) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_reviews (
  id SERIAL PRIMARY KEY,
  author_name VARCHAR(120) NOT NULL,
  location VARCHAR(120) NOT NULL,
  product_name VARCHAR(140) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  verified_purchase BOOLEAN NOT NULL DEFAULT true,
  review_date VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(40) UNIQUE NOT NULL,
  customer_name VARCHAR(160) NOT NULL,
  customer_phone VARCHAR(60) NOT NULL,
  customer_email VARCHAR(160),
  delivery_zone_code VARCHAR(60) NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_city VARCHAR(120) NOT NULL,
  delivery_notes TEXT,
  payment_method VARCHAR(60) NOT NULL, -- 'especes_livraison', 'mvola', 'orange_money'
  payment_phone VARCHAR(60),
  payment_reference VARCHAR(100),
  subtotal_mga INTEGER NOT NULL,
  shipping_fee_mga INTEGER NOT NULL,
  total_mga INTEGER NOT NULL,
  items JSONB NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'confirmée',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
