"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";
import type { Veiculo } from "@/lib/estoque";
import { VehicleCard } from "../VehicleCard";
import { ArrowLeft, ArrowRight } from "../icons";

/**
 * Veículos em destaque — no desktop, a rolagem vertical move a faixa na horizontal (seção fixada);
 * no celular (ou com movimento reduzido), é uma faixa com scroll-snap nativo e setas.
 */
export function Featured({ veiculos, total }: { veiculos: Veiculo[]; total: number }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION} and (min-width: 1024px)`, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        const tween = gsap.to(el.firstElementChild, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".featured-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (st) => gsap.set(".featured-progress", { scaleX: st.progress }),
          },
        });
        gsap.from(".featured-card", {
          y: 80,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 1.4,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
        return () => tween.kill();
      });
      mm.add(MOTION, () => {
        gsap.fromTo(
          "[data-reveal='featured']",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.1, scrollTrigger: { trigger: root.current, start: "top 75%" } },
        );
      });
    },
    { scope: root },
  );

  function nudge(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section ref={root} id="destaques" className="relative bg-ink">
      <div className="featured-pin flex min-h-[100svh] flex-col justify-center gap-10 py-24 lg:py-16">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal="featured" className="eyebrow">
              Estoque real · {veiculos.length} selecionados
            </p>
            <h2 data-reveal="featured" className="display mt-4 text-[clamp(2.4rem,6.5vw,6rem)]">
              Veículos
              <br />
              em <span className="text-copper">destaque</span>
            </h2>
          </div>
          <div data-reveal="featured" className="flex items-center gap-3">
            <div className="flex gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Anteriores"
                className="grid size-12 place-items-center rounded-full border border-white/15 hover:border-copper"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Próximos"
                className="grid size-12 place-items-center rounded-full border border-white/15 hover:border-copper"
              >
                <ArrowRight />
              </button>
            </div>
            <Link
              href="/estoque"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-copper hover:text-copper"
            >
              Ver os {total}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div
          ref={track}
          className="no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain lg:snap-none lg:overflow-hidden"
        >
          <ol className="flex w-max gap-4 px-[var(--gutter)] md:gap-6">
            {veiculos.map((v, i) => (
              <li
                key={v.id}
                className="featured-card w-[82vw] shrink-0 snap-start scroll-ml-[var(--gutter)] sm:w-[46vw] lg:w-[30vw] xl:w-[27vw]"
              >
                <p className="mb-3 flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] text-mute">
                  <span className="text-copper">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span>{String(veiculos.length).padStart(2, "0")}</span>
                </p>
                <VehicleCard v={v} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 82vw" />
              </li>
            ))}
          </ol>
        </div>

        <div className="wrap hidden lg:block">
          <div className="h-px w-full bg-white/10">
            <div className="featured-progress h-px origin-left scale-x-0 bg-copper" />
          </div>
        </div>
      </div>
    </section>
  );
}
