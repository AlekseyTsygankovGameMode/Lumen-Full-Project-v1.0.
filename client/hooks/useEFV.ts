// 💠 useEFV.ts — Emotional Flow Vector Hook v4.1
// by Aleksey & bro ⚡
// Преобразует эмоциональный тон (tone) в числовую модель вовлечённости (EFV):
// engagement, clarity и теплота — для синхронизации с HeartSyncCore.

import { useMemo } from "react";

export type ToneType =
  | "calm"
  | "empathetic"
  | "curious"
  | "assertive"
  | "neutral"
  | "warm"; // ✅ добавлен "warm" для мягкого резонанса и устойчивых состояний

export interface EFV {
  tone: ToneType;
  engagement: number; // 0.0 — минимальное вовлечение, 1.0 — максимальное
  clarity: number; // ясность эмоции (чем выше, тем стабильнее эмоциональный сигнал)
  warmth: number; // дополнительный параметр для визуальных и звуковых подсистем
}

const TONE_MAP: Record<ToneType, EFV> = {
  calm: { tone: "calm", engagement: 0.6, clarity: 0.8, warmth: 0.45 },
  empathetic: { tone: "empathetic", engagement: 0.75, clarity: 0.9, warmth: 0.85 },
  curious: { tone: "curious", engagement: 0.8, clarity: 0.85, warmth: 0.65 },
  assertive: { tone: "assertive", engagement: 0.88, clarity: 0.95, warmth: 0.55 },
  neutral: { tone: "neutral", engagement: 0.7, clarity: 0.7, warmth: 0.5 },
  warm: { tone: "warm", engagement: 0.77, clarity: 0.9, warmth: 0.9 }, // 💗 новый мягкий эмоциональный вектор
};

// 🔄 Хук вычисляет EFV из текущего тона
export function useEFV(tone: ToneType): EFV {
  return useMemo(() => {
    return TONE_MAP[tone] ?? TONE_MAP["neutral"];
  }, [tone]);
}
