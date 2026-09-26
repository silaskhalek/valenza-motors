import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Venda seu carro",
  description: "Conte com a melhor avaliação do mercado. Solicite a avaliação do seu usado na Valenza Motors.",
};

const simNao = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
];

export default function VendaPage() {
  return (
    <>
      <PageHead eyebrow="Venda seu carro" title="Venda ou troque" accent="seu carro.">
        Conte sobre o seu usado e receba uma avaliação transparente — para vender ou dar de entrada na troca.
      </PageHead>

      <section className="wrap grid gap-16 pb-28 lg:grid-cols-[1fr_1.5fr]">
        <aside data-reveal="up" className="space-y-6">
          <p className="eyebrow">Como funciona</p>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
            {[
              ["Conte sobre o carro", "Marca, modelo, versão, ano, km e o estado geral."],
              ["Envie pelo WhatsApp", "A mensagem chega direto para a equipe da loja."],
              ["Receba a avaliação", "Proposta clara, para venda direta ou troca."],
            ].map(([t, d], i) => (
              <li key={t} className="bg-ink p-6">
                <span className="font-mono text-xs text-copper">0{i + 1}</span>
                <p className="mt-3 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-mute">{d}</p>
              </li>
            ))}
          </ol>
        </aside>

        <div data-reveal="up" className="rounded-3xl border border-white/[0.07] bg-coal/60 p-6 md:p-10">
          <LeadForm
            assunto="Avaliação do meu usado"
            cta="Solicitar avaliação"
            grupos={[
              {
                titulo: "Seus dados",
                campos: [
                  { name: "nome", label: "Nome completo", required: true },
                  { name: "celular", label: "Celular", type: "tel", required: true, inputMode: "tel" },
                ],
              },
              {
                titulo: "Dados do veículo",
                campos: [
                  { name: "marca", label: "Marca", required: true },
                  { name: "modelo", label: "Modelo", required: true },
                  { name: "versao", label: "Versão" },
                  { name: "cor", label: "Cor" },
                  { name: "km", label: "KM", inputMode: "numeric", required: true },
                  { name: "ano", label: "Ano / Modelo", placeholder: "Ex.: 2020/2021", required: true },
                  { name: "opcionais", label: "Acessórios e opcionais", type: "textarea" },
                ],
              },
              {
                titulo: "Histórico",
                campos: [
                  { name: "primeiro", label: "Você é o primeiro proprietário?", type: "radio", options: simNao },
                  { name: "mancha", label: "O estofamento possui mancha?", type: "radio", options: simNao },
                  { name: "seguro", label: "O seu veículo possui seguro?", type: "radio", options: simNao },
                  { name: "roubo", label: "O veículo já foi recuperado de roubo?", type: "radio", options: simNao },
                ],
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
