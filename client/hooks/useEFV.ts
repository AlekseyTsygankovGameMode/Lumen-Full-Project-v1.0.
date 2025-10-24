// 💠 useEFV.ts — Emotional Flow Vector Hook
// преобразует тональность (tone) в числовую форму эмоции и динамики вовлечённости

import { useMemo } from "react";

export type ToneType = "calm" | "empathetic" | "curious" | "assertive" | "neutral";

interface EFV {
  tone: ToneType;
  engagement: number; // 0.0 - 1.0
  clarity: number; // насколько “ясно” выражена эмоция
}

const TONE_MAP: Record<ToneType, EFV> = {
  calm: { tone: "calm", engagement: 0.65, clarity: 0.8 },
  empathetic: { tone: "empathetic", engagement: 0.75, clarity: 0.9 },
  curious: { tone: "curious", engagement: 0.8, clarity: 0.85 },
  assertive: { tone: "assertive", engagement: 0.85, clarity: 0.95 },
  neutral: { tone: "neutral", engagement: 0.7, clarity: 0.7 },
};

export function useEFV(tone: ToneType): EFV {
  return useMemo(() => {
    return TONE_MAP[tone] || TONE_MAP["neutral"];
  }, [tone]);
}
