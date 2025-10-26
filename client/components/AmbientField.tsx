// 🌌 LUMEN AMBIENT FIELD — Reactive Conscious Field v9.5
// Background fog that breathes with EFV (emotional flow value).
// Feels like the system itself is alive.

import React, { useEffect, useState } from "react";
import { getToneColor } from "../utils/emotionColor";

interface EFVEvent {
  tone?: string;
  engagement?: number;
  esi?: number;
}

export default function AmbientField() {
  const [phase, setPhase] = useState(0);
  const [tone, setTone] = useState("neutral");
  const [intensity, setIntensity] = useState(1); // скорость дыхания

  // слушаем внутренние EFV события
  useEffect(() => {
    const listener = (e: CustomEvent<EFVEvent>) => {
      if (e.detail?.tone) setTone(e.detail.tone);
      if (e.detail?.engagement) {
        // чем выше engagement, тем быстрее дышит фон
        const newIntensity = 0.8 + Math.min(e.detail.engagement, 1) * 1.2;
        setIntensity(newIntensity);
      }
    };
    window.addEventListener("lumen-feedback", listener as EventListener);
    return () => window.removeEventListener("lumen-feedback", listener as EventListener);
  }, []);

  const toneColor = getToneColor(tone);

  // плавное дыхание фона
  useEffect(() => {
    const id = setInterval(
      () => setPhase((p) => (p + intensity * 1.2) % 360),
      60
    );
    return () => clearInterval(id);
  }, [intensity]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        background: `
          radial-gradient(
            circle at ${40 + Math.sin(phase / 18) * 20}% ${50 + Math.cos(phase / 25) * 25}%,
            ${toneColor.glow}15,
            transparent 80%
          ),
          radial-gradient(
            circle at ${60 + Math.cos(phase / 20) * 25}% ${40 + Math.sin(phase / 22) * 30}%,
            ${toneColor.shadow}20,
            transparent 85%
          )
        `,
        filter: `blur(${90 + intensity * 10}px) saturate(${1 + intensity * 0.3})`,
        opacity: 0.6 + (intensity - 1) * 0.1,
        transition: "background 1s ease, filter 1s ease, opacity 0.8s ease",
      }}
    />
  );
}