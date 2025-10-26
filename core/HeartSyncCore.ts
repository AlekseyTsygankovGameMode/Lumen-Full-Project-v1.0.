<<<<<<< HEAD
// ❤️ LUMEN HEART SYNC CORE v3.6 — Bioadaptive Resonance Pulse + Live Debug
// by Aleksey & bro ⚡
// Управляет сердечным ритмом Lumen: частота, тепло, когерентность и звуковые пульсы.
// Эмоционально-чувствительный feedback-loop с ESI + EFV синхронизацией + терминальный лог.

import { useEffect, useRef, useState } from "react";
import { playResonance } from "../client/utils/sound"; // путь проверен
=======
// core/HeartSyncCore.ts
// ❤️ LUMEN HEART SYNC CORE — unified heartbeat for UI (Background + SoundPulse)
// исправленный: корректно работает requestAnimationFrame + импорт playResonance

import { useEffect, useRef, useState } from "react";
import { playResonance } from "../client/utils/sound"; // <- путь: core -> ../client/utils/sound.ts
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a

interface HeartSyncProps {
  tone: string;
  esi: number; // 0..100
  efv: {
    tone: string;
    engagement: number; // 0..1
  };
}

<<<<<<< HEAD
export type ResonanceState = {
  frequency: number;   // частота биений
  amplitude: number;   // интенсивность
  warmth: number;      // эмоциональная теплота
  coherence: number;   // когерентность между EFV и ESI
  phase: string;       // текущий эмоциональный такт
=======
type ResonanceState = {
  frequency: number;
  amplitude: number;
  warmth: number;
  phase: string | number;
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
};

export default function useHeartSync({ tone, esi, efv }: HeartSyncProps) {
  const [resonance, setResonance] = useState<ResonanceState>({
<<<<<<< HEAD
    frequency: 1.2,
    amplitude: 0.25,
    warmth: 0.6,
    coherence: 0.5,
=======
    frequency: 1.0,
    amplitude: 0.3,
    warmth: 0.5,
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
    phase: "neutral",
  });

  const lastBeat = useRef<number>(performance.now());
  const rafId = useRef<number | null>(null);
<<<<<<< HEAD
  const debugTimer = useRef<number>(0);

  useEffect(() => {
    let beatPhase = 0;

    function loop(ts: number) {
=======

  useEffect(() => {
    function loop(ts: number) {
      // compute a smooth heartbeat based on esi and efv.engagement
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
      const now = ts || performance.now();
      const dt = Math.max(0.001, (now - lastBeat.current) / 1000);
      lastBeat.current = now;

<<<<<<< HEAD
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

=======
      // amplitude vary with engagement & esi
      const engagement = Math.max(0, Math.min(1, efv?.engagement ?? 0.7));
      const normalizedESI = Math.max(0, Math.min(100, esi ?? 70)) / 100;

      const freq = 0.8 + engagement * 1.6; // ~0.8 .. 2.4 Hz
      const amp = 0.12 + engagement * 0.6; // feel scale
      const warmth = 0.3 + normalizedESI * 0.6;

      // update resonance
      setResonance(() => ({
        frequency: freq,
        amplitude: amp,
        warmth,
        phase: tone,
      }));

      // periodically emit a sound pulse (lightweight, not every frame)
      // e.g. play pulse when amplitude crosses threshold (simple randomization)
      if (Math.random() < 0.02 + engagement * 0.05) {
        // best-effort: non-blocking sound
        try {
          playResonance({ efv, esi });
        } catch (e) {
          // ignore
        }
      }

      // schedule next frame and store id
      rafId.current = requestAnimationFrame(loop);
    }

    // start loop and keep id
    rafId.current = requestAnimationFrame(loop);

    // cleanup must cancel with the numeric id
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [tone, esi, efv]);

  return resonance;
<<<<<<< HEAD
}
=======
}
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
