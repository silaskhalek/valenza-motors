import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/stock/Gallery";
import { VehicleCard } from "@/components/VehicleCard";
import { ArrowLeft, ArrowRight, Check, WhatsApp } from "@/components/icons";
import { estoque, laudoAprovado, porSlug, type Veiculo } from "@/lib/estoque";
import * as f from "@/lib/format";
import { site, whatsapp } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return estoque.map((v) => ({ slug: v.slug }));
}

const nome = (v: Veiculo) => `${f.marca(v.marca)} ${v.modelo}`;

export async function generateMetadata(props: PageProps<"/estoque/[slug]">): Promise<Metadata> {
  const v = porSlug((await props.params).slug);
  if (!v) return {};
  return {
    title: `${nome(v)} ${f.ano(v.anoFabricacao, v.anoModelo)}`,
    description: `${nome(v)} ${v.versao} · ${f.km(v.km)} · ${f.preco(v.preco)} — Valenza Motors, São Paulo - SP.`,
    openGraph: { images: [v.fotos[0]] },
  };
}

/** Alguns anúncios usam "?" como marcador (emoji perdido na plataforma) — vira lista. */
function observacoes(texto: string) {
  const partes = texto.split(/\s*\?\s*/).filter(Boolean);
  return partes.length >= 4 ? partes : null;
}

export default async function VeiculoPage(props: PageProps<"/estoque/[slug]">) {
  const v = porSlug((await props.params).slug);
  if (!v) notFound();

  const ficha: [string, string][] = [
    ["Marca", f.marca(v.marca)],
    ["Modelo", v.modelo],
    ["Ano / Modelo", f.ano(v.anoFabricacao, v.anoModelo)],
    ["Quilometragem", f.km(v.km)],
    ...(v.cambio ? ([["Câmbio", v.cambio]] as [string, string][]) : []),
    ...(v.combustivel ? ([["Combustível", v.combustivel]] as [string, string][]) : []),
    ...(v.portas ? ([["Portas", String(v.portas)]] as [string, string][]) : []),
  ];

  const msg = `Olá! Tenho interesse no ${nome(v)} ${v.versao} ${f.ano(v.anoFabricacao, v.anoModelo)}, anunciado por ${f.preco(v.preco)} no site.`;
  const lista = observacoes(v.observacoes);

  const relacionados = estoque
    .filter((o) => o.id !== v.id && o.tipo === v.tipo)
    .sort((a, b) => Math.abs(a.preco - v.preco) - Math.abs(b.preco - v.preco))
    .slice(0, 3);

  return (
    <article className="bg-ink pt-24 md:pt-28">
      <div className="wrap">
        <nav aria-label="Trilha" className="flex items-center gap-2 py-4 font-mono text-xs text-mute">
          <Link href="/" className="hover:text-bone">
            Início
          </Link>
          <span>/</span>
          <Link href="/estoque" className="hover:text-bone">
            Estoque
          </Link>
          <span>/</span>
          <span className="truncate text-bone/80">{nome(v)}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          <Gallery fotos={v.fotos} creditos={v.creditos} alt={`${nome(v)} ${v.versao}`} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow !text-copper">{f.marca(v.marca)}</p>
            <h1 className="display mt-3 text-[clamp(2.4rem,5vw,4.4rem)]">{v.modelo}</h1>
            <p className="mt-3 text-sm text-mute uppercase">{v.versao}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Chip>{f.ano(v.anoFabricacao, v.anoModelo)}</Chip>
              <Chip>{f.km(v.km)}</Chip>
              {v.cambio && <Chip>{v.cambio}</Chip>}
              {v.combustivel && <Chip>{f.combustivel(v.combustivel)}</Chip>}
              {laudoAprovado(v) && <Chip accent>Laudo aprovado</Chip>}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="eyebrow">Preço</p>
              <p className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">{f.preco(v.preco)}</p>
            </div>

            <div className="mt-6 grid gap-2">
              <a
                href={whatsapp(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-copper px-6 py-4 font-semibold text-ink transition-colors hover:bg-copper-2"
              >
                <WhatsApp className="text-lg" /> Estou interessado
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={whatsapp(`${msg} Gostaria de solicitar uma proposta.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-3.5 text-sm font-semibold hover:border-bone"
                >
                  Solicitar proposta
                </a>
                <Link
                  href={`/financiamento?veiculo=${v.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-3.5 text-sm font-semibold hover:border-bone"
                >
                  Ver financiamento
                </Link>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-mute">
              {site.nome} · {site.endereco.bairro}, {site.endereco.cidade} ·{" "}
              <a href={site.telefone.href} className="text-bone/80 hover:text-copper">
                {site.telefone.label}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/[0.07] pt-14 lg:grid-cols-3">
          <section>
            <h2 className="eyebrow">Dados do veículo</h2>
            <dl className="mt-6 divide-y divide-white/[0.07]">
              {ficha.map(([k, val]) => (
                <div key={k} className="flex justify-between gap-6 py-3.5 text-sm">
                  <dt className="text-mute">{k}</dt>
                  <dd className="text-right">{val}</dd>
                </div>
              ))}
            </dl>
          </section>

          {v.opcionais.length > 0 && (
            <section>
              <h2 className="eyebrow">Opcionais · {v.opcionais.length}</h2>
              <ul className="mt-6 grid gap-2.5 text-sm">
                {v.opcionais.map((o) => (
                  <li key={o} className="flex gap-2.5">
                    <Check className="mt-0.5 shrink-0 text-copper" /> {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {v.observacoes && (
            <section>
              <h2 className="eyebrow">Observações do anúncio</h2>
              {lista ? (
                <ul className="mt-6 grid gap-2 text-sm leading-relaxed text-bone/85">
                  {lista.map((o) => (
                    <li key={o} className="border-l border-copper/60 pl-3">
                      {o}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 border-l border-copper/60 pl-4 text-sm leading-relaxed text-bone/85">
                  {v.observacoes}
                </p>
              )}
            </section>
          )}
        </div>

        <section className="mt-24 border-t border-white/[0.07] pt-14 pb-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)]">
              Na mesma <span className="text-copper">faixa</span>
            </h2>
            <Link href="/estoque" className="group inline-flex items-center gap-2 text-sm text-mute hover:text-bone">
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" /> Voltar ao estoque
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((o) => (
              <li key={o.id}>
                <VehicleCard v={o} />
              </li>
            ))}
          </ul>
          <Link
            href="/estoque"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-bone px-6 py-3.5 text-sm font-semibold text-ink hover:bg-copper"
          >
            Ver todos os {estoque.length} veículos
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      </div>
    </article>
  );
}

function Chip({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1.5 font-mono text-[0.7rem] tracking-wide uppercase ${
        accent ? "border-copper/50 bg-copper/10 text-copper-2" : "border-white/12 text-bone/80"
      }`}
    >
      {children}
    </span>
  );
}
