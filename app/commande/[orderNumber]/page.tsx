import React from "react";
import { notFound } from "next/navigation";
import { getOrderByNumber, getShippingZones } from "@/lib/db";
import { formatMga } from "@/lib/format";
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  MessageCircle,
  MapPin,
  Phone,
  Banknote,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ orderNumber: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { orderNumber } = await params;
  return {
    title: `Commande ${orderNumber} Confirmée | Lenkā Madagascar`,
    description: `Votre commande ${orderNumber} a été enregistrée avec succès. Merci de votre confiance en l'artisanat malgache.`,
  };
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  const zones = await getShippingZones();
  const zone = zones.find((z) => z.code === order.delivery_zone_code) || zones[0];

  const whatsappMessage = encodeURIComponent(
    `Bonjour Lenkā ! Je viens de passer la commande n° ${order.order_number} pour un montant de ${formatMga(order.total_mga)}. Pouvez-vous me confirmer la livraison à ${order.delivery_city} ?`
  );

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Success Header */}
        <div className="text-center space-y-4 bg-linen/25 p-8 rounded-sm border border-atelier shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
            Misaotra Betsaka • Merci pour votre commande
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium">
            Votre commande est confirmée
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-muted font-light max-w-md mx-auto">
            Nous préparons votre pièce en raphia naturel avec le plus grand soin dans notre atelier d'Antananarivo.
          </p>
          <div className="pt-2">
            <span className="inline-block bg-chocolate text-ivory text-xs tracking-widest font-mono font-semibold px-4 py-2 rounded-sm">
              N° {order.order_number}
            </span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="bg-ivory rounded-sm border border-atelier p-6 sm:p-8 space-y-6 shadow-atelier">
          <h2 className="font-serif text-xl font-semibold text-charcoal pb-3 border-b border-atelier">
            Détails de la Livraison & du Paiement
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-charcoal">
            {/* Delivery address */}
            <div className="space-y-2">
              <span className="font-medium text-chocolate-muted uppercase tracking-wider block">
                Adresse de livraison
              </span>
              <div className="space-y-1">
                <p className="font-semibold text-sm">{order.customer_name}</p>
                <p className="flex items-center gap-1.5 text-chocolate-muted">
                  <Phone className="w-3.5 h-3.5 text-terracotta" />
                  <span>{order.customer_phone}</span>
                </p>
                <p className="flex items-start gap-1.5 text-chocolate-muted pt-1">
                  <MapPin className="w-3.5 h-3.5 text-terracotta mt-0.5 flex-shrink-0" />
                  <span>
                    {order.delivery_address}, {order.delivery_city}
                  </span>
                </p>
                {order.delivery_notes && (
                  <p className="text-[11px] text-chocolate-muted/80 italic pt-1">
                    Repère : {order.delivery_notes}
                  </p>
                )}
              </div>
            </div>

            {/* Delivery timeline & payment method */}
            <div className="space-y-4">
              <div>
                <span className="font-medium text-chocolate-muted uppercase tracking-wider block">
                  Délai & Zone
                </span>
                <p className="font-semibold text-sm text-charcoal mt-1">
                  {zone?.name || order.delivery_zone_code}
                </p>
                <p className="text-terracotta text-xs font-medium">
                  {zone?.delivery_estimate || "Livraison J+1"}
                </p>
              </div>

              <div>
                <span className="font-medium text-chocolate-muted uppercase tracking-wider block">
                  Mode de règlement
                </span>
                <p className="font-semibold text-sm capitalize text-charcoal mt-1">
                  {order.payment_method === "especes_livraison" && "Espèces à la livraison"}
                  {order.payment_method === "mvola" && "Transfert MVola"}
                  {order.payment_method === "orange_money" && "Transfert Orange Money"}
                </p>
                {order.payment_method === "mvola" && (
                  <p className="text-xs text-chocolate-muted">Numéro : 034 00 000 00</p>
                )}
                {order.payment_method === "orange_money" && (
                  <p className="text-xs text-chocolate-muted">Numéro : 032 00 000 00</p>
                )}
              </div>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="pt-6 border-t border-atelier space-y-4">
            <h3 className="font-serif text-base font-semibold text-charcoal">
              Articles commandés
            </h3>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b border-atelier-light text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-sm border border-atelier bg-linen/30"
                    />
                    <div>
                      <p className="font-semibold text-charcoal">{item.name}</p>
                      <p className="text-chocolate-muted text-[11px]">
                        Teinte : {item.selectedColor} • Format : {item.selectedSize} • Qté : {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-chocolate">
                    {formatMga(item.unitPriceMga * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total recap */}
            <div className="space-y-1.5 pt-3 text-xs">
              <div className="flex justify-between text-chocolate-muted">
                <span>Sous-total articles</span>
                <span>{formatMga(order.subtotal_mga)}</span>
              </div>
              <div className="flex justify-between text-chocolate-muted">
                <span>Frais de livraison</span>
                <span>{formatMga(order.shipping_fee_mga)}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-charcoal pt-2 border-t border-atelier">
                <span>Total réglé / à régler</span>
                <span className="text-terracotta">{formatMga(order.total_mga)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp & Home Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <a
            href={`https://wa.me/261340000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-emerald-500 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmer sur WhatsApp</span>
          </a>

          <a
            href="/boutique"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-chocolate text-ivory px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-terracotta transition-colors"
          >
            <span>Poursuivre mes achats</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}

