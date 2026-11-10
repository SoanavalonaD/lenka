"use client";

import React from "react";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatMga } from "@/lib/format";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotalMga } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory shadow-2xl flex flex-col border-l border-atelier">
          
          {/* Header */}
          <div className="p-6 border-b border-atelier flex items-center justify-between bg-linen/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-terracotta" />
              <h2 className="font-serif text-xl tracking-wide text-charcoal">Votre Panier</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-charcoal/60 hover:text-charcoal hover:bg-linen/60 rounded-full transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-linen flex items-center justify-center text-chocolate-muted">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <p className="font-serif text-lg text-charcoal">Votre panier est vide</p>
                <p className="text-sm text-chocolate-muted max-w-xs mx-auto">
                  Découvrez nos créations uniques en raphia 100% naturel faites main à Madagascar.
                </p>
                <a
                  href="/boutique"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 bg-chocolate text-ivory px-6 py-2.5 text-xs uppercase tracking-widest rounded-sm hover:bg-terracotta transition-colors mt-2"
                >
                  <span>Explorer le catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-4 pb-5 border-b border-atelier/60 items-start"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-sm border border-atelier bg-linen/40 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-base text-charcoal font-medium truncate">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.productId, item.selectedColor, item.selectedSize)}
                        className="text-chocolate-muted hover:text-red-700 p-1 transition-colors"
                        title="Retirer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-chocolate-muted mt-0.5">
                      Teinte : <span className="font-medium text-charcoal">{item.selectedColor}</span>
                    </p>
                    <p className="text-xs text-chocolate-muted">
                      Format : <span className="font-medium text-charcoal">{item.selectedSize}</span>
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-atelier rounded-sm bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-1 text-chocolate hover:bg-linen transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 text-chocolate hover:bg-linen transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total line price */}
                      <span className="font-serif text-sm font-semibold text-chocolate">
                        {formatMga(item.unitPriceMga * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Checkout button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-atelier bg-linen/20 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-charcoal">
                  <span>Sous-total articles</span>
                  <span className="font-serif font-medium">{formatMga(subtotalMga)}</span>
                </div>
                <div className="flex justify-between text-xs text-chocolate-muted">
                  <span>Frais de livraison</span>
                  <span>Calculés à l'étape suivante (dès 5 000 Ar)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-atelier flex justify-between items-baseline">
                <span className="font-serif text-base text-charcoal">Total estimé</span>
                <span className="font-serif text-xl font-bold text-terracotta">
                  {formatMga(subtotalMga)}
                </span>
              </div>

              <a
                href="/panier"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-chocolate text-ivory py-3.5 px-6 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-terracotta transition-all shadow-atelier"
              >
                <span>Commander maintenant</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-center gap-2 text-[11px] text-chocolate-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paiement sécurisé par MVola, Orange Money ou à la livraison</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

