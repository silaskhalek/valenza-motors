"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Wordmark } from "../Logo";
import { Speedometer, type GaugeApi } from "./Speedometer";

const FADE_MS = 700;
/** O ponteiro leva pelo menos isso para varrer o mostrador, mesmo com a página em cache. */
const GAUGE_MIN_MS = 1400;
/** Teto absoluto — nunca prender o visitante atrás do preloader. */
const GAUGE_MAX_MS = 6000;

type Props = { onReveal: () => void; onDone: () => void };

/**
 * Preloader de velocímetro (desktop e mobile): o ponteiro acompanha o carregamento real da página.
 * Vem no HTML do servidor já em 0 km/h; no fim, fade de ~700ms para preto enquanto o hero entra
 * atrás — e só então desmonta. rAF para o ponteiro; timers em setTimeout como rede de segurança.
 */
export function BrandIntro({ onReveal, onDone }: Props) {
  const gauge = useRef<GaugeApi | null>(null);
  const [fading, setFading] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cleanups: (() => void)[] = [];

    const finish = () => {
      if (started.current) return;
      started.current = true;
      setFading(true);
      onReveal();
      timers.push(setTimeout(onDone, FADE_MS));
    };

    // Metas de progresso por marco real de carregamento; o ponteiro persegue a meta
    // (limitada pelo tempo mínimo), e ao cravar em 220 km/h o site entra.
    let target = 0.35; // hidratou
    const bump = (t: number) => (target = Math.max(target, t));
    document.fonts?.ready.then(() => bump(0.7));
    if (document.readyState === "complete") bump(1);
    else {
      const onLoad = () => bump(1);
      window.addEventListener("load", onLoad, { once: true });
      cleanups.push(() => window.removeEventListener("load", onLoad));
    }

    const t0 = performance.now();
    let shown = 0;
    let raf = 0;
    const tick = (now: number) => {
      const goal = Math.min(target, (now - t0) / GAUGE_MIN_MS);
      shown += (goal - shown) * 0.16;
      if (goal >= 1 && shown > 0.995) {
        gauge.current?.(1);
        timers.push(setTimeout(finish, 280)); // um instante na faixa vermelha
        return;
      }
      gauge.current?.(shown);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    cleanups.push(() => cancelAnimationFrame(raf));
    timers.push(setTimeout(finish, GAUGE_MAX_MS));

    return () => {
      timers.forEach(clearTimeout);
      cleanups.forEach((c) => c());
    };
  }, [onReveal, onDone]);

  return (
    <div
      className="brand-intro grain fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-ink px-6 transition-opacity ease-in-out"
      style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE_MS}ms`, pointerEvents: fading ? "none" : "auto" }}
      role="presentation"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/10 blur-[90px]"
      />
      <Speedometer ref={gauge} />
      <Wordmark className="relative text-[1.35rem] text-bone md:text-[1.6rem]" />
      <span className="sr-only">{site.nome} — carregando</span>
    </div>
  );
}
