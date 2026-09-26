# Valenza Motors

Site conceitual de uma concessionária de seminovos premium — **projeto de portfólio desenvolvido por [BLDRX](https://bldrx.org)**.

> Valenza Motors é uma marca fictícia. Nome, contatos, endereço, preços e estoque são ilustrativos.
> Os botões de WhatsApp abrem o app sem número de destino; telefone e e-mail levam à página de contato.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · GSAP 3 (ScrollTrigger, SplitText) · Lenis

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Destaques

- **Preloader de velocímetro** (`components/intro/`) — o ponteiro acompanha o carregamento real da página
  (hidratação → fontes → `load`). O estado vive só em memória no root layout: aparece no primeiro acesso, no F5
  e em nova aba, mas não se repete em navegação interna. Termina com fade para preto enquanto o hero entra.
- **Hero em vídeo** com buscador marca → modelo que leva ao estoque já filtrado.
- **Destaques com scroll horizontal** fixado na tela (desktop) e faixa com scroll-snap (mobile).
- **Sequência cinematográfica** em que a rolagem controla o vídeo quadro a quadro.
- **Estoque** com filtros na URL (marca, modelo, câmbio, combustível, ano, preço, busca e ordenação) e
  **ficha do veículo** com galeria, tela cheia, ficha técnica e opcionais — 17 páginas geradas estaticamente.
- **Formulários** de financiamento, venda do seu carro e contato que montam a mensagem e abrem o WhatsApp.
- Acessibilidade: respeita `prefers-reduced-motion`, navegação por teclado na galeria, conteúdo visível sem JS.

## Fotos e licenças

As fotos dos veículos são do [Wikimedia Commons](https://commons.wikimedia.org), sob licenças **CC BY** e
**CC BY-SA** (3.0/4.0), recortadas em 3:2 e convertidas para WebP em `public/estoque/`. Autor, licença e link
de cada foto ficam em `data/estoque.json` (`creditos`), aparecem sob a galeria de cada veículo e estão
reunidos na página `/creditos`.

Os vídeos em `public/video/` são assets de atmosfera e não representam veículos à venda.
