"use client";

import { useState } from "react";
import { whatsapp } from "@/lib/site";
import { WhatsApp } from "../icons";

export type Campo = {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "number" | "select" | "radio" | "textarea";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  full?: boolean;
  defaultValue?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

export type Grupo = { titulo?: string; campos: Campo[] };

/**
 * Os formulários do site atual enviavam para o backend da plataforma antiga.
 * Aqui, o envio monta uma mensagem e abre a conversa no WhatsApp da loja — nada é armazenado.
 */
export function LeadForm({ assunto, grupos, cta = "Enviar pelo WhatsApp" }: { assunto: string; grupos: Grupo[]; cta?: string }) {
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const linhas = [`*${assunto}* — enviado pelo site`, ""];
    for (const g of grupos) {
      for (const c of g.campos) {
        const raw = String(data.get(c.name) ?? "").trim();
        if (!raw) continue;
        const val = c.options?.find((o) => o.value === raw)?.label ?? raw;
        linhas.push(`${c.label}: ${val}`);
      }
    }
    window.open(whatsapp(linhas.join("\n")), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10">
      {grupos.map((g, gi) => (
        <fieldset key={gi} className="grid gap-4 sm:grid-cols-2">
          {g.titulo && <legend className="eyebrow mb-4 sm:col-span-2">{g.titulo}</legend>}
          {g.campos.map((c) => (
            <Field key={c.name} c={c} />
          ))}
        </fieldset>
      ))}

      <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-mute">
          Ao enviar, abrimos uma conversa no WhatsApp da loja com essas informações. Você revisa a mensagem antes de
          mandar.
        </p>
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-copper px-7 py-4 font-semibold text-ink transition-colors hover:bg-copper-2"
        >
          <WhatsApp className="text-lg" /> {cta}
        </button>
      </div>
      {enviado && (
        <p role="status" className="rounded-xl border border-copper/40 bg-copper/10 p-4 text-sm text-copper-2">
          Abrimos o WhatsApp em uma nova aba. Se nada apareceu, verifique se o navegador bloqueou a janela.
        </p>
      )}
    </form>
  );
}

function Field({ c }: { c: Campo }) {
  const id = `f-${c.name}`;
  const span = c.full || c.type === "textarea" ? "sm:col-span-2" : "";
  const label = (
    <span className="mb-2 block text-sm text-bone/80">
      {c.label}
      {c.required && <span className="text-copper"> *</span>}
    </span>
  );

  if (c.type === "radio") {
    return (
      <fieldset className={span}>
        <legend className="mb-2 block text-sm text-bone/80">
          {c.label}
          {c.required && <span className="text-copper"> *</span>}
        </legend>
        <div className="flex gap-2">
          {c.options?.map((o) => (
            <label key={o.value} className="cursor-pointer">
              <input type="radio" name={c.name} value={o.value} required={c.required} className="peer sr-only" />
              <span className="block rounded-full border border-white/15 px-5 py-2.5 text-sm transition peer-checked:border-copper peer-checked:bg-copper peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-copper">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <label htmlFor={id} className={span}>
      {label}
      {c.type === "select" ? (
        <select id={id} name={c.name} required={c.required} defaultValue={c.defaultValue ?? ""} className="field">
          <option value="">Selecione</option>
          {c.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : c.type === "textarea" ? (
        <textarea id={id} name={c.name} required={c.required} placeholder={c.placeholder} rows={5} className="field resize-y" />
      ) : (
        <input
          id={id}
          name={c.name}
          type={c.type ?? "text"}
          required={c.required}
          placeholder={c.placeholder}
          inputMode={c.inputMode}
          defaultValue={c.defaultValue}
          autoComplete={c.name === "nome" ? "name" : c.name === "celular" ? "tel" : c.name === "email" ? "email" : undefined}
          className="field"
        />
      )}
    </label>
  );
}
