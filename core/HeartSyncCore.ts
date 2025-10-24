// core/HeartSyncCore.ts
// ❤️ LUMEN HEART SYNC CORE — unified heartbeat for UI (Background + SoundPulse)
// исправленный: корректно работает requestAnimationFrame + импорт playResonance

import { useEffect, useRef, useState } from "react";
import { playResonance } from "../client/utils/sound"; // <- путь: core -> ../client/utils/sound.ts

interface HeartSyncProps {
  tone: string;
  esi: number; // 0..100
  efv: {
    tone: string;
    engagement: number; // 0..1
  };
}

type ResonanceState = {
  frequency: number;
  amplitude: number;
  warmth: number;
  phase: string | number;
};

export default function useHeartSync({ tone, esi, efv }: HeartSyncProps) {
  const [resonance, setResonance] = useState<ResonanceState>({
    frequency: 1.0,
    amplitude: 0.3,
    warmth: 0.5,
    phase: "neutral",
  });

  const lastBeat = useRef<number>(performance.now());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    function loop(ts: number) {
      // compute a smooth heartbeat based on esi and efv.engagement
      const now = ts || performance.now();
      const dt = Math.max(0.001, (now - lastBeat.current) / 1000);
      lastBeat.current = now;

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
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [tone, esi, efv]);

  return resonance;
}
