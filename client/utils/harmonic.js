// /client/utils/harmonic.js

export function computeHarmony(efv, ufv) {
  const rEngage = (efv.engagement + ufv.engagement) / 2;
  const rTempo = 0.8 + rEngage * 0.4;
  const rColor = efv.tone === ufv.tone ? 1 : 0.8;
  const resonance = Math.min(1, rEngage * rColor);
  return { resonance, tempo: rTempo };
}

export function playHarmonicTone(efv, ufv, r = 1) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.frequency.value = 200 + r * 120 + (efv.engagement - 0.5) * 100;
    gain.gain.value = 0.02 + ufv.engagement * 0.02;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 250);
  } catch (e) {
    console.warn("Harmonic sound unavailable:", e);
  }
}