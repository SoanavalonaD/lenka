import React from "react";
import { getShippingZones } from "@/lib/db";
import { formatMga } from "@/lib/format";
import {
  Truck,
  ShieldCheck,
  Banknote,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Conditions Générales de Vente, Livraison & Paiement | Lenkā Madagascar",
  description:
    "Modalités de livraison J+1 à Antananarivo, envois en province, paiements acceptés (MVola, Orange Money, espèces) et conseils d'entretien du raphia naturel fait main.",
};

export const revalidate = 60;

export default async function CGVLivraisonPage() {
  const zones = await getShippingZones();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
            Engagements de Service
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-medium">
            Livraison, Paiement & CGV
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-muted font-light max-w-xl mx-auto leading-relaxed">
            Tout ce que vous devez savoir pour commander vos créations en raphia naturel à Madagascar et recevoir vos pièces dans les meilleures conditions.
          </p>
        </div>

        {/* 1. Grille de livraison */}
        <section className="bg-ivory p-6 sm:p-10 rounded-sm border border-atelier shadow-atelier space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-atelier">
            <Truck className="w-6 h-6 text-terracotta" />
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              1. Modalités & Tarifs de Livraison
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-chocolate-muted font-light leading-relaxed">
            Nous assurons un service de coursier dédié sur Antananarivo pour vous garantir une remise en main propre sécurisée le lendemain de votre commande. Pour les provinces, nous collaborons avec les meilleures coopératives régionales de transport express.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {zones.map((zone) => (
              <div
                key={zone.code}
                className="p-5 bg-linen/30 rounded-sm border border-atelier flex flex-col justify-between space-y-4"
              >
                <div>
                  <h3 className="font-serif text-base font-bold text-charcoal">
                    {zone.name}
                  </h3>
                  <p className="text-terracotta text-xs font-semibold mt-1">
                    {zone.delivery_estimate}
                  </p>
                  <p className="text-[11px] text-chocolate-muted mt-2 leading-relaxed font-light">
                    {zone.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-atelier flex justify-between items-baseline">
                  <span className="text-[10px] uppercase text-chocolate-muted">Frais :</span>
                  <span className="font-serif text-lg font-bold text-chocolate">
                    {formatMga(zone.fee_mga)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-linen/20 rounded-sm border border-atelier/60 text-xs text-charcoal space-y-1">
            <p>
              <strong>Horaires des tournées à Tana :</strong> Du lundi au samedi entre 9h00 et 17h00. Le coursier vous appelle systématiquement 30 minutes avant son passage pour convenir du lieu exact de remise.
            </p>
          </div>
        </section>

        {/* 2. Moyens de Paiement */}
        <section id="paiements" className="bg-ivory p-6 sm:p-10 rounded-sm border border-atelier shadow-atelier space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-atelier">
            <Banknote className="w-6 h-6 text-terracotta" />
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              2. Modes de Paiement Acceptés
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-chocolate-muted font-light leading-relaxed">
            <div className="p-4 bg-linen/30 rounded-sm border border-atelier space-y-2">
              <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terracotta" />
                <span>Espèces à la Livraison (Antananarivo uniquement)</span>
              </h3>
              <p>
                Vous avez la possibilité d'inspecter votre sac en raphia lors de la réception avant de remettre le montant exact en espèces (Ariary) à notre livreur. Un reçu officiel tamponné vous est délivré sur place.
              </p>
            </div>

            <div className="p-4 bg-linen/30 rounded-sm border border-atelier space-y-2">
              <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Paiement par MVola (Telma Madagascar)</span>
              </h3>
              <p>
                Transfert sécurisé vers le compte marchand officiel Lenkā Madagascar au <strong>034 00 000 00</strong>. Indiquez simplement votre numéro de commande en référence de transfert.
              </p>
            </div>

            <div className="p-4 bg-linen/30 rounded-sm border border-atelier space-y-2">
              <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Paiement par Orange Money</span>
              </h3>
              <p>
                Transfert vers le compte marchand Lenkā au <strong>032 00 000 00</strong>. Validation instantanée dès réception de l'accusé de paiement.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Retours, Échanges & Garantie Qualité */}
        <section className="bg-ivory p-6 sm:p-10 rounded-sm border border-atelier shadow-atelier space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-atelier">
            <ShieldCheck className="w-6 h-6 text-terracotta" />
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              3. Garantie Artisanale & Retours
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-chocolate-muted font-light leading-relaxed">
            <p>
              Chaque sac Lenkā étant crocheté et monté à la main, de légères variations de texture ou de nuances de fibres végétales témoignent de son authenticité et en font une pièce singulière.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-atelier rounded-sm">
                <h4 className="font-serif font-bold text-charcoal text-sm mb-1">
                  Échange sous 48h
                </h4>
                <p className="text-xs">
                  Si le format ou la teinte ne convient pas à vos attentes, vous disposez de 48 heures après réception pour demander un échange contre un autre modèle de notre atelier.
                </p>
              </div>
              <div className="p-4 border border-atelier rounded-sm">
                <h4 className="font-serif font-bold text-charcoal text-sm mb-1">
                  Service Réparation & Remise en forme
                </h4>
                <p className="text-xs">
                  Notre atelier d'Antananarivo assure gratuitement l'entretien et le resserrage des anses au fil ciré durant les 6 premiers mois.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Guide d'entretien du Raphia */}
        <section id="entretien" className="bg-linen/40 p-6 sm:p-10 rounded-sm border border-atelier space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-atelier">
            <Sparkles className="w-6 h-6 text-terracotta" />
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              4. Les Gestes d'Entretien du Raphia Naturel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-charcoal leading-relaxed font-light">
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-chocolate">
                • Dépoussiérage régulier
              </h4>
              <p>
                Utilisez une brosse à poils doux ou un chiffon en microfibre légèrement sec. Brossez délicatement dans le sens des mailles du crochet.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-chocolate">
                • Humidité & Eau
              </h4>
              <p>
                Le raphia supporte une légère averse, mais ne doit jamais être trempé ou immergé. En cas d'éclaboussure, épongez immédiatement et laissez sécher à l'air libre à l'ombre.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-chocolate">
                • Redonner de la forme
              </h4>
              <p>
                Si votre sac est plié ou comprimé, appliquez un filet de vapeur douce (défroisseur vertical à 10 cm sans toucher la fibre) : le raphia retrouvera immédiatement sa souplesse originelle.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-chocolate">
                • Hivernage & Rangement
              </h4>
              <p>
                Remplissez votre sac de papier de soie ou d'un tissu propre et conservez-le dans son pochon en lin Lenkā à l'abri de la lumière directe continue.
              </p>
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <div className="text-center space-y-4 pt-4">
          <p className="text-xs text-chocolate-muted">
            Une question spécifique concernant une expédition à Sainte-Marie, Nosy Be ou à l'international ?
          </p>
          <a
            href="https://wa.me/261340000000?text=Bonjour%20Lenkā,%20j'ai%20une%20question%20sur%20la%20livraison"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-chocolate text-ivory px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-terracotta transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contacter le Service Clientèle sur WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}

