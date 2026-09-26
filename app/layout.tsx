import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveals } from "@/components/Reveals";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { site } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: {
    default: `${site.nome} — Seminovos selecionados`,
    template: `%s · ${site.nome}`,
  },
  description: `${site.slogan} ${site.sobre}`,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    images: ["/video/hero-poster.jpg"],
  },
  // Evita que o Safari transforme telefones em links tel: e quebre a hidratação.
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#09090a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${mono.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        {/* Sem JS não há vídeo controlado nem fim de intro: esconde a camada. */}
        <noscript>
          <style>{`.brand-intro{display:none}`}</style>
        </noscript>
        <IntroProvider>
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFab />
          <Reveals />
        </IntroProvider>
      </body>
    </html>
  );
}
