"use client";

import React, { useState } from "react";
import { Product } from "@/lib/types";
import { formatMga } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import {
  Clock,
  MapPin,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Check,
  ChevronRight,
  Info,
  Layers,
  CalendarClock,
  Scissors,
} from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const { addItem } = useCart();

  const [brokenImages, setBrokenImages] = useState<string[]>([]);

  const rawImages = (product.images || [])
    .slice(0, 4)
    .filter((img) => Boolean(img) && !brokenImages.includes(img));

  const galleryImages = rawImages.length > 0 ? rawImages : ["/images/hero-lenka-bg.jpg"];

  const [selectedImage, setSelectedImage] = useState<string>(galleryImages[0]);
  const activeImage = galleryImages.includes(selectedImage) ? selectedImage : galleryImages[0];

  const markImageBroken = (imgUrl: string) => {
    setBrokenImages((prev) => (prev.includes(imgUrl) ? prev : [...prev, imgUrl]));
  };
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0] || { id: "c1", name: "Naturel", hex: "#E8D8BF", dyeOrigin: "Fibre naturelle", priceDeltaMga: 0 }
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0] || { id: "s1", label: "Taille Unique", dimensions: product.dimensions, priceDeltaMga: 0 }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "material" | "care" | "shipping">("description");
  const [isAdded, setIsAdded] = useState(false);

  const currentPriceMga =
    product.price_mga + (selectedSize.priceDeltaMga || 0) + (selectedColor.priceDeltaMga || 0);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      image: activeImage || galleryImages[0],
      selectedColor: selectedColor.name,
      selectedSize: selectedSize.label,
      unitPriceMga: currentPriceMga,
      quantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour Lenkā Madagascar ! Je souhaite commander la pièce « ${product.name} » (${product.category}) en teinte ${selectedColor.name}, format ${selectedSize.label} au prix de ${formatMga(currentPriceMga)}. Est-elle disponible pour une livraison ?`
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      
      {/* 1. Left Column: Image Gallery (Max 4 thumbnails) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Main HD Image Display */}
        <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-atelier bg-linen/40 shadow-atelier">
          <img
            src={activeImage}
            alt={`${product.name} — ${selectedColor.name}`}
            className="w-full h-full object-cover object-center transition-all duration-300"
            onError={(e) => {
              if (activeImage !== "/images/hero-lenka-bg.jpg") {
                markImageBroken(activeImage);
              }
              e.currentTarget.src = "/images/hero-lenka-bg.jpg";
            }}
          />

          <span className="absolute top-4 left-4 bg-chocolate/90 text-ivory text-xs uppercase tracking-widest px-3 py-1 font-medium rounded-xs backdrop-blur-sm">
            {product.collection || "Lenkā Madagascar"}
          </span>

          {product.production_delay && (
            <span className="absolute top-4 right-4 bg-amber-900/90 text-ivory text-xs tracking-wider px-3 py-1 font-medium rounded-xs backdrop-blur-sm flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5 text-terracotta" />
              <span>{product.production_delay}</span>
            </span>
          )}

          <span className="absolute bottom-4 left-4 bg-ivory/95 backdrop-blur-md text-chocolate text-xs tracking-wider px-3 py-1.5 rounded-xs flex items-center gap-1.5 border border-atelier font-medium shadow-sm">
            <Clock className="w-3.5 h-3.5 text-terracotta" />
            <span>{product.weaving_hours} heures de crochet main</span>
          </span>
        </div>

        {/* Thumbnail selector - affiche uniquement les images réellement disponibles */}
        {rawImages.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {rawImages.map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`relative aspect-[4/5] rounded-sm overflow-hidden border transition-all ${
                  activeImage === img
                    ? "ring-2 ring-terracotta border-transparent"
                    : "border-atelier opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} vue ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => markImageBroken(img)}
                />
              </button>
            ))}
          </div>
        )}

        {/* Origin & Craftsmanship Stamp */}
        <div className="p-4 bg-linen/30 border border-atelier rounded-sm flex items-center justify-between text-xs text-chocolate-muted">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-terracotta" />
            <span>Provenance des fibres : <strong>{product.origin_region || "Antananarivo, Madagascar"}</strong></span>
          </span>
          <span className="text-terracotta font-medium">100% Crochet Main</span>
        </div>
      </div>

      {/* 2. Right Column: Product Configuration & Actions */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold block">
            {product.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium mt-1">
            {product.name}
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-muted mt-2 font-light leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price Section in Ariary (MGA) */}
        <div className="p-4 bg-linen/25 rounded-sm border border-atelier flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-chocolate-muted block">
              Prix atelier (TTC)
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-chocolate">
              {formatMga(currentPriceMga)}
            </span>
          </div>
          <span className="text-xs text-emerald-800 font-medium px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-200">
            {product.production_delay ? "Sur commande" : "Disponible à l'atelier"}
          </span>
        </div>

        {/* Teinte / Couleur Selector */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-baseline text-xs">
              <span className="uppercase tracking-wider text-charcoal font-semibold">
                Couleur / Teinte :
              </span>
              <span className="text-terracotta font-medium">
                {selectedColor.name}{" "}
                {selectedColor.priceDeltaMga ? (
                  <span className="text-chocolate font-bold">
                    (+{formatMga(selectedColor.priceDeltaMga)})
                  </span>
                ) : null}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-2 p-1.5 px-3 rounded-full border text-xs transition-all ${
                    selectedColor.id === color.id
                      ? "border-terracotta bg-linen/60 ring-1 ring-terracotta text-charcoal font-medium shadow-xs"
                      : "border-atelier hover:border-chocolate-muted text-chocolate-muted bg-ivory"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                  {color.priceDeltaMga ? (
                    <span className="text-[10px] text-terracotta font-semibold">
                      +{formatMga(color.priceDeltaMga)}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Format / Taille Selector (Inclinaisons de taille) */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-baseline text-xs">
              <span className="uppercase tracking-wider text-charcoal font-semibold">
                Taille & Dimensions :
              </span>
              <span className="text-chocolate-muted">
                {selectedSize.dimensions}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`p-3 text-left border rounded-sm transition-all text-xs ${
                    selectedSize.id === size.id
                      ? "border-terracotta bg-linen/40 ring-1 ring-terracotta"
                      : "border-atelier hover:border-chocolate-muted bg-ivory"
                  }`}
                >
                  <div className="flex justify-between items-center font-medium text-charcoal">
                    <span className="font-semibold">{size.label}</span>
                    <span className="text-terracotta font-bold">
                      {formatMga(product.price_mga + size.priceDeltaMga + (selectedColor.priceDeltaMga || 0))}
                    </span>
                  </div>
                  <div className="text-[11px] text-chocolate-muted mt-1">
                    {size.dimensions}
                  </div>
                  {size.details && (
                    <div className="text-[11px] text-chocolate/80 mt-1 italic border-t border-atelier/40 pt-1">
                      {size.details}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spécificités Atelier (Anses & Intérieur) */}
        {(product.handles || product.interior || product.production_delay) && (
          <div className="p-3.5 bg-linen/20 rounded-sm border border-atelier space-y-2 text-xs">
            {product.handles && (
              <div className="flex items-start gap-2 text-charcoal">
                <Scissors className="w-3.5 h-3.5 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Anses :</strong> {product.handles}
                </div>
              </div>
            )}
            {product.interior && (
              <div className="flex items-start gap-2 text-charcoal">
                <Layers className="w-3.5 h-3.5 text-terracotta mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Intérieur :</strong> {product.interior}
                </div>
              </div>
            )}
            {product.production_delay && (
              <div className="flex items-start gap-2 text-charcoal">
                <CalendarClock className="w-3.5 h-3.5 text-amber-800 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Délai de confection :</strong> {product.production_delay}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-3">
            {/* Quantity controls */}
            <div className="flex items-center border border-atelier rounded-sm bg-white h-12">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3.5 h-full text-chocolate hover:bg-linen transition-colors font-medium"
                aria-label="Moins"
              >
                -
              </button>
              <span className="px-4 text-sm font-semibold text-charcoal">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3.5 h-full text-chocolate hover:bg-linen transition-colors font-medium"
                aria-label="Plus"
              >
                +
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 h-12 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-atelier ${
                isAdded
                  ? "bg-emerald-700 text-white"
                  : "bg-chocolate text-ivory hover:bg-terracotta"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Ajouté au panier !</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </>
              )}
            </button>
          </div>

          {/* Direct WhatsApp Ordering */}
          <a
            href={`https://wa.me/261344436172?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 flex items-center justify-center gap-2.5 bg-emerald-700 text-white text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Commander directement par WhatsApp</span>
          </a>
        </div>

        {/* Reassurance pills */}
        <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-chocolate-muted border-t border-atelier">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-terracotta" />
            <span>Livré le lendemain à Tana (J+1)</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-terracotta" />
            <span>Paiement MVola, Orange Money ou Espèces</span>
          </div>
        </div>

        {/* Accordions / Tabs */}
        <div className="pt-6 border-t border-atelier space-y-4">
          <div className="flex border-b border-atelier text-xs">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-2.5 mr-6 uppercase tracking-wider font-medium transition-colors relative ${
                activeTab === "description"
                  ? "text-terracotta border-b-2 border-terracotta"
                  : "text-chocolate-muted hover:text-charcoal"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("material")}
              className={`pb-2.5 mr-6 uppercase tracking-wider font-medium transition-colors relative ${
                activeTab === "material"
                  ? "text-terracotta border-b-2 border-terracotta"
                  : "text-chocolate-muted hover:text-charcoal"
              }`}
            >
              Matière & Savoir-faire
            </button>
            <button
              onClick={() => setActiveTab("care")}
              className={`pb-2.5 mr-6 uppercase tracking-wider font-medium transition-colors relative ${
                activeTab === "care"
                  ? "text-terracotta border-b-2 border-terracotta"
                  : "text-chocolate-muted hover:text-charcoal"
              }`}
            >
              Entretien
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-2.5 uppercase tracking-wider font-medium transition-colors relative ${
                activeTab === "shipping"
                  ? "text-terracotta border-b-2 border-terracotta"
                  : "text-chocolate-muted hover:text-charcoal"
              }`}
            >
              Livraison & CGV
            </button>
          </div>

          <div className="text-xs text-charcoal/90 leading-relaxed space-y-3 font-light pt-2">
            {activeTab === "description" && (
              <p>{product.description}</p>
            )}

            {activeTab === "material" && (
              <div className="space-y-2">
                <p>{product.material_details}</p>
                <div className="p-3 bg-linen/30 rounded border border-atelier/60 space-y-1">
                  <span className="font-semibold text-charcoal block">Raphia Farinifera de Madagascar</span>
                  <p className="text-chocolate-muted text-[11px]">
                    Récolté de manière éco-responsable dans les palmeraies malgaches, le raphia offre une souplesse et une résistance incomparables. Chaque brin est crocheté à la main avec passion.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <ul className="space-y-2">
                {(product.care_instructions || []).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-2.5">
                <p>
                  <strong>Antananarivo :</strong> Livraison le lendemain (J+1) de la validation de commande. Frais de 5 000 Ar à 10 000 Ar selon la zone.
                </p>
                <p>
                  <strong>Provinces :</strong> Frais d'expédition à la charge du client. Paiement exigé 24h avant l'envoi du colis.
                </p>
                <p className="text-terracotta pt-1">
                  Paiement à la livraison accepté en Espèces, MVola ou Orange Money. Vérification de l'article recommandée au moment de la livraison.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
