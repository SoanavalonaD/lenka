"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Animations d'apparition au scroll, appliquées automatiquement sur toutes les pages.
 *
 * Utilise la Web Animations API (element.animate) : aucune classe, aucun attribut
 * ni style inline n'est ajouté au DOM. Cela évite toute erreur d'hydratation React,
 * même lorsque des composants sont hydratés tardivement (Suspense / streaming).
 *
 * - Sections, titres et éléments de grilles du <main> sont animés.
 * - Les enfants de grilles apparaissent en cascade (stagger).
 * - Ajouter data-reveal sur un élément pour le cibler explicitement,
 *   ou data-no-reveal pour l'exclure (ainsi que ses descendants).
 * - Respecte prefers-reduced-motion.
 */
const SELECTOR = [
  "main section > div > *",
  "main h1",
  "main h2",
  "main .grid > *",
  "main [data-reveal]",
].join(", ");

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof Element.prototype.animate !== "function") return;

    const tracked = new WeakSet<Element>();
    const pending = new Map<Element, Animation>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const anim = pending.get(entry.target);
          if (anim) {
            anim.play();
            pending.delete(entry.target);
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const register = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (tracked.has(el)) return;
        if (el.closest("[data-no-reveal]")) return;

        // Évite le double effet : si un ancêtre est déjà animé, on ignore
        // (sauf pour les enfants de grilles qui ont leur propre cascade).
        const parent = el.parentElement;
        const inGrid = parent?.classList.contains("grid");
        if (!inGrid) {
          let ancestor = parent;
          while (ancestor && ancestor.tagName !== "MAIN") {
            if (tracked.has(ancestor)) return;
            ancestor = ancestor.parentElement;
          }
        }

        tracked.add(el);

        const index = inGrid && parent ? Array.prototype.indexOf.call(parent.children, el) : 0;
        const delay = Math.min(index, 8) * 70;

        const anim = el.animate(
          [
            { opacity: 0, transform: "translateY(24px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 700, delay, easing: EASING, fill: "both" }
        );
        anim.pause();
        // Une fois terminée, on retire l'animation pour rendre la main au CSS
        // (effets hover, transitions Tailwind, etc.).
        anim.onfinish = () => anim.cancel();

        pending.set(el, anim);
        observer.observe(el);
      });
    };

    // On attend la fin de l'hydratation initiale avant de toucher aux éléments.
    let rafId = 0;
    const timeoutId = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(register);
    }, 0);

    // Contenu chargé dynamiquement (pagination, filtres, recherche, Suspense…)
    let scheduled = false;
    const mutation = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        register();
      });
    });
    const main = document.querySelector("main");
    if (main) mutation.observe(main, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      mutation.disconnect();
      pending.forEach((anim) => anim.cancel());
      pending.clear();
    };
  }, [pathname]);

  return null;
}
