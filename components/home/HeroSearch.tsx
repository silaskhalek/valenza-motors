"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import * as f from "@/lib/format";

type Props = { marcas: { marca: string; modelos: string[] }[] };

/** "Encontre seu veículo" — o buscador do site atual (marca → modelo), agora levando ao estoque filtrado. */
export function HeroSearch({ marcas }: Props) {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const modelos = marcas.find((m) => m.marca === marca)?.modelos ?? [];

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams();
    if (marca) q.set("marca", marca);
    if (modelo) q.set("modelo", modelo);
    router.push(`/estoque${q.size ? `?${q}` : ""}`);
  }

  return (
    <form
      onSubmit={buscar}
      aria-label="Encontre seu veículo"
      className="rounded-2xl border border-white/10 bg-ink/55 p-2 backdrop-blur-xl"
    >
      <p className="eyebrow px-3 pt-2 pb-2.5">Encontre seu veículo</p>
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <label className="sr-only" htmlFor="busca-marca">
          Marca
        </label>
        <select
          id="busca-marca"
          className="field !bg-coal/70"
          value={marca}
          onChange={(e) => {
            setMarca(e.target.value);
            setModelo("");
          }}
        >
          <option value="">Todas as marcas</option>
          {marcas.map((m) => (
            <option key={m.marca} value={m.marca}>
              {f.marca(m.marca)}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="busca-modelo">
          Modelo
        </label>
        <select
          id="busca-modelo"
          className="field !bg-coal/70 disabled:opacity-50"
          value={modelo}
          disabled={!marca}
          onChange={(e) => setModelo(e.target.value)}
        >
          <option value="">Todos os modelos</option>
          {modelos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-copper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-copper-2"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
