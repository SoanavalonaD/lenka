import { Product, ShippingZone, CustomerReview } from "./types";

// Tous les produits sont désormais dynamiques et proviennent de la base de données Supabase / PostgreSQL.
// Aucun produit n'est codé en dur.
export const INITIAL_PRODUCTS: Omit<Product, "id">[] = [];

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
