import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { LeadForm } from "@/components/forms/LeadForm";
import { estoque, porSlug } from "@/lib/estoque";
import * as f from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Financiamento",
  description: "Simule seu financiamento na Valenza Motors, em até 72 parcelas.",
};

export default async function FinanciamentoPage(props: PageProps<"/financiamento">) {
  const { veiculo } = await props.searchParams;
  const escolhido = typeof veiculo === "string" ? porSlug(veiculo) : undefined;

  const veiculos = estoque.map((v) => ({
    value: v.slug,
    label: `${f.marca(v.marca)} ${v.modelo} ${f.ano(v.anoFabricacao, v.anoModelo)} — ${f.preco(v.preco)}`,
  }));

  return (
    <>
      <PageHead eyebrow="Financiamento" title="Precisa de um" accent="financiamento?">
        Simule sem compromisso: escolha o carro, a entrada e o prazo, e a equipe retorna com as condições.
      </PageHead>

      <section className="wrap grid gap-16 pb-28 lg:grid-cols-[1fr_1.5fr]">
        <aside className="space-y-10">
          <div data-reveal="up">
            <p className="eyebrow">Vantagens</p>
            <ul className="mt-5 grid grid-cols-2 border-t border-white/10">
              {site.vantagensFinanciamento.map((b) => (
                <li key={b} className="border-b border-white/10 py-4 font-semibold">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="up">
            <p className="eyebrow">Prazos</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {site.parcelas.map((p) => (
                <li key={p} className="rounded-full border border-white/12 px-4 py-2 font-mono text-sm">
                  {p}x
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div data-reveal="up" className="rounded-3xl border border-white/[0.07] bg-coal/60 p-6 md:p-10">
          <LeadForm
            assunto="Ficha de financiamento"
            cta="Enviar minha ficha"
            grupos={[
              {
                titulo: "Seus dados",
                campos: [
                  { name: "nome", label: "Nome completo", required: true },
                  { name: "celular", label: "Celular", type: "tel", required: true, inputMode: "tel" },
                  { name: "email", label: "E-mail", type: "email", full: true },
                ],
              },
              {
                titulo: "Forma de financiamento",
                campos: [
                  {
                    name: "veiculo",
                    label: "Veículo de interesse",
                    type: "select",
                    options: veiculos,
                    full: true,
                    defaultValue: escolhido?.slug,
                  },
                  { name: "entrada", label: "Entrada (R$)", inputMode: "numeric", placeholder: "Ex.: 20.000" },
                  {
                    name: "parcelas",
                    label: "Parcelas",
                    type: "select",
                    options: site.parcelas.map((p) => ({ value: String(p), label: `${p}x` })),
                  },
                ],
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
