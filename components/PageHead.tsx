/** Cabeçalho padrão das páginas internas. */
export function PageHead({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="grain relative overflow-hidden bg-ink pt-36 pb-12 md:pt-44 md:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[640px] rounded-full bg-copper/15 blur-[140px]"
      />
      <div className="wrap relative">
        <p data-reveal="up" className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-copper" /> {eyebrow}
        </p>
        <h1 data-reveal="up" className="display mt-5 text-[clamp(2.6rem,8vw,7.5rem)]">
          {title} {accent && <span className="text-copper">{accent}</span>}
        </h1>
        {children && (
          <div data-reveal="up" className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-bone/75">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
