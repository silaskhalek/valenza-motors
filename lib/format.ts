const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("pt-BR");

export const preco = (n: number) => brl.format(n).replace(/ /g, " ");
export const km = (n: number | null) => (n == null ? "—" : `${num.format(n)} km`);
export const ano = (fab: number | null, mod: number | null) => (fab && mod ? `${fab}/${mod}` : String(mod ?? fab ?? "—"));

/** Nomes de marca em caixa-alta vindos da plataforma → forma legível. */
const ESPECIAIS: Record<string, string> = { BMW: "BMW", GAC: "GAC", GWM: "GWM", KIA: "Kia" };
export function marca(m: string) {
  return ESPECIAIS[m] ?? m.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

/** Combustível como a plataforma escreve ("Gasolina e álcool") → rótulo curto. */
export function combustivel(c: string | null) {
  if (!c) return "—";
  if (c === "Gasolina e álcool") return "Flex";
  if (c === "Gasolina e elétrico") return "Híbrido";
  return c;
}
