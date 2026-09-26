"use client";

import { useRef } from "react";
import { gsap, MOTION, SplitText, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";

/**
 * Sequência cinematográfica: o quadro abre até ocupar a tela e a rolagem "dirige" o vídeo
 * (o carro entra, vira e acende os faróis). O vídeo é atmosfera — não é um veículo do estoque.
 */
export function Cinema() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const v = video.current!;
      const mm = gsap.matchMedia();

      mm.add(MOTION, () => {
        // iOS só pinta frames de currentTime depois de um play() — vídeo mudo pode tocar sem gesto.
        v.play()
          .then(() => v.pause())
          .catch(() => {});
        const split = SplitText.create(".cinema-line", { type: "words", mask: "words" });
        const state = { t: 0 };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=260%",
            pin: ".cinema-stage",
            scrub: 0.6,
          },
        });

        tl.fromTo(
          ".cinema-frame",
          { clipPath: "inset(16% 18% 16% 18% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.35 },
          0,
        )
          .fromTo(".cinema-media", { scale: 1.25 }, { scale: 1, duration: 0.35 }, 0)
          .to(
            state,
            {
              t: 1,
              duration: 1,
              onUpdate: () => {
                if (v.duration) v.currentTime = state.t * (v.duration - 0.05);
              },
            },
            0,
          )
          .from(split.words, { yPercent: 110, stagger: 0.02, duration: 0.12, ease: "power2.out" }, 0.18)
          .to(".cinema-copy", { autoAlpha: 0, y: -40, duration: 0.12 }, 0.62)
          .fromTo(".cinema-end", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.8);

        return () => split.revert();
      });

      // Movimento reduzido: sem pin e sem scrub — o vídeo roda sozinho.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        v.loop = true;
        v.play().catch(() => {});
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Valenza Motors" className="relative bg-ink">
      <div className="cinema-stage relative h-[100svh] overflow-hidden">
        <div className="cinema-frame absolute inset-0 overflow-hidden">
          <div className="cinema-media absolute inset-0">
            <video
              ref={video}
              className="size-full object-cover"
              src="/video/cinema.mp4"
              poster="/video/cinema-poster.jpg"
              muted
              playsInline
              preload="auto"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60" />
        </div>

        <div className="wrap relative z-10 flex h-full flex-col justify-between pt-28 pb-12">
          <p className="eyebrow flex items-center gap-3 !text-bone/70">
            <span className="h-px w-8 bg-copper" /> {site.nome}
          </p>

          <div className="cinema-copy max-w-5xl">
            <p className="cinema-line display text-[clamp(2.2rem,7vw,7rem)]">
              Cada detalhe, <span className="text-copper">verificado.</span>
            </p>
          </div>

          <div className="cinema-end grid gap-6 opacity-100 md:grid-cols-2 md:items-end">
            <p className="display text-[clamp(1.8rem,4.5vw,4.2rem)]">
              Valenza<span className="text-copper">.</span>
            </p>
            <p className="max-w-md text-bone/80 md:justify-self-end">{site.slogan}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
