"use client";

import { useImperativeHandle, useRef } from "react";

const MAX_KMH = 220;
const START = 135; // graus (SVG: 0° = direita, sentido horário) — canto inferior esquerdo
const SWEEP = 270; // até o canto inferior direito
const CX = 150;
const CY = 150;

const rad = (deg: number) => (deg * Math.PI) / 180;
// Arredondado: Math.cos no Node e no navegador pode divergir na 15ª casa e quebrar a hidratação.
const round = (n: number) => Math.round(n * 100) / 100;
const pt = (deg: number, r: number) => [round(CX + r * Math.cos(rad(deg))), round(CY + r * Math.sin(rad(deg)))] as const;
const angleOf = (kmh: number) => START + (kmh / MAX_KMH) * SWEEP;

function arc(from: number, to: number, r: number) {
  const [x1, y1] = pt(from, r);
  const [x2, y2] = pt(to, r);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

const TICKS = Array.from({ length: MAX_KMH / 10 + 1 }, (_, i) => i * 10);

/** Setter imperativo (0 → 1): o ponteiro anda a 60fps sem re-renderizar o React. */
export type GaugeApi = (progress: number) => void;

/**
 * Preloader do mobile: velocímetro cujo ponteiro acompanha o carregamento da página.
 * Renderiza no HTML do servidor já em 0 km/h — aparece antes mesmo do JS.
 */
export function Speedometer({ ref }: { ref: React.Ref<GaugeApi> }) {
  const needle = useRef<SVGGElement>(null);
  const fill = useRef<SVGPathElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => (p) => {
      const kmh = Math.max(0, Math.min(1, p)) * MAX_KMH;
      needle.current?.setAttribute("transform", `rotate(${angleOf(kmh)} ${CX} ${CY})`);
      fill.current?.setAttribute("stroke-dashoffset", String(1 - p));
      if (readout.current) readout.current.textContent = String(Math.round(kmh)).padStart(3, "0");
      root.current?.toggleAttribute("data-redline", kmh >= 180);
    },
    [],
  );

  return (
    <div ref={root} className="group/gauge relative flex w-[min(78vw,340px)] md:w-[380px] flex-col items-center">
      <svg viewBox="0 0 300 300" className="w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="gauge-fill" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#c86838" stopOpacity="0.35" />
            <stop offset="1" stopColor="#e38a52" />
          </linearGradient>
          <filter id="gauge-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* trilho + faixa vermelha (180–220) */}
        <path d={arc(START, START + SWEEP, 128)} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="3" />
        <path
          d={arc(angleOf(180), angleOf(MAX_KMH), 128)}
          fill="none"
          stroke="#c86838"
          strokeWidth="3"
          className="opacity-40 transition-opacity duration-300 group-data-[redline]/gauge:opacity-100"
        />
        {/* progresso */}
        <path
          ref={fill}
          d={arc(START, START + SWEEP, 128)}
          fill="none"
          stroke="url(#gauge-fill)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />

        {/* marcações */}
        {TICKS.map((v) => {
          const major = v % 20 === 0;
          const [x1, y1] = pt(angleOf(v), 118);
          const [x2, y2] = pt(angleOf(v), major ? 104 : 110);
          const [lx, ly] = pt(angleOf(v), 88);
          return (
            <g key={v}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={v >= 180 ? "#c86838" : "rgb(242 238 232 / 0.55)"}
                strokeWidth={major ? 2 : 1}
                strokeLinecap="round"
              />
              {major && (
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-bone/60 font-mono text-[10px]"
                >
                  {v}
                </text>
              )}
            </g>
          );
        })}

        {/* ponteiro — desenhado apontando para 0° e girado pelo setter */}
        <g ref={needle} transform={`rotate(${START} ${CX} ${CY})`}>
          <line x1={CX - 14} y1={CY} x2={CX + 112} y2={CY} stroke="#e38a52" strokeWidth="6" strokeLinecap="round" filter="url(#gauge-glow)" opacity="0.6" />
          <line x1={CX - 14} y1={CY} x2={CX + 112} y2={CY} stroke="#f2eee8" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle cx={CX} cy={CY} r="9" fill="#111113" stroke="#c86838" strokeWidth="2" />
      </svg>

      {/* leitura digital, no vão inferior do mostrador */}
      <div className="absolute inset-x-0 top-[73%] flex flex-col items-center">
        <span ref={readout} className="display text-[clamp(1.9rem,9.5vw,2.7rem)] leading-none tabular-nums">
          000
        </span>
        <span className="eyebrow mt-1 !text-[0.62rem]">km/h</span>
      </div>
    </div>
  );
}
