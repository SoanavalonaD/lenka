"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, Sparkles, Filter } from "lucide-react";

interface BoutiqueClientProps {
  initialProducts: Product[];
}

export default function BoutiqueClient({ initialProducts }: BoutiqueClientProps) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    if (catParam) {
      const match = ["Cabas", "Bandoulières", "Pochettes", "Lunch bags"].find(
        (c) => c.toLowerCase() === catParam.toLowerCase()
      );
      if (match) setActiveCategory(match);
    }
  }, [catParam]);

  const categories = ["Tous", "Cabas", "Bandoulières", "Pochettes", "Lunch bags"];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    if (activeCategory !== "Tous") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortBy === "price_asc") {
      result.sort((a, b) => a.price_mga - b.price_mga);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price_mga - a.price_mga);
    } else if (sortBy === "hours") {
      result.sort((a, b) => b.weaving_hours - a.weaving_hours);
    } else {
      // Featured first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [initialProducts, activeCategory, sortBy]);

  return (
    <div className="space-y-10">
      {/* Category Pills & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-atelier">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            const count =
              category === "Tous"
                ? initialProducts.length
                : initialProducts.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-medium rounded-full transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-chocolate text-ivory shadow-sm"
                    : "bg-linen/60 text-charcoal hover:bg-linen hover:text-terracotta border border-atelier/40"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-black/5 text-chocolate-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3 text-xs text-chocolate-muted">
          <SlidersHorizontal className="w-4 h-4 text-terracotta" />
          <label htmlFor="sortSelect" className="font-medium text-charcoal">
            Trier par :
          </label>
          <select
            id="sortSelect"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-ivory border border-atelier rounded-sm px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
          >
            <option value="featured">Sélection Atelier</option>
            <option value="price_asc">Prix croissant (Ar)</option>
            <option value="price_desc">Prix décroissant (Ar)</option>
            <option value="hours">Temps de tressage (h)</option>
          </select>
        </div>

      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-linen/20 rounded-sm border border-atelier">
          <p className="font-serif text-xl text-charcoal">Aucun modèle dans cette catégorie pour le moment</p>
          <button
            onClick={() => setActiveCategory("Tous")}
            className="mt-4 inline-block text-xs uppercase tracking-widest text-terracotta font-semibold underline"
          >
            Afficher tous les modèles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Bottom Atelier Note */}
      <div className="pt-12 text-center border-t border-atelier/60 max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-terracotta text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Créations sur mesure</span>
        </div>
        <p className="text-xs text-chocolate-muted font-light leading-relaxed">
          Vous souhaitez personnaliser les dimensions, les anses en cuir ou une combinaison de teintes végétales ? Notre atelier malgache réalise également vos pièces exclusives sur commande.
        </p>
        <div className="pt-2">
          <a
            href="https://wa.me/261340000000?text=Bonjour%20Lenkā,%20je%20souhaite%20commander%20une%20pièce%20sur-mesure"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-chocolate hover:text-terracotta underline"
          >
            Échanger avec notre maître artisan sur WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}

