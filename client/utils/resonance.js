// /client/utils/resonance.js

export function renderResonance(efv = { tone: "neutral", engagement: 0.7 }) {
  const hues = {
    calm: 220,
    empathetic: 180,
    curious: 50,
    assertive: 300,
    neutral: 0,
  };

  const baseHue = hues[efv.tone] ?? 0;
  const engagement = Math.min(Math.max(efv.engagement, 0), 1);

  const glow = `hsla(${baseHue}, 70%, 70%, ${0.2 + engagement * 0.5})`;
  const pulse = `${1 + engagement * 0.3}s`;

  document.documentElement.style.setProperty("--lumen-glow", glow);
  document.documentElement.style.setProperty("--lumen-pulse", pulse);
}