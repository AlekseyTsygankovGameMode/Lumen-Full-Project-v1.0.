// 🌠 LUMEN METRICS v3.3 — Resonance-Weighted Emotional Sync Index
// by Aleksey & bro ⚡
// Новая версия: учитывает EFV вектор (engagement + focus + vitality + stability)
// и вычисляет не просто "индекс", а эмоциональный резонанс в диапазоне 0..100.

import { EFV } from "./efv";

/**
 * Расчёт полного эмоционального индекса синхронизации (ESI)
 * Теперь учитывает баланс, стабильность и когерентность эмоции.
 */
export function calculateESI(input: number | EFV): number {
  let engagement = 0.7;
  let focus = 0.7;
  let vitality = 0.7;
  let stability = 0.7;

  if (typeof input === "number") {
    engagement = input;
  } else {
    engagement = input.engagement;
    focus = input.focus;
    vitality = input.vitality;
    stability = input.stability ?? 0.7;
  }

  // 🧮 Весовые коэффициенты (влияние аспектов эмоции)
  const wEngage = 0.45;
  const wFocus = 0.25;
  const wVitality = 0.2;
  const wStability = 0.1;

  // Рассчитываем взвешенную эмоц. силу
  const normalized =
    engagement * wEngage +
    focus * wFocus +
    vitality * wVitality +
    stability * wStability;

  // Преобразуем в шкалу 0–100
  const BASELINE = 70;
  const SCALE = 100;
  const NEUTRAL = 0.7;

  const raw = BASELINE + (normalized - NEUTRAL) * SCALE;

  // Ограничиваем и округляем
  return Math.max(0, Math.min(100, Math.round(raw)));
}

/**
 * 💫 Вычисляет ESI дельту (направление изменения)
 */
export function compareESI(prev: number, next: number): "rising" | "falling" | "stable" {
  const delta = next - prev;
  if (delta > 3) return "rising";
  if (delta < -3) return "falling";
  return "stable";
}

/**
 * 🧠 Генерирует описание для reasoning trace
 */
export function describeESIChange(prev: number, next: number): string {
  const trend = compareESI(prev, next);
  switch (trend) {
    case "rising":
      return `ESI increased → emotional synchronization strengthening.`;
    case "falling":
      return `ESI dropped → emotional alignment weakening, softening tone.`;
    default:
      return `ESI stable → maintaining current resonance.`;
  }
}