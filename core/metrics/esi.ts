// /core/metrics/esi.ts

/**
 * Emotional Sync Index: нормируем engagement (0..1) в шкалу 0..100
 */
export function calculateESI(engagement: number): number {
  const BASELINE = 70;
  const NEUTRAL  = 0.7;
  const SENS     = 100;

  const raw = BASELINE + (engagement - NEUTRAL) * SENS;
  return Math.max(0, Math.min(100, Math.round(raw)));
}