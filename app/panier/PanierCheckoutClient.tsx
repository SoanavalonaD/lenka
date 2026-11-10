"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { ShippingZone } from "@/lib/types";
import { formatMga } from "@/lib/format";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Banknote,
  Smartphone,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

interface Props {
  shippingZones: ShippingZone[];
}

export default function PanierCheckoutClient({ shippingZones }: Props) {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, subtotalMga } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [selectedZoneCode, setSelectedZoneCode] = useState(shippingZones[0]?.code || "tana_ville");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("Antananarivo");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"especes_livraison" | "mvola" | "orange_money">(
    "especes_livraison"
  );
  const [paymentPhone, setPaymentPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedZone =
    shippingZones.find((z) => z.code === selectedZoneCode) || shippingZones[0];
  const shippingFeeMga = selectedZone?.fee_mga || 0;
  const totalMga = subtotalMga + shippingFeeMga;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim()) {
      setErrorMessage("Veuillez renseigner votre nom complet.");
      return;
    }

    if (!customerPhone.trim() || customerPhone.length < 8) {
      setErrorMessage("Veuillez renseigner un numéro de téléphone valide à Madagascar (ex: 034 00 000 00).");
      return;
    }

    if (!deliveryAddress.trim()) {
      setErrorMessage("Veuillez préciser votre adresse ou repère de livraison.");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Votre panier est vide.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName,
        customerPhone,
        customerEmail: customerEmail.trim() || undefined,
        deliveryZoneCode: selectedZoneCode,
        deliveryAddress,
        deliveryCity,
        deliveryNotes: deliveryNotes.trim() || undefined,
        paymentMethod,
        paymentPhone: paymentPhone.trim() || customerPhone,
        items,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Une erreur est survenue lors de l'enregistrement.");
      }

      clearCart();
      router.push(`/commande/${data.orderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Impossible d'enregistrer la commande. Veuillez réessayer.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 bg-ivory rounded-sm border border-atelier p-8 space-y-4 shadow-atelier">
        <div className="w-16 h-16 mx-auto rounded-full bg-linen flex items-center justify-center text-chocolate-muted">
          <ShoppingBag className="w-8 h-8 opacity-40" />
        </div>
        <h2 className="font-serif text-2xl text-charcoal">Votre panier est vide</h2>
        <p className="text-xs text-chocolate-muted leading-relaxed font-light">
          Vous n'avez pas encore ajouté de créations à votre commande. Découvrez nos sacs et cabas faits main en raphia naturel.
        </p>
        <a
          href="/boutique"
          className="inline-flex items-center gap-2 bg-chocolate text-ivory px-6 py-3 text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-terracotta transition-colors mt-2"
        >
          <span>Découvrir la Boutique</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Left Column: Delivery & Payment Form */}
      <div className="lg:col-span-7 bg-ivory p-6 sm:p-8 rounded-sm border border-atelier shadow-atelier">
        <form onSubmit={handleSubmitOrder} className="space-y-8" noValidate={false}>
          
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-red-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Coordonnées */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-atelier">
              <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h2 className="font-serif text-lg font-semibold text-charcoal">
                Vos Coordonnées
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerName" className="block text-xs font-medium text-charcoal mb-1">
                  Nom et Prénom <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="ex: Mialy Razafindrakoto"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-linen/20 border border-atelier rounded-sm px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-xs font-medium text-charcoal mb-1">
                  Téléphone de contact / Mobile <span className="text-terracotta">*</span>
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  placeholder="034 XX XXX XX / 032 ..."
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-linen/20 border border-atelier rounded-sm px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div>
              <label htmlFor="customerEmail" className="block text-xs font-medium text-charcoal mb-1">
                Adresse e-mail <span className="text-chocolate-muted font-normal">(Facultative pour le reçu)</span>
              </label>
              <input
                type="email"
                id="customerEmail"
                name="email"
                autoComplete="email"
                placeholder="mialy@exemple.mg"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-linen/20 border border-atelier rounded-sm px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          {/* 2. Destination & Adresse de livraison */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-atelier">
              <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h2 className="font-serif text-lg font-semibold text-charcoal">
                Zone & Adresse de Livraison
              </h2>
            </div>

            {/* Shipping Zone Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-charcoal">
                Sélectionnez votre zone de livraison <span className="text-terracotta">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {shippingZones.map((zone) => {
                  const isSelected = selectedZoneCode === zone.code;
                  return (
                    <div
                      key={zone.code}
                      onClick={() => {
                        setSelectedZoneCode(zone.code);
                        if (zone.code.startsWith("tana") && deliveryCity !== "Antananarivo") {
                          setDeliveryCity("Antananarivo");
                        }
                      }}
                      className={`p-3.5 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                        isSelected
                          ? "border-terracotta bg-linen/50 ring-1 ring-terracotta"
                          : "border-atelier hover:border-chocolate-muted bg-white/60"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-medium text-xs text-charcoal">
                          <input
                            type="radio"
                            name="shippingZone"
                            checked={isSelected}
                            onChange={() => setSelectedZoneCode(zone.code)}
                            className="text-terracotta focus:ring-terracotta"
                          />
                          <span>{zone.name}</span>
                        </div>
                        <p className="text-[11px] text-chocolate-muted leading-relaxed pl-5 font-light">
                          {zone.description}
                        </p>
                        <p className="text-[11px] text-terracotta font-medium pl-5">
                          Délai : {zone.delivery_estimate}
                        </p>
                      </div>

                      <span className="font-serif text-sm font-bold text-chocolate whitespace-nowrap">
                        {formatMga(zone.fee_mga)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="deliveryCity" className="block text-xs font-medium text-charcoal mb-1">
                  Ville / Commune <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  id="deliveryCity"
                  name="city"
                  autoComplete="address-level2"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="Antananarivo, Tamatave, Majunga..."
                  className="w-full bg-linen/20 border border-atelier rounded-sm px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>

              <div>
                <label htmlFor="deliveryAddress" className="block text-xs font-medium text-charcoal mb-1">
                  Quartier & Adresse précise <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  id="deliveryAddress"
                  name="address"
                  autoComplete="street-address"
                  required
                  placeholder="ex: Ivandry, près de l'ambassade, Lot II J..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-linen/20 border border-atelier rounded-sm px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <div>
              <label htmlFor="deliveryNotes" className="block text-xs font-medium text-charcoal mb-1">
                Repère visuel ou consignes pour le livreur (Facultatif)
              </label>
              <textarea
                id="deliveryNotes"
                name="notes"
                rows={2}
                placeholder="ex: Portail blanc avec bougainvillier, appeler dès arrivée au portail..."
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                className="w-full bg-linen/20 border border-atelier rounded-sm p-3 text-xs text-charcoal focus:outline-none focus:border-terracotta"
              />
            </div>
          </div>

          {/* 3. Mode de Règlement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-atelier">
              <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <h2 className="font-serif text-lg font-semibold text-charcoal">
                Mode de Paiement Sécurisé
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Espèces à la livraison */}
              <div
                onClick={() => setPaymentMethod("especes_livraison")}
                className={`p-4 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === "especes_livraison"
                    ? "border-terracotta bg-linen/50 ring-1 ring-terracotta"
                    : "border-atelier hover:border-chocolate-muted bg-white/60"
                }`}
              >
                <div className="space-y-2">
                  <Banknote className="w-5 h-5 text-terracotta" />
                  <span className="font-serif text-xs font-bold text-charcoal block">
                    Espèces à la livraison
                  </span>
                  <p className="text-[11px] text-chocolate-muted leading-tight font-light">
                    Vous payez le livreur en liquide après vérification de votre sac.
                  </p>
                </div>
              </div>

              {/* MVola (Telma) */}
              <div
                onClick={() => setPaymentMethod("mvola")}
                className={`p-4 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === "mvola"
                    ? "border-yellow-500 bg-yellow-50/40 ring-1 ring-yellow-500"
                    : "border-atelier hover:border-chocolate-muted bg-white/60"
                }`}
              >
                <div className="space-y-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-yellow-400 text-yellow-950 inline-block">
                    MVola
                  </span>
                  <span className="font-serif text-xs font-bold text-charcoal block">
                    Transfert MVola
                  </span>
                  <p className="text-[11px] text-chocolate-muted leading-tight font-light">
                    Sur notre numéro marchand <strong>034 00 000 00</strong>.
                  </p>
                </div>
              </div>

              {/* Orange Money */}
              <div
                onClick={() => setPaymentMethod("orange_money")}
                className={`p-4 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === "orange_money"
                    ? "border-orange-500 bg-orange-50/40 ring-1 ring-orange-500"
                    : "border-atelier hover:border-chocolate-muted bg-white/60"
                }`}
              >
                <div className="space-y-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-orange-500 text-white inline-block">
                    Orange Money
                  </span>
                  <span className="font-serif text-xs font-bold text-charcoal block">
                    Orange Money
                  </span>
                  <p className="text-[11px] text-chocolate-muted leading-tight font-light">
                    Sur notre numéro <strong>032 00 000 00</strong>.
                  </p>
                </div>
              </div>
            </div>

            {paymentMethod !== "especes_livraison" && (
              <div className="p-3 bg-linen/40 border border-atelier rounded-sm text-xs text-charcoal space-y-1">
                <p>
                  <strong>Instructions Mobile Money :</strong> Vous pouvez régler dès maintenant ou attendre le message de confirmation WhatsApp de notre atelier avec le numéro de référence à indiquer.
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-chocolate text-ivory py-4 px-6 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-terracotta transition-all shadow-atelier disabled:opacity-50"
            >
              {loading ? (
                <span>Validation en cours...</span>
              ) : (
                <>
                  <span>Confirmer la commande ({formatMga(totalMga)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-ivory p-6 rounded-sm border border-atelier shadow-sm space-y-5">
          <h2 className="font-serif text-lg font-semibold text-charcoal pb-3 border-b border-atelier">
            Récapitulatif de Commande
          </h2>

          {/* Items */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.selectedColor}-${item.selectedSize}`}
                className="flex gap-3 pb-3 border-b border-atelier-light items-start"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded-sm border border-atelier bg-linen/30 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-sm font-semibold text-charcoal truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.productId, item.selectedColor, item.selectedSize)}
                      className="text-chocolate-muted hover:text-red-700 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-chocolate-muted">
                    Teinte : {item.selectedColor} • Format : {item.selectedSize}
                  </p>

                  <div className="flex justify-between items-center mt-2">
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
                        className="px-2 py-0.5 text-chocolate hover:bg-linen"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="px-2 py-0.5 text-chocolate hover:bg-linen"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <span className="font-serif text-xs font-semibold text-chocolate">
                      {formatMga(item.unitPriceMga * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="space-y-2 pt-2 border-t border-atelier text-xs">
            <div className="flex justify-between text-chocolate-muted">
              <span>Articles ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span className="font-serif font-medium text-charcoal">{formatMga(subtotalMga)}</span>
            </div>
            <div className="flex justify-between text-chocolate-muted">
              <span>Frais de livraison ({selectedZone.name})</span>
              <span className="font-serif font-medium text-charcoal">
                {shippingFeeMga > 0 ? formatMga(shippingFeeMga) : "Gratuit"}
              </span>
            </div>
            <div className="pt-3 border-t border-atelier flex justify-between items-baseline">
              <span className="font-serif text-base font-bold text-charcoal">Total à régler</span>
              <span className="font-serif text-2xl font-bold text-terracotta">
                {formatMga(totalMga)}
              </span>
            </div>
          </div>
        </div>

        {/* Guarantee box */}
        <div className="p-4 bg-linen/30 border border-atelier rounded-sm text-xs text-chocolate-muted space-y-2">
          <div className="flex items-center gap-2 text-charcoal font-medium">
            <Truck className="w-4 h-4 text-terracotta" />
            <span>Modalités de livraison :</span>
          </div>
          <p className="leading-relaxed font-light">
            Pour Antananarivo : Livraison le lendemain garantie pour toute commande validée avant 16h. Notre livreur vous contacte 30 minutes avant son arrivée.
          </p>
        </div>
      </div>

    </div>
  );
}

