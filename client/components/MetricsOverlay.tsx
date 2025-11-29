// client/components/MetricsOverlay.tsx
// 💫 LUMEN METRICS OVERLAY — живое свечение и дыхание интерфейса

import { useEffect, useRef } from "react";
import { getToneColor } from "../utils/toneColors";

interface MetricsOverlayProps {
  tone: string;
  esi: number;
}

/**
 * Фоновый световой слой, пульсирующий в зависимости от ESI и тона
 */
export default function MetricsOverlay({ tone, esi }: MetricsOverlayProps) {
  const toneColor = getToneColor(tone);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const intensity = Math.min(1, Math.max(0.2, esi / 100)); // 0.2–1
    ref.current.style.opacity = String(intensity);
    ref.current.animate(
      [
        { transform: "scale(1)", filter: "blur(40px)" },
        { transform: "scale(1.05)", filter: "blur(60px)" },
        { transform: "scale(1)", filter: "blur(40px)" },
      ],
      {
        duration: 4000 + (100 - esi) * 15,
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );
  }, [esi, tone]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none transition-all duration-700"
      style={{
        background: `radial-gradient(circle at 50% 60%, ${toneColor.glow}50, transparent 70%)`,
        mixBlendMode: "screen",
        opacity: 0.6,
        filter: "blur(50px)",
        zIndex: 0,
      }}
    />
  );
}
