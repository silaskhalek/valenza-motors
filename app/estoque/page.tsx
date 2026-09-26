import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHead } from "@/components/PageHead";
import { StockExplorer } from "@/components/stock/StockExplorer";
import { estoque, marcas } from "@/lib/estoque";

export const metadata: Metadata = {
  title: "Estoque",
  description: `${estoque.length} veículos de ${marcas.length} marcas na Valenza Motors (estoque demonstrativo).`,
};

export default function EstoquePage() {
  return (
    <>
      <PageHead eyebrow={`${estoque.length} veículos · ${marcas.length} marcas`} title="Encontre seu" accent="veículo.">
        Personalize sua busca por marca, modelo, ano, câmbio, combustível e preço.
      </PageHead>
      <Suspense>
        <StockExplorer veiculos={estoque} />
      </Suspense>
    </>
  );
}
