"use client";

import { usePathname } from "next/navigation";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Revela todo elemento com data-reveal="up" quando entra na tela (em lotes, com leve stagger).
 * Seções com timeline própria usam outros valores de data-reveal e cuidam de si mesmas.
 */
export function Reveals() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-reveal='up']");
        gsap.set(els, { y: 36, autoAlpha: 0 });
        ScrollTrigger.batch(els, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 1.1, overwrite: true }),
        });
        // Recalcula depois que imagens/fontes mudam a altura da página.
        const t = setTimeout(() => ScrollTrigger.refresh(), 600);
        return () => clearTimeout(t);
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
