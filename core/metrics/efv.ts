// /core/metrics/efv.ts

export type ToneType = "calm" | "empathetic" | "curious" | "assertive" | "neutral";

export interface EFV {
  tone: ToneType;
  engagement: number; // 0.0 - 1.0
}

export const TONE_CONFIG: Record<ToneType, EFV> = {
  calm:       { tone: "calm",       engagement: 0.65 },
  empathetic: { tone: "empathetic", engagement: 0.75 },
  curious:    { tone: "curious",    engagement: 0.80 },
  assertive:  { tone: "assertive",  engagement: 0.85 },
  neutral:    { tone: "neutral",    engagement: 0.70 },
} as const;

export function toneToEFV(tone: string): EFV {
  const key = (tone in TONE_CONFIG ? tone : "neutral") as ToneType;
  return TONE_CONFIG[key];
}