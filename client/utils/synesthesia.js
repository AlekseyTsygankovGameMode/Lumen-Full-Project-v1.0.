// /client/utils/synesthesia.js

import { renderResonance } from "./resonance.js";
import { playResonance } from "./sound.js";

/**
 * Обновляет синестетическое состояние (свет + звук + движение)
 * @param {Object} efv - эмоциональный вектор (tone, engagement, esi)
 */
export function updateSynesthesia(efv = { tone: "neutral", engagement: 0.7, esi: 70 }) {
  try {
    // 🌈 Свет и дыхание
    renderResonance(efv);

    // 🎵 Звук (короткий импульс)
    playResonance(efv);

    // 🪶 Микродвижение интерфейса
    const shift = (1 - (efv.engagement ?? 0.7)) * 2;
    document.body.style.transition = "transform 0.4s ease-out";
    document.body.style.transform = `translateY(${shift}px)`;
  } catch (e) {
    console.warn("Synesthesia update failed:", e);
  }
}