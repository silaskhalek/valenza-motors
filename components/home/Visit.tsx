import { site, whatsapp } from "@/lib/site";
import { ArrowUpRight, Clock, Phone, Pin, WhatsApp } from "../icons";

export function Visit() {
  return (
    <section className="relative bg-ink py-28 md:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
        <div className="flex flex-col">
          <p data-reveal="up" className="eyebrow">
            Visite a loja
          </p>
          <h2 data-reveal="up" className="display mt-5 text-[clamp(2.2rem,5vw,4.6rem)]">
            São Paulo,
            <br />
            <span className="text-copper">SP.</span>
          </h2>
          <p data-reveal="up" className="mt-6 max-w-md text-mute">
            No Jardim Europa, com estacionamento para clientes e test-drive agendado.
          </p>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
            <div data-reveal="up" className="flex gap-4 bg-ink p-6">
              <Pin className="mt-0.5 shrink-0 text-xl text-copper" />
              <div>
                <dt className="eyebrow">Endereço</dt>
                <dd className="mt-2">
                  {site.endereco.rua}
                  <br />
                  {site.endereco.bairro}, {site.endereco.cidade}
                </dd>
              </div>
            </div>
            <div data-reveal="up" className="flex gap-4 bg-ink p-6">
              <Clock className="mt-0.5 shrink-0 text-xl text-copper" />
              <div>
                <dt className="eyebrow">Horário</dt>
                {site.horarios.map((h) => (
                  <dd key={h.dias} className="mt-2">
                    {h.dias} <span className="text-mute">· {h.horas}</span>
                  </dd>
                ))}
              </div>
            </div>
            <div data-reveal="up" className="flex gap-4 bg-ink p-6">
              <Phone className="mt-0.5 shrink-0 text-xl text-copper" />
              <div>
                <dt className="eyebrow">Telefones</dt>
                <dd className="mt-2">
                  <a href={site.telefone.href} className="hover:text-copper">
                    {site.telefone.label}
                  </a>
                </dd>
                {site.whatsapp.map((w) => (
                  <dd key={w.label} className="mt-1">
                    <a
                      href={whatsapp("Olá! Vim pelo site da Valenza Motors.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-copper"
                    >
                      <WhatsApp className="text-[#25d366]" /> {w.label}
                    </a>
                  </dd>
                ))}
              </div>
            </div>
          </dl>

          <a
            data-reveal="up"
            href={site.endereco.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-bone px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-copper"
          >
            Como chegar <ArrowUpRight className="transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <div data-reveal="up" className="relative min-h-[380px] overflow-hidden rounded-2xl border border-white/[0.07]">
          <iframe
            title="Mapa — Jardim Europa, São Paulo"
            src={site.endereco.embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
          />
        </div>
      </div>
    </section>
  );
}
