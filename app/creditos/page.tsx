import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { estoque } from "@/lib/estoque";
import * as f from "@/lib/format";

export const metadata: Metadata = {
  title: "Créditos",
  description: "Créditos e licenças das fotos usadas no projeto conceitual Valenza Motors.",
};

export default function CreditosPage() {
  const total = estoque.reduce((n, v) => n + v.fotos.length, 0);
  return (
    <>
      <PageHead eyebrow="Projeto conceitual" title="Créditos" accent="das fotos.">
        Valenza Motors é uma marca fictícia criada para portfólio. As {total} fotos de veículos vêm do Wikimedia
        Commons, sob licenças Creative Commons (CC BY e CC BY-SA); foram recortadas e redimensionadas para o site.
        Os vídeos de atmosfera não representam veículos à venda.
      </PageHead>

      <section className="wrap pb-28">
        <ul className="grid gap-10 md:grid-cols-2">
          {estoque.map((v) => (
            <li key={v.id} data-reveal="up" className="rounded-2xl border border-white/[0.07] p-5">
              <Link href={`/estoque/${v.slug}`} className="display text-xl hover:text-copper">
                {f.marca(v.marca)} {v.modelo}
              </Link>
              <ul className="mt-4 grid gap-3">
                {v.fotos.map((src, i) => {
                  const c = v.creditos[i];
                  return (
                    <li key={src} className="flex items-center gap-4 text-sm">
                      <span className="relative block aspect-[3/2] w-20 shrink-0 overflow-hidden rounded-md bg-graphite">
                        <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                      </span>
                      <span className="min-w-0 text-bone/80">
                        {c.autor} ·{" "}
                        <a href={c.fonte} target="_blank" rel="noopener noreferrer" className="text-copper hover:text-copper-2">
                          {c.licenca}
                        </a>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
