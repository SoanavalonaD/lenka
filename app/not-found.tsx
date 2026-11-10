import React from "react";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 text-center">
      <div className="max-w-md mx-auto px-4 space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-linen flex items-center justify-center text-terracotta">
          <Compass className="w-8 h-8 opacity-70" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
          Erreur 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
          Page Introuvable
        </h1>
        <p className="text-xs sm:text-sm text-chocolate-muted font-light leading-relaxed">
          La création ou la page que vous recherchez n'est plus disponible ou a été déplacée.
        </p>
        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-chocolate text-ivory px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-terracotta transition-colors shadow-sm"
          >
            <span>Retour à l'Accueil</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

