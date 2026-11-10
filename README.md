# Lenkā Madagascar — E-Commerce Haut de Gamme en Raphia Naturel

Site e-commerce moderne, épuré et haut de gamme conçu pour **Lenkā Madagascar**, maison d'accessoires de mode et maroquinerie végétale en raphia 100% naturel fait main.

---

## 🌿 1. Direction Artistique & UI/UX

- **Palette Organique & Naturelle :** 
  - Ivoire & Lin blanchi (`#FAF7F2`, `#F3ECE1`)
  - Terracotta clair & ocre rouge (`#C47256`)
  - Chocolat écorce d'arbre (`#382417`)
  - Noir mat & charbon végétal (`#1C1917`)
- **Typographie :** Titres raffinés en police empattée moderne (*Playfair Display*) et corps de texte sans-serif lisible (*Plus Jakarta Sans*).
- **Photographies Immersives :** Visuels haute définition générés pour la collection :
  - *Zoe Linā* : Cabas signature porté dans la lumière dorée de l'après-midi
  - *Mahajanga* : Grand cabas ville & plage en chevron raphia bicolore
  - *Nosy* : Sac bandoulière minimaliste avec rabat et finitions cuir
  - *Tsingy* : Pochette de cérémonie au point de dentelle ajourée
  - *Ambanja* : Lunch bag isotherme roll-top avec bouton sculpté en bois local
  - *Atelier* : Photographie macro des mains d'artisanes malgaches au crochet.

---

## 🏛️ 2. Structure des Pages

1. **Page d'Accueil (`/`) :**
   - Hero section avec l'accroche phare : *« Une lumière à porter »*
   - Présentation de la collection signature **Zoe Linā**
   - Section Savoir-Faire : les 4 étapes (cueillette raisonnée, séchage solaire, teintures végétales, crochet de haute précision)
   - Grille des créations phares avec pastilles de teintes réelles
   - Avis clients authentiques vérifiés (Antananarivo, Toamasina, Paris)
   - Accès direct aux commandes et contact WhatsApp.

2. **Catalogue / Boutique (`/boutique`) :**
   - Filtres interactifs par catégorie : **Tous**, **Cabas**, **Bandoulières**, **Pochettes**, **Lunch bags**
   - Tri dynamique (Sélection Atelier, Prix croissant, Prix décroissant, Heures de travail)
   - Affichage clair des prix en Ariary (**MGA / Ar**)
   - Pastilles de teintes végétales réactives avec descriptif des pigments.

3. **Page Fiche Produit (`/boutique/[slug]`) :**
   - Galerie photos HD interactive avec vignettes
   - Sélecteur de teintes naturelles avec origine de la teinture (argile, écorce, thé)
   - Sélecteur de formats et dimensions avec ajustement immédiat du prix
   - Compteur d'heures de crochet main (ex: 36h) et région de récolte
   - Onglets détaillés : *Description*, *Matière*, *Conseils d'entretien*, *Livraison & Paiement*
   - Boutons d'action clairs : **Ajouter au panier** et **Commander directement via WhatsApp**.

4. **Panier & Tunnel de Commande (`/panier`) :**
   - Formulaire d'adresse conforme aux standards du web moderne (`autocomplete="name"`, `autocomplete="tel"`, `autocomplete="street-address"`)
   - Sélecteur dynamique de zone de livraison avec calcul automatique des frais :
     - **Antananarivo Ville & Centre :** 5 000 Ar (Livraison garantie J+1)
     - **Antananarivo Périphérie & Grand Tana :** 8 000 Ar (J+1 ou J+2)
     - **Provinces :** 18 000 Ar (Expédition coopérative sécurisée 48-72h)
   - Modes de paiement locaux intégrés :
     - **Espèces à la livraison** (après inspection de la pièce à Tana)
     - **MVola (Telma)** : compte marchand officiel `034 00 000 00`
     - **Orange Money** : compte marchand officiel `032 00 000 00`
   - Enregistrement immédiat dans la base PostgreSQL.

5. **Confirmation de Commande (`/commande/[orderNumber]`) :**
   - Récapitulatif complet de la commande avec numéro unique (`LNK-YYMM-XXXX`)
   - Consignes de paiement Mobile Money ou espèces
   - Bouton de confirmation en 1 clic vers WhatsApp.

6. **CGV & Guide d'Entretien (`/cgv-livraison`) :**
   - Rappel complet des conditions de livraison à Tana et en province
   - Modalités de règlement et garanties qualité / échanges sous 48h
   - Guide d'entretien du raphia naturel (dépoussiérage doux, vapeur, protection de l'humidité).

7. **À Propos & Contact (`/a-propos`) :**
   - Manifeste et histoire de Lenkā Madagascar
   - Engagement éthique auprès des artisanes malgaches
   - Coordonnées de l'atelier à Antananarivo (Isoraka & Ambatobe)
   - Formulaire de message direct et lien WhatsApp.

---

## 🛠️ 3. Technologies & Architecture

- **Framework :** Next.js 15 (App Router, Server & Client Components, Server Actions / Route Handlers)
- **Langage :** TypeScript (strict typing)
- **Style :** Tailwind CSS avec variables de design sur-mesure (ivoire, lin, terracotta, chocolat, charbon)
- **Base de données :** PostgreSQL (support de standard PostgreSQL avec `DATABASE_URL`, et PGlite zéro-config embarqué avec persistance et amorçage automatique)
- **Icônes :** Lucide React & SVG haute précision.

---

## 🚀 4. Lancement Local

```bash
# Installation des dépendances
pnpm install

# Lancement en mode développement
pnpm dev

# Build de production
pnpm build

# Lancement en mode production
pnpm start
```

Le site est accessible sur `http://localhost:3000`.

