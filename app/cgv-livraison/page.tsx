import React from "react";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Conditions Générales de Vente (CGV) | Lenkā Madagascar",
  description:
    "Conditions Générales de Vente officielles de Lenkā Madagascar : modalités de commande, modes de paiement, livraison J+1 et politique de retour.",
};

export default function CGVLivraisonPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
            Lenkā Madagascar
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-medium">
            𝐂𝐎𝐍𝐃𝐈𝐓𝐈𝐎𝐍𝐒 𝐆É𝐍É𝐑𝐀𝐋𝐄𝐒 𝐃𝐄 𝐕𝐄𝐍𝐓𝐄
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-muted font-light max-w-xl mx-auto leading-relaxed">
            Désormais, avant d'effectuer tout achat, merci de considérer les conditions générales de vente établies ci-après :
          </p>
        </div>

        {/* Illustrative CGV Image */}
        <div className="rounded-sm overflow-hidden border border-atelier shadow-atelier bg-linen/20">
          <img
            src="/images/cgv-lenka.jpg"
            alt="Infographie officielle des Conditions Générales de Vente Lenkā Madagascar"
            className="w-full h-auto object-contain mx-auto"
          />
        </div>

        {/* Structured CGV Content */}
        <div className="bg-ivory p-6 sm:p-10 rounded-sm border border-atelier shadow-atelier space-y-8">
          
          {/* COMMANDE */}
          <section className="space-y-3 pb-6 border-b border-atelier">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-linen text-terracotta">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal tracking-wide">
                COMMANDE
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-chocolate-muted font-medium">
              Pour valider une commande, merci de nous envoyer :
            </p>
            
            <ul className="space-y-2 text-xs sm:text-sm text-charcoal/90 pl-2">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span>La photo l'article de votre choix, en précisant la taille &amp; couleur que vous souhaitez commander.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span>Votre nom complet , votre contact et l'adresse de livraison .</span>
              </li>
            </ul>

            <div className="p-3 bg-linen/30 border border-atelier/60 rounded-sm text-xs font-semibold text-chocolate">
              Nb: Aucun acompte est exigé.
            </div>
          </section>

          {/* PAIEMENT */}
          <section className="space-y-3 pb-6 border-b border-atelier">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-linen text-terracotta">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal tracking-wide">
                PAIEMENT
              </h2>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal/90 pl-2">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span><strong>Les modes de paiement acceptés à la livraison :</strong> Espèces , Mobile money via Orange Money ou MVOLA.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span><strong>Pour les envois en province :</strong> il est nécessaire d'effectuer paiement 24 heures avant l'envoi du colis.</span>
              </li>
            </ul>
          </section>

          {/* LIVRAISON */}
          <section className="space-y-3 pb-6 border-b border-atelier">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-linen text-terracotta">
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal tracking-wide">
                LIVRAISON
              </h2>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal/90 pl-2">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span>La livraison s'effectue le lendemain de la validation de commande. Aucune livraison ne s'effectuera au jour le jour.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span>Les frais de livraisons ne sont pas inclus dans le prix des articles. Frais compris entre 5 000 Ar et 10 000 Ar selon le lieu de livraison.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span><strong>Pour les envois en province :</strong> Les frais d'expédition sont à la charge du client.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span>Toute commande prête est livrable dans les 10 jours qui suivent la notification auprès du client. Au delà de ce délai , nous nous réservons le droit de remettre en vente l'article.</span>
              </li>
            </ul>
          </section>

          {/* RETOUR */}
          <section className="space-y-3 pb-6 border-b border-atelier">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-linen text-terracotta">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-charcoal tracking-wide">
                RETOUR
              </h2>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal/90 pl-2">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span>Il est fort recommandé de vérifier la commande au moment de la livraison. Aucun retour ne sera accepté une fois la livraison effectuée, sauf erreur de notre part ( article défectueux , commande non conforme).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <span>Au moment de la livraison : si l’article ne convient pas au client, il est possible de la retourner. Cependant, les frais de livraison restent à la charge du client.</span>
              </li>
            </ul>
          </section>

          {/* Conclusion & Facebook Link */}
          <div className="pt-2 text-center space-y-4">
            <p className="text-sm font-serif italic text-charcoal">
              Merci infiniment pour l'intérêt que vous portez pour la marque.
            </p>
            <p className="text-xs text-chocolate-muted">
              - L'équipe de{" "}
              <a
                href="https://www.facebook.com/lenkaraffiabags?__cft__[0]=AZhBf6pwBD0MkXQHmmld3qfo5HPGuf0-uCsxvq2eysZXkRxdHiyPb3IP4Xt-x3PVWvM3_dSS6EWs_ZCTBQXVD7ayMfPEThSDGAXzbIx3xZ0gSf5tIf8lEL7KlCMsQY4tQHDlRWReu8nUGOTCgoT86bu_vJzGci4&__tn__=-]K-R"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-terracotta hover:underline inline-flex items-center gap-1"
              >
                <span>Lenkā Madagascar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
