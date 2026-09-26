import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowRight } from "../icons";

export function About({ total, marcas }: { total: number; marcas: number }) {
  return (
    <section id="empresa" className="relative bg-ink py-28 md:py-40">
      <div className="wrap grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p data-reveal="up" className="eyebrow">
            Sobre a Valenza
          </p>
          <h2 data-reveal="up" className="display mt-5 text-[clamp(2.2rem,5.5vw,5rem)]">
            Valenza
            <br />
            <span className="text-copper">Motors</span>
          </h2>
          <div data-reveal="up" className="mt-10 flex gap-10 border-t border-white/10 pt-8">
            {/* Contagens derivadas do estoque sincronizado — nada estimado. */}
            <div>
              <p className="display text-5xl">{total}</p>
              <p className="eyebrow mt-2">veículos no estoque</p>
            </div>
            <div>
              <p className="display text-5xl">{marcas}</p>
              <p className="eyebrow mt-2">marcas disponíveis</p>
            </div>
          </div>
        </div>

        <div>
          <p data-reveal="up" className="text-[clamp(1.25rem,2.2vw,1.9rem)] leading-snug text-bone">
            {site.slogan}
          </p>
          <p data-reveal="up" className="mt-6 max-w-2xl leading-relaxed text-mute">
            {site.sobre} {site.equipe}
          </p>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
            {site.diferenciais.map((d, i) => (
              <li key={d.titulo} data-reveal="up" className="bg-ink p-6 md:p-8">
                <span className="font-mono text-xs text-copper">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold">{d.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{d.texto}</p>
              </li>
            ))}
          </ul>

          <Link
            data-reveal="up"
            href="/empresa"
            className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-copper hover:text-copper-2"
          >
            Saiba mais <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
