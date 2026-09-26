import Image from "next/image";
import Link from "next/link";
import { laudoAprovado, type Veiculo } from "@/lib/estoque";
import * as f from "@/lib/format";
import { ArrowUpRight } from "./icons";

type Props = { v: Veiculo; sizes?: string; priority?: boolean; className?: string };

export function VehicleCard({ v, sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 90vw", priority, className = "" }: Props) {
  return (
    <Link
      href={`/estoque/${v.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-coal transition-colors duration-500 hover:border-copper/50 ${className}`}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-graphite">
        <Image
          src={v.fotos[0]}
          alt={`${f.marca(v.marca)} ${v.modelo} ${v.versao}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-coal/80 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {laudoAprovado(v) && (
            <span className="rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[0.62rem] tracking-wider text-bone uppercase backdrop-blur">
              Laudo aprovado
            </span>
          )}
          {v.tipo === "moto" && (
            <span className="rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[0.62rem] tracking-wider text-bone uppercase backdrop-blur">
              Moto
            </span>
          )}
        </div>
        <span className="absolute top-3 right-3 grid size-9 translate-y-1 place-items-center rounded-full bg-copper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="eyebrow !text-copper">{f.marca(v.marca)}</p>
          <h3 className="display mt-1.5 text-[1.45rem] leading-none">{v.modelo}</h3>
          <p className="mt-2 line-clamp-1 text-[0.8rem] text-mute uppercase">{v.versao}</p>
        </div>
        <dl className="grid grid-cols-3 gap-2 border-t border-white/[0.07] pt-4 font-mono text-[0.7rem] text-bone/80">
          <div>
            <dt className="sr-only">Ano</dt>
            <dd>{f.ano(v.anoFabricacao, v.anoModelo)}</dd>
          </div>
          <div>
            <dt className="sr-only">Quilometragem</dt>
            <dd>{f.km(v.km)}</dd>
          </div>
          <div>
            <dt className="sr-only">Câmbio</dt>
            <dd>{v.cambio ?? "—"}</dd>
          </div>
        </dl>
        <p className="mt-auto text-xl font-semibold tracking-tight">{f.preco(v.preco)}</p>
      </div>
    </Link>
  );
}
