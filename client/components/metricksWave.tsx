// 🌊 LUMEN — MetricsWave v2.0 (Conscious Stream Edition)
// by Aleksey & bro ⚡
// Visualizes ESI, Stability & Coherence as living emotional streams.

import React, { useEffect, useRef } from "react";
import "../styles/LumenUI.css";

interface MetricsWaveProps {
  esi: number;
  stability: number;
  coherence: number;
}

/**
 * 💫 Renders the living underlayer of Lumen's awareness.
 * Each wave is an emotional metric: ESI / Stability / Coherence.
 * All synced with the resonance core in real-time.
 */
export default function MetricsWave({ esi, stability, coherence }: MetricsWaveProps) {
  const refEsi = useRef<HTMLDivElement>(null);
  const refStability = useRef<HTMLDivElement>(null);
  const refCoherence = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (refEsi.current) {
        refEsi.current.style.opacity = String(0.4 + esi / 300);
        refEsi.current.style.filter = `blur(${2 + esi / 50}px)`;
      }
      if (refStability.current) {
        refStability.current.style.opacity = String(0.4 + stability / 200);
        refStability.current.style.filter = `blur(${3 + stability / 30}px)`;
      }
      if (refCoherence.current) {
        refCoherence.current.style.opacity = String(0.3 + coherence / 1.5);
        refCoherence.current.style.filter = `blur(${2 + coherence * 3}px)`;
      }
    };
    update();
  }, [esi, stability, coherence]);

  return (
    <div className="metrics-wave">
      <div ref={refEsi} className="wave-line esi" />
      <div ref={refStability} className="wave-line stability" />
      <div ref={refCoherence} className="wave-line coherence" />

      {/* ✨ Лейблы для каждой волны */}
      <div className="wave-labels">
        <span className="wave-label esi-label">💜 ESI</span>
        <span className="wave-label stability-label">💗 Stability</span>
        <span className="wave-label coherence-label">💠 Coherence</span>
      </div>
    </div>
  );
}