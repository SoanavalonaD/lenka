"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function AProposPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneOrEmail: "",
    subject: "Commande / Renseignement",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Brand Story & Ancrage à Madagascar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-terracotta font-semibold block">
              Notre Manifeste
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-medium leading-tight">
              Façonner la lumière <br />
              <span className="italic font-normal text-terracotta">de Madagascar.</span>
            </h1>

            <p className="text-sm sm:text-base text-chocolate-muted font-light leading-relaxed">
              Fondée à Antananarivo, <strong>Lenkā Madagascar</strong> est née d'un désir profond : élever le raphia traditionnel malgache au rang de matière noble de la haute maroquinerie contemporaine.
            </p>

            <p className="text-xs sm:text-sm text-chocolate-muted font-light leading-relaxed">
              Sur les hauts plateaux et le long des fleuves de l'Ouest, les palmiers <em>Raphia Farinifera</em> offrent des fibres d'une résistance et d'une souplesse inégalées. Loin des fabrications industrielles, chaque sac qui quitte notre atelier porte le prénom de l'artisane qui lui a insufflé sa vie au fil de plus de trente heures de crochet patient.
            </p>

            <div className="pt-2 border-l-2 border-terracotta pl-4 italic text-xs text-charcoal space-y-1">
              <p>
                « Nous ne tressons pas seulement des sacs. Nous perpétuons un patrimoine gestuel précieux et offrons une juste rémunération aux femmes qui le font vivre. »
              </p>
              <span className="text-[11px] text-terracotta font-medium not-italic block">
                — L'équipe fondatrice de Lenkā Madagascar
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden border border-atelier shadow-2xl bg-linen">
              <img
                src="/images/products/savoir-faire-atelier.jpg"
                alt="Artisanes malgaches crochetant le raphia dans l'atelier de Tana"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* 2. Valeurs & Piliers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-atelier">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-terracotta">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              La Pureté de la Fibre
            </h3>
            <p className="text-xs text-chocolate-muted leading-relaxed font-light">
              Uniquement du raphia 100% naturel récolté de façon raisonnée à Madagascar. Teintures obtenues par décoctions d'écorces, de racines et d'argiles minérales.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-terracotta">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Autonomie des Artisanes
            </h3>
            <p className="text-xs text-chocolate-muted leading-relaxed font-light">
              Une coopérative d'une vingtaine de tisseuses expérimentées travaillant dans des conditions respectueuses, garantissant une indépendance économique pérenne.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-terracotta">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Circuit Court Malgache
            </h3>
            <p className="text-xs text-chocolate-muted leading-relaxed font-light">
              De la récolte au séchage, du design à l'assemblage : tout est réalisé sur le sol malgache pour préserver l'intégralité de la valeur ajoutée locale.
            </p>
          </div>
        </div>

        {/* 3. Section Contact & Atelier */}
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Atelier Details & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
                Nous Rencontrer
              </span>
              <h2 className="font-serif text-3xl text-charcoal font-medium mt-1">
                L'Atelier d'Antananarivo
              </h2>
              <p className="text-xs sm:text-sm text-chocolate-muted mt-2 font-light leading-relaxed">
                Notre showroom et atelier vous accueillent sur rendez-vous pour découvrir les collections, essayer nos modèles ou concevoir votre pièce sur mesure.
              </p>
            </div>

            <div className="p-6 bg-ivory rounded-sm border border-atelier space-y-4 shadow-sm text-xs text-charcoal">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-sm">Lenkā Showroom & Atelier</strong>
                  <span className="text-chocolate-muted">
                    Quartier Isoraka & Ambatobe, Antananarivo 101, Madagascar
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />
                <div>
                  <strong className="block">Téléphone / Accueil</strong>
                  <span className="text-chocolate-muted"> +261 34 44 361 72 </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-terracotta flex-shrink-0" />
                <div>
                  <strong className="block">Courriel</strong>
                  <span className="text-chocolate-muted">lenka.mdg@gmail.com</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action Button */}
            <a
              href="https://wa.me/261344436172?text=Bonjour%20Lenkā%20Madagascar,%20je%20souhaite%20prendre%20contact"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-emerald-600 text-white py-4 px-6 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Discuter directement sur WhatsApp</span>
            </a>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-4 text-xs text-chocolate-muted">
              <span>Suivez nos créations :</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-linen hover:bg-terracotta hover:text-white transition-colors"
                title="Instagram"
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
                className="p-2 rounded-full bg-linen hover:bg-terracotta hover:text-white transition-colors"
                title="Facebook"
                aria-label="Facebook Lenkā"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-ivory p-6 sm:p-8 rounded-sm border border-atelier shadow-atelier">
            <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
              Envoyez-nous un message
            </h3>

            {formSubmitted ? (
              <div className="p-8 text-center bg-linen/30 border border-emerald-300 rounded-sm space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-charcoal">
                  Message envoyé avec succès !
                </h4>
                <p className="text-xs text-chocolate-muted font-light max-w-sm mx-auto">
                  Misaotra betsaka ! Notre équipe de l'atelier vous répondra par message ou WhatsApp dans les plus brefs délais.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs uppercase tracking-widest text-terracotta font-semibold underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-charcoal mb-1">
                    Votre nom complet <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Mialy R."
                    className="w-full bg-linen/20 border border-atelier rounded-sm px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label htmlFor="phoneOrEmail" className="block text-xs font-medium text-charcoal mb-1">
                    Téléphone (WhatsApp) ou E-mail <span className="text-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    id="phoneOrEmail"
                    name="phoneOrEmail"
                    required
                    value={formData.phoneOrEmail}
                    onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                    placeholder="034 44 361 72 ou contact@exemple.mg"
                    className="w-full bg-linen/20 border border-atelier rounded-sm px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-charcoal mb-1">
                    Sujet de votre demande
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-linen/20 border border-atelier rounded-sm px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
                  >
                    <option value="Commande / Renseignement">Renseignement sur un modèle en raphia</option>
                    <option value="Livraison Antananarivo">Question sur la livraison à Antananarivo</option>
                    <option value="Expédition en Province">Expédition en province ou à l'étranger</option>
                    <option value="Commande Sur Mesure">Création personnalisée / sur mesure</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-charcoal mb-1">
                    Votre message <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez votre demande, le modèle qui vous intéresse ou toute question..."
                    className="w-full bg-linen/20 border border-atelier rounded-sm p-3 text-xs text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-chocolate text-ivory py-3.5 px-6 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-terracotta transition-colors shadow-atelier"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer mon message à l'atelier</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
