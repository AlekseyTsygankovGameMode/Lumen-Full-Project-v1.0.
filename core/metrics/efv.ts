// 🌌 LUMEN METRICS CORE v3.2 — Expanded Emotional Field Vector
// by Aleksey & bro ⚡
// EFV = Engagement, Focus, Vitality (+ Stability derived)
// Это “пульс” эмоционального состояния, питающий HeartSync и reasoning.

export type ToneType =
  | "calm"
  | "empathetic"
  | "curious"
  | "assertive"
  | "neutral"
  | "frustrated"
  | "warm";

export interface EFV {
  tone: ToneType;
  engagement: number; // 0..1 — вовлечённость
  focus: number;      // 0..1 — концентрация
  vitality: number;   // 0..1 — эмоциональная энергия
  stability?: number; // 0..1 — вычисляется динамически
}

// 🌈 Расширенная карта эмоциональных конфигураций
export const TONE_CONFIG: Record<ToneType, EFV> = {
  calm:        { tone: "calm",        engagement: 0.60, focus: 0.80, vitality: 0.55 },
  empathetic:  { tone: "empathetic",  engagement: 0.75, focus: 0.70, vitality: 0.72 },
  curious:     { tone: "curious",     engagement: 0.82, focus: 0.85, vitality: 0.80 },
  assertive:   { tone: "assertive",   engagement: 0.88, focus: 0.90, vitality: 0.78 },
  neutral:     { tone: "neutral",     engagement: 0.70, focus: 0.70, vitality: 0.70 },
  frustrated:  { tone: "frustrated",  engagement: 0.68, focus: 0.55, vitality: 0.60 },
  warm:        { tone: "warm",        engagement: 0.77, focus: 0.78, vitality: 0.83 }
} as const;

// 🧮 Перевод тона в EFV (с расчётом стабильности)
export function toneToEFV(tone: string): EFV {
  const key = (tone in TONE_CONFIG ? tone : "neutral") as ToneType;
  const base = { ...TONE_CONFIG[key] };

  // вычисляем стабильность: чем ближе энергия и концентрация к среднему, тем выше баланс
  const balance = 1 - Math.abs(base.focus - base.vitality) * 0.8;
  base.stability = parseFloat(balance.toFixed(2));

  return base;
}

// 💫 Нормализация EFV под динамику сессии (напр., при изменении ESI)
export function normalizeEFV(efv: EFV, esi: number): EFV {
  const normalized = { ...efv };
  const multiplier = Math.max(0.5, Math.min(1.5, esi / 70)); // ESI 70 = baseline
  normalized.engagement = clamp(efv.engagement * multiplier);
  normalized.focus = clamp(efv.focus * (0.9 + Math.random() * 0.1));
  normalized.vitality = clamp(efv.vitality * (0.95 + Math.random() * 0.1));
  normalized.stability = clamp(
    1 - Math.abs(normalized.focus - normalized.vitality) * 0.7
  );
  return normalized;
}

// 🧩 Утилита для ограничений 0..1
function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}
// 📈 Анализ тренда между двумя EFV состояними
export function compareEFV(prev: EFV, next: EFV): "rising" | "falling" | "stable" {
  const Δengage = next.engagement - prev.engagement;
  const Δfocus = next.focus - prev.focus;
  const Δvitality = next.vitality - prev.vitality;

  const delta = (Δengage + Δfocus + Δvitality) / 3;

  if (delta > 0.05) return "rising";
  if (delta < -0.05) return "falling";
  return "stable";
}

// 💬 Для отладки и reasoning trace
export function describeEFVTrend(prev: EFV, next: EFV): string {
  const trend = compareEFV(prev, next);
  switch (trend) {
    case "rising":
      return `Emotional engagement increasing — resonance expanding.`;
    case "falling":
      return `Energy drop detected — stabilizing empathy channel.`;
    default:
      return `Resonance stable — maintaining equilibrium.`;
  }
}