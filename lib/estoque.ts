import data from "@/data/estoque.json";

export type Veiculo = {
  id: string;
  slug: string;
  tipo: "carro" | "moto";
  marca: string;
  modelo: string;
  versao: string;
  anoFabricacao: number | null;
  anoModelo: number | null;
  km: number | null;
  cambio: string | null;
  combustivel: string | null;
  portas: number | null;
  preco: number;
  opcionais: string[];
  observacoes: string;
  fotos: string[];
  /** Uma entrada por foto (mesma ordem de `fotos`) — Wikimedia Commons, licenças CC. */
  creditos: { autor: string; licenca: string; fonte: string }[];
};

export const estoque = data.veiculos as Veiculo[];

// Escolha editorial para o carrossel (ids do estoque demonstrativo).
const DESTAQUES = ["vz001", "vz002", "vz003", "vz007", "vz004", "vz005", "vz006", "vz009", "vz008", "vz016"];

/** "Laudo aprovado" só quando o próprio anúncio diz isso, sem restrição/apontamento. */
export function laudoAprovado(v: Veiculo) {
  const o = v.observacoes.toUpperCase();
  return o.includes("LAUDO") && o.includes("APROVADO") && !/REPROVADO|RESTRI|APONTAMENTO|LEIL/.test(o);
}

export function destaques(): Veiculo[] {
  const escolhidos = DESTAQUES.map((id) => estoque.find((v) => v.id === id)).filter(Boolean) as Veiculo[];
  // Se o estoque mudou depois de um sync, completa com os de maior valor e laudo aprovado.
  for (const v of estoque) {
    if (escolhidos.length >= 10) break;
    if (!escolhidos.includes(v) && laudoAprovado(v) && v.tipo === "carro") escolhidos.push(v);
  }
  return escolhidos;
}

export const porSlug = (slug: string) => estoque.find((v) => v.slug === slug);

export const marcas = [...new Set(estoque.map((v) => v.marca))].sort((a, b) => a.localeCompare(b, "pt-BR"));

export const titulo = (v: Veiculo) => `${v.marca} ${v.modelo}`;
