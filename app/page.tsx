import { Hero } from "@/components/home/Hero";
import { Brands } from "@/components/home/Brands";
import { Featured } from "@/components/home/Featured";
import { Cinema } from "@/components/home/Cinema";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { Finance } from "@/components/home/Finance";
import { Visit } from "@/components/home/Visit";
import { destaques, estoque, marcas } from "@/lib/estoque";

export default function Home() {
  const porMarca = marcas.map((marca) => {
    const doMarca = estoque.filter((v) => v.marca === marca);
    return {
      marca,
      qtd: doMarca.length,
      modelos: [...new Set(doMarca.map((v) => v.modelo))].sort(),
    };
  });
  const top = destaques();

  return (
    <>
      <Hero total={estoque.length} marcas={porMarca} />
      <Brands marcas={porMarca} />
      <Featured veiculos={top} total={estoque.length} />
      <Cinema />
      <About total={estoque.length} marcas={marcas.length} />
      <Services fotos={[top[2].fotos[1] ?? top[2].fotos[0], top[5].fotos[1] ?? top[5].fotos[0], top[3].fotos[1] ?? top[3].fotos[0]]} />
      <Finance />
      <Visit />
    </>
  );
}
