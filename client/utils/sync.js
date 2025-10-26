// /client/utils/sync.js

import { detectUFV } from "./ufv.js";
import { computeHarmony, playHarmonicTone } from "./harmonic.js";
import { updateSynesthesia } from "./synesthesia.js";

export function syncHarmonic(efv = { engagement: 0.7, tone: "neutral", esi: 70 }) {
  try {
    const ufv = detectUFV?.() ?? { engagement: 0.7, tone: "neutral" };
    const { resonance, tempo } = computeHarmony(efv, ufv);

    // 🌈 визуальный и звуковой слой
    document.documentElement.style.setProperty("--lumen-pulse", `${tempo}s`);
    document.documentElement.style.setProperty("--lumen-resonance", resonance);

    playHarmonicTone?.(efv, ufv, resonance);
    updateSynesthesia?.({ ...efv, resonance });

    // 📊 обновляем индикатор на UI
    const meter = document.getElementById("align-val");
    if (meter) meter.textContent = resonance.toFixed(2);
  } catch (err) {
    console.warn("Sync harmonic error:", err);
  }
}