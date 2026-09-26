"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, MOTION, SplitText, useGSAP } from "@/lib/gsap";
import { site, whatsapp } from "@/lib/site";
import { ArrowRight, WhatsApp } from "../icons";
import { HeroSearch } from "./HeroSearch";
import { useIntroPhase } from "../intro/IntroProvider";

type Props = { total: number; marcas: { marca: string; modelos: string[] }[] };

/** Levemente acelerado: o drift fica mais enérgico sem parecer "fast-forward". */
const HERO_SPEED = 1.7;

export function Hero({ total, marcas }: Props) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  // Enquanto a intro 3D cobre a tela, o hero fica montado e parado atrás dela;
  // entra junto com o fade final da intro (ou na hora, em navegação interna).
  const go = useIntroPhase() !== "intro";
  // Veio da intro? Então espera o logo afundar no preto antes de acender o hero.
  const fromIntro = useRef(!go);

  useEffect(() => {
    const v = video.current;
    if (!go || !v) return;
    v.currentTime = 0;
    v.defaultPlaybackRate = HERO_SPEED;
    v.playbackRate = HERO_SPEED;
    v.play().catch(() => {});
  }, [go]);

  useGSAP(
    () => {
      if (!go) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create(".hero-title", { type: "chars", mask: "chars" });
        const tl = gsap.timeline({ delay: fromIntro.current ? 0.5 : 0.1 });
        tl.fromTo(".hero-media", { scale: 1.18, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.4, ease: "power3.out" })
          .from(split.chars, { yPercent: 110, stagger: 0.045, duration: 1.3 }, 0.5)
          .fromTo("[data-reveal='hero']", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.09 }, 0.95);

        // Ao rolar: a mídia recolhe em um "quadro" e o texto sobe mais rápido que a página.
        gsap.to(".hero-frame", {
          clipPath: "inset(6% 4% 10% 4% round 28px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-copy", {
          yPercent: -35,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "75% top", scrub: true },
        });
        return () => split.revert();
      });
    },
    { scope: root, dependencies: [go] },
  );

  return (
    <section ref={root} className="relative h-[100svh] min-h-[620px] bg-ink">
      <div className="hero-frame absolute inset-0 overflow-hidden [clip-path:inset(0%_0%_0%_0%_round_0px)]">
        <div className="hero-media absolute inset-0">
          {/* Vídeo institucional (atmosfera) — não representa um veículo do estoque. */}
          <video
            ref={video}
            className="size-full object-cover object-[50%_60%]"
            src="/video/hero.mp4"
            poster="/video/hero-poster.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      </div>

      <div className="hero-copy wrap relative z-10 flex h-full flex-col justify-end pt-28 pb-8 md:pb-10">
        <p data-reveal="hero" className="eyebrow mb-5 flex items-center gap-3 !text-bone/70">
          <span className="h-px w-8 bg-copper" /> {site.nome} · {site.endereco.cidade}
        </p>

        <h1 className="hero-title display text-[clamp(2rem,11.2vw,12rem)] leading-[0.82] whitespace-nowrap">
          Acelere<span className="text-copper">.</span>
        </h1>

        <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p data-reveal="hero" className="max-w-xl text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug text-bone/85">
              Seminovos selecionados, com procedência verificada e atendimento direto — do test-drive ao
              financiamento.
            </p>
            <div data-reveal="hero" className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/estoque"
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-copper"
              >
                Ver estoque · {total} veículos
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsapp("Olá! Vim pelo site e quero saber mais sobre o estoque.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-bone"
              >
                <WhatsApp className="text-base" /> Falar no WhatsApp
              </a>
            </div>
          </div>

          <div data-reveal="hero" className="w-full lg:w-[520px]">
            <HeroSearch marcas={marcas} />
          </div>
        </div>

        <div
          data-reveal="hero"
          className="mt-8 hidden items-center justify-between border-t border-white/10 pt-5 font-mono text-[0.7rem] tracking-[0.14em] text-bone/55 uppercase md:flex"
        >
          <span>
            {site.horarios.map((h) => `${h.dias} ${h.horas}`).join("  ·  ")}
          </span>
          <span className="flex items-center gap-3">
            Role para explorar <span className="block h-px w-10 animate-pulse bg-copper" />
          </span>
        </div>
      </div>
    </section>
  );
}
