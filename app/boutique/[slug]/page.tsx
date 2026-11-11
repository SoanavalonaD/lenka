import React from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/db";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Modèle Introuvable | Lenkā Madagascar" };

  return {
    title: `${product.name} — ${product.category} en Raphia Naturel | Lenkā Madagascar`,
    description: `${product.subtitle}. Tressé à la main à Madagascar (${product.weaving_hours}h de travail). Livraison le lendemain à Antananarivo.`,
    openGraph: {
      title: `${product.name} • Lenkā Madagascar`,
      description: product.subtitle,
      images: [product.images?.[0] || "/images/hero-lenka-bg.jpg"],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Similar products from same category or other models
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-chocolate-muted flex items-center gap-2">
          <a href="/" className="hover:text-terracotta">Accueil</a>
          <span>/</span>
          <a href="/boutique" className="hover:text-terracotta">Boutique</a>
          <span>/</span>
          <a href={`/boutique?cat=${encodeURIComponent(product.category)}`} className="hover:text-terracotta">
            {product.category}
          </a>
          <span>/</span>
          <span className="text-charcoal font-medium">{product.name}</span>
        </nav>

        {/* Interactive Product Core */}
        <ProductDetailClient product={product} />

        {/* Related Creations */}
        <div className="pt-16 border-t border-atelier">
          <div className="flex justify-between items-baseline mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
                Atelier Lenkā
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
                Vous aimerez aussi
              </h2>
            </div>
            <a
              href="/boutique"
              className="text-xs uppercase tracking-widest text-chocolate hover:text-terracotta underline font-medium"
            >
              Toute la collection →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

