import Link from "next/link";
import { nav, site, whatsapp } from "@/lib/site";
import { Logo } from "./Logo";
import { ArrowUpRight } from "./icons";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink pt-20 pb-10">
      <div className="wrap">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo className="text-[1.6rem]" />
            <p className="mt-6 text-sm leading-relaxed text-mute">{site.sobre}</p>
          </div>

          <div>
            <p className="eyebrow">Navegue</p>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-bone/80 transition-colors hover:text-copper">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/creditos" className="text-bone/80 transition-colors hover:text-copper">
                  Créditos das fotos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Fale com a gente</p>
            <ul className="mt-5 space-y-3 text-sm text-bone/80">
              <li>
                <Link href={site.telefone.href} className="hover:text-copper">
                  {site.telefone.label}
                </Link>
              </li>
              {site.whatsapp.map((w) => (
                <li key={w.label}>
                  <a
                    href={whatsapp("Olá! Vim pelo site da Valenza Motors.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-copper"
                  >
                    WhatsApp {w.label}
                  </a>
                </li>
              ))}
              <li className="break-all">{site.email}</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Visite a loja</p>
            <address className="mt-5 space-y-1 text-sm not-italic text-bone/80">
              <p>{site.endereco.rua}</p>
              <p>
                {site.endereco.bairro}, {site.endereco.cidade}
              </p>
            </address>
            <ul className="mt-4 space-y-1 text-sm text-mute">
              {site.horarios.map((h) => (
                <li key={h.dias}>
                  {h.dias}: {h.horas}
                </li>
              ))}
            </ul>
            <a
              href={site.endereco.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm text-copper hover:text-copper-2"
            >
              Ver a região no mapa <ArrowUpRight />
            </a>
          </div>
        </div>

        <p
          aria-hidden
          className="display mt-20 select-none text-center text-[clamp(3rem,15.5vw,15rem)] leading-[0.8] text-white/[0.04]"
        >
          Valenza
        </p>

        {/* Aviso de portfólio — a marca não existe. */}
        <div className="mt-6 rounded-2xl border border-copper/25 bg-copper/[0.06] p-5 text-xs leading-relaxed text-bone/75">
          <p>
            <strong className="font-semibold text-copper-2">Projeto conceitual de portfólio.</strong> Valenza Motors é
            uma marca fictícia: nome, contatos, endereço, preços e estoque são ilustrativos. Fotos dos veículos:
            Wikimedia Commons, licenças CC BY / CC BY-SA —{" "}
            <Link href="/creditos" className="underline underline-offset-2 hover:text-bone">
              ver créditos
            </Link>
            .
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.06] pt-6 pr-16 text-xs text-mute sm:flex-row sm:justify-between">
          <p>
            Desenvolvido por{" "}
            <a
              href={site.desenvolvidoPor.url}
              target="_blank"
              rel="noopener"
              className="font-semibold tracking-wide text-bone transition-colors hover:text-copper"
            >
              {site.desenvolvidoPor.nome}
            </a>
          </p>
          <p>{site.assinatura}.</p>
        </div>
      </div>
    </footer>
  );
}
