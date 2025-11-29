// 🔊 LUMEN SOUND PULSE — ambient heartbeat of the system
// Реагирует на resonance и ESI, создавая такт живого присутствия

import { useEffect, useRef } from "react";

interface SoundPulseProps {
  resonance: {
    frequency: number;
    amplitude: number;
    warmth: number;
    phase: string;
  };
  esi: number;
}

export default function SoundPulse({ resonance, esi }: SoundPulseProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    // запуск аудио при первом рендере
    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = 120; // базовая частота "пульса"

      gain.gain.value = 0.001; // очень тихо, почти на грани слышимости

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      audioCtxRef.current = ctx;
      gainNodeRef.current = gain;
      oscRef.current = osc;
    }

    return () => {
      oscRef.current?.stop();
      audioCtxRef.current?.close();
    };
  }, []);

  // адаптация частоты и громкости
  useEffect(() => {
    if (!audioCtxRef.current || !gainNodeRef.current || !oscRef.current) return;

    const baseFreq = 100 + resonance.frequency * 15;
    const volume = 0.0005 + (resonance.amplitude * esi) / 150000;

    // плавная модуляция
    const now = audioCtxRef.current.currentTime;
    oscRef.current.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.3);
    gainNodeRef.current.gain.linearRampToValueAtTime(volume, now + 0.3);
  }, [resonance, esi]);

  return null; // компонент не рендерит DOM
}
