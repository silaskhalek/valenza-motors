import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Finance } from "@/components/home/Finance";
import { Visit } from "@/components/home/Visit";
import { estoque, marcas } from "@/lib/estoque";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Empresa",
  description: site.sobre,
};

export default function EmpresaPage() {
  return (
    <>
      <PageHead eyebrow="Empresa" title="Valenza" accent="Motors.">
        {site.slogan}
      </PageHead>

      <section className="wrap pb-24">
        <div data-reveal="up" className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-white/[0.07]">
          {/* Vídeo institucional (atmosfera) — não é um veículo do estoque. */}
          <video
            className="absolute inset-0 size-full object-cover"
            src="/video/cinema.mp4"
            poster="/video/cinema-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
          <p className="display absolute bottom-6 left-6 text-[clamp(1.6rem,4vw,3.4rem)] md:bottom-10 md:left-10">
            {site.assinatura}
            <span className="text-copper">.</span>
          </p>
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <div>
            <p data-reveal="up" className="text-[clamp(1.2rem,2vw,1.7rem)] leading-snug">
              {site.sobre}
            </p>
            <p data-reveal="up" className="mt-6 text-mute">
              {site.equipe}
            </p>
            <div data-reveal="up" className="mt-10 flex gap-12 border-t border-white/10 pt-8">
              <div>
                <p className="display text-5xl">{estoque.length}</p>
                <p className="eyebrow mt-2">veículos no estoque</p>
              </div>
              <div>
                <p className="display text-5xl">{marcas.length}</p>
                <p className="eyebrow mt-2">marcas</p>
              </div>
            </div>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
            {site.diferenciais.map((d, i) => (
              <li key={d.titulo} data-reveal="up" className="bg-ink p-7">
                <span className="font-mono text-xs text-copper">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-lg font-semibold">{d.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mute">{d.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Finance />
      <Visit />
    </>
  );
}
