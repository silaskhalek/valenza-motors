"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Close, Plus } from "../icons";

type Credito = { autor: string; licenca: string; fonte: string };

export function Gallery({ fotos, creditos, alt }: { fotos: string[]; creditos?: Credito[]; alt: string }) {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const n = fotos.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [full, go]);

  // Deslize no toque.
  const [x0, setX0] = useState<number | null>(null);
  const touch = {
    onTouchStart: (e: React.TouchEvent) => setX0(e.touches[0].clientX),
    onTouchEnd: (e: React.TouchEvent) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      setX0(null);
    },
  };

  return (
    // min-w-0: a faixa de miniaturas não pode alargar a coluna do grid.
    <div className="min-w-0">
      <div className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-graphite" {...touch}>
        {/* Só a foto atual e as vizinhas ficam montadas. */}
        {fotos.map((src, k) =>
          k === i || k === (i + 1) % n || k === (i - 1 + n) % n ? (
            <Image
              key={src}
              src={src}
              alt={k === i ? `${alt} — foto ${k + 1} de ${n}` : ""}
              fill
              priority={k === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={`object-cover transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ) : null,
        )}
        <button
          type="button"
          onClick={() => setFull(true)}
          className="absolute inset-0 cursor-zoom-in"
          aria-label="Ampliar foto"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-ink/70 px-3 py-1.5 font-mono text-xs backdrop-blur">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <span className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="pointer-events-auto grid size-11 place-items-center rounded-full bg-ink/70 backdrop-blur hover:bg-copper hover:text-ink"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="pointer-events-auto grid size-11 place-items-center rounded-full bg-ink/70 backdrop-blur hover:bg-copper hover:text-ink"
            >
              <ArrowRight />
            </button>
          </span>
        </div>
      </div>

      <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {fotos.map((src, k) => (
          <li key={src} className="shrink-0">
            <button
              type="button"
              onClick={() => setI(k)}
              aria-label={`Ver foto ${k + 1}`}
              aria-current={k === i}
              className={`relative block aspect-[3/2] w-24 overflow-hidden rounded-lg border transition md:w-28 ${
                k === i ? "border-copper" : "border-transparent opacity-55 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="112px" className="object-cover" />
            </button>
          </li>
        ))}
        <li className="shrink-0">
          <button
            type="button"
            onClick={() => setFull(true)}
            className="grid aspect-[3/2] w-24 place-items-center rounded-lg border border-white/10 text-xs text-mute hover:text-bone md:w-28"
          >
            <span className="flex items-center gap-1">
              <Plus /> Tela cheia
            </span>
          </button>
        </li>
      </ul>

      {/* Licenças CC BY / BY-SA pedem atribuição junto da obra. */}
      {creditos?.[i] && (
        <p className="mt-2 text-[0.7rem] text-mute">
          Foto: {creditos[i].autor} ·{" "}
          <a href={creditos[i].fonte} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-bone">
            {creditos[i].licenca}, Wikimedia Commons
          </a>
        </p>
      )}

      {full && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Fotos — ${alt}`}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-xl"
          {...touch}
        >
          <div className="flex items-center justify-between p-4 md:p-6">
            <span className="font-mono text-sm text-mute">
              {i + 1} / {n}
            </span>
            <button
              type="button"
              onClick={() => setFull(false)}
              autoFocus
              aria-label="Fechar"
              className="grid size-12 place-items-center rounded-full border border-white/15 text-xl hover:border-copper"
            >
              <Close />
            </button>
          </div>
          <div className="relative mx-auto w-full max-w-[1400px] flex-1">
            <Image src={fotos[i]} alt={`${alt} — foto ${i + 1}`} fill sizes="100vw" className="object-contain" quality={85} />
          </div>
          <div className="flex justify-center gap-3 p-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="grid size-12 place-items-center rounded-full border border-white/15 hover:border-copper"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="grid size-12 place-items-center rounded-full border border-white/15 hover:border-copper"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
