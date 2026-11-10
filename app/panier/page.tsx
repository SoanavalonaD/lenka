import React from "react";
import { getShippingZones } from "@/lib/db";
import PanierCheckoutClient from "./PanierCheckoutClient";

export const metadata = {
  title: "Panier & Commande Sécurisée | Lenkā Madagascar",
  description:
    "Finalisez votre commande de sacs en raphia naturel Lenkā. Livraison le lendemain à Antananarivo, expédition en province, paiement par MVola, Orange Money ou espèces à la livraison.",
};

export const revalidate = 60;

export default async function PanierPage() {
  const shippingZones = await getShippingZones();

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
            Commande Sécurisée
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
            Votre Panier & Livraison
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-muted font-light">
            Livraison rapide à Antananarivo et dans toute l'île de Madagascar.
          </p>
        </div>

        {/* Client Interactive Checkout */}
        <PanierCheckoutClient shippingZones={shippingZones} />

      </div>
    </div>
  );
}

