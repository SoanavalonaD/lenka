import React from "react";
import { getProducts, getCustomerReviews } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Star,
  CheckCircle2,
  Clock,
  Compass,
  MessageCircle,
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProducts, allProducts, reviews] = await Promise.all([
    getProducts({ featured: true }),
    getProducts(),
    getCustomerReviews(),
  ]);

  const zoeLina = allProducts.find((p) => p.slug.includes("zoe-lina")) || allProducts[0];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-linen/30 border-b border-atelier">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 lg:pr-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-linen border border-atelier rounded-full text-chocolate text-xs tracking-widest uppercase">
                
                <span>Maroquinerie Végétale • Madagascar</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight text-charcoal font-medium leading-[1.08]">
                Une lumière <br />
                <span className="italic font-normal text-terracotta">à porter.</span>
              </h1>

              <p className="text-base sm:text-lg text-chocolate-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Façonnés à la main dans notre atelier d'Antananarivo à partir de raphia naturel pur de la Grande Île. Des accessoires de mode épurés et durables, conçus pour illuminer chaque instant.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="/boutique"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-chocolate text-ivory px-8 py-4 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-terracotta transition-all shadow-atelier"
                >
                  <span>Explorer les Collections</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {zoeLina && (
                  <a
                    href={`/boutique/${zoeLina.slug}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-chocolate text-chocolate px-6 py-4 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-linen transition-colors"
                  >
                    <span>Découvrir « Zoe Linā »</span>
                  </a>
                )}
              </div>

              {/* Key Trust Signals */}
              <div className="pt-8 border-t border-atelier/60 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-chocolate block">100%</span>
                  <span className="text-[11px] text-chocolate-muted uppercase tracking-wider">Raphia Naturel</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-terracotta block">J+1</span>
                  <span className="text-[11px] text-chocolate-muted uppercase tracking-wider">Livraison Tana</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-chocolate block">24h à 42h</span>
                  <span className="text-[11px] text-chocolate-muted uppercase tracking-wider">De crochet main</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 border border-terracotta/30 rounded-sm pointer-events-none transform translate-x-2 translate-y-2 hidden sm:block" />
                
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-atelier bg-linen">
                  <img
                    src="/images/products/hero-zoe-lina.jpg"
                    alt="Cabas en raphia Zoe Linā porté dans la lumière dorée de Madagascar"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Floating Atelier Label Tag */}
                  <div className="absolute bottom-4 left-4 right-4 bg-ivory/95 backdrop-blur-md p-4 rounded-sm border border-atelier shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-terracotta font-semibold block">
                        Modèle Signature
                      </span>
                      <h3 className="font-serif text-base font-bold text-charcoal">
                        Cabas « Zoe Linā »
                      </h3>
                      <p className="text-xs text-chocolate-muted">36 heures de tissage main • Cuir végétal</p>
                    </div>
                    <a
                      href={`/boutique/${zoeLina?.slug || ""}`}
                      className="p-2.5 rounded-full bg-chocolate text-ivory hover:bg-terracotta transition-colors"
                      aria-label="Voir le modèle Zoe Linā"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. COLLECTIONS PHARES & VITRINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-atelier pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
              Créations Artisanales
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium mt-1">
              Les Pièces Emblématiques
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/boutique"
              className="text-xs uppercase tracking-widest text-chocolate hover:text-terracotta flex items-center gap-1 font-medium transition-colors"
            >
              <span>Voir tout le catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {allProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. FOCUS MODÈLE PHARES: ZOE LINĀ & CABAS */}
      <section className="bg-linen/40 border-y border-atelier py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/images/products/cabas-mahajanga.jpg"
                  alt="Détail texture raphia Mahajanga"
                  className="w-full aspect-[4/5] object-cover rounded-sm border border-atelier shadow-sm"
                />
                <div className="p-4 bg-ivory rounded-sm border border-atelier text-center space-y-1">
                  <span className="font-serif text-2xl font-bold text-chocolate">0 plastique</span>
                  <p className="text-[11px] text-chocolate-muted">Fibres 100% végétales biodégradables</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-4 bg-chocolate text-ivory rounded-sm border border-chocolate text-center space-y-1">
                  <span className="font-serif text-2xl font-bold text-terracotta">Analamanga</span>
                  <p className="text-[11px] text-ivory/80">Atelier au cœur d'Antananarivo</p>
                </div>
                <img
                  src="/images/products/bandouliere-nosy.jpg"
                  alt="Bandoulière Nosy tressage fin"
                  className="w-full aspect-[4/5] object-cover rounded-sm border border-atelier shadow-sm"
                />
              </div>
            </div>

            {/* Content Story */}
            <div className="lg:col-span-6 space-y-6 lg:pl-6">
              <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
                La Collection Phare
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium leading-tight">
                « Zoe Linā » et nos grands cabas : <br />
                <span className="italic font-normal">L'esprit de l'océan dans la cité.</span>
              </h2>

              <p className="text-chocolate-muted font-light leading-relaxed">
                Conçus pour traverser les saisons sans jamais perdre leur élégance, nos cabas emblématiques marient une contenance généreuse à un tressage aérien et résistant. Chaque anse est renforcée avec soin pour supporter confortablement vos essentiels de journée comme vos trouvailles de marché.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-charcoal">
                    <strong>Fibre Raphia Farinifera</strong> : récoltée selon le cycle naturel de repousse des palmes sans abattre l'arbre.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-charcoal">
                    <strong>Teintures Éco-Responsables</strong> : nuances ocre, terracotta et chocolat obtenues par des décoctions d'écorces et terres naturelles.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-charcoal">
                    <strong>Paiement facile sur place</strong> : possibilité de vérifier la pièce en main propre lors de la livraison à Tana avant de régler en espèces ou Mobile Money.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="/boutique?cat=Cabas"
                  className="inline-flex items-center gap-2 bg-chocolate text-ivory px-7 py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-terracotta transition-colors shadow-atelier"
                >
                  <span>Explorer les Cabas</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SAVOIR-FAIRE ARTISANAL LOCAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
            Héritage & Précision
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
            Le Savoir-Faire de Nos Artisanes
          </h2>
          <p className="text-sm text-chocolate-muted font-light leading-relaxed">
            À Madagascar, le crochet et le tressage du raphia constituent un art séculaire transmis de mère en fille. Chaque création Lenkā est un hommage à cette virtuosité manuelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-ivory border border-atelier p-8 rounded-sm space-y-4 hover:border-terracotta/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-terracotta font-serif font-bold text-lg">
              1
            </div>
            <h3 className="font-serif text-xl font-semibold text-charcoal">
              La Cueillette Raisonnée
            </h3>
            <p className="text-xs text-chocolate-muted leading-relaxed font-light">
              Les jeunes feuilles de raphia sont récoltées dans les zones humides de l'Ouest et de la côte malgache, puis fendues brin par brin selon une calibreuse traditionnelle au peigne d'acier.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-ivory border border-atelier p-8 rounded-sm space-y-4 hover:border-terracotta/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-terracotta font-serif font-bold text-lg">
              2
            </div>
            <h3 className="font-serif text-xl font-semibold text-charcoal">
              Le Séchage & Nuances Solaire
            </h3>
            <p className="text-xs text-chocolate-muted leading-relaxed font-light">
              Exposées aux rayons purs du soleil des hauts plateaux, les fibres acquièrent leur teinte dorée caractéristique ou sont plongées dans des bains végétaux à base de terre latéritique et d'écorces.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-ivory border border-atelier p-8 rounded-sm space-y-4 hover:border-terracotta/40 transition-colors">
            <div className="w-10 h-10 rounded-full bg-linen flex items-center justify-center text-terracotta font-serif font-bold text-lg">
              3
            </div>
            <h3 className="font-serif text-xl font-semibold text-charcoal">
              Le Crochet de Haute Précision
            </h3>
            <p className="text-xs text-chocolate-muted leading-relaxed font-light">
              Dans notre atelier, chaque sac requiert entre 20 et 42 heures de travail continu au crochet pour obtenir cette densité et cette tenue qui signent les pièces d'exception.
            </p>
          </div>
        </div>

        {/* Large photo banner of atelier */}
        <div className="mt-12 rounded-sm overflow-hidden border border-atelier relative">
          <img
            src="/images/products/savoir-faire-atelier.jpg"
            alt="Mains d'artisane malgache crochetant le raphia dans l'atelier"
            className="w-full h-80 sm:h-96 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="max-w-xl text-ivory space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-terracotta font-semibold">
                Ancrage Local
              </span>
              <p className="font-serif text-xl sm:text-2xl font-medium">
                « Donner aux fibres de notre terre la dignité d'une haute création. »
              </p>
              <p className="text-xs text-ivory/80 font-light">
                Chaque achat soutient directement une communauté de 24 femmes artisanes indépendantes à Antananarivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AVIS CLIENTS & TÉMOIGNAGES */}
      <section className="bg-linen/30 border-y border-atelier py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
              Retours d'Expérience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
              Ce que disent nos clientes
            </h2>
            <p className="text-xs text-chocolate-muted font-light">
              Des retours authentiques de clientes à Antananarivo, en province et à l'international.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-ivory p-6 rounded-sm border border-atelier flex flex-col justify-between space-y-4 hover:shadow-atelier transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-terracotta">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-terracotta" />
                    ))}
                  </div>

                  <p className="text-xs text-charcoal/90 leading-relaxed italic font-light">
                    « {rev.comment} »
                  </p>
                </div>

                <div className="pt-3 border-t border-atelier-light">
                  <h4 className="font-serif text-sm font-semibold text-charcoal">
                    {rev.author_name}
                  </h4>
                  <p className="text-[11px] text-chocolate-muted">
                    {rev.location} • <span className="text-terracotta">{rev.product_name}</span>
                  </p>
                  <span className="text-[10px] text-emerald-700 flex items-center gap-1 mt-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Achat vérifié
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MODALITÉS LIVRAISON & WHATSAPP BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-chocolate text-ivory rounded-sm p-8 sm:p-12 lg:p-16 border border-chocolate-light flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
              Commander en toute simplicité
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight text-ivory">
              Besoin d'un conseil personnalisé ou d'une commande urgente à Tana ?
            </h2>
            <p className="text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
              Nos conseillères sont disponibles en direct pour vous aider à choisir votre teinte, confirmer la disponibilité immédiate et planifier votre livraison pour demain.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="https://wa.me/261340000000?text=Bonjour%20Lenkā%20Madagascar,%20j'aimerais%20commander%20un%20sac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 text-white px-7 py-4 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-emerald-500 transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contacter sur WhatsApp</span>
            </a>
            <a
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 bg-ivory text-chocolate px-7 py-4 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-linen transition-colors"
            >
              <span>Accéder à la Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

