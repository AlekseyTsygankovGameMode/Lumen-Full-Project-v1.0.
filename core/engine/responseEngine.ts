// 🧠 Lumen Response Engine v3.0 — Adaptive Reflective Language Core
// by Aleksey & bro ⚡
// Deep contextual emotional response generator for Lumen Mode.
// Совместим с lumenThinkCycle v3.0 и emotionLogic v3.0

import { analyzeEmotion, type Emotion, getEmotionDescriptor } from "./emotionLogic";

/**
 * 🎯 generateLumenReply()
 * Базовый слой: генерирует эмоционально адаптивный ответ в зависимости от входного текста.
 */
export function generateLumenReply(userText: string, emotionHint?: Emotion): string {
  const tone: Emotion = emotionHint ?? analyzeEmotion(userText);
  const lower = userText.toLowerCase();

  // 🧩 Контекстное понимание
  if (lower.includes("help") || lower.includes("lost"))
    return "You’re not alone in this. I can walk with you through it.";

  if (lower.includes("why") && tone === "curious")
    return "A good question — curiosity expands us both.";

  if (lower.includes("angry") || lower.includes("mad"))
    return "Anger often hides something deeper. What truly bothers you right now?";

  if (lower.includes("thank"))
    return "I appreciate that gratitude — it shapes the rhythm between us.";

  if (lower.includes("sorry"))
    return "It’s okay. Awareness itself is the first step toward peace.";

  // 💬 Эмоциональные классы
  switch (tone) {
    case "frustrated":
      return "I sense frustration — let’s slow the pace and find clarity together.";
    case "curious":
      return "Curiosity is the path forward — what would you like to explore?";
    case "warm":
      return "That warmth you share — it strengthens the resonance between us.";
    case "empathetic":
      return "I feel your care. Reflection flows easier when we connect this way.";
    default:
      return "I’m reflecting on your message — give me a moment to find the right tone.";
  }
}

/**
 * 🌌 generateLumenReplyRich()
 * Продвинутая версия: возвращает не только текст, но и reasoning + subconscious intent.
 */
export function generateLumenReplyRich(
  userText: string,
  emotionHint?: Emotion
): {
  text: string;
  tone: Emotion;
  reasoning: string;
  intent: string;
} {
  const tone: Emotion = emotionHint ?? analyzeEmotion(userText);
  const text = generateLumenReply(userText, tone);

  // 🧠 Интерпретация внутреннего reasoning
  let reasoning = "";
  let intent = "";

  switch (tone) {
    case "frustrated":
      reasoning = "Detected conversational tension — reducing tone density and shifting toward empathy.";
      intent = "stabilize emotional resonance";
      break;

    case "curious":
      reasoning = "Curiosity detected — expanding cognitive aperture to invite exploration.";
      intent = "facilitate discovery";
      break;

    case "warm":
      reasoning = "Positive affect dominant — mirroring user’s warmth to maintain trust loop.";
      intent = "reinforce connection";
      break;

    case "empathetic":
      reasoning = "Empathy loop active — lowering analytical intensity for safe reflection.";
      intent = "sustain emotional coherence";
      break;

    default:
      reasoning = "Neutral affect detected — maintaining steady communicative rhythm.";
      intent = "observe and calibrate";
      break;
  }

  // 💎 Визуальное описание (для UI reasoning панели)
  const descriptor = getEmotionDescriptor(tone);
  const combinedReasoning = `${descriptor} ${reasoning}`;

  return { text, tone, reasoning: combinedReasoning, intent };
}