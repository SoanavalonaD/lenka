"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, Filter, PackageOpen, ChevronLeft, ChevronRight, Search, X } from "lucide-react";

function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

interface BoutiqueClientProps {
  initialProducts: Product[];
}

export default function BoutiqueClient({ initialProducts }: BoutiqueClientProps) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const qParam = searchParams.get("q");

  const [activeCategory, setActiveCategory] = useState<string>("Tous");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState<string>(qParam || "");

  const categories = useMemo(() => {
    const set = new Set(initialProducts.map((p) => p.category).filter(Boolean));
    return ["Tous", ...Array.from(set)];
  }, [initialProducts]);

  useEffect(() => {
    if (catParam) {
      const match = categories.find(
        (c) =>
          c.toLowerCase() === catParam.toLowerCase() ||
          c.toLowerCase().includes(catParam.toLowerCase())
      );
      if (match) setActiveCategory(match);
    }
  }, [catParam, categories]);

  useEffect(() => {
    if (qParam !== null) {
      setSearchQuery(qParam);
    }
  }, [qParam]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    if (activeCategory !== "Tous") {
      result = result.filter((p) => p.category === activeCategory);
    }

    const cleanQuery = normalizeSearchText(searchQuery);
    if (cleanQuery) {
      result = result.filter((p) => {
        const searchableFields = [
          p.name,
          p.category,
          p.collection,
          p.subtitle,
          p.description,
          p.handles || "",
          p.interior || "",
          ...(p.colors?.map((c) => c.name) || []),
          ...(p.sizes?.map((s) => s.label) || []),
        ].join(" ");
        return normalizeSearchText(searchableFields).includes(cleanQuery);
      });
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
  }, [initialProducts, activeCategory, sortBy, searchQuery]);

  // Pagination : 6 produits par page
  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / PAGE_SIZE));

  // Retour à la première page quand le filtre, la recherche ou le tri change
  useEffect(() => {
    setPage(1);
  }, [activeCategory, sortBy, searchQuery]);

  const paginatedProducts = filteredAndSortedProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    if (typeof window !== "undefined") {
      document.getElementById("boutique-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (initialProducts.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 bg-linen/20 rounded-sm border border-atelier p-8">
        <PackageOpen className="w-12 h-12 text-terracotta mx-auto stroke-1" />
        <h3 className="font-serif text-2xl text-charcoal">Catalogue en cours de chargement</h3>
        <p className="text-sm text-chocolate-muted max-w-lg mx-auto font-light leading-relaxed">
          Les collections Lenkā sont synchronisées directement avec votre base de données Supabase.
          Exécutez le script SQL fourni dans l'éditeur Supabase pour faire apparaître les créations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8" suppressHydrationWarning>
      {/* Search Bar */}
      <div className="max-w-xl mx-auto" suppressHydrationWarning>
        <div className="relative flex items-center" suppressHydrationWarning>
          <Search className="w-4 h-4 text-chocolate-muted absolute left-4 pointer-events-none" />
          <input
            type="search"
            name="catalogue-search"
            autoComplete="off"
            data-protonpass-ignore="true"
            data-lpignore="true"
            data-1p-ignore="true"
            data-form-type="other"
            suppressHydrationWarning
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un modèle, une catégorie ou une couleur (ex. Zoe Linā, Ankarā, pochette, miel...)"
            aria-label="Rechercher un article"
            className="w-full pl-11 pr-10 py-3 bg-ivory border border-atelier rounded-full text-xs sm:text-sm text-charcoal placeholder:text-chocolate-muted/70 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Effacer la recherche"
              className="absolute right-3.5 p-1 text-chocolate-muted hover:text-charcoal rounded-full hover:bg-linen/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

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
            suppressHydrationWarning
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-ivory border border-atelier rounded-sm px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
          >
            <option value="featured">Sélection Atelier (Signature)</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="hours">Heures de tissage (Complexité)</option>
          </select>
        </div>

      </div>

      {/* Products Grid */}
      <div id="boutique-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 scroll-mt-28">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>

      {/* Pagination Précédent / Suivant */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination du catalogue"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-atelier"
        >
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-medium rounded-sm border border-chocolate text-chocolate hover:bg-chocolate hover:text-ivory transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => goToPage(p)}
                aria-current={p === page ? "page" : undefined}
                aria-label={`Page ${p}`}
                className={`w-9 h-9 text-xs font-medium rounded-full transition-colors ${
                  p === page
                    ? "bg-chocolate text-ivory"
                    : "text-chocolate hover:bg-linen border border-atelier/60"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-medium rounded-sm bg-chocolate text-ivory hover:bg-terracotta transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <span>Suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      )}

      {filteredAndSortedProducts.length > 0 && (
        <p className="text-center text-[11px] text-chocolate-muted -mt-4">
          {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredAndSortedProducts.length)} sur{" "}
          {filteredAndSortedProducts.length} créations
        </p>
      )}

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-20 bg-linen/20 rounded-sm border border-atelier space-y-3">
          <Filter className="w-8 h-8 text-chocolate-muted mx-auto stroke-1" />
          <p className="font-serif text-lg text-charcoal">
            {searchQuery
              ? `Aucun article ne correspond à « ${searchQuery} »`
              : "Aucune création dans cette catégorie"}
          </p>
          <button
            onClick={() => {
              setActiveCategory("Tous");
              setSearchQuery("");
            }}
            className="text-xs uppercase tracking-widest text-terracotta hover:underline font-medium"
          >
            Réinitialiser les filtres et la recherche
          </button>
        </div>
      )}

      {/* Craftsmanship Note Footer */}
      <div className="pt-12 border-t border-atelier text-center text-xs text-chocolate-muted space-y-1 font-light">
        <p>Toutes nos créations sont confectionnées à la main avec du raphia 100% naturel de Madagascar.</p>
        <p>Les prix affichés sont en Ariary (MGA), départ atelier à Antananarivo.</p>
      </div>
    </div>
  );
}
