// 🌠 LUMEN BACKGROUND — Breathing Cosmos + Emotional Synchronization
// объединяет живой фон и эмоциональную адаптацию через tone / resonance / esi

import { useEffect, useState } from "react";
import { getToneColor } from "../utils/toneColors";

interface BackgroundProps {
  tone: string;
  resonance: {
    frequency: number;
    amplitude: number;
    warmth: number;
    phase: string;
  };
  esi: number;
}

export default function Background({ tone, resonance, esi }: BackgroundProps) {
  const [phase, setPhase] = useState(0);
  const toneColor = getToneColor(tone);

  // плавное дыхание
  useEffect(() => {
    const interval = setInterval(() => setPhase((p) => (p + 1) % 360), 80);
    return () => clearInterval(interval);
  }, []);

  const pulse = Math.sin(phase / (10 / resonance.frequency)) * resonance.amplitude;
  const brightness = 1 + resonance.warmth * 0.2;
  const blur = 80 + resonance.amplitude * 60;

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* 🌌 Главный дыхательный градиент */}
      <div
        className="absolute inset-0 transition-all duration-[3000ms] ease-[cubic-bezier(0.45,0.05,0.55,0.95)]"
        style={{
          background: `
            radial-gradient(
              circle at ${45 + Math.sin(phase / 25) * 25}% ${55 + Math.cos(phase / 30) * 15}%,
              ${toneColor.glow}${Math.round(40 + resonance.amplitude * 40)}%,
              ${toneColor.border}${Math.round(20 + esi / 6)}%,
              hsl(${phase}, 70%, ${35 + resonance.warmth * 20}%)
            )
          `,
          filter: `blur(${blur}px) brightness(${brightness}) saturate(1.2)`,
        }}
      />

      {/* ✨ Плавающие частицы света */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => {
          const delay = i * 300;
          const size = 1.2 + Math.random() * 2.5;
          const duration = 10000 + Math.random() * 7000;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-white/70 to-transparent"
              style={{
                width: `${size}rem`,
                height: `${size}rem`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.4,
                animation: `floatParticle ${duration}ms ease-in-out ${delay}ms infinite alternate`,
              }}
            />
          );
        })}
      </div>

      {/* 🌫 Лёгкая дымка */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 mix-blend-overlay" />
    </div>
  );
}
