"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Veiculo } from "@/lib/estoque";
import * as f from "@/lib/format";
import { VehicleCard } from "../VehicleCard";
import { Close } from "../icons";

type Ordem = "preco-desc" | "preco-asc" | "ano-desc" | "km-asc";

const ORDENS: { v: Ordem; label: string }[] = [
  { v: "preco-desc", label: "Maior preço" },
  { v: "preco-asc", label: "Menor preço" },
  { v: "ano-desc", label: "Mais novos" },
  { v: "km-asc", label: "Menor km" },
];

const FAIXAS = [
  { v: "", label: "Qualquer preço" },
  { v: "50000", label: "Até R$ 50 mil" },
  { v: "80000", label: "Até R$ 80 mil" },
  { v: "100000", label: "Até R$ 100 mil" },
  { v: "150000", label: "Até R$ 150 mil" },
  { v: "200000", label: "Até R$ 200 mil" },
];

const unicos = (xs: (string | null)[]) => [...new Set(xs.filter(Boolean) as string[])].sort((a, b) => a.localeCompare(b, "pt-BR"));

export function StockExplorer({ veiculos }: { veiculos: Veiculo[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const [busca, setBusca] = useState(params.get("q") ?? "");
  const marca = params.get("marca") ?? "";
  const modelo = params.get("modelo") ?? "";
  const cambio = params.get("cambio") ?? "";
  const combustivel = params.get("combustivel") ?? "";
  const ate = params.get("ate") ?? "";
  const anoMin = params.get("ano") ?? "";
  const ordem = (params.get("ordem") as Ordem) ?? "preco-desc";

  const opcoes = useMemo(
    () => ({
      marcas: unicos(veiculos.map((v) => v.marca)),
      modelos: unicos(veiculos.filter((v) => !marca || v.marca === marca).map((v) => v.modelo)),
      cambios: unicos(veiculos.map((v) => v.cambio)),
      combustiveis: unicos(veiculos.map((v) => v.combustivel)),
      anos: [...new Set(veiculos.map((v) => v.anoModelo).filter(Boolean) as number[])].sort((a, b) => b - a),
    }),
    [veiculos, marca],
  );

  function set(key: string, value: string) {
    const q = new URLSearchParams(params.toString());
    if (value) q.set(key, value);
    else q.delete(key);
    if (key === "marca") q.delete("modelo");
    router.replace(`/estoque${q.size ? `?${q}` : ""}`, { scroll: false });
  }

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const r = veiculos.filter((v) => {
      if (marca && v.marca !== marca) return false;
      if (modelo && v.modelo !== modelo) return false;
      if (cambio && v.cambio !== cambio) return false;
      if (combustivel && v.combustivel !== combustivel) return false;
      if (ate && v.preco > Number(ate)) return false;
      if (anoMin && (v.anoModelo ?? 0) < Number(anoMin)) return false;
      if (termo && !`${v.marca} ${v.modelo} ${v.versao}`.toLowerCase().includes(termo)) return false;
      return true;
    });
    const by: Record<Ordem, (a: Veiculo, b: Veiculo) => number> = {
      "preco-desc": (a, b) => b.preco - a.preco,
      "preco-asc": (a, b) => a.preco - b.preco,
      "ano-desc": (a, b) => (b.anoModelo ?? 0) - (a.anoModelo ?? 0) || b.preco - a.preco,
      "km-asc": (a, b) => (a.km ?? Infinity) - (b.km ?? Infinity),
    };
    return r.sort(by[ordem] ?? by["preco-desc"]);
  }, [veiculos, marca, modelo, cambio, combustivel, ate, anoMin, busca, ordem]);

  const ativos = [
    marca && { k: "marca", label: f.marca(marca) },
    modelo && { k: "modelo", label: modelo },
    cambio && { k: "cambio", label: cambio },
    combustivel && { k: "combustivel", label: f.combustivel(combustivel) },
    ate && { k: "ate", label: FAIXAS.find((x) => x.v === ate)?.label ?? ate },
    anoMin && { k: "ano", label: `A partir de ${anoMin}` },
  ].filter(Boolean) as { k: string; label: string }[];

  return (
    <div className="wrap pb-28">
      <div className="sticky top-18 z-30 -mx-[var(--gutter)] border-y border-white/[0.06] bg-ink/85 px-[var(--gutter)] py-3 backdrop-blur-xl md:top-20">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-[1.4fr_repeat(6,1fr)]">
          <label className="col-span-2 md:col-span-4 xl:col-span-1">
            <span className="sr-only">Buscar por palavra-chave</span>
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar modelo, versão…"
              className="field"
            />
          </label>
          <Select label="Marca" value={marca} onChange={(v) => set("marca", v)} all="Todas as marcas">
            {opcoes.marcas.map((m) => (
              <option key={m} value={m}>
                {f.marca(m)}
              </option>
            ))}
          </Select>
          <Select label="Modelo" value={modelo} onChange={(v) => set("modelo", v)} all="Todos os modelos">
            {opcoes.modelos.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
          <Select label="Câmbio" value={cambio} onChange={(v) => set("cambio", v)} all="Câmbio">
            {opcoes.cambios.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
          <Select label="Combustível" value={combustivel} onChange={(v) => set("combustivel", v)} all="Combustível">
            {opcoes.combustiveis.map((m) => (
              <option key={m} value={m}>
                {f.combustivel(m)}
              </option>
            ))}
          </Select>
          <Select label="Ano mínimo" value={anoMin} onChange={(v) => set("ano", v)} all="Ano (qualquer)">
            {opcoes.anos.map((a) => (
              <option key={a} value={String(a)}>
                A partir de {a}
              </option>
            ))}
          </Select>
          <Select label="Preço máximo" value={ate} onChange={(v) => set("ate", v)}>
            {FAIXAS.map((x) => (
              <option key={x.v} value={x.v}>
                {x.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="mr-2 text-sm text-mute" aria-live="polite">
            <span className="font-semibold text-bone">{lista.length}</span>{" "}
            {lista.length === 1 ? "veículo encontrado" : "veículos encontrados"}
          </p>
          {ativos.map((a) => (
            <button
              key={a.k}
              type="button"
              onClick={() => set(a.k, "")}
              className="inline-flex items-center gap-1.5 rounded-full border border-copper/40 bg-copper/10 px-3 py-1.5 text-xs text-copper-2 hover:border-copper"
            >
              {a.label} <Close aria-label="remover filtro" />
            </button>
          ))}
          {(ativos.length > 0 || busca) && (
            <button
              type="button"
              onClick={() => {
                setBusca("");
                router.replace("/estoque", { scroll: false });
              }}
              className="text-xs text-mute underline underline-offset-4 hover:text-bone"
            >
              Limpar filtros
            </button>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm text-mute">
          Ordenar por
          <select
            value={ordem}
            onChange={(e) => set("ordem", e.target.value === "preco-desc" ? "" : e.target.value)}
            className="field !w-auto !py-2"
          >
            {ORDENS.map((o) => (
              <option key={o.v} value={o.v}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {lista.length ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {lista.map((v, i) => (
            <li key={v.id}>
              <VehicleCard v={v} priority={i < 3} sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-16 rounded-2xl border border-white/[0.07] p-12 text-center">
          <p className="display text-2xl">Nenhum veículo com esses filtros</p>
          <p className="mt-3 text-mute">Ajuste a busca ou fale com a equipe pelo WhatsApp.</p>
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  all,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  all?: string;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field">
        {all && <option value="">{all}</option>}
        {children}
      </select>
    </label>
  );
}
