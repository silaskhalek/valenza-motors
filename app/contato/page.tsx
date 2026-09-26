import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { LeadForm } from "@/components/forms/LeadForm";
import { Visit } from "@/components/home/Visit";
import { Mail } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a Valenza Motors — ${site.endereco.bairro}, ${site.endereco.cidade}.`,
};

export default function ContatoPage() {
  return (
    <>
      <PageHead eyebrow="Contato" title="Deseja falar" accent="conosco?">
        É só preencher o formulário abaixo — ou chamar direto no WhatsApp.
      </PageHead>

      <section className="wrap grid gap-16 lg:grid-cols-[1fr_1.5fr]">
        <aside data-reveal="up" className="space-y-4 text-sm">
          <p className="eyebrow">E-mail</p>
          <p className="inline-flex items-center gap-2 text-lg break-all">
            <Mail className="shrink-0 text-copper" /> {site.email}
          </p>
        </aside>
        <div data-reveal="up" className="rounded-3xl border border-white/[0.07] bg-coal/60 p-6 md:p-10">
          <LeadForm
            assunto="Contato"
            grupos={[
              {
                campos: [
                  { name: "nome", label: "Nome", required: true },
                  { name: "celular", label: "Celular", type: "tel", required: true, inputMode: "tel" },
                  {
                    name: "interesse",
                    label: "Interesse",
                    type: "select",
                    full: true,
                    options: ["Seminovos", "Financiamento", "Venda seu carro", "Outros"].map((x) => ({ value: x, label: x })),
                  },
                  { name: "mensagem", label: "Mensagem", type: "textarea", required: true },
                ],
              },
            ]}
          />
        </div>
      </section>

      <Visit />
    </>
  );
}
