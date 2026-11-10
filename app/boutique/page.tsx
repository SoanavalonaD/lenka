import React, { Suspense } from "react";
import { getProducts } from "@/lib/db";
import BoutiqueClient from "./BoutiqueClient";

export const metadata = {
  title: "La Boutique • Collections en Raphia Naturel | Lenkā Madagascar",
  description:
    "Explorez notre collection complète de maroquinerie artisanale en raphia naturel de Madagascar : Cabas 'Zoe Linā', sacs bandoulières, pochettes et lunch bags tressés main. Prix affichés en Ariary (MGA).",
};

export const revalidate = 60;

export default async function BoutiquePage() {
  const products = await getProducts();

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Ambience */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-terracotta font-semibold block">
            Atelier Antananarivo • Catalogue Officiel
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-medium">
            La Collection Raphia
          </h1>
          <p className="text-sm text-chocolate-muted font-light leading-relaxed">
            Chaque pièce est une œuvre unique confectionnée à partir de fibres végétales pures de Madagascar. Choisissez votre silhouette, vos dimensions et votre nuance naturelle.
          </p>
        </div>

        {/* Interactive Client Catalog with Filters, Sort and Search */}
        <Suspense fallback={<div className="text-center py-20 font-serif text-charcoal">Chargement des collections...</div>}>
          <BoutiqueClient initialProducts={products} />
        </Suspense>

      </div>
    </div>
  );
}
