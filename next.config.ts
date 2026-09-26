import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos locais em public/estoque (3:2) — o otimizador padrão gera os tamanhos.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
