import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "../icons";

type Servico = { n: string; titulo: string; texto: string; cta: string; href: string; foto: string };

/** Os três caminhos da loja. As fotos vêm do estoque demonstrativo. */
export function Services({ fotos }: { fotos: [string, string, string] }) {
  const servicos: Servico[] = [
    {
      n: "01",
      titulo: "Estoque",
      texto: "Encontre seu próximo carro filtrando por marca, modelo, ano, câmbio e preço.",
      cta: "Ver estoque",
      href: "/estoque",
      foto: fotos[0],
    },
    {
      n: "02",
      titulo: "Financiamento",
      texto: "Simule sem compromisso e parcele em até 72 vezes, com ou sem entrada do seu usado.",
      cta: "Simular com a equipe",
      href: "/financiamento",
      foto: fotos[1],
    },
    {
      n: "03",
      titulo: "Venda seu carro",
      texto: "Avaliação transparente do seu usado — para vender ou dar de entrada na troca.",
      cta: "Solicitar avaliação",
      href: "/venda-seu-carro",
      foto: fotos[2],
    },
  ];

  return (
    <section className="relative bg-coal py-28 md:py-36">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-reveal="up" className="display text-[clamp(2.2rem,5.5vw,5rem)]">
            Comprar, financiar
            <br />
            ou <span className="text-copper">vender.</span>
          </h2>
          <p data-reveal="up" className="max-w-sm text-mute">
            Tudo em um só lugar, em São Paulo — com atendimento direto pelo WhatsApp.
          </p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {servicos.map((s) => (
            <Link
              key={s.n}
              href={s.href}
              data-reveal="up"
              className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.07] p-7"
            >
              <Image
                src={s.foto}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover opacity-45 grayscale transition-all duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-70 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/70 to-coal/10" />
              <div className="relative">
                <span className="font-mono text-xs text-copper">{s.n}</span>
                <h3 className="display mt-3 text-3xl">{s.titulo}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone/75">{s.texto}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  {s.cta}
                  <span className="grid size-8 place-items-center rounded-full bg-copper text-ink transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
