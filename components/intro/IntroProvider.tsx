"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";
import { BrandIntro } from "./BrandIntro";

/**
 * "intro"     → logo 3D em tela cheia, conteúdo travado atrás
 * "revealing" → últimos ~700ms: a intro some em preto e o hero começa a entrar
 * "done"      → intro desmontada, rolagem liberada
 */
export type IntroPhase = "intro" | "revealing" | "done";

const IntroContext = createContext<IntroPhase>("done");

/** O hero usa isto para só começar a animar (e tocar o vídeo) quando a intro sai. */
export const useIntroPhase = () => useContext(IntroContext);

/**
 * Fica no root layout, que não remonta em navegação client-side.
 * O estado vive só em memória — sem localStorage, sessionStorage ou cookie:
 *   • primeira visita, F5 e nova aba → app nova → intro aparece;
 *   • navegar entre rotas (inclusive voltar para a Home) → mesmo estado → não repete.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const phase: IntroPhase = introCompleted ? "done" : revealing ? "revealing" : "intro";

  // Trava a rolagem enquanto a intro cobre a página.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (introCompleted) {
      document.documentElement.style.overflow = "";
      lenis?.start();
      ScrollTrigger.refresh();
      return;
    }
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
  }, [introCompleted]);

  const onReveal = useCallback(() => setRevealing(true), []);
  const onDone = useCallback(() => setIntroCompleted(true), []);

  return (
    <IntroContext.Provider value={phase}>
      {children}
      {!introCompleted && <BrandIntro onReveal={onReveal} onDone={onDone} />}
    </IntroContext.Provider>
  );
}
