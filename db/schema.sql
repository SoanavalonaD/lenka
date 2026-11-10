-- ==============================================================================
-- SCHEMA POSTGRESQL & SUPABASE POUR LENKĀ MADAGASCAR
-- ==============================================================================
-- Vous pouvez copier-coller l'intégralité de ce script dans l'Éditeur SQL de Supabase 
-- (Dashboard Supabase > SQL Editor > New query > Run).
-- ==============================================================================

-- 1. Table des produits
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

-- Index de performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products (featured);

-- 2. Table des zones de livraison
CREATE TABLE IF NOT EXISTS shipping_zones (
  id SERIAL PRIMARY KEY,
  code VARCHAR(60) UNIQUE NOT NULL,
  name VARCHAR(140) NOT NULL,
  fee_mga INTEGER NOT NULL,
  delivery_estimate VARCHAR(140) NOT NULL,
  description TEXT NOT NULL
);

-- 3. Table des avis clientes
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

-- 4. Table des commandes clients
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

CREATE INDEX IF NOT EXISTS idx_orders_number ON orders (order_number);

-- ==============================================================================
-- SÉCURITÉ SUPABASE : ROW LEVEL SECURITY (RLS)
-- ==============================================================================
-- Active la sécurité au niveau des lignes pour respecter les standards Supabase

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique pour le catalogue et les avis
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

-- ==============================================================================
-- DONNÉES INITIALES (SEEDING)
-- ==============================================================================

-- Insertion des zones de livraison
INSERT INTO shipping_zones (code, name, fee_mga, delivery_estimate, description)
VALUES 
  ('tana_ville', 'Antananarivo - Centre & Ville', 5000, 'Demain (J+1) entre 9h et 16h', 'Analakely, Isoraka, Ankorondrano, Ivandry, Ambatobe, Antaninarenina, Mahamasina, Ankadifotsy, Tanjombato.'),
  ('tana_peripherie', 'Antananarivo - Périphérie & Grand Tana', 8000, 'J+1 ou J+2 ouvrés', 'Talatamaty, Ivato, Iavoloha, Ambohimangakely, Ilafy, Itaosy, Ambohibao, Fenoarivo.'),
  ('province_express', 'Provinces (Villes majeures de Madagascar)', 18000, '48h à 72h selon la destination', 'Toamasina, Mahajanga, Antsiranana (Diégo), Toliara, Fianarantsoa, Antsirabe, Sambava, Nosy Be.')
ON CONFLICT (code) DO NOTHING;

-- Insertion des créations artisanales phares
INSERT INTO products (
  slug, name, collection, category, price_mga, subtitle, description,
  material_details, care_instructions, dimensions, weaving_hours, origin_region,
  images, colors, sizes, featured, in_stock
) VALUES 
(
  'zoe-lina-cabas-iconique',
  'Zoe Linā',
  'Collection Signature',
  'Cabas',
  245000,
  'Cabas iconique en raphia naturel tressé main & anses cuir chocolat',
  'Pièce maîtresse de la maison Lenkā, le cabas Zoe Linā incarne l alliance parfaite entre la robustesse des fibres de palmier raphia de Madagascar et la pureté des lignes contemporaines. Entièrement crocheté à la main point par point sur les hauts plateaux, il offre une souplesse texturée unique rehaussée de poignées en cuir à tannage végétal patiné.',
  '100% raphia naturel de Madagascar (Raphia farinifera) de première récolte, teinté aux pigments végétaux pour les accents terracotta et chocolat. Anses en cuir pleine fleur tannage végétal.',
  '["Préserver de l humidité excessive et des averses tropicales directes.", "Nettoyer à l aide d une brosse en soies naturelles douces.", "En cas de froissement, défroisser délicatement à la vapeur douce.", "Ranger à plat dans son pochon en lin."]'::jsonb,
  'L 42 cm × H 32 cm × P 14 cm',
  36,
  'Analamanga & Boeny, Madagascar',
  '["/images/products/hero-zoe-lina.jpg", "/images/products/cabas-mahajanga.jpg", "/images/products/savoir-faire-atelier.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel Doré", "hex": "#E8D8BF", "dyeOrigin": "Fibre brute séchée au soleil"}, {"id": "terracotta", "name": "Terracotta Brûlé", "hex": "#C47256", "dyeOrigin": "Pigments minéraux"}, {"id": "chocolat", "name": "Chocolat Écorce", "hex": "#382417", "dyeOrigin": "Décoction d écorces"}, {"id": "noir", "name": "Noir Mat", "hex": "#1C1917", "dyeOrigin": "Indigo et cendre"}]'::jsonb,
  '[{"id": "m", "label": "Moyen (Classique)", "dimensions": "38 × 28 × 12 cm", "priceDeltaMga": 0}, {"id": "l", "label": "Grand (Voyage & Plage)", "dimensions": "46 × 36 × 16 cm", "priceDeltaMga": 40000}]'::jsonb,
  true,
  true
),
(
  'cabas-mahajanga-chevron',
  'Mahajanga Chevron',
  'Horizons Côtiers',
  'Cabas',
  290000,
  'Grand cabas de ville & villégiature au tressage chevron bicolore',
  'Inspiré des brises marines du canal du Mozambique, le cabas Mahajanga se distingue par son spectaculaire motif chevron associant raphia brut doré et terre cuite. Sa base renforcée et son volume généreux accueillent vos essentiels du quotidien.',
  'Fibres de raphia d Anjajavy sélectionnées pour leur régularité. Teinture artisanale terracotta à base d argile ferrugineuse malgache.',
  '["Brosser doucement dans le sens du tressage.", "Ne pas immerger ni laver en machine.", "Laisser sécher à l ombre en cas de projection d eau."]'::jsonb,
  'L 48 cm × H 35 cm × P 18 cm',
  42,
  'Boeny (Région Ouest), Madagascar',
  '["/images/products/cabas-mahajanga.jpg", "/images/products/hero-zoe-lina.jpg"]'::jsonb,
  '[{"id": "bicolore", "name": "Naturel & Terracotta", "hex": "#D6A288", "dyeOrigin": "Argile latéritique"}, {"id": "naturel", "name": "Naturel Écru", "hex": "#EADFCF", "dyeOrigin": "Fibres non teintées"}]'::jsonb,
  '[{"id": "unique", "label": "Taille Unique Grand Format", "dimensions": "48 × 35 × 18 cm", "priceDeltaMga": 0}]'::jsonb,
  true,
  true
),
(
  'bandouliere-nosy-epuree',
  'Nosy Beauté',
  'Lignes Urbaines',
  'Bandoulières',
  185000,
  'Sac besace bandoulière au tressage serré avec fermoir laiton',
  'Pensé pour une liberté totale de mouvement, le sac bandoulière Nosy marie l élégance minimaliste d une silhouette structurée au charme brut du raphia serré. Sa bandoulière réglable et son fermoir assurent un porté croisé chic et pratique.',
  'Tricotage dense en maille serrée. Lanière en cuir lisse chocolat, quincaillerie en laiton massif brossé.',
  '["Éviter les frottements répétés avec des vêtements sombres.", "Entretenir les parties cuir avec un baume incolore."]'::jsonb,
  'L 26 cm × H 19 cm × P 8 cm',
  28,
  'Hauts-Plateaux d Imerina, Madagascar',
  '["/images/products/bandouliere-nosy.jpg", "/images/products/savoir-faire-atelier.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel Doré", "hex": "#E8D8BF", "dyeOrigin": "Fibre brute séchée au soleil"}, {"id": "chocolat", "name": "Chocolat Écorce", "hex": "#382417", "dyeOrigin": "Teinture écorce"}, {"id": "noir", "name": "Noir Onyx", "hex": "#1C1917", "dyeOrigin": "Bain de tanins"}]'::jsonb,
  '[{"id": "standard", "label": "Format Quotidien", "dimensions": "26 × 19 × 8 cm", "priceDeltaMga": 0}]'::jsonb,
  true,
  true
),
(
  'pochette-tsingy-ajouree',
  'Tsingy Ajourée',
  'Soirs d Été',
  'Pochettes',
  135000,
  'Pochette de cérémonie et cocktail au point de dentelle en raphia fin',
  'Évocation des crêtes calcaires des Tsingy de Bemaraha, cette pochette raffinée arbore un travail de dentelle de raphia au crochet d une prodigieuse finesse. Portée à la main, elle sublime vos tenues habillées.',
  'Raphia extra-fin calibré au peigne artisanal. Doublure intérieure en voile de coton biologique écru.',
  '["Manipuler avec précaution pour préserver la dentelle ajourée.", "Conserver dans son étui en tissu."]'::jsonb,
  'L 29 cm × H 17 cm × P 3 cm',
  22,
  'Ambositra & Antananarivo, Madagascar',
  '["/images/products/pochette-tsingy.jpg", "/images/products/bandouliere-nosy.jpg"]'::jsonb,
  '[{"id": "lin", "name": "Lin Blanchi & Ivoire", "hex": "#FAF3E6", "dyeOrigin": "Blanchiment naturel au soleil"}, {"id": "terracotta", "name": "Terracotta Pâle", "hex": "#D9927A", "dyeOrigin": "Pigment ocre jaune"}, {"id": "dore", "name": "Raphia Miel", "hex": "#E2BA82", "dyeOrigin": "Infusion de thé"}]'::jsonb,
  '[{"id": "unique", "label": "Taille Soirée", "dimensions": "29 × 17 × 3 cm", "priceDeltaMga": 0}]'::jsonb,
  true,
  true
),
(
  'lunchbag-ambanja-artisanal',
  'Ambanja Roll-Top',
  'Vie Quotidienne',
  'Lunch bags',
  160000,
  'Sac repas isotherme roll-top en raphia tressé avec bouton olivier',
  'Réinventez la pause déjeuner avec ce lunch bag d exception : l extérieur en raphia tressé main camoufle une doublure thermique lavable étanche de haute performance.',
  'Extérieur en fibres de raphia hydrofugées par cire d abeille naturelle. Doublure isolante thermique lavable.',
  '["Intérieur lavable d un coup d éponge humide.", "Extérieur raphia dépoussiérable au pinceau doux."]'::jsonb,
  'L 23 cm × H 28 cm × P 14 cm',
  20,
  'Vallée du Sambirano & Tana, Madagascar',
  '["/images/products/lunchbag-ambanja.jpg", "/images/products/savoir-faire-atelier.jpg"]'::jsonb,
  '[{"id": "naturel", "name": "Naturel Rustique", "hex": "#E5D4B8", "dyeOrigin": "Fibre brute"}, {"id": "chocolat", "name": "Chocolat & Olive", "hex": "#4A3525", "dyeOrigin": "Coques de cacao"}]'::jsonb,
  '[{"id": "standard", "label": "Format Repas (4.5 L)", "dimensions": "23 × 28 × 14 cm", "priceDeltaMga": 0}]'::jsonb,
  false,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Insertion des avis clientes
INSERT INTO customer_reviews (author_name, location, product_name, rating, comment, verified_purchase, review_date)
VALUES 
  ('Mialy R.', 'Antananarivo (Ivandry)', 'Zoe Linā (Terracotta Brûlé)', 5, 'Une merveille de précision ! Le tressage est d une régularité incroyable et l odeur du raphia naturel est un délice. J ai été livrée le lendemain chez moi à Ivandry et j ai pu régler en MVola directement au livreur.', true, '14 Octobre 2026'),
  ('Rova Andriamalala', 'Toamasina', 'Mahajanga Chevron', 5, 'Mon sac de tous les jours à Tamatave. Les chevrons font sensation à chaque sortie. Colis reçu en 48h avec un emballage soigné.', true, '28 Septembre 2026'),
  ('Sophie Dupont-L.', 'Paris / Antananarivo', 'Tsingy Ajourée & Zoe Linā', 5, 'La quintessence du luxe éthique malgache. Ce n est pas un simple sac de plage, c est de la haute maroquinerie de fibre végétale.', true, '3 Novembre 2026')
ON CONFLICT DO NOTHING;
