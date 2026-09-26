import Link from "next/link";

/**
 * Marca Valenza Motors (fictícia): monograma em V cobre + letreiro no mesmo Archivo expandido dos títulos.
 * Tudo em HTML/SVG — aparece no HTML do servidor, sem depender de imagem.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 32" aria-hidden className="h-[1.55em] w-auto shrink-0">
        <path d="M2 3h9.5L20 21.5 28.5 3H38L24.5 29h-9Z" fill="#c86838" />
        <path d="M11.5 3 20 21.5 28.5 3" fill="none" stroke="#09090a" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="display text-[1.05em] tracking-[0.02em]">Valenza</span>
        <span className="mt-[0.28em] font-mono text-[0.42em] tracking-[0.62em] text-mute uppercase">Motors</span>
      </span>
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Valenza Motors — início" className={`block text-bone ${className}`}>
      <Wordmark />
    </Link>
  );
}
