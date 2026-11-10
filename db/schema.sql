-- ==============================================================================
-- CATALOGUE OFFICIEL LENKĀ MADAGASCAR — SCRIPT SUPABASE
-- ==============================================================================
-- Dashboard Supabase > SQL Editor > New query > coller ce fichier > Run
-- Le script est ré-exécutable : il met à jour les produits existants (par slug).
-- Images attendues dans public/products/<slug>-1.jpg ... <slug>-4.jpg
-- ==============================================================================

-- 1. TABLES
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  name VARCHAR(160) NOT NULL,
  collection VARCHAR(120) NOT NULL DEFAULT 'Collection Lenkā',
  category VARCHAR(60) NOT NULL,
  price_mga INTEGER NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  material_details TEXT NOT NULL DEFAULT '',
  care_instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  dimensions VARCHAR(200) NOT NULL DEFAULT '',
  weaving_hours INTEGER NOT NULL DEFAULT 24,
  origin_region VARCHAR(120) NOT NULL DEFAULT 'Antananarivo, Madagascar',
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  colors JSONB NOT NULL DEFAULT '[]'::jsonb,
  sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT false,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  handles TEXT,
  interior TEXT,
  production_delay VARCHAR(120),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Colonnes ajoutées si la table existait déjà
ALTER TABLE products ADD COLUMN IF NOT EXISTS handles TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS interior TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS production_delay VARCHAR(120);
ALTER TABLE products ALTER COLUMN dimensions TYPE VARCHAR(200);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products (featured);

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
  payment_method VARCHAR(60) NOT NULL,
  payment_phone VARCHAR(60),
  payment_reference VARCHAR(100),
  subtotal_mga INTEGER NOT NULL,
  shipping_fee_mga INTEGER NOT NULL,
  total_mga INTEGER NOT NULL,
  items JSONB NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'confirmée',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders (order_number);

-- 2. SÉCURITÉ (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Lecture publique des produits') THEN
    CREATE POLICY "Lecture publique des produits" ON products FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Lecture publique des zones') THEN
    CREATE POLICY "Lecture publique des zones" ON shipping_zones FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Lecture publique des avis') THEN
    CREATE POLICY "Lecture publique des avis" ON customer_reviews FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Création publique des commandes') THEN
    CREATE POLICY "Création publique des commandes" ON orders FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Lecture des commandes par numéro') THEN
    CREATE POLICY "Lecture des commandes par numéro" ON orders FOR SELECT USING (true);
  END IF;
END $$;

-- 3. SUPPRESSION DES ANCIENS PRODUITS DE DÉMONSTRATION
DELETE FROM products WHERE slug IN (
  'zoe-lina-cabas-iconique', 'cabas-mahajanga-chevron', 'bandouliere-nosy-epuree',
  'pochette-tsingy-ajouree', 'lunchbag-ambanja-artisanal', 'cabas-sainte-marie-panier'
);

-- 4. ZONES DE LIVRAISON (frais entre 5 000 Ar et 10 000 Ar à Tana ; province à la charge du client)
INSERT INTO shipping_zones (code, name, fee_mga, delivery_estimate, description) VALUES
  ('tana_ville', 'Antananarivo - Centre & Ville', 5000, 'Le lendemain de la validation (J+1)', 'Analakely, Isoraka, Ankorondrano, Ivandry, Ambatobe, Antaninarenina, Mahamasina, Ankadifotsy.'),
  ('tana_peripherie', 'Antananarivo - Périphérie', 10000, 'Le lendemain de la validation (J+1)', 'Talatamaty, Ivato, Ambohimangakely, Ilafy, Itaosy, Ambohibao, Tanjombato.'),
  ('province_express', 'Envoi en province', 0, 'Après paiement (24h avant l''envoi)', 'Frais d''expédition à la charge du client, réglés auprès du transporteur. Paiement de la commande exigé 24h avant l''envoi.')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name, fee_mga = EXCLUDED.fee_mga,
  delivery_estimate = EXCLUDED.delivery_estimate, description = EXCLUDED.description;

-- 5. CATALOGUE (21 produits)

-- Ankarā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'ankara',
  'Ankarā',
  'Collection Signature',
  'Sacs à main',
  197000,
  'Sac en raphia crocheté main et cuir véritable, disponible en tailles S, M et L',
  'Pièce polyvalente de la maison Lenkā, Ankarā allie la délicatesse du raphia malgache crocheté à la main à la noblesse du cuir véritable. Ses anses interchangeables permettent un porté main, épaule ou bandoulière selon la taille choisie.',
  'Raphia naturel de Madagascar, cuir véritable, doublure en tissu épais.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Taille S : 22 × 18 × 8 cm • Taille M : 27 × 21 × 11 cm • Taille L : 34 × 24 × 10 cm',
  34,
  'Antananarivo, Madagascar',
  '["/products/ankara-1.jpg", "/products/ankara-2.jpg", "/products/ankara-3.jpg", "/products/ankara-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "rose", "name": "Rose", "hex": "#D98A8A", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "s", "label": "Taille S", "dimensions": "Longueur 22cm, hauteur 18cm, profondeur 8cm", "priceDeltaMga": 0, "details": "Anses : porté poignet amovible en raphia tressé décorée de cuir et bandoulière fixe en cuir"}, {"id": "m", "label": "Taille M", "dimensions": "Longueur 27cm, hauteur 21cm, profondeur 11cm", "priceDeltaMga": 80000, "details": "Anses : porté épaule en cuir réglable fixe et anse amovible en raphia tressé • Disponible sur commande : délai de production de 20 jours"}, {"id": "l", "label": "Taille L", "dimensions": "Longueur 34cm, hauteur 24cm, profondeur 10cm", "priceDeltaMga": 110000, "details": "Anses : porté épaule en cuir et anse bandoulière en raphia et cuir amovible (longueur non négociable)"}]'::jsonb,
  true,
  true,
  'Varient selon la taille (voir le détail de chaque taille)',
  'Entièrement doublé en tissu épais, avec poche plaquée et fermeture',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Bandoulière Zanā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'bandouliere-zana',
  'Bandoulière Zanā',
  'Lignes Urbaines',
  'Bandoulières',
  187000,
  'Sac bandoulière en raphia avec anse en cuir réglable',
  'Format pratique et allure épurée : la Bandoulière Zanā accompagne vos journées en toute légèreté, avec une anse en cuir réglable et un intérieur doublé et fermé.',
  'Raphia naturel de Madagascar, cuir véritable, doublure tissu.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Longueur 23cm, hauteur 16cm, profondeur 8cm',
  24,
  'Antananarivo, Madagascar',
  '["/products/bandouliere-zana-1.jpg", "/products/bandouliere-zana-2.jpg", "/products/bandouliere-zana-3.jpg", "/products/bandouliere-zana-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "m", "label": "Taille M", "dimensions": "Longueur 23cm, hauteur 16cm, profondeur 8cm", "priceDeltaMga": 0}]'::jsonb,
  true,
  true,
  'En cuir, longueur réglable',
  'Avec doublure et fermeture',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Chapeau Sudā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'chapeau-suda',
  'Chapeau Sudā',
  'Soleil & Plein Air',
  'Chapeaux',
  127000,
  'Chapeau en raphia crocheté main, bord de 10, 12 ou 14 cm',
  'Accessoire solaire par excellence, le Chapeau Sudā est crocheté serré en raphia naturel. Choisissez la largeur de bord qui vous ressemble.',
  '100% raphia naturel de Madagascar.',
  '["Ranger sans écraser le calot.", "Défroisser le bord à la vapeur douce, sans contact direct.", "Éviter l’exposition prolongée à l’humidité."]'::jsonb,
  'Tour de tête (calot) : 57cm • Bord : 10cm, 12cm ou 14cm',
  18,
  'Antananarivo, Madagascar',
  '["/products/chapeau-suda-1.jpg", "/products/chapeau-suda-2.jpg", "/products/chapeau-suda-3.jpg", "/products/chapeau-suda-4.jpg"]'::jsonb,
  '[{"id": "nude-bordure-noir", "name": "Nude avec bordure noir", "hex": "#E2D5C3", "priceDeltaMga": 0}, {"id": "nude-uni", "name": "Nude uni (bord 14cm uniquement)", "hex": "#EADDC8", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "bord-10", "label": "Bord 10cm", "dimensions": "Tour de tête 57cm • Bordure 10cm", "priceDeltaMga": 0, "details": "Couleur : nude avec bordure noir"}, {"id": "bord-12", "label": "Bord 12cm", "dimensions": "Tour de tête 57cm • Bordure 12cm", "priceDeltaMga": 10000, "details": "Couleur : nude avec bordure noir"}, {"id": "bord-14", "label": "Bord 14cm", "dimensions": "Tour de tête 57cm • Bordure 14cm", "priceDeltaMga": 20000, "details": "Couleur : nude uni ou nude avec bordure noir"}]'::jsonb,
  true,
  true,
  NULL,
  NULL,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Irinā Bay
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'irina-bay',
  'Irinā Bay',
  'Horizons Côtiers',
  'Bandoulières',
  192000,
  'Sac bandoulière en raphia, cuir et coton aux couleurs estivales',
  'Irinā Bay associe raphia, cuir et tissu en coton dans une silhouette compacte, avec une anse bandoulière en cuir amovible et réglable. Non disponible en noir.',
  'Raphia, cuir, tissu en coton.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Longueur 22cm, hauteur 19cm, profondeur 8cm',
  26,
  'Antananarivo, Madagascar',
  '["/products/irina-bay-1.jpg", "/products/irina-bay-2.jpg", "/products/irina-bay-3.jpg", "/products/irina-bay-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "rouge", "name": "Rouge", "hex": "#A83232", "priceDeltaMga": 0}, {"id": "rose", "name": "Rose", "hex": "#D98A8A", "priceDeltaMga": 0}, {"id": "bleu", "name": "Bleu", "hex": "#3B6978", "priceDeltaMga": 0}, {"id": "vert", "name": "Vert", "hex": "#4A6B53", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 22cm, hauteur 19cm, profondeur 8cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  'Anse bandoulière en cuir amovible et réglable',
  'En tissu, avec une poche plaquée et fermeture à glissière',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Lumaya
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'lumaya',
  'Lumaya',
  'Collection Signature',
  'Sacs à main',
  277000,
  'Sac à rabat en cuir véritable et raphia, cuir noir ou marron au choix',
  'Lumaya séduit par son rabat et son anse en cuir véritable. Composez votre pièce en choisissant la couleur du cuir (noir ou marron) et celle du raphia (naturel, nude ou miel).',
  'Raphia naturel de Madagascar, cuir véritable, doublure tissu.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Longueur 27cm, hauteur 19cm, profondeur 8cm',
  32,
  'Antananarivo, Madagascar',
  '["/products/lumaya-1.jpg", "/products/lumaya-2.jpg", "/products/lumaya-3.jpg", "/products/lumaya-4.jpg"]'::jsonb,
  '[{"id": "naturel-cuir-marron", "name": "Naturel • cuir marron", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "naturel-cuir-noir", "name": "Naturel • cuir noir", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "nude-cuir-marron", "name": "Nude • cuir marron", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "nude-cuir-noir", "name": "Nude • cuir noir", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "miel-cuir-marron", "name": "Miel • cuir marron", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "miel-cuir-noir", "name": "Miel • cuir noir", "hex": "#D4A373", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 27cm, hauteur 19cm, profondeur 8cm", "priceDeltaMga": 0}]'::jsonb,
  true,
  true,
  'Anse et rabat en cuir véritable',
  'Entièrement doublé en tissu, avec une poche simple plaquée et une fermeture zippée',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Lunā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'luna',
  'Lunā',
  'Collection Signature',
  'Sacs à main',
  197000,
  'Sac en raphia et cuir véritable entièrement doublé',
  'Une silhouette douce et féminine, Lunā est entièrement doublé, fermé par une glissière et muni d’une poche intérieure plaquée.',
  'Raphia, cuir véritable, tissu.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Longueur 28cm, hauteur 21cm, profondeur 12cm',
  28,
  'Antananarivo, Madagascar',
  '["/products/luna-1.jpg", "/products/luna-2.jpg", "/products/luna-3.jpg", "/products/luna-4.jpg"]'::jsonb,
  '[{"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 28cm, hauteur 21cm, profondeur 12cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  NULL,
  'Entièrement doublé avec fermeture à glissière, poche simple plaquée non fermée',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Lunch bag
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'lunch-bag',
  'Lunch bag',
  'Vie Quotidienne',
  'Lunch bags',
  185000,
  'Lunch bag en raphia, cuir et coton avec cordon de fermeture',
  'Le Lunch bag Lenkā sublime la pause déjeuner : raphia tressé main, finitions cuir, doublure coton & polyester et cordon de serrage en coton. Disponible en tailles S, M et L, sur commande.',
  'Raphia, cuir, tissu en coton & polyester, cordon en coton.',
  '["Nettoyer la doublure avec une éponge légèrement humide.", "Dépoussiérer le raphia avec une brosse souple.", "Laisser sécher à l’air libre, à l’ombre."]'::jsonb,
  'S : 35 × 19 × 15 cm • M : 38 × 22 × 17 cm • L : 40 × 25 × 19 cm',
  22,
  'Antananarivo, Madagascar',
  '["/products/lunch-bag-1.jpg", "/products/lunch-bag-2.jpg", "/products/lunch-bag-3.jpg", "/products/lunch-bag-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "s", "label": "Taille S", "dimensions": "Largeur (ouverture) 35cm, hauteur 19cm, profondeur (fond) 15cm", "priceDeltaMga": 0}, {"id": "m", "label": "Taille M", "dimensions": "Largeur (ouverture) 38cm, hauteur 22cm, profondeur (fond) 17cm", "priceDeltaMga": 20000}, {"id": "l", "label": "Taille L", "dimensions": "Largeur (ouverture) 40cm, hauteur 25cm, profondeur (fond) 19cm", "priceDeltaMga": 62000}]'::jsonb,
  true,
  true,
  NULL,
  NULL,
  'Délai de production : 20 jours'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Manilā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'manila',
  'Manilā',
  'Collection Signature',
  'Sacs à main',
  287000,
  'Sac structuré en raphia et cuir véritable, doublé tissu épais',
  'Élégant et intemporel, Manilā est entièrement doublé d’un tissu épais, avec fermeture et poche plaquée intérieure.',
  'Raphia, cuir véritable, tissu.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Longueur 28cm, hauteur 18cm, profondeur 8cm',
  30,
  'Antananarivo, Madagascar',
  '["/products/manila-1.jpg", "/products/manila-2.jpg", "/products/manila-3.jpg", "/products/manila-4.jpg"]'::jsonb,
  '[{"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 28cm, hauteur 18cm, profondeur 8cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  NULL,
  'Entièrement doublé avec un tissu épais, fermeture et poche plaquée interne',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Mary Linā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'mary-lina',
  'Mary Linā',
  'Lignes Urbaines',
  'Bandoulières',
  257000,
  'Sac bandoulière en raphia tressé décoré de cuir',
  'Mary Linā arbore une bandoulière fixe en cuir et raphia tressé ornée de cuir. Intérieur doublé en tissu épais avec poche plaquée et fermeture.',
  'Raphia, cuir véritable, tissu.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Longueur 28cm, hauteur 16cm, profondeur 9cm',
  32,
  'Antananarivo, Madagascar',
  '["/products/mary-lina-1.jpg", "/products/mary-lina-2.jpg", "/products/mary-lina-3.jpg", "/products/mary-lina-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 28cm, hauteur 16cm, profondeur 9cm", "priceDeltaMga": 0}]'::jsonb,
  true,
  true,
  'Bandoulière fixe en cuir et raphia tressé décorée de cuir',
  'Entièrement doublé avec un tissu épais, avec poche plaquée et fermeture',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Mirayā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'miraya',
  'Mirayā',
  'Lignes Urbaines',
  'Bandoulières',
  147000,
  'Petit sac bandoulière en raphia avec pochon en tissu',
  'Compact et léger, Mirayā se porte en bandoulière grâce à son anse en cuir réglable. Livré avec un pochon en tissu intérieur.',
  'Raphia naturel, cuir, pochon en tissu.',
  '["Préserver de l’humidité excessive.", "Dépoussiérer délicatement avec un chiffon sec.", "Conserver à plat dans son pochon protecteur."]'::jsonb,
  'Longueur 18cm, hauteur 15cm, profondeur 4cm',
  18,
  'Antananarivo, Madagascar',
  '["/products/miraya-1.jpg", "/products/miraya-2.jpg", "/products/miraya-3.jpg", "/products/miraya-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 18cm, hauteur 15cm, profondeur 4cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  'En cuir, longueur réglable',
  'Avec pochon en tissu, sans doublure interne',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Pochette classy
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'pochette-classy',
  'Pochette classy',
  'Soirs & Cérémonies',
  'Pochettes',
  127000,
  'Pochette doublée avec poche et fermeture à glissière, 10 coloris',
  'Sobre et raffinée, la Pochette classy accompagne vos soirées et cérémonies. Entièrement doublée, avec poche et fermeture à glissière.',
  'Raphia naturel de Madagascar, doublure tissu.',
  '["Préserver de l’humidité excessive.", "Dépoussiérer délicatement avec un chiffon sec.", "Conserver à plat dans son pochon protecteur."]'::jsonb,
  'Longueur 18cm, hauteur 15cm, profondeur 4cm',
  16,
  'Antananarivo, Madagascar',
  '["/products/pochette-classy-1.jpg", "/products/pochette-classy-2.jpg", "/products/pochette-classy-3.jpg", "/products/pochette-classy-4.jpg"]'::jsonb,
  '[{"id": "ecru", "name": "Écru", "hex": "#F4EFEA", "priceDeltaMga": 0}, {"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "bleu", "name": "Bleu", "hex": "#3B6978", "priceDeltaMga": 0}, {"id": "moutarde", "name": "Moutarde", "hex": "#D4A017", "priceDeltaMga": 0}, {"id": "rose", "name": "Rose", "hex": "#D98A8A", "priceDeltaMga": 0}, {"id": "rouge", "name": "Rouge", "hex": "#A83232", "priceDeltaMga": 0}, {"id": "vert", "name": "Vert", "hex": "#4A6B53", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 18cm, hauteur 15cm, profondeur 4cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  NULL,
  'Entièrement doublé, avec poche & fermeture à glissière',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Pochette pinā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'pochette-pina',
  'Pochette pinā',
  'Soirs & Cérémonies',
  'Pochettes',
  127000,
  'Pochette plate 25 × 16 cm avec fermeture',
  'Format enveloppe généreux, la Pochette pinā accueille téléphone, cartes et essentiels. Non disponible en noir.',
  'Raphia naturel de Madagascar.',
  '["Préserver de l’humidité excessive.", "Dépoussiérer délicatement avec un chiffon sec.", "Conserver à plat dans son pochon protecteur."]'::jsonb,
  '25cm × 16cm',
  16,
  'Antananarivo, Madagascar',
  '["/products/pochette-pina-1.jpg", "/products/pochette-pina-2.jpg", "/products/pochette-pina-3.jpg", "/products/pochette-pina-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "bleu", "name": "Bleu", "hex": "#3B6978", "priceDeltaMga": 0}, {"id": "vert", "name": "Vert", "hex": "#4A6B53", "priceDeltaMga": 0}, {"id": "moutarde", "name": "Moutarde", "hex": "#D4A017", "priceDeltaMga": 0}, {"id": "rose", "name": "Rose", "hex": "#D98A8A", "priceDeltaMga": 0}, {"id": "rouge", "name": "Rouge", "hex": "#A83232", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "25cm × 16cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  NULL,
  'Avec fermeture',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Pochette à rabat
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'pochette-a-rabat',
  'Pochette à rabat',
  'Soirs & Cérémonies',
  'Pochettes',
  107000,
  'Pochette à rabat doublée en tissu épais, 10 coloris',
  'Graphique et élégante, la Pochette à rabat est entièrement doublée en tissu épais avec une poche intérieure plaquée.',
  'Raphia naturel de Madagascar, doublure en tissu épais.',
  '["Préserver de l’humidité excessive.", "Dépoussiérer délicatement avec un chiffon sec.", "Conserver à plat dans son pochon protecteur."]'::jsonb,
  '26cm × 17cm',
  18,
  'Antananarivo, Madagascar',
  '["/products/pochette-a-rabat-1.jpg", "/products/pochette-a-rabat-2.jpg", "/products/pochette-a-rabat-3.jpg", "/products/pochette-a-rabat-4.jpg"]'::jsonb,
  '[{"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "bleu_roi", "name": "Bleu roi", "hex": "#1E3A8A", "priceDeltaMga": 0}, {"id": "jaune_moutarde", "name": "Jaune moutarde", "hex": "#D4A017", "priceDeltaMga": 0}, {"id": "rose_fushia", "name": "Rose fushia", "hex": "#C026D3", "priceDeltaMga": 0}, {"id": "rouge", "name": "Rouge", "hex": "#A83232", "priceDeltaMga": 0}, {"id": "vert_sapin", "name": "Vert sapin", "hex": "#14532D", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "26cm × 17cm", "priceDeltaMga": 0}]'::jsonb,
  true,
  true,
  NULL,
  'Entièrement doublé en tissu épais • Poche intérieure plaquée simple',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Pochette ULA
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'pochette-ula',
  'Pochette ULA',
  'Soirs & Cérémonies',
  'Pochettes',
  157000,
  'Pochette en raphia avec poche extérieure en cuir véritable gravé',
  'La Pochette ULA se distingue par sa poche extérieure en cuir véritable gravé, doublée et fermée par une glissière.',
  'Raphia naturel, cuir véritable gravé, doublure tissu.',
  '["Préserver de l’humidité excessive.", "Dépoussiérer délicatement avec un chiffon sec.", "Conserver à plat dans son pochon protecteur."]'::jsonb,
  '24cm × 20cm',
  20,
  'Antananarivo, Madagascar',
  '["/products/pochette-ula-1.jpg", "/products/pochette-ula-2.jpg", "/products/pochette-ula-3.jpg", "/products/pochette-ula-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "24cm × 20cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  NULL,
  'Poche extérieure en cuir véritable gravée, avec doublure et fermeture à glissière',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Sac à dos Cartā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'sac-a-dos-carta',
  'Sac à dos Cartā',
  'Lignes Urbaines',
  'Sacs à dos',
  337000,
  'Sac à dos en raphia avec rabat et anses en cuir, raphia au choix',
  'Cartā revisite le cartable dans une version solaire : rabat et anses en cuir, poche doublée avec fermeture, couleur du raphia au choix.',
  'Raphia naturel de Madagascar, cuir véritable, doublure tissu.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Longueur 29cm, hauteur 24cm, profondeur 12cm',
  36,
  'Antananarivo, Madagascar',
  '["/products/sac-a-dos-carta-1.jpg", "/products/sac-a-dos-carta-2.jpg", "/products/sac-a-dos-carta-3.jpg", "/products/sac-a-dos-carta-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 29cm, hauteur 24cm, profondeur 12cm", "priceDeltaMga": 0}]'::jsonb,
  true,
  true,
  'Rabat et anses en cuir',
  'Poche avec doublure et fermeture',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Tressa
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'tressa',
  'Tressa',
  'Lignes Urbaines',
  'Sacs à main',
  147000,
  'Petit sac au tressage texturé en raphia naturel',
  'Tressa met en valeur le relief du crochet dans un format compact et léger, idéal au quotidien.',
  'Raphia naturel de Madagascar.',
  '["Préserver de l’humidité excessive.", "Dépoussiérer délicatement avec un chiffon sec.", "Conserver à plat dans son pochon protecteur."]'::jsonb,
  'Longueur 22cm, hauteur 15cm, profondeur 8cm',
  22,
  'Antananarivo, Madagascar',
  '["/products/tressa-1.jpg", "/products/tressa-2.jpg", "/products/tressa-3.jpg", "/products/tressa-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 22cm, hauteur 15cm, profondeur 8cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  NULL,
  NULL,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Trousse zanā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'trousse-zana',
  'Trousse zanā',
  'Petite Maroquinerie',
  'Trousses',
  67000,
  'Trousse en raphia doublée avec fermeture',
  'L’accessoire indispensable de votre sac : la Trousse zanā, doublée et fermée, pour ranger maquillage et petits essentiels.',
  'Raphia naturel de Madagascar, doublure tissu.',
  '["Préserver de l’humidité excessive.", "Dépoussiérer délicatement avec un chiffon sec.", "Conserver à plat dans son pochon protecteur."]'::jsonb,
  'Longueur 20cm, hauteur 12cm, profondeur 8cm',
  12,
  'Antananarivo, Madagascar',
  '["/products/trousse-zana-1.jpg", "/products/trousse-zana-2.jpg", "/products/trousse-zana-3.jpg", "/products/trousse-zana-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Longueur 20cm, hauteur 12cm, profondeur 8cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  NULL,
  'Avec doublure et fermeture',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Zarā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'zara',
  'Zarā',
  'Lignes Urbaines',
  'Bandoulières',
  217000,
  'Sac bandoulière en raphia et cuir, tailles XS et M',
  'Zarā se décline en XS (porté poignet en raphia + bandoulière cuir amovible) et en M (anse cuir porté épaule + bandoulière chaîne dorée amovible). Couleurs unies ou chinées.',
  'Raphia et cuir.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'XS : 22 × 14,5 × 8 cm • M : 28 × 21 × 14 cm',
  28,
  'Antananarivo, Madagascar',
  '["/products/zara-1.jpg", "/products/zara-2.jpg", "/products/zara-3.jpg", "/products/zara-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "rose_chine", "name": "Rose chiné", "hex": "#C98D83", "priceDeltaMga": 0}, {"id": "rouge", "name": "Rouge", "hex": "#A83232", "priceDeltaMga": 0}, {"id": "rose", "name": "Rose", "hex": "#D98A8A", "priceDeltaMga": 0}, {"id": "sauge", "name": "Sauge", "hex": "#8A9A86", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "xs", "label": "Taille XS", "dimensions": "Largeur 22cm, hauteur 14,5cm, profondeur 8cm", "priceDeltaMga": 0, "details": "Anse format XS en raphia porté poignet et bandoulière amovible en cuir"}, {"id": "m", "label": "Taille M", "dimensions": "Largeur 28cm, hauteur 21cm, profondeur 14cm", "priceDeltaMga": 30000, "details": "Anse en cuir porté épaule et bandoulière en chaîne dorée amovible • Couleur unie ou chinée"}]'::jsonb,
  true,
  true,
  'Varient selon la taille (voir le détail de chaque taille)',
  NULL,
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Zara Rabat
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'zara-rabat',
  'Zara Rabat',
  'Collection Signature',
  'Sacs à main',
  257000,
  'Sac à rabat en raphia avec anse en cuir véritable',
  'Version habillée de Zarā, Zara Rabat se pare d’un rabat et d’une anse en cuir véritable. Entièrement doublé avec fermeture et poche interne.',
  'Raphia naturel de Madagascar, cuir véritable, doublure tissu.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Largeur 28cm, hauteur 16,5cm, profondeur 8cm',
  30,
  'Antananarivo, Madagascar',
  '["/products/zara-rabat-1.jpg", "/products/zara-rabat-2.jpg", "/products/zara-rabat-3.jpg", "/products/zara-rabat-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "unique", "label": "Taille unique", "dimensions": "Largeur 28cm, hauteur 16,5cm, profondeur 8cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true,
  'En cuir véritable',
  'Entièrement doublé, avec fermeture et poche interne',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Zoe Linā (avec trousse assortie)
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'zoe-lina-avec-trousse',
  'Zoe Linā (avec trousse assortie)',
  'Collection Signature',
  'Cabas',
  337000,
  'Le cabas Zoe Linā taille M livré avec sa trousse assortie',
  'Notre cabas emblématique accompagné de sa trousse assortie. Composez-le en choisissant le cuir (marron ou noir) et le raphia (nude, naturel ou miel).',
  'Raphia naturel de Madagascar, cuir véritable, doublure en tissu épais.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'Largeur 43cm, hauteur 27cm, profondeur 16cm',
  42,
  'Antananarivo, Madagascar',
  '["/products/zoe-lina-avec-trousse-1.jpg", "/products/zoe-lina-avec-trousse-2.jpg", "/products/zoe-lina-avec-trousse-3.jpg", "/products/zoe-lina-avec-trousse-4.jpg"]'::jsonb,
  '[{"id": "nude-cuir-marron", "name": "Nude • cuir marron", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "nude-cuir-noir", "name": "Nude • cuir noir", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "naturel-cuir-marron", "name": "Naturel • cuir marron", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "naturel-cuir-noir", "name": "Naturel • cuir noir", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "miel-cuir-marron", "name": "Miel • cuir marron", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "miel-cuir-noir", "name": "Miel • cuir noir", "hex": "#D4A373", "priceDeltaMga": 0}]'::jsonb,
  '[{"id": "m", "label": "Taille M", "dimensions": "Largeur 43cm, hauteur 27cm, profondeur 16cm", "priceDeltaMga": 0, "details": "Trousse assortie incluse"}]'::jsonb,
  true,
  true,
  NULL,
  'Entièrement doublé en tissu épais et fermeture. Deux poches intérieures (une simple et une fermée)',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- Zoe Linā
INSERT INTO products (slug, name, collection, category, price_mga, subtitle, description, material_details, care_instructions, dimensions, weaving_hours, origin_region, images, colors, sizes, featured, in_stock, handles, interior, production_delay) VALUES (
  'zoe-lina',
  'Zoe Linā',
  'Collection Signature',
  'Cabas',
  327000,
  'Le cabas iconique Lenkā avec poche extérieure et bandoulière amovible',
  'Pièce maîtresse de la maison, Zoe Linā offre une anse portée poignet, une poche extérieure et une bandoulière réglable et amovible. Disponible en tailles S, M et L.',
  'Raphia naturel de Madagascar, cuir véritable.',
  '["Préserver de l’humidité excessive et de la pluie directe.", "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.", "Nourrir les parties en cuir avec un baume incolore.", "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."]'::jsonb,
  'S : 32 × 20 × 12 cm • M : 46 × 27 × 16 cm • L : 48 × 30 × 17 cm',
  38,
  'Antananarivo, Madagascar',
  '["/products/zoe-lina-1.jpg", "/products/zoe-lina-2.jpg", "/products/zoe-lina-3.jpg", "/products/zoe-lina-4.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel", "hex": "#E8D8BF", "priceDeltaMga": 0}, {"id": "nude", "name": "Nude", "hex": "#E6D3C1", "priceDeltaMga": 0}, {"id": "miel", "name": "Miel", "hex": "#D4A373", "priceDeltaMga": 0}, {"id": "marron", "name": "Marron", "hex": "#58311D", "priceDeltaMga": 0}, {"id": "noir", "name": "Noir", "hex": "#1C1917", "priceDeltaMga": 10000}]'::jsonb,
  '[{"id": "s", "label": "Taille S", "dimensions": "Largeur 32cm, hauteur 20cm, profondeur 12cm", "priceDeltaMga": 0}, {"id": "m", "label": "Taille M", "dimensions": "Largeur 46cm, hauteur 27cm, profondeur 16cm", "priceDeltaMga": 50000}, {"id": "l", "label": "Taille L", "dimensions": "Largeur 48cm, hauteur 30cm, profondeur 17cm", "priceDeltaMga": 80000}]'::jsonb,
  true,
  true,
  'Anse portée poignet • Bandoulière réglable et amovible',
  'Poche extérieure',
  NULL
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  collection = EXCLUDED.collection,
  category = EXCLUDED.category,
  price_mga = EXCLUDED.price_mga,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  material_details = EXCLUDED.material_details,
  care_instructions = EXCLUDED.care_instructions,
  dimensions = EXCLUDED.dimensions,
  weaving_hours = EXCLUDED.weaving_hours,
  origin_region = EXCLUDED.origin_region,
  images = EXCLUDED.images,
  colors = EXCLUDED.colors,
  sizes = EXCLUDED.sizes,
  featured = EXCLUDED.featured,
  in_stock = EXCLUDED.in_stock,
  handles = EXCLUDED.handles,
  interior = EXCLUDED.interior,
  production_delay = EXCLUDED.production_delay;

-- 6. AVIS CLIENTES (insérés une seule fois)
INSERT INTO customer_reviews (author_name, location, product_name, rating, comment, verified_purchase, review_date)
SELECT 'Mialy R.', 'Antananarivo (Ivandry)', 'Zoe Linā', 5, 'Une merveille de précision ! Le crochet est d’une régularité incroyable. Livrée le lendemain à Ivandry, j’ai réglé en MVola au livreur.', true, '14 Octobre 2026'
WHERE NOT EXISTS (SELECT 1 FROM customer_reviews WHERE author_name = 'Mialy R.');
INSERT INTO customer_reviews (author_name, location, product_name, rating, comment, verified_purchase, review_date)
SELECT 'Rova Andriamalala', 'Toamasina', 'Ankarā', 5, 'Mon sac de tous les jours. Les anses en cuir et la finesse du raphia font sensation. Colis bien reçu en province, emballage très soigné.', true, '28 Septembre 2026'
WHERE NOT EXISTS (SELECT 1 FROM customer_reviews WHERE author_name = 'Rova Andriamalala');
INSERT INTO customer_reviews (author_name, location, product_name, rating, comment, verified_purchase, review_date)
SELECT 'Sophie D.', 'Antananarivo', 'Pochette à rabat', 5, 'Une finition digne des grandes maisons. La doublure est impeccable et le coloris exactement comme sur la photo.', true, '3 Novembre 2026'
WHERE NOT EXISTS (SELECT 1 FROM customer_reviews WHERE author_name = 'Sophie D.');
INSERT INTO customer_reviews (author_name, location, product_name, rating, comment, verified_purchase, review_date)
SELECT 'Haja N.', 'Antananarivo (Ambatobe)', 'Lunch bag', 5, 'Parfait pour le bureau : belle contenance, doublure propre et le raphia attire tous les compliments.', true, '2 Novembre 2026'
WHERE NOT EXISTS (SELECT 1 FROM customer_reviews WHERE author_name = 'Haja N.');
