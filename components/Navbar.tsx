"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/boutique", label: "La Boutique" },
    { href: "/a-propos", label: "L'Atelier & Savoir-Faire" },
    { href: "/cgv-livraison", label: "Livraison & Paiement" },
  ];

  return (
    <>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-atelier transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-chocolate hover:text-terracotta transition-colors"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex flex-col items-center lg:items-start">
            <a href="/" className="group flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                LENKĀ
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-chocolate-muted -mt-0.5">
                Madagascar • Raphia Pur
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wider uppercase transition-colors relative py-1 ${
                    isActive
                      ? "text-terracotta font-medium"
                      : "text-charcoal/80 hover:text-chocolate font-light"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-terracotta" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a
              href="/boutique"
              className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-widest text-chocolate hover:text-terracotta px-3 py-1.5 border border-atelier rounded-full hover:border-terracotta transition-all"
            >
              <span>Collections</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-charcoal hover:text-terracotta rounded-full hover:bg-linen/60 transition-colors"
              aria-label={`Panier d'achats avec ${itemCount} articles`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-terracotta text-white text-[11px] font-semibold rounded-full flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-atelier bg-ivory px-4 pt-3 pb-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base tracking-wide py-2 border-b border-atelier/40 ${
                    pathname === link.href
                      ? "text-terracotta font-medium"
                      : "text-charcoal/90"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="/panier"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-chocolate text-ivory py-3 text-sm tracking-wider uppercase rounded-sm hover:bg-terracotta transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Voir mon panier ({itemCount})</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
