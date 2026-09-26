import Link from "next/link";
import * as f from "@/lib/format";

/** Marcas presentes no estoque sincronizado — cada uma leva ao estoque filtrado. */
export function Brands({ marcas }: { marcas: { marca: string; qtd: number }[] }) {
  const faixa = [...marcas, ...marcas];
  return (
    <section aria-label="Marcas no estoque" className="relative overflow-hidden border-y border-white/[0.06] bg-ink py-8">
      <ul className="marquee flex w-max items-center gap-12 pr-12 hover:[animation-play-state:paused]">
        {faixa.map((m, i) => (
          <li key={`${m.marca}-${i}`} aria-hidden={i >= marcas.length || undefined}>
            <Link
              href={`/estoque?marca=${encodeURIComponent(m.marca)}`}
              tabIndex={i >= marcas.length ? -1 : undefined}
              className="group flex items-baseline gap-2 whitespace-nowrap"
            >
              <span className="display text-[clamp(1.6rem,3vw,2.6rem)] text-white/20 transition-colors duration-300 group-hover:text-bone">
                {f.marca(m.marca)}
              </span>
              <sup className="font-mono text-xs text-copper">{m.qtd}</sup>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
