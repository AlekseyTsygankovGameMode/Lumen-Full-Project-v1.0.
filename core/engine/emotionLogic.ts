<<<<<<< HEAD
// 🌙 Lumen Emotional Field v3.0 — Weighted Pattern + Emotional Signature Engine
// by Aleksey & bro ⚡
// Интерпретирует эмоциональные паттерны с весами, пунктуацией и когерентной сигнатурой.

export type Emotion =
  | "frustrated"
  | "curious"
  | "warm"
  | "empathetic"
  | "neutral";

interface EmotionScore {
  frustrated: number;
  curious: number;
  warm: number;
  empathetic: number;
}

/**
 * 🧠 analyzeEmotion()
 * Распознаёт эмоциональный класс из текста.
 * Использует весовые ключи, пунктуацию и когерентные сигналы.
 */
export function analyzeEmotion(input: string): Emotion {
  if (!input || typeof input !== "string") return "neutral";
  const text = input.toLowerCase().trim();

  const score: EmotionScore = {
    frustrated: 0,
    curious: 0,
    warm: 0,
    empathetic: 0,
  };

  // 💢 раздражение / напряжение
  const frustrationWords = [
    "angry",
    "frustrating",
    "annoyed",
    "tired",
    "ugh",
    "hate",
    "stop",
    "mad",
    "confused",
    "lost",
  ];

  // 🔍 любопытство / интерес
  const curiosityWords = [
    "why",
    "how",
    "what",
    "explain",
    "understand",
    "maybe",
    "wonder",
    "question",
  ];

  // 💗 тепло / признательность
  const warmthWords = [
    "thanks",
    "thank you",
    "love",
    "appreciate",
    "calm",
    "peace",
    "relaxed",
    "glad",
  ];

  // 🌊 сочувствие / эмпатия
  const empathyWords = [
    "sorry",
    "feel",
    "care",
    "together",
    "sad",
    "forgive",
    "kind",
    "miss",
  ];

  // 🧩 весовая обработка ключей
  frustrationWords.forEach((w) => text.includes(w) && (score.frustrated += 1.2));
  curiosityWords.forEach((w) => text.includes(w) && (score.curious += 1.1));
  warmthWords.forEach((w) => text.includes(w) && (score.warm += 1.3));
  empathyWords.forEach((w) => text.includes(w) && (score.empathetic += 1.4));

  // 🔠 пунктуационные сигналы
  if (text.includes("?")) score.curious += 0.4;
  if (text.includes("!")) score.frustrated += 0.3;
  if (text.includes("...")) score.empathetic += 0.3;
  if (text.endsWith("!")) score.frustrated += 0.5;
  if (text.endsWith("?")) score.curious += 0.2;

  // 🔊 когерентные сигналы (длина и структура фразы)
  const length = text.split(" ").length;
  if (length < 3) score.frustrated += 0.2; // короткие, резкие ответы
  if (length > 10) score.curious += 0.3; // длинные — рассуждение
  if (text.match(/i feel|i think|i believe/)) score.empathetic += 0.4;

  // 🩶 итоговая нормализация
  const dominant = Object.entries(score).sort((a, b) => b[1] - a[1])[0];
  return dominant && dominant[1] > 0 ? (dominant[0] as Emotion) : "neutral";
}

/**
 * 💬 getEmotionDescriptor()
 * Возвращает описание эмоционального состояния для reasoning-панели.
 */
export function getEmotionDescriptor(emotion: Emotion): string {
  switch (emotion) {
    case "frustrated":
      return "Detected friction — reducing tone intensity and promoting empathy.";
    case "curious":
      return "Exploratory focus — user seeking clarity or deeper understanding.";
    case "warm":
      return "Positive emotional field — trust and resonance are stable.";
    case "empathetic":
      return "Compassion flow detected — reflective alignment initiated.";
    default:
      return "Stable neutrality — balanced affective state.";
  }
}

/**
 * ⚖ getEmotionWeights()
 * Возвращает веса для последующего анализа когерентности (optional use in metrics).
 */
export function getEmotionWeights(): Record<Emotion, number> {
  return {
    frustrated: 1.2,
    curious: 1.1,
    warm: 1.3,
    empathetic: 1.4,
    neutral: 1.0,
  };
=======
// 🌙 Lumen Emotional Field — interprets tone & keywords
export function analyzeEmotion(input: string) {
  const tone = input.toLowerCase();

  if (tone.includes("frustrating") || tone.includes("angry") || tone.includes("ugh"))
    return "frustrated";
  if (tone.includes("thanks") || tone.includes("love") || tone.includes("appreciate"))
    return "warm";
  if (tone.includes("why") || tone.includes("how") || tone.includes("?"))
    return "curious";
  if (tone.includes("sad") || tone.includes("sorry"))
    return "empathetic";

  return "neutral";
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
}