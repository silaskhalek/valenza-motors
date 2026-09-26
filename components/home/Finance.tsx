import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowRight } from "../icons";

export function Finance() {
  return (
    <section className="relative overflow-hidden bg-copper py-24 text-ink md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <div>
          <p data-reveal="up" className="eyebrow !text-ink/70">
            Financiamento
          </p>
          <h2 data-reveal="up" className="display mt-5 text-[clamp(2.2rem,5.5vw,5rem)]">
            Financiamento sob medida, em até 72x.
          </h2>
          <Link
            data-reveal="up"
            href="/financiamento"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-bone transition-colors hover:bg-coal"
          >
            Simular financiamento
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 border-t border-ink/20 sm:grid-cols-3 lg:grid-cols-2">
          {site.vantagensFinanciamento.map((b) => (
            <li
              key={b}
              data-reveal="up"
              className="border-b border-ink/20 py-5 text-[clamp(1.1rem,1.8vw,1.5rem)] font-semibold tracking-tight"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
