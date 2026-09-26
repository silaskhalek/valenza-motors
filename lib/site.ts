// Valenza Motors é uma marca FICTÍCIA — projeto conceitual de portfólio.
// Contatos são placeholders que não levam a pessoas reais:
//   • WhatsApp abre o seletor de contatos (wa.me sem número);
//   • telefone e e-mail apontam para a página de contato.

export const site = {
  nome: "Valenza Motors",
  assinatura: "Seminovos selecionados a dedo",
  slogan: "Seu próximo carro, escolhido com o mesmo cuidado que você teria.",
  sobre:
    "A Valenza Motors é uma loja de seminovos selecionados em São Paulo. Cada carro passa por laudo cautelar e curadoria antes de chegar ao estoque — do utilitário do dia a dia ao esportivo de fim de semana.",
  equipe: "Atendimento consultivo, do test-drive à documentação.",
  diferenciais: [
    { titulo: "Procedência verificada", texto: "Laudo cautelar em todos os veículos antes de entrarem no estoque." },
    { titulo: "Curadoria", texto: "Poucos carros, bem escolhidos: histórico, estado e preço conferidos." },
    { titulo: "Financiamento", texto: "Simulação sem compromisso, com parcelas em até 72 vezes." },
    { titulo: "Troca", texto: "Seu usado entra na negociação com avaliação transparente." },
  ],
  vantagensFinanciamento: ["Simulação sem compromisso", "Entrada flexível", "Seu usado na troca", "Até 72 parcelas"],
  parcelas: [12, 24, 36, 48, 60, 72],
  telefone: { label: "(11) 0000-0000", href: "/contato" },
  whatsapp: [{ label: "(11) 90000-0000", numero: "" }],
  email: "contato@valenzamotors.com.br",
  endereco: {
    rua: "Alameda Valenza, 100",
    bairro: "Jardim Europa",
    cidade: "São Paulo - SP",
    cep: "",
    maps: "https://www.google.com/maps/search/?api=1&query=Jardim+Europa+S%C3%A3o+Paulo",
    embed: "https://maps.google.com/maps?q=Jardim%20Europa%2C%20S%C3%A3o%20Paulo&z=15&output=embed",
  },
  horarios: [
    { dias: "Segunda a sexta", horas: "9h às 19h" },
    { dias: "Sábados", horas: "9h às 15h" },
  ],
  desenvolvidoPor: { nome: "BLDRX", url: "https://bldrx.org" },
} as const;

export const nav = [
  { href: "/estoque", label: "Estoque" },
  { href: "/financiamento", label: "Financiamento" },
  { href: "/venda-seu-carro", label: "Venda seu carro" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contato", label: "Contato" },
] as const;

/**
 * Link de WhatsApp com mensagem pronta. Sem número de destino (marca fictícia):
 * o WhatsApp abre com a mensagem e deixa a pessoa escolher o contato.
 */
export function whatsapp(mensagem?: string) {
  return mensagem ? `https://wa.me/?text=${encodeURIComponent(mensagem)}` : "https://wa.me/";
}
