import React from "react";
import { MessageCircle, Phone, MapPin, Mail, ShieldCheck, Truck, Sparkles, HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-chocolate text-ivory/90 border-t border-chocolate-light/40">
      {/* 4 Pillars Bar */}
      <div className="border-b border-ivory/10 bg-chocolate-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-full bg-ivory/10 text-terracotta flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm text-ivory font-medium">100% Raphia Naturel</h4>
              <p className="text-xs text-ivory/70 mt-1 font-light leading-relaxed">
                Récolte éco-responsable des fibres de palmier de Madagascar, sans plastique ni solvants.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-full bg-ivory/10 text-terracotta flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm text-ivory font-medium">Artisanat Éthique</h4>
              <p className="text-xs text-ivory/70 mt-1 font-light leading-relaxed">
                Chaque sac est crocheté et assemblé à la main par nos artisanes d'Antananarivo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-full bg-ivory/10 text-terracotta flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm text-ivory font-medium">Livraison J+1 à Tana</h4>
              <p className="text-xs text-ivory/70 mt-1 font-light leading-relaxed">
                Remise en main propre le lendemain sur Antananarivo et expédition sécurisée en province.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-full bg-ivory/10 text-terracotta flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm text-ivory font-medium">Paiements Locaux Sûrs</h4>
              <p className="text-xs text-ivory/70 mt-1 font-light leading-relaxed">
                Réglez en toute confiance par MVola, Orange Money ou en espèces à la livraison.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-ivory">
                LENKĀ
              </span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-terracotta">
                Madagascar
              </span>
            </div>
            <p className="font-serif italic text-base text-ivory/90">
              « Une lumière à porter »
            </p>
            <p className="text-xs text-ivory/70 leading-relaxed font-light max-w-sm">
              Maison de maroquinerie végétale consacrée au raphia malgache. Nous sublimons les fibres brutes de la Grande Île en créations contemporaines durables, célébrant la patience et la dextérité de nos maîtres artisanes.
            </p>
            
            {/* Socials & WhatsApp */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/261340000000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-ivory/10 hover:bg-emerald-600 text-ivory transition-colors"
                title="WhatsApp direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-ivory/10 hover:bg-pink-600 text-ivory transition-colors"
                title="Instagram Lenkā"
                aria-label="Instagram Lenkā"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-ivory/10 hover:bg-blue-600 text-ivory transition-colors"
                title="Facebook Lenkā"
                aria-label="Facebook Lenkā"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-terracotta font-semibold">
              Collections
            </h5>
            <ul className="space-y-2 text-xs font-light text-ivory/80">
              <li>
                <a href="/boutique?cat=Cabas" className="hover:text-ivory hover:underline">
                  Cabas & Paniers
                </a>
              </li>
              <li>
                <a href="/boutique?cat=Bandoulières" className="hover:text-ivory hover:underline">
                  Sacs Bandoulières
                </a>
              </li>
              <li>
                <a href="/boutique?cat=Pochettes" className="hover:text-ivory hover:underline">
                  Pochettes Ajourées
                </a>
              </li>
              <li>
                <a href="/boutique?cat=Lunch+bags" className="hover:text-ivory hover:underline">
                  Lunch Bags Artisanaux
                </a>
              </li>
              <li>
                <a href="/boutique" className="hover:text-ivory hover:underline font-medium text-ivory">
                  Tous les modèles
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation & Help */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-terracotta font-semibold">
              Maison & Services
            </h5>
            <ul className="space-y-2 text-xs font-light text-ivory/80">
              <li>
                <a href="/a-propos" className="hover:text-ivory hover:underline">
                  Histoire & Savoir-Faire
                </a>
              </li>
              <li>
                <a href="/cgv-livraison" className="hover:text-ivory hover:underline">
                  Tarifs & Délais de Livraison
                </a>
              </li>
              <li>
                <a href="/cgv-livraison#paiements" className="hover:text-ivory hover:underline">
                  Modes de Paiement (MVola/Orange)
                </a>
              </li>
              <li>
                <a href="/cgv-livraison#entretien" className="hover:text-ivory hover:underline">
                  Guide d'Entretien du Raphia
                </a>
              </li>
              <li>
                <a href="/a-propos#contact" className="hover:text-ivory hover:underline">
                  Nous Contacter
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-widest text-terracotta font-semibold">
              Atelier d'Antananarivo
            </h5>
            <ul className="space-y-2.5 text-xs font-light text-ivory/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-terracotta mt-0.5 flex-shrink-0" />
                <span>Isoraka & Ambatobe, Antananarivo 101, Madagascar</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>+261 34 00 000 00 / 032 00 000 00</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>contact@lenka-madagascar.com</span>
              </li>
            </ul>

            {/* Mobile Money accepted logos visual indicators */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-ivory/60 block mb-1.5">
                Règlements acceptés
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-[10px] font-bold rounded bg-yellow-400 text-yellow-950">
                  MVola
                </span>
                <span className="px-2 py-1 text-[10px] font-bold rounded bg-orange-500 text-white">
                  Orange Money
                </span>
                <span className="px-2 py-1 text-[10px] font-semibold rounded bg-ivory/20 text-ivory">
                  Espèces à Tana
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-10 mt-10 border-t border-ivory/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-ivory/60 gap-4">
          <p>© {new Date().getFullYear()} Lenkā Madagascar. Tous droits réservés. Façonné avec soin à Madagascar.</p>
          <div className="flex gap-4">
            <a href="/cgv-livraison" className="hover:text-ivory">Conditions Générales de Vente</a>
            <span>•</span>
            <a href="/cgv-livraison" className="hover:text-ivory">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
