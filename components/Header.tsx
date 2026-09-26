"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, whatsapp } from "@/lib/site";
import { Logo } from "./Logo";
import { Close, WhatsApp } from "./icons";

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  // O menu "pertence" à página em que foi aberto: trocar de rota fecha sozinho.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-500 ${
          solid || open ? "border-white/[0.06] bg-ink/75 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <div className="wrap flex h-18 items-center justify-between gap-6 md:h-20">
          <Logo className="shrink-0 text-[1.1rem] md:text-[1.25rem]" />

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.92rem] transition-colors ${
                    active ? "text-bone" : "text-bone/65 hover:text-bone"
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-0 -bottom-0.5 mx-auto block h-px w-4 bg-copper" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsapp("Olá! Vim pelo site da Valenza Motors.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-copper-2 sm:inline-flex"
            >
              <WhatsApp className="text-base" /> Falar no WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setOpenAt(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            >
              <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
              {open ? (
                <Close className="text-xl" />
              ) : (
                <span aria-hidden className="flex w-5 flex-col gap-1.5">
                  <span className="h-px w-full bg-bone" />
                  <span className="h-px w-3/5 bg-bone" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink px-[var(--gutter)] pt-28 pb-10 lg:hidden"
      >
        <nav aria-label="Menu" className="flex flex-col">
          {[{ href: "/", label: "Início" }, ...nav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="display flex items-baseline justify-between border-b border-white/[0.08] py-5 text-[clamp(1.5rem,7.5vw,2.6rem)]"
            >
              {item.label}
              <span className="font-mono text-xs font-normal tracking-widest text-mute">0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-10 space-y-2 text-sm text-mute">
          <p>
            {site.endereco.rua} — {site.endereco.bairro}, {site.endereco.cidade}
          </p>
          {site.horarios.map((h) => (
            <p key={h.dias}>
              {h.dias}: {h.horas}
            </p>
          ))}
          <p>
            <a href={site.telefone.href} className="text-bone">
              {site.telefone.label}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
