// client/utils/sound.ts
// 🔊 Простая, типизированная реализация playResonance для браузера (WebAudio)
// Возвращает void — запускает короткий тон/пульс согласно efv / esi

export type EFV = {
  tone: string;
  engagement: number; // 0..1
};

export interface PlayOptions {
  efv?: EFV;
  esi?: number; // 0..100
}

export function playResonance(options: PlayOptions = {}) {
  const efv = options.efv ?? { tone: "neutral", engagement: 0.7 };
  const esi = typeof options.esi === "number" ? options.esi : 70;

  try {
    // create audio context (lazy, friendly to mobile/autoplay)
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // map tone -> base freq
    const tones: Record<string, number> = {
      calm: 220,
      empathetic: 260,
      curious: 300,
      assertive: 340,
      neutral: 200,
    };
    const freq = tones[efv.tone] ?? 240;

    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0;

    // connect
    osc.connect(gain);
    gain.connect(ctx.destination);

    // set dynamic amplitude by engagement/esi
    const engagement = Math.max(0, Math.min(1, efv.engagement ?? 0.7));
    const ampBase = 0.02 + engagement * 0.08; // small, pleasant pulse
    gain.gain.setValueAtTime(0, ctx.currentTime);

    const durationMs = Math.min(2500, 800 + (esi ?? 70) * 10); // 800..2500
    const duration = durationMs / 1000;

    // Attack -> sustain -> release
    const now = ctx.currentTime;
    const attack = Math.max(0.02, 0.06 * engagement);
    const release = Math.max(0.08, 0.25 * (1 - engagement));

    gain.gain.linearRampToValueAtTime(ampBase, now + attack);
    gain.gain.exponentialRampToValueAtTime(Math.max(ampBase * 0.45, 0.001), now + duration - release);
    gain.gain.linearRampToValueAtTime(0.0001, now + duration);

    osc.start(now);
    // stop slightly after envelope
    osc.stop(now + duration + 0.05);

    // close context after done to free resources (some browsers)
    setTimeout(() => {
      try {
        // @ts-ignore: some browsers allow close()
        ctx.close && ctx.close();
      } catch (e) {
        // ignore
      }
    }, durationMs + 300);
  } catch (err) {
    // best-effort: if WebAudio unavailable, fail silently
    // console.warn("playResonance error", err);
  }
}
