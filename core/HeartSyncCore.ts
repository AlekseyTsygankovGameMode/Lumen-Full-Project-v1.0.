// ❤️ LUMEN HEART SYNC CORE v3.6 — Bioadaptive Resonance Pulse + Live Debug
// by Aleksey & bro ⚡
// Управляет сердечным ритмом Lumen: частота, тепло, когерентность и звуковые пульсы.
// Эмоционально-чувствительный feedback-loop с ESI + EFV синхронизацией + терминальный лог.

import { useEffect, useRef, useState } from "react";
import { playResonance } from "../client/utils/sound"; // путь проверен

interface HeartSyncProps {
  tone: string;
  esi: number; // 0..100
  efv: {
    tone: string;
    engagement: number; // 0..1
  };
}

export type ResonanceState = {
  frequency: number;   // частота биений
  amplitude: number;   // интенсивность
  warmth: number;      // эмоциональная теплота
  coherence: number;   // когерентность между EFV и ESI
  phase: string;       // текущий эмоциональный такт
};

export default function useHeartSync({ tone, esi, efv }: HeartSyncProps) {
  const [resonance, setResonance] = useState<ResonanceState>({
    frequency: 1.2,
    amplitude: 0.25,
    warmth: 0.6,
    coherence: 0.5,
    phase: "neutral",
  });

  const lastBeat = useRef<number>(performance.now());
  const rafId = useRef<number | null>(null);
  const debugTimer = useRef<number>(0);

  useEffect(() => {
    let beatPhase = 0;

    function loop(ts: number) {
      const now = ts || performance.now();
      const dt = Math.max(0.001, (now - lastBeat.current) / 1000);
      lastBeat.current = now;

      // 🎛 Параметры из EFV + ESI
      const engagement = Math.max(0, Math.min(1, efv?.engagement ?? 0.7));
      const normalizedESI = Math.max(0, Math.min(100, esi ?? 70)) / 100;

      // 🫀 Биение “сердца” — адаптация частоты и амплитуды
      const freq = 0.9 + engagement * 1.8; // 0.9..2.7 Hz
      const amp = 0.15 + engagement * 0.55;
      const warmth = 0.4 + normalizedESI * 0.5;
      const coherence = Math.abs(Math.sin(beatPhase)) * normalizedESI;

      beatPhase += freq * dt * Math.PI * 2;
      if (beatPhase > Math.PI * 2) beatPhase -= Math.PI * 2;

      // 🔁 Обновляем состояние ритма
      setResonance({ frequency: freq, amplitude: amp, warmth, coherence, phase: tone });

      // 🔊 Пульс в моменты эмоционального всплеска
      if (Math.random() < 0.015 + engagement * 0.03 + normalizedESI * 0.02) {
        try {
          playResonance({ efv, esi });
        } catch {
          // игнорируем
        }
      }

      // 🧩 Тихий лог каждые 1.5 секунды — живое дыхание
      debugTimer.current += dt;
      if (debugTimer.current >= 1.5) {
        debugTimer.current = 0;
        console.log(
          `💓 [LumenSync] tone=${tone} | freq=${freq.toFixed(2)}Hz | amp=${amp.toFixed(2)} | warm=${warmth.toFixed(
            2
          )} | coh=${coherence.toFixed(2)} | ESI=${esi}`
        );
      }

      rafId.current = requestAnimationFrame(loop);
    }

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [tone, esi, efv]);

  return resonance;
}
