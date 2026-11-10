import { Product, ShippingZone, CustomerReview } from "./types";

export const INITIAL_PRODUCTS: Omit<Product, "id">[] = [
  {
    slug: "zoe-lina-cabas-iconique",
    name: "Zoe Linā",
    collection: "Collection Signature",
    category: "Cabas",
    price_mga: 245000,
    subtitle: "Cabas iconique en raphia naturel tressé main & anses cuir chocolat",
    description:
      "Pièce maîtresse de la maison Lenkā, le cabas 'Zoe Linā' incarne l'alliance parfaite entre la robustesse des fibres de palmier raphia de Madagascar et la pureté des lignes contemporaines. Entièrement crocheté à la main point par point sur les hauts plateaux, il offre une souplesse texturée unique rehaussée de poignées en cuir à tannage végétal patiné.",
    material_details:
      "100% raphia naturel de Madagascar (Raphia farinifera) de première récolte, teinté aux pigments végétaux pour les accents terracotta et chocolat. Anses en cuir pleine fleur tannage végétal assemblées à la main avec surpiqûres sellier au fil ciré.",
    care_instructions: [
      "Préserver de l'humidité excessive et des averses tropicales directes.",
      "Nettoyer à l'aide d'une brosse en soies naturelles douces ou d'un chiffon légèrement humide.",
      "En cas de froissement, défroisser délicatement à la vapeur douce sans contact direct avec le fer.",
      "Ranger à plat ou rembourré de papier de soie dans son pochon en lin protecteur.",
    ],
    dimensions: "L 42 cm × H 32 cm × P 14 cm (Porté épaule 24 cm)",
    weaving_hours: 36,
    origin_region: "Analamanga & Boeny, Madagascar",
    images: [
      "/images/products/hero-zoe-lina.jpg",
      "/images/products/cabas-mahajanga.jpg",
      "/images/products/savoir-faire-atelier.jpg",
    ],
    colors: [
      { id: "naturel", name: "Naturel Doré", hex: "#E8D8BF", dyeOrigin: "Fibre brute séchée au soleil" },
      { id: "terracotta", name: "Terracotta Brûlé", hex: "#C47256", dyeOrigin: "Pigments minéraux de terre rouge" },
      { id: "chocolat", name: "Chocolat Écorce", hex: "#382417", dyeOrigin: "Décoction d'écorces locales" },
      { id: "noir", name: "Noir Mat", hex: "#1C1917", dyeOrigin: "Bain végétal d'indigo et cendre" },
    ],
    sizes: [
      { id: "m", label: "Moyen (Classique)", dimensions: "38 × 28 × 12 cm", priceDeltaMga: 0 },
      { id: "l", label: "Grand (Voyage & Plage)", dimensions: "46 × 36 × 16 cm", priceDeltaMga: 40000 },
    ],
    featured: true,
    in_stock: true,
  },
  {
    slug: "cabas-mahajanga-chevron",
    name: "Mahajanga Chevron",
    collection: "Horizons Côtiers",
    category: "Cabas",
    price_mga: 290000,
    subtitle: "Grand cabas de ville & villégiature au tressage chevron bicolore",
    description:
      "Inspiré des brises marines du canal du Mozambique, le cabas 'Mahajanga' se distingue par son spectaculaire motif chevron associant raphia brut doré et terre cuite. Sa base renforcée et son volume généreux accueillent vos essentiels du quotidien, vos dossiers ou vos escapades vers la côte.",
    material_details:
      "Fibres de raphia d'Anjajavy sélectionnées pour leur régularité et leur souplesse. Teinture artisanale terracotta à base d'argile ferrugineuse malgache.",
    care_instructions: [
      "Brosser doucement dans le sens du tressage pour dépoussiérer.",
      "Ne pas immerger ni laver en machine.",
      "Laisser sécher à l'ombre en cas de projection d'eau de mer.",
    ],
    dimensions: "L 48 cm × H 35 cm × P 18 cm",
    weaving_hours: 42,
    origin_region: "Boeny (Région Ouest), Madagascar",
    images: [
      "/images/products/cabas-mahajanga.jpg",
      "/images/products/hero-zoe-lina.jpg",
    ],
    colors: [
      { id: "bicolore", name: "Naturel & Terracotta", hex: "#D6A288", dyeOrigin: "Argile latéritique" },
      { id: "naturel", name: "Naturel Écru", hex: "#EADFCF", dyeOrigin: "Fibres non teintées" },
    ],
    sizes: [
      { id: "unique", label: "Taille Unique Grand Format", dimensions: "48 × 35 × 18 cm", priceDeltaMga: 0 },
    ],
    featured: true,
    in_stock: true,
  },
  {
    slug: "bandouliere-nosy-epuree",
    name: "Nosy Beauté",
    collection: "Lignes Urbaines",
    category: "Bandoulières",
    price_mga: 185000,
    subtitle: "Sac besace bandoulière au tressage serré avec fermoir laiton",
    description:
      "Pensé pour une liberté totale de mouvement, le sac bandoulière 'Nosy' marie l'élégance minimaliste d'une silhouette structurée au charme brut du raphia serré. Sa bandoulière réglable et son fermoir magnétique sous rabat assurent un porté croisé chic et pratique en ville.",
    material_details:
      "Tricotage dense en maille serrée pour une tenue impeccable dans le temps. Lanière en cuir lisse chocolat, quincaillerie en laiton massif brossé.",
    care_instructions: [
      "Éviter les frottements répétés avec des vêtements sombres non fixés.",
      "Entretenir les parties cuir avec un baume incolore.",
    ],
    dimensions: "L 26 cm × H 19 cm × P 8 cm (Bandoulière ajustable 105 - 125 cm)",
    weaving_hours: 28,
    origin_region: "Hauts-Plateaux d'Imerina, Madagascar",
    images: [
      "/images/products/bandouliere-nosy.jpg",
      "/images/products/savoir-faire-atelier.jpg",
    ],
    colors: [
      { id: "naturel", name: "Naturel Doré", hex: "#E8D8BF", dyeOrigin: "Fibre brute séchée au soleil" },
      { id: "chocolat", name: "Chocolat Écorce", hex: "#382417", dyeOrigin: "Teinture écorce d'albizia" },
      { id: "noir", name: "Noir Onyx", hex: "#1C1917", dyeOrigin: "Bain de suie et tanins" },
    ],
    sizes: [
      { id: "standard", label: "Format Quotidien", dimensions: "26 × 19 × 8 cm", priceDeltaMga: 0 },
    ],
    featured: true,
    in_stock: true,
  },
  {
    slug: "pochette-tsingy-ajouree",
    name: "Tsingy Ajourée",
    collection: "Soirs d'Été",
    category: "Pochettes",
    price_mga: 135000,
    subtitle: "Pochette de cérémonie et cocktail au point de dentelle en raphia fin",
    description:
      "Évocation des crêtes calcaires des Tsingy de Bemaraha, cette pochette raffinée arbore un travail de dentelle de raphia au crochet d'une prodigieuse finesse. Portée à la main ou glissée sous le bras, elle sublime vos tenues de soirée, cocktails et mariages.",
    material_details:
      "Raphia extra-fin calibré au peigne artisanal. Doublure intérieure en voile de coton biologique écru avec poche plaquée sécurisée.",
    care_instructions: [
      "Manipuler avec précaution pour préserver la dentelle ajourée.",
      "Conserver dans son étui en tissu.",
    ],
    dimensions: "L 29 cm × H 17 cm × P 3 cm",
    weaving_hours: 22,
    origin_region: "Ambositra & Antananarivo, Madagascar",
    images: [
      "/images/products/pochette-tsingy.jpg",
      "/images/products/bandouliere-nosy.jpg",
    ],
    colors: [
      { id: "lin", name: "Lin Blanchi & Ivoire", hex: "#FAF3E6", dyeOrigin: "Blanchiment naturel au soleil" },
      { id: "terracotta", name: "Terracotta Pâle", hex: "#D9927A", dyeOrigin: "Pigment ocre jaune et rouge" },
      { id: "dore", name: "Raphia Miel", hex: "#E2BA82", dyeOrigin: "Infusion de feuilles de thé" },
    ],
    sizes: [
      { id: "unique", label: "Taille Soirée", dimensions: "29 × 17 × 3 cm", priceDeltaMga: 0 },
    ],
    featured: true,
    in_stock: true,
  },
  {
    slug: "lunchbag-ambanja-artisanal",
    name: "Ambanja Roll-Top",
    collection: "Vie Quotidienne",
    category: "Lunch bags",
    price_mga: 160000,
    subtitle: "Sac repas isotherme roll-top en raphia tressé avec bouton olivier",
    description:
      "Réinventez la pause déjeuner avec ce lunch bag d'exception : l'extérieur en raphia tressé main camoufle une doublure thermique lavable de haute performance. Son système de fermeture par enroulement (roll-top) et bouton sculpté en bois local apporte une touche bohème et élégante au bureau.",
    material_details:
      "Extérieur en fibres de raphia hydrofugées par cire d'abeille naturelle. Doublure isolante thermique étanche et sangle de maintien en cuir vegan.",
    care_instructions: [
      "Intérieur lavable d'un simple coup d'éponge humide.",
      "Extérieur raphia dépoussiérable au pinceau doux.",
    ],
    dimensions: "L 23 cm × H 28 cm (déroulé 36 cm) × P 14 cm",
    weaving_hours: 20,
    origin_region: "Vallée du Sambirano & Tana, Madagascar",
    images: [
      "/images/products/lunchbag-ambanja.jpg",
      "/images/products/savoir-faire-atelier.jpg",
    ],
    colors: [
      { id: "naturel", name: "Naturel Rustique", hex: "#E5D4B8", dyeOrigin: "Fibre brute de Sambirano" },
      { id: "chocolat", name: "Chocolat & Olive", hex: "#4A3525", dyeOrigin: "Coques de cacao recyclées" },
    ],
    sizes: [
      { id: "standard", label: "Format Repas (4.5 L)", dimensions: "23 × 28 × 14 cm", priceDeltaMga: 0 },
    ],
    featured: false,
    in_stock: true,
  },
  {
    slug: "cabas-sainte-marie-panier",
    name: "Sainte-Marie Seau",
    collection: "Collection Signature",
    category: "Cabas",
    price_mga: 215000,
    subtitle: "Panier seau structuré aux anses tubulaires en raphia torsadé",
    description:
      "Inspiré de l'île aux nattes et des rivages sauvages de l'Océan Indien, ce panier seau cylindrique séduit par sa géométrie pure. Ses anses tubulaires tressées sont extrêmement douces au porter.",
    material_details:
      "Armature semi-rigide en liane naturelle d'Aralia habillée de brins de raphia soigneusement torsadés. Pochon de serrage intégré en lin biologique écru.",
    care_instructions: [
      "Garder à l'abri de l'écrasement.",
      "Le pochon textile intérieur peut être nettoyé séparément.",
    ],
    dimensions: "Diamètre 22 cm × Hauteur 26 cm (Anses 18 cm)",
    weaving_hours: 30,
    origin_region: "Côte Est & Antananarivo, Madagascar",
    images: [
      "/images/products/hero-zoe-lina.jpg",
      "/images/products/cabas-mahajanga.jpg",
    ],
    colors: [
      { id: "naturel", name: "Sable Chaud", hex: "#EADDC8", dyeOrigin: "Teinte d'origine de la côte" },
      { id: "noir", name: "Noir & Lin", hex: "#23201D", dyeOrigin: "Teinture bois de campêche" },
    ],
    sizes: [
      { id: "unique", label: "Format Seau 22cm", dimensions: "22 × 26 cm", priceDeltaMga: 0 },
    ],
    featured: false,
    in_stock: true,
  },
];

export const INITIAL_SHIPPING_ZONES: Omit<ShippingZone, "id">[] = [
  {
    code: "tana_ville",
    name: "Antananarivo - Centre & Ville",
    fee_mga: 5000,
    delivery_estimate: "Demain (J+1) entre 9h et 16h",
    description:
      "Analakely, Isoraka, Ankorondrano, Ivandry, Ambatobe, Antaninarenina, Mahamasina, Ankadifotsy, Tanjombato.",
  },
  {
    code: "tana_peripherie",
    name: "Antananarivo - Périphérie & Grand Tana",
    fee_mga: 8000,
    delivery_estimate: "J+1 ou J+2 ouvrés",
    description:
      "Talatamaty, Ivato, Iavoloha, Ambohimangakely, Ilafy, Itaosy, Ambohibao, Fenoarivo.",
  },
  {
    code: "province_express",
    name: "Provinces (Villes majeures de Madagascar)",
    fee_mga: 18000,
    delivery_estimate: "48h à 72h selon la destination",
    description:
      "Toamasina, Mahajanga, Antsiranana (Diégo), Toliara, Fianarantsoa, Antsirabe, Sambava, Nosy Be. Envoi sécurisé via coopérative express / Colis Relais avec numéro de récépissé transmis sur WhatsApp.",
  },
];

export const INITIAL_REVIEWS: Omit<CustomerReview, "id">[] = [
  {
    author_name: "Mialy R.",
    location: "Antananarivo (Ivandry)",
    product_name: "Zoe Linā (Terracotta Brûlé)",
    rating: 5,
    comment:
      "Une merveille de précision ! Le tressage est d'une régularité incroyable et l'odeur du raphia naturel est un délice. J'ai été livrée le lendemain chez moi à Ivandry et j'ai pu régler en MVola directement au livreur. Félicitations pour ce travail d'artisanat !",
    verified_purchase: true,
    review_date: "14 Octobre 2026",
  },
  {
    author_name: "Rova Andriamalala",
    location: "Toamasina",
    product_name: "Mahajanga Chevron",
    rating: 5,
    comment:
      "Mon sac de tous les jours à Tamatave. Les chevrons font sensation à chaque sortie. Colis reçu en 48h à la gare routière avec un emballage soigné et un petit mot personnalisé en lin.",
    verified_purchase: true,
    review_date: "28 Septembre 2026",
  },
  {
    author_name: "Sophie Dupont-L.",
    location: "Paris / Antananarivo",
    product_name: "Tsingy Ajourée & Zoe Linā",
    rating: 5,
    comment:
      "La quintessence du luxe éthique malgache. Ce n'est pas un simple sac de plage, c'est de la haute maroquinerie de fibre végétale. La finesse de la pochette Tsingy rivalise avec les plus grandes maisons de mode parisiennes.",
    verified_purchase: true,
    review_date: "3 Novembre 2026",
  },
  {
    author_name: "Haja N.",
    location: "Antananarivo (Ambatobe)",
    product_name: "Ambanja Roll-Top",
    rating: 5,
    comment:
      "Parfait pour emporter mon déjeuner au bureau avec distinction. L'intérieur thermique est très étanche et facile à laver, tandis que le raphia extérieur attire tous les compliments de mes collègues.",
    verified_purchase: true,
    review_date: "2 Novembre 2026",
  },
];

