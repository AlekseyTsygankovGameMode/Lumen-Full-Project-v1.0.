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
