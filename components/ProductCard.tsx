"use client";

import React, { useState } from "react";
import { Product } from "@/lib/types";
import { formatMga } from "@/lib/format";
import { Clock, Eye, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

export default function ProductCard({ product, showBadge = true }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Naturel");
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      image: product.images[0],
      selectedColor,
      selectedSize: product.sizes[0]?.label || "Standard",
      unitPriceMga: product.price_mga,
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col bg-ivory rounded-sm border border-atelier hover:border-terracotta/40 transition-all duration-300 hover:shadow-atelier">
      {/* Media container */}
      <a
        href={`/boutique/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-linen/50"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Featured Tag */}
        {showBadge && product.featured && (
          <span className="absolute top-3 left-3 bg-chocolate/90 backdrop-blur-sm text-ivory text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium rounded-xs">
            Signature
          </span>
        )}

        {/* Weaving hours badge */}
        <span className="absolute bottom-3 left-3 bg-ivory/90 backdrop-blur-sm text-chocolate text-[10px] tracking-wider px-2 py-0.5 rounded-xs flex items-center gap-1 font-medium border border-atelier/40">
          <Clock className="w-3 h-3 text-terracotta" />
          <span>{product.weaving_hours}h de crochet main</span>
        </span>

        {/* Quick view overlay icon */}
        <div className="absolute inset-0 bg-chocolate/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-ivory text-chocolate px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-terracotta" />
            <span>Découvrir</span>
          </span>
        </div>
      </a>

      {/* Info Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-chocolate-muted uppercase tracking-wider">
            <span>{product.category}</span>
            <span className="text-[10px] text-terracotta font-medium">{product.origin_region.split(",")[0]}</span>
          </div>

          <a href={`/boutique/${product.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-terracotta transition-colors mt-1">
              {product.name}
            </h3>
          </a>

          <p className="text-xs text-chocolate-muted line-clamp-2 mt-1 leading-relaxed font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Colors selector pills */}
        <div className="pt-2 flex items-center gap-1.5">
          {product.colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSelectedColor(color.name);
              }}
              title={`${color.name} (${color.dyeOrigin})`}
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedColor === color.name
                  ? "ring-2 ring-offset-1 ring-terracotta scale-110"
                  : "border-black/20 hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Choisir teinte ${color.name}`}
            />
          ))}
          <span className="text-[11px] text-chocolate-muted ml-1 font-light truncate">
            {selectedColor}
          </span>
        </div>

        {/* Price and Action */}
        <div className="pt-3 border-t border-atelier-light flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-chocolate-muted tracking-wider block">
              Prix atelier
            </span>
            <span className="font-serif text-base font-bold text-chocolate">
              {formatMga(product.price_mga)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`px-3 py-2 text-xs uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 font-medium ${
              isAdded
                ? "bg-emerald-700 text-white"
                : "bg-chocolate text-ivory hover:bg-terracotta"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

