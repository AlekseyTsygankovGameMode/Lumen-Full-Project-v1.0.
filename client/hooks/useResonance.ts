// 🌌 useResonance.ts — Emotional Resonance Hook
// связывает EFV (эмоциональный вектор) с визуальной частотой интерфейса
// управляет дыханием, интенсивностью и цветовой температурой света

import { useEffect, useState } from "react";
import { ToneType, useEFV } from "./useEFV";

interface ResonanceState {
  frequency: number;   // частота колебаний UI (1.0 = спокойствие, >1.3 = интенсивность)
  amplitude: number;   // сила свечения
  warmth: number;      // цветовая температура: 0 = холодно, 1 = тепло
  phase: string;       // текущая фаза эмоционального дыхания
}

export function useResonance(tone: ToneType, esi: number) {
  const efv = useEFV(tone);
  const [resonance, setResonance] = useState<ResonanceState>({
    frequency: 1.0,
    amplitude: 0.5,
    warmth: 0.5,
    phase: "steady",
  });

  useEffect(() => {
    // 🔹 базовая частота: чем выше engagement — тем быстрее "дыхание"
    const frequency = 0.8 + efv.engagement * 0.6 + esi / 300;

    // 🔹 амплитуда свечения: завязана на ясность эмоции
    const amplitude = 0.3 + efv.clarity * 0.6 + Math.sin(esi / 10) * 0.05;

    // 🔹 теплоту регулируем по тону
    const toneWarmthMap: Record<ToneType, number> = {
      calm: 0.4,
      empathetic: 0.8,
      curious: 0.7,
      assertive: 0.9,
      neutral: 0.5,
    };
    const warmth = toneWarmthMap[tone] ?? 0.5;

    // 🔹 выбираем фазу дыхания
    const phase =
      esi > 90
        ? "peak"
        : esi > 75
        ? "flow"
        : esi > 60
        ? "steady"
        : "recovery";

    setResonance({
      frequency: parseFloat(frequency.toFixed(2)),
      amplitude: parseFloat(amplitude.toFixed(2)),
      warmth: parseFloat(warmth.toFixed(2)),
      phase,
    });
  }, [tone, esi, efv]);

  return resonance;
}
