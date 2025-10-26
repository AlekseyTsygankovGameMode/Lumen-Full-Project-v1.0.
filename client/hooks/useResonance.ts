<<<<<<< HEAD
// 🌌 useResonanceSync v4.0 — Unified Heartfield Loop
// by Aleksey & bro ⚡
// Полная синхронизация интерфейса (UI) с ядром HeartSyncCore.
// Управляет дыханием, когерентностью и эмоциональной теплотой в реальном времени.
// Работает через requestAnimationFrame — одно биение, одно дыхание.

import { useEffect, useState } from "react";
import useHeartSync, { ResonanceState } from "../../core/HeartSyncCore";
import { ToneType, useEFV } from "./useEFV";

export interface ResonanceSyncState extends ResonanceState {
  uiPhase: number; // внутренний угол дыхания интерфейса (для анимаций)
  luminosity: number; // визуальная яркость свечения
  moodColor: string; // текущий оттенок (для динамической подсветки UI)
}

export function useResonanceSync(tone: ToneType, esi: number) {
  const efv = useEFV(tone);
  const heart = useHeartSync({
    tone,
    esi,
    efv: { tone, engagement: efv.engagement },
  });

  const [sync, setSync] = useState<ResonanceSyncState>({
    ...heart,
    uiPhase: 0,
    luminosity: 1,
    moodColor: "rgba(200,180,255,0.4)",
  });

  useEffect(() => {
    let phase = 0;
    let frame = 0;

    const loop = () => {
      frame++;
      phase += heart.frequency * 0.015;
      if (phase > Math.PI * 2) phase -= Math.PI * 2;

      // 💫 UI "дышит" с тем же ритмом, что и HeartSyncCore
      const luminosity =
        0.85 + Math.sin(phase) * 0.15 + heart.coherence * 0.1;

      // 🎨 цветовая модуляция — от тона
      const hueBase =
        tone === "warm"
          ? 290
          : tone === "empathetic"
          ? 320
          : tone === "curious"
          ? 260
          : tone === "calm"
          ? 230
          : 250;

      const hueShift = hueBase + heart.coherence * 20;
      const moodColor = `hsl(${hueShift}, 80%, ${60 + heart.warmth * 20}%)`;

      // 🧩 обновляем единый state
      setSync({
        ...heart,
        uiPhase: phase,
        luminosity: parseFloat(luminosity.toFixed(3)),
        moodColor,
      });

      // 🔁 поддерживаем плавный цикл
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [tone, esi, heart]);

  return sync;
}
=======
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
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
