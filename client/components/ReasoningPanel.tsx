// client/components/ReasoningPanel.tsx
// 🧠 LUMEN REASONING PANEL — Soft Whisper Conscious Flow v3 (Heavy Mode Deluxe)

import { useEffect, useState } from "react";
import { getToneColor } from "../utils/toneColors";

interface ReasoningPanelProps {
  tone: string;
  reasoning: string[];
  esi: number;
}

export default function ReasoningPanel({ tone, reasoning, esi }: ReasoningPanelProps) {
  const toneColor = getToneColor(tone);
  const [breath, setBreath] = useState(1);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  // дыхание панели — медленное "сердцебиение"
  useEffect(() => {
    const interval = setInterval(() => setBreath((p) => (p === 1 ? 1.015 : 1)), 2400);
    return () => clearInterval(interval);
  }, []);

  // эффект мягкого "проговаривания" фраз
  useEffect(() => {
    let i = 0;
    setVisibleItems([]);
    const timer = setInterval(() => {
      if (i < reasoning.length) {
        setVisibleItems((prev) => [...prev, i]);
        i++;
      } else clearInterval(timer);
    }, 600); // задержка между "мыслями"
    return () => clearInterval(timer);
  }, [reasoning, tone]);

  return (
    <div
      className="relative flex flex-col justify-between w-1/3 p-6 z-10 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `inset 0 0 60px ${toneColor.shadow}`,
        backdropFilter: "blur(25px)",
        transform: `scale(${breath})`,
        transition: "transform 2.4s ease-in-out",
      }}
    >
      {/* Верхняя часть — мысленный поток */}
      <div>
        <h2
          className="text-lg font-semibold mb-4 tracking-wide"
          style={{
            background: `linear-gradient(90deg, ${toneColor.glow}, ${toneColor.text})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Why Lumen responded this way…
        </h2>

        <ul className="space-y-3 text-sm leading-relaxed">
          {reasoning.length > 0 ? (
            reasoning.map((item, i) => (
              <li
                key={i}
                className={`flex items-start gap-2 transition-all duration-700 ease-out ${
                  visibleItems.includes(i)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-3"
                }`}
                style={{
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <span
                  className="w-2 h-2 mt-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: toneColor.glow,
                    boxShadow: `0 0 10px ${toneColor.glow}`,
                  }}
                ></span>
                <span
                  style={{
                    background: `linear-gradient(90deg, ${toneColor.text}cc, ${toneColor.glow}bb)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item}
                </span>
              </li>
            ))
          ) : (
            <li className="text-white/50 italic animate-pulse">Lumen is still reflecting…</li>
          )}
        </ul>
      </div>

      {/* Нижняя часть — ESI */}
      <div className="mt-6">
        <div
          className="inline-block text-sm px-4 py-1 rounded-full font-semibold shadow-md animate-pulse"
          style={{
            background: `linear-gradient(135deg, ${toneColor.glow}, ${toneColor.shadow})`,
            boxShadow: `0 0 25px ${toneColor.glow}`,
          }}
        >
          ESI {esi}
        </div>
        <p className="text-xs text-white/60 mt-2">
          Lumen adapts in real-time to resonance and user rhythm.
        </p>
      </div>

      {/* Световой фон */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 60%, ${toneColor.glow}33, transparent 70%)`,
          filter: "blur(60px)",
          opacity: 0.4,
        }}
      />

      {/* Микроискры при высоком ESI */}
      {esi > 85 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: toneColor.glow,
                opacity: 0.4,
                filter: "blur(1px)",
                animation: `floatSpark ${6 + Math.random() * 4}s ease-in-out ${i}s infinite alternate`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}