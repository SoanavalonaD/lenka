import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lenka-madagascar.com"),
  title: "Lenkā Madagascar • Haute Maroquinerie en Raphia Naturel Fait Main",
  description:
    "Maison d'accessoires de mode épurés et haut de gamme en raphia 100% naturel de Madagascar. Cabas 'Zoe Linā', bandoulières, pochettes et lunch bags crochetés à la main. Livraison le lendemain à Antananarivo et expédition en province. Paiement Mobile Money (MVola, Orange Money) et espèces.",
  keywords: [
    "raphia madagascar",
    "sac raphia fait main",
    "cabas raphia luxe",
    "zoe lina madagascar",
    "artisanat antananarivo",
    "mode éthique madagascar",
    "lenka madagascar",
    "sac bandouliere raphia",
  ],
  openGraph: {
    title: "Lenkā Madagascar — Une lumière à porter",
    description:
      "Accessoires de mode d'exception en raphia naturel fait main à Madagascar. Découvrez nos collections emblématiques.",
    images: ["/images/products/hero-zoe-lina.jpg"],
    type: "website",
    locale: "fr_MG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-ivory text-charcoal">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
