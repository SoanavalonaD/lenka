import { Product, ShippingZone, CustomerReview } from "./types";

// Tous les produits sont désormais dynamiques et proviennent de la base de données Supabase / PostgreSQL.
// Aucun produit n'est codé en dur.
export const INITIAL_PRODUCTS: Omit<Product, "id">[] = [
  {
    "slug": "ankara",
    "name": "Ankarā",
    "collection": "Collection Signature",
    "category": "Sacs à main",
    "price_mga": 197000,
    "subtitle": "Sac en raphia crocheté main et cuir véritable, disponible en tailles S, M et L",
    "description": "Pièce polyvalente de la maison Lenkā, Ankarā allie la délicatesse du raphia malgache crocheté à la main à la noblesse du cuir véritable. Ses anses interchangeables permettent un porté main, épaule ou bandoulière selon la taille choisie.",
    "material_details": "Raphia naturel de Madagascar, cuir véritable, doublure en tissu épais.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Taille S : 22 × 18 × 8 cm • Taille M : 27 × 21 × 11 cm • Taille L : 34 × 24 × 10 cm",
    "weaving_hours": 34,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/ankara-1.jpg",
      "/products/ankara-2.jpg",
      "/products/ankara-3.jpg",
      "/products/ankara-4.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "rose",
        "hex": "#D98A8A",
        "name": "Rose",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "s",
        "label": "Taille S",
        "details": "Anses : porté poignet amovible en raphia tressé décorée de cuir et bandoulière fixe en cuir",
        "dimensions": "Longueur 22cm, hauteur 18cm, profondeur 8cm",
        "priceDeltaMga": 0
      },
      {
        "id": "m",
        "label": "Taille M",
        "details": "Anses : porté épaule en cuir réglable fixe et anse amovible en raphia tressé • Disponible sur commande : délai de production de 20 jours",
        "dimensions": "Longueur 27cm, hauteur 21cm, profondeur 11cm",
        "priceDeltaMga": 80000
      },
      {
        "id": "l",
        "label": "Taille L",
        "details": "Anses : porté épaule en cuir et anse bandoulière en raphia et cuir amovible (longueur non négociable)",
        "dimensions": "Longueur 34cm, hauteur 24cm, profondeur 10cm",
        "priceDeltaMga": 110000
      }
    ],
    "featured": true,
    "in_stock": true,
    "handles": "Varient selon la taille (voir le détail de chaque taille)",
    "interior": "Entièrement doublé en tissu épais, avec poche plaquée et fermeture"
  },
  {
    "slug": "bandouliere-zana",
    "name": "Bandoulière Zanā",
    "collection": "Lignes Urbaines",
    "category": "Bandoulières",
    "price_mga": 187000,
    "subtitle": "Sac bandoulière en raphia avec anse en cuir réglable",
    "description": "Format pratique et allure épurée : la Bandoulière Zanā accompagne vos journées en toute légèreté, avec une anse en cuir réglable et un intérieur doublé et fermé.",
    "material_details": "Raphia naturel de Madagascar, cuir véritable, doublure tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Longueur 23cm, hauteur 16cm, profondeur 8cm",
    "weaving_hours": 24,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/bandouliere-zana-1.png"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "m",
        "label": "Taille M",
        "dimensions": "Longueur 23cm, hauteur 16cm, profondeur 8cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": true,
    "in_stock": true,
    "handles": "En cuir, longueur réglable",
    "interior": "Avec doublure et fermeture"
  },
  {
    "slug": "chapeau-suda",
    "name": "Chapeau Sudā",
    "collection": "Soleil & Plein Air",
    "category": "Chapeaux",
    "price_mga": 127000,
    "subtitle": "Chapeau en raphia crocheté main, bord de 10, 12 ou 14 cm",
    "description": "Accessoire solaire par excellence, le Chapeau Sudā est crocheté serré en raphia naturel. Choisissez la largeur de bord qui vous ressemble.",
    "material_details": "100% raphia naturel de Madagascar.",
    "care_instructions": [
      "Ranger sans écraser le calot.",
      "Défroisser le bord à la vapeur douce, sans contact direct.",
      "Éviter l’exposition prolongée à l’humidité."
    ],
    "dimensions": "Tour de tête (calot) : 57cm • Bord : 10cm, 12cm ou 14cm",
    "weaving_hours": 18,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/chapeau-suda-1.jpg",
      "/products/chapeau-suda-2.jpg",
      "/products/chapeau-suda-3.jpg"
    ],
    "colors": [
      {
        "id": "nude-bordure-noir",
        "hex": "#E2D5C3",
        "name": "Nude avec bordure noir",
        "priceDeltaMga": 0
      },
      {
        "id": "nude-uni",
        "hex": "#EADDC8",
        "name": "Nude uni (bord 14cm uniquement)",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "bord-10",
        "label": "Bord 10cm",
        "details": "Couleur : nude avec bordure noir",
        "dimensions": "Tour de tête 57cm • Bordure 10cm",
        "priceDeltaMga": 0
      },
      {
        "id": "bord-12",
        "label": "Bord 12cm",
        "details": "Couleur : nude avec bordure noir",
        "dimensions": "Tour de tête 57cm • Bordure 12cm",
        "priceDeltaMga": 10000
      },
      {
        "id": "bord-14",
        "label": "Bord 14cm",
        "details": "Couleur : nude uni ou nude avec bordure noir",
        "dimensions": "Tour de tête 57cm • Bordure 14cm",
        "priceDeltaMga": 20000
      }
    ],
    "featured": true,
    "in_stock": true
  },
  {
    "slug": "irina-bay",
    "name": "Irinā Bay",
    "collection": "Horizons Côtiers",
    "category": "Bandoulières",
    "price_mga": 192000,
    "subtitle": "Sac bandoulière en raphia, cuir et coton aux couleurs estivales",
    "description": "Irinā Bay associe raphia, cuir et tissu en coton dans une silhouette compacte, avec une anse bandoulière en cuir amovible et réglable. Non disponible en noir.",
    "material_details": "Raphia, cuir, tissu en coton.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Longueur 22cm, hauteur 19cm, profondeur 8cm",
    "weaving_hours": 26,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/irina-bay-1.jpg",
      "/products/irina-bay-2.jpg",
      "/products/irina-bay-3.jpg",
      "/products/irina-bay-4.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "rouge",
        "hex": "#A83232",
        "name": "Rouge",
        "priceDeltaMga": 0
      },
      {
        "id": "rose",
        "hex": "#D98A8A",
        "name": "Rose",
        "priceDeltaMga": 0
      },
      {
        "id": "bleu",
        "hex": "#3B6978",
        "name": "Bleu",
        "priceDeltaMga": 0
      },
      {
        "id": "vert",
        "hex": "#4A6B53",
        "name": "Vert",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 22cm, hauteur 19cm, profondeur 8cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "handles": "Anse bandoulière en cuir amovible et réglable",
    "interior": "En tissu, avec une poche plaquée et fermeture à glissière"
  },
  {
    "slug": "lumaya",
    "name": "Lumaya",
    "collection": "Collection Signature",
    "category": "Sacs à main",
    "price_mga": 277000,
    "subtitle": "Sac à rabat en cuir véritable et raphia, cuir noir ou marron au choix",
    "description": "Lumaya séduit par son rabat et son anse en cuir véritable. Composez votre pièce en choisissant la couleur du cuir (noir ou marron) et celle du raphia (naturel, nude ou miel).",
    "material_details": "Raphia naturel de Madagascar, cuir véritable, doublure tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Longueur 27cm, hauteur 19cm, profondeur 8cm",
    "weaving_hours": 32,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/lumaya-1.jpg",
      "/products/lumaya-2.jpg",
      "/products/lumaya-3.jpg",
      "/products/lumaya-4.jpg"
    ],
    "colors": [
      {
        "id": "naturel-cuir-marron",
        "hex": "#E8D8BF",
        "name": "Naturel • cuir marron",
        "priceDeltaMga": 0
      },
      {
        "id": "naturel-cuir-noir",
        "hex": "#E8D8BF",
        "name": "Naturel • cuir noir",
        "priceDeltaMga": 0
      },
      {
        "id": "nude-cuir-marron",
        "hex": "#E6D3C1",
        "name": "Nude • cuir marron",
        "priceDeltaMga": 0
      },
      {
        "id": "nude-cuir-noir",
        "hex": "#E6D3C1",
        "name": "Nude • cuir noir",
        "priceDeltaMga": 0
      },
      {
        "id": "miel-cuir-marron",
        "hex": "#D4A373",
        "name": "Miel • cuir marron",
        "priceDeltaMga": 0
      },
      {
        "id": "miel-cuir-noir",
        "hex": "#D4A373",
        "name": "Miel • cuir noir",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 27cm, hauteur 19cm, profondeur 8cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": true,
    "in_stock": true,
    "handles": "Anse et rabat en cuir véritable",
    "interior": "Entièrement doublé en tissu, avec une poche simple plaquée et une fermeture zippée"
  },
  {
    "slug": "luna",
    "name": "Lunā",
    "collection": "Collection Signature",
    "category": "Sacs à main",
    "price_mga": 197000,
    "subtitle": "Sac en raphia et cuir véritable entièrement doublé",
    "description": "Une silhouette douce et féminine, Lunā est entièrement doublé, fermé par une glissière et muni d’une poche intérieure plaquée.",
    "material_details": "Raphia, cuir véritable, tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Longueur 28cm, hauteur 21cm, profondeur 12cm",
    "weaving_hours": 28,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/luna-1.jpg"
    ],
    "colors": [
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 28cm, hauteur 21cm, profondeur 12cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "interior": "Entièrement doublé avec fermeture à glissière, poche simple plaquée non fermée"
  },
  {
    "slug": "lunch-bag",
    "name": "Lunch bag",
    "collection": "Vie Quotidienne",
    "category": "Lunch bags",
    "price_mga": 185000,
    "subtitle": "Lunch bag en raphia, cuir et coton avec cordon de fermeture",
    "description": "Le Lunch bag Lenkā sublime la pause déjeuner : raphia tressé main, finitions cuir, doublure coton & polyester et cordon de serrage en coton. Disponible en tailles S, M et L, sur commande.",
    "material_details": "Raphia, cuir, tissu en coton & polyester, cordon en coton.",
    "care_instructions": [
      "Nettoyer la doublure avec une éponge légèrement humide.",
      "Dépoussiérer le raphia avec une brosse souple.",
      "Laisser sécher à l’air libre, à l’ombre."
    ],
    "dimensions": "S : 35 × 19 × 15 cm • M : 38 × 22 × 17 cm • L : 40 × 25 × 19 cm",
    "weaving_hours": 22,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/lunch-bag-1.jpg",
      "/products/lunch-bag-2.jpg",
      "/products/lunch-bag-3.jpg",
      "/products/lunch-bag-4.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "s",
        "label": "Taille S",
        "dimensions": "Largeur (ouverture) 35cm, hauteur 19cm, profondeur (fond) 15cm",
        "priceDeltaMga": 0
      },
      {
        "id": "m",
        "label": "Taille M",
        "dimensions": "Largeur (ouverture) 38cm, hauteur 22cm, profondeur (fond) 17cm",
        "priceDeltaMga": 20000
      },
      {
        "id": "l",
        "label": "Taille L",
        "dimensions": "Largeur (ouverture) 40cm, hauteur 25cm, profondeur (fond) 19cm",
        "priceDeltaMga": 62000
      }
    ],
    "featured": true,
    "in_stock": true,
    "production_delay": "Délai de production : 20 jours"
  },
  {
    "slug": "manila",
    "name": "Manilā",
    "collection": "Collection Signature",
    "category": "Sacs à main",
    "price_mga": 287000,
    "subtitle": "Sac structuré en raphia et cuir véritable, doublé tissu épais",
    "description": "Élégant et intemporel, Manilā est entièrement doublé d’un tissu épais, avec fermeture et poche plaquée intérieure.",
    "material_details": "Raphia, cuir véritable, tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Longueur 28cm, hauteur 18cm, profondeur 8cm",
    "weaving_hours": 30,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/manila-1.png"
    ],
    "colors": [
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 28cm, hauteur 18cm, profondeur 8cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "interior": "Entièrement doublé avec un tissu épais, fermeture et poche plaquée interne"
  },
  {
    "slug": "mary-lina",
    "name": "Mary Linā",
    "collection": "Lignes Urbaines",
    "category": "Bandoulières",
    "price_mga": 257000,
    "subtitle": "Sac bandoulière en raphia tressé décoré de cuir",
    "description": "Mary Linā arbore une bandoulière fixe en cuir et raphia tressé ornée de cuir. Intérieur doublé en tissu épais avec poche plaquée et fermeture.",
    "material_details": "Raphia, cuir véritable, tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Longueur 28cm, hauteur 16cm, profondeur 9cm",
    "weaving_hours": 32,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/mary-lina-1.jpg",
      "/products/mary-lina-2.jpg",
      "/products/mary-lina-3.jpg",
      "/products/mary-lina-4.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 28cm, hauteur 16cm, profondeur 9cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": true,
    "in_stock": true,
    "handles": "Bandoulière fixe en cuir et raphia tressé décorée de cuir",
    "interior": "Entièrement doublé avec un tissu épais, avec poche plaquée et fermeture"
  },
  {
    "slug": "miraya",
    "name": "Mirayā",
    "collection": "Lignes Urbaines",
    "category": "Bandoulières",
    "price_mga": 147000,
    "subtitle": "Petit sac bandoulière en raphia avec pochon en tissu",
    "description": "Compact et léger, Mirayā se porte en bandoulière grâce à son anse en cuir réglable. Livré avec un pochon en tissu intérieur.",
    "material_details": "Raphia naturel, cuir, pochon en tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive.",
      "Dépoussiérer délicatement avec un chiffon sec.",
      "Conserver à plat dans son pochon protecteur."
    ],
    "dimensions": "Longueur 18cm, hauteur 15cm, profondeur 4cm",
    "weaving_hours": 18,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/miraya-1.jpg",
      "/products/miraya-2.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 18cm, hauteur 15cm, profondeur 4cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "handles": "En cuir, longueur réglable",
    "interior": "Avec pochon en tissu, sans doublure interne"
  },
  {
    "slug": "pochette-classy",
    "name": "Pochette classy",
    "collection": "Soirs & Cérémonies",
    "category": "Pochettes",
    "price_mga": 127000,
    "subtitle": "Pochette doublée avec poche et fermeture à glissière, 10 coloris",
    "description": "Sobre et raffinée, la Pochette classy accompagne vos soirées et cérémonies. Entièrement doublée, avec poche et fermeture à glissière.",
    "material_details": "Raphia naturel de Madagascar, doublure tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive.",
      "Dépoussiérer délicatement avec un chiffon sec.",
      "Conserver à plat dans son pochon protecteur."
    ],
    "dimensions": "Longueur 18cm, hauteur 15cm, profondeur 4cm",
    "weaving_hours": 16,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/pochette-classy-1.jpg",
      "/products/pochette-classy-2.jpg",
      "/products/pochette-classy-3.jpg",
      "/products/pochette-classy-4.jpg"
    ],
    "colors": [
      {
        "id": "ecru",
        "hex": "#F4EFEA",
        "name": "Écru",
        "priceDeltaMga": 0
      },
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "bleu",
        "hex": "#3B6978",
        "name": "Bleu",
        "priceDeltaMga": 0
      },
      {
        "id": "moutarde",
        "hex": "#D4A017",
        "name": "Moutarde",
        "priceDeltaMga": 0
      },
      {
        "id": "rose",
        "hex": "#D98A8A",
        "name": "Rose",
        "priceDeltaMga": 0
      },
      {
        "id": "rouge",
        "hex": "#A83232",
        "name": "Rouge",
        "priceDeltaMga": 0
      },
      {
        "id": "vert",
        "hex": "#4A6B53",
        "name": "Vert",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 18cm, hauteur 15cm, profondeur 4cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "interior": "Entièrement doublé, avec poche & fermeture à glissière"
  },
  {
    "slug": "pochette-pina",
    "name": "Pochette pinā",
    "collection": "Soirs & Cérémonies",
    "category": "Pochettes",
    "price_mga": 127000,
    "subtitle": "Pochette plate 25 × 16 cm avec fermeture",
    "description": "Format enveloppe généreux, la Pochette pinā accueille téléphone, cartes et essentiels. Non disponible en noir.",
    "material_details": "Raphia naturel de Madagascar.",
    "care_instructions": [
      "Préserver de l’humidité excessive.",
      "Dépoussiérer délicatement avec un chiffon sec.",
      "Conserver à plat dans son pochon protecteur."
    ],
    "dimensions": "25cm × 16cm",
    "weaving_hours": 16,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/pochette-pina-1.jpg",
      "/products/pochette-pina-2.jpg",
      "/products/pochette-pina-3.jpg",
      "/products/pochette-pina-4.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "bleu",
        "hex": "#3B6978",
        "name": "Bleu",
        "priceDeltaMga": 0
      },
      {
        "id": "vert",
        "hex": "#4A6B53",
        "name": "Vert",
        "priceDeltaMga": 0
      },
      {
        "id": "moutarde",
        "hex": "#D4A017",
        "name": "Moutarde",
        "priceDeltaMga": 0
      },
      {
        "id": "rose",
        "hex": "#D98A8A",
        "name": "Rose",
        "priceDeltaMga": 0
      },
      {
        "id": "rouge",
        "hex": "#A83232",
        "name": "Rouge",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "25cm × 16cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "interior": "Avec fermeture"
  },
  {
    "slug": "pochette-a-rabat",
    "name": "Pochette à rabat",
    "collection": "Soirs & Cérémonies",
    "category": "Pochettes",
    "price_mga": 107000,
    "subtitle": "Pochette à rabat doublée en tissu épais, 10 coloris",
    "description": "Graphique et élégante, la Pochette à rabat est entièrement doublée en tissu épais avec une poche intérieure plaquée.",
    "material_details": "Raphia naturel de Madagascar, doublure en tissu épais.",
    "care_instructions": [
      "Préserver de l’humidité excessive.",
      "Dépoussiérer délicatement avec un chiffon sec.",
      "Conserver à plat dans son pochon protecteur."
    ],
    "dimensions": "26cm × 17cm",
    "weaving_hours": 18,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/pochette-a-rabat-1.png"
    ],
    "colors": [
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      },
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "bleu_roi",
        "hex": "#1E3A8A",
        "name": "Bleu roi",
        "priceDeltaMga": 0
      },
      {
        "id": "jaune_moutarde",
        "hex": "#D4A017",
        "name": "Jaune moutarde",
        "priceDeltaMga": 0
      },
      {
        "id": "rose_fushia",
        "hex": "#C026D3",
        "name": "Rose fushia",
        "priceDeltaMga": 0
      },
      {
        "id": "rouge",
        "hex": "#A83232",
        "name": "Rouge",
        "priceDeltaMga": 0
      },
      {
        "id": "vert_sapin",
        "hex": "#14532D",
        "name": "Vert sapin",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "26cm × 17cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": true,
    "in_stock": true,
    "interior": "Entièrement doublé en tissu épais • Poche intérieure plaquée simple"
  },
  {
    "slug": "pochette-ula",
    "name": "Pochette ULA",
    "collection": "Soirs & Cérémonies",
    "category": "Pochettes",
    "price_mga": 157000,
    "subtitle": "Pochette en raphia avec poche extérieure en cuir véritable gravé",
    "description": "La Pochette ULA se distingue par sa poche extérieure en cuir véritable gravé, doublée et fermée par une glissière.",
    "material_details": "Raphia naturel, cuir véritable gravé, doublure tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive.",
      "Dépoussiérer délicatement avec un chiffon sec.",
      "Conserver à plat dans son pochon protecteur."
    ],
    "dimensions": "24cm × 20cm",
    "weaving_hours": 20,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/pochette-ula-1.png"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "24cm × 20cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "interior": "Poche extérieure en cuir véritable gravée, avec doublure et fermeture à glissière"
  },
  {
    "slug": "sac-a-dos-carta",
    "name": "Sac à dos Cartā",
    "collection": "Lignes Urbaines",
    "category": "Sacs à dos",
    "price_mga": 337000,
    "subtitle": "Sac à dos en raphia avec rabat et anses en cuir, raphia au choix",
    "description": "Cartā revisite le cartable dans une version solaire : rabat et anses en cuir, poche doublée avec fermeture, couleur du raphia au choix.",
    "material_details": "Raphia naturel de Madagascar, cuir véritable, doublure tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Longueur 29cm, hauteur 24cm, profondeur 12cm",
    "weaving_hours": 36,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/sac-a-dos-carta-1.jpg",
      "/products/sac-a-dos-carta-2.jpg",
      "/products/sac-a-dos-carta-3.jpg",
      "/products/sac-a-dos-carta-4.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 29cm, hauteur 24cm, profondeur 12cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": true,
    "in_stock": true,
    "handles": "Rabat et anses en cuir",
    "interior": "Poche avec doublure et fermeture"
  },
  {
    "slug": "tressa",
    "name": "Tressa",
    "collection": "Lignes Urbaines",
    "category": "Sacs à main",
    "price_mga": 147000,
    "subtitle": "Petit sac au tressage texturé en raphia naturel",
    "description": "Tressa met en valeur le relief du crochet dans un format compact et léger, idéal au quotidien.",
    "material_details": "Raphia naturel de Madagascar.",
    "care_instructions": [
      "Préserver de l’humidité excessive.",
      "Dépoussiérer délicatement avec un chiffon sec.",
      "Conserver à plat dans son pochon protecteur."
    ],
    "dimensions": "Longueur 22cm, hauteur 15cm, profondeur 8cm",
    "weaving_hours": 22,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/tressa-1.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 22cm, hauteur 15cm, profondeur 8cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true
  },
  {
    "slug": "trousse-zana",
    "name": "Trousse zanā",
    "collection": "Petite Maroquinerie",
    "category": "Trousses",
    "price_mga": 67000,
    "subtitle": "Trousse en raphia doublée avec fermeture",
    "description": "L’accessoire indispensable de votre sac : la Trousse zanā, doublée et fermée, pour ranger maquillage et petits essentiels.",
    "material_details": "Raphia naturel de Madagascar, doublure tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive.",
      "Dépoussiérer délicatement avec un chiffon sec.",
      "Conserver à plat dans son pochon protecteur."
    ],
    "dimensions": "Longueur 20cm, hauteur 12cm, profondeur 8cm",
    "weaving_hours": 12,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/trousse-zana-1.png"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Longueur 20cm, hauteur 12cm, profondeur 8cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "interior": "Avec doublure et fermeture"
  },
  {
    "slug": "zara",
    "name": "Zarā",
    "collection": "Lignes Urbaines",
    "category": "Bandoulières",
    "price_mga": 217000,
    "subtitle": "Sac bandoulière en raphia et cuir, tailles XS et M",
    "description": "Zarā se décline en XS (porté poignet en raphia + bandoulière cuir amovible) et en M (anse cuir porté épaule + bandoulière chaîne dorée amovible). Couleurs unies ou chinées.",
    "material_details": "Raphia et cuir.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "XS : 22 × 14,5 × 8 cm • M : 28 × 21 × 14 cm",
    "weaving_hours": 28,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/zara-1.jpg",
      "/products/zara-2.jpg",
      "/products/zara-3.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "rose_chine",
        "hex": "#C98D83",
        "name": "Rose chiné",
        "priceDeltaMga": 0
      },
      {
        "id": "rouge",
        "hex": "#A83232",
        "name": "Rouge",
        "priceDeltaMga": 0
      },
      {
        "id": "rose",
        "hex": "#D98A8A",
        "name": "Rose",
        "priceDeltaMga": 0
      },
      {
        "id": "sauge",
        "hex": "#8A9A86",
        "name": "Sauge",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "xs",
        "label": "Taille XS",
        "details": "Anse format XS en raphia porté poignet et bandoulière amovible en cuir",
        "dimensions": "Largeur 22cm, hauteur 14,5cm, profondeur 8cm",
        "priceDeltaMga": 0
      },
      {
        "id": "m",
        "label": "Taille M",
        "details": "Anse en cuir porté épaule et bandoulière en chaîne dorée amovible • Couleur unie ou chinée",
        "dimensions": "Largeur 28cm, hauteur 21cm, profondeur 14cm",
        "priceDeltaMga": 30000
      }
    ],
    "featured": true,
    "in_stock": true,
    "handles": "Varient selon la taille (voir le détail de chaque taille)"
  },
  {
    "slug": "zara-rabat",
    "name": "Zara Rabat",
    "collection": "Collection Signature",
    "category": "Sacs à main",
    "price_mga": 257000,
    "subtitle": "Sac à rabat en raphia avec anse en cuir véritable",
    "description": "Version habillée de Zarā, Zara Rabat se pare d’un rabat et d’une anse en cuir véritable. Entièrement doublé avec fermeture et poche interne.",
    "material_details": "Raphia naturel de Madagascar, cuir véritable, doublure tissu.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Largeur 28cm, hauteur 16,5cm, profondeur 8cm",
    "weaving_hours": 30,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/zara-rabat-1.png"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "unique",
        "label": "Taille unique",
        "dimensions": "Largeur 28cm, hauteur 16,5cm, profondeur 8cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": false,
    "in_stock": true,
    "handles": "En cuir véritable",
    "interior": "Entièrement doublé, avec fermeture et poche interne"
  },
  {
    "slug": "zoe-lina-avec-trousse",
    "name": "Zoe Linā (avec trousse assortie)",
    "collection": "Collection Signature",
    "category": "Cabas",
    "price_mga": 337000,
    "subtitle": "Le cabas Zoe Linā taille M livré avec sa trousse assortie",
    "description": "Notre cabas emblématique accompagné de sa trousse assortie. Composez-le en choisissant le cuir (marron ou noir) et le raphia (nude, naturel ou miel).",
    "material_details": "Raphia naturel de Madagascar, cuir véritable, doublure en tissu épais.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "Largeur 43cm, hauteur 27cm, profondeur 16cm",
    "weaving_hours": 42,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/zoe-lina-avec-trousse-1.jpg",
      "/products/zoe-lina-avec-trousse-2.jpg",
      "/products/zoe-lina-avec-trousse-3.jpg"
    ],
    "colors": [
      {
        "id": "nude-cuir-marron",
        "hex": "#E6D3C1",
        "name": "Nude • cuir marron",
        "priceDeltaMga": 0
      },
      {
        "id": "nude-cuir-noir",
        "hex": "#E6D3C1",
        "name": "Nude • cuir noir",
        "priceDeltaMga": 0
      },
      {
        "id": "naturel-cuir-marron",
        "hex": "#E8D8BF",
        "name": "Naturel • cuir marron",
        "priceDeltaMga": 0
      },
      {
        "id": "naturel-cuir-noir",
        "hex": "#E8D8BF",
        "name": "Naturel • cuir noir",
        "priceDeltaMga": 0
      },
      {
        "id": "miel-cuir-marron",
        "hex": "#D4A373",
        "name": "Miel • cuir marron",
        "priceDeltaMga": 0
      },
      {
        "id": "miel-cuir-noir",
        "hex": "#D4A373",
        "name": "Miel • cuir noir",
        "priceDeltaMga": 0
      }
    ],
    "sizes": [
      {
        "id": "m",
        "label": "Taille M",
        "details": "Trousse assortie incluse",
        "dimensions": "Largeur 43cm, hauteur 27cm, profondeur 16cm",
        "priceDeltaMga": 0
      }
    ],
    "featured": true,
    "in_stock": true,
    "interior": "Entièrement doublé en tissu épais et fermeture. Deux poches intérieures (une simple et une fermée)"
  },
  {
    "slug": "zoe-lina",
    "name": "Zoe Linā",
    "collection": "Collection Signature",
    "category": "Cabas",
    "price_mga": 327000,
    "subtitle": "Le cabas iconique Lenkā avec poche extérieure et bandoulière amovible",
    "description": "Pièce maîtresse de la maison, Zoe Linā offre une anse portée poignet, une poche extérieure et une bandoulière réglable et amovible. Disponible en tailles S, M et L.",
    "material_details": "Raphia naturel de Madagascar, cuir véritable.",
    "care_instructions": [
      "Préserver de l’humidité excessive et de la pluie directe.",
      "Dépoussiérer délicatement à l’aide d’une brosse souple ou d’un chiffon sec.",
      "Nourrir les parties en cuir avec un baume incolore.",
      "Ranger à plat, rembourré de papier de soie, dans son pochon protecteur."
    ],
    "dimensions": "S : 32 × 20 × 12 cm • M : 46 × 27 × 16 cm • L : 48 × 30 × 17 cm",
    "weaving_hours": 38,
    "origin_region": "Antananarivo, Madagascar",
    "images": [
      "/products/zoe-lina-1.jpg",
      "/products/zoe-lina-2.jpg",
      "/products/zoe-lina-3.jpg",
      "/products/zoe-lina-4.jpg"
    ],
    "colors": [
      {
        "id": "naturel",
        "hex": "#E8D8BF",
        "name": "Naturel",
        "priceDeltaMga": 0
      },
      {
        "id": "nude",
        "hex": "#E6D3C1",
        "name": "Nude",
        "priceDeltaMga": 0
      },
      {
        "id": "miel",
        "hex": "#D4A373",
        "name": "Miel",
        "priceDeltaMga": 0
      },
      {
        "id": "marron",
        "hex": "#58311D",
        "name": "Marron",
        "priceDeltaMga": 0
      },
      {
        "id": "noir",
        "hex": "#1C1917",
        "name": "Noir",
        "priceDeltaMga": 10000
      }
    ],
    "sizes": [
      {
        "id": "s",
        "label": "Taille S",
        "dimensions": "Largeur 32cm, hauteur 20cm, profondeur 12cm",
        "priceDeltaMga": 0
      },
      {
        "id": "m",
        "label": "Taille M",
        "dimensions": "Largeur 46cm, hauteur 27cm, profondeur 16cm",
        "priceDeltaMga": 50000
      },
      {
        "id": "l",
        "label": "Taille L",
        "dimensions": "Largeur 48cm, hauteur 30cm, profondeur 17cm",
        "priceDeltaMga": 80000
      }
    ],
    "featured": true,
    "in_stock": true,
    "handles": "Anse portée poignet • Bandoulière réglable et amovible",
    "interior": "Poche extérieure"
  }
];

export const INITIAL_SHIPPING_ZONES: Omit<ShippingZone, "id">[] = [
  {
    code: "tana_ville",
    name: "Antananarivo - Centre & Ville",
    fee_mga: 5000,
    delivery_estimate: "Le lendemain de la validation (J+1)",
    description:
      "Analakely, Isoraka, Ankorondrano, Ivandry, Ambatobe, Antaninarenina, Mahamasina, Ankadifotsy.",
  },
  {
    code: "tana_peripherie",
    name: "Antananarivo - Périphérie",
    fee_mga: 10000,
    delivery_estimate: "Le lendemain de la validation (J+1)",
    description:
      "Talatamaty, Ivato, Ambohimangakely, Ilafy, Itaosy, Ambohibao, Tanjombato.",
  },
  {
    code: "province_express",
    name: "Envoi en province",
    fee_mga: 0,
    delivery_estimate: "Après paiement (24h avant l'envoi)",
    description:
      "Frais d'expédition à la charge du client, réglés auprès du transporteur. Paiement de la commande exigé 24h avant l'envoi.",
  },
];

export const INITIAL_REVIEWS: Omit<CustomerReview, "id">[] = [
  {
    author_name: "Mialy R.",
    location: "Antananarivo (Ivandry)",
    product_name: "Zoe Linā",
    rating: 5,
    comment:
      "Une merveille de précision ! Le tressage est d'une régularité incroyable et l'odeur du raphia naturel est un délice. J'ai été livrée le lendemain chez moi à Ivandry et j'ai pu régler en MVola directement au livreur. Félicitations pour ce travail d'artisanat !",
    verified_purchase: true,
    review_date: "14 Octobre 2026",
  },
  {
    author_name: "Rova Andriamalala",
    location: "Toamasina",
    product_name: "Ankarā",
    rating: 5,
    comment:
      "Mon sac de tous les jours. La qualité des anses en cuir et la finesse du raphia font sensation à chaque sortie. Colis reçu en 48h à la gare routière avec un emballage très soigné.",
    verified_purchase: true,
    review_date: "28 Septembre 2026",
  },
  {
    author_name: "Sophie Dupont-L.",
    location: "Paris / Antananarivo",
    product_name: "Pochette à rabat & Zoe Linā",
    rating: 5,
    comment:
      "La quintessence du luxe éthique malgache. Ce n'est pas un simple sac de plage, c'est de la haute maroquinerie de fibre végétale. La finition rivalise avec les grandes maisons.",
    verified_purchase: true,
    review_date: "3 Novembre 2026",
  },
  {
    author_name: "Haja N.",
    location: "Antananarivo (Ambatobe)",
    product_name: "Lunch bag",
    rating: 5,
    comment:
      "Parfait pour emporter mon déjeuner au bureau avec distinction. La contenance est idéale, la doublure intérieure très propre et le raphia attire tous les compliments.",
    verified_purchase: true,
    review_date: "2 Novembre 2026",
  },
];
