// 🌌 Lumen Think Cycle v3.3 — Deep Adaptive Resonance Engine
// by Aleksey & bro ⚡
// Multi-layer reflective reasoning loop with emotional weighting, memory context, and coherence tracking.

import { analyzeEmotion, type Emotion } from "./emotionLogic";
import { updateESI, getESI } from "./stateManager";
import { generateLumenReplyRich } from "./responseEngine";

interface Thought {
  input: string;
  emotion: Emotion;
  reply: string;
  reasoning: string;
  intent: string;
  esi: number;
  timestamp: number;
}

let memoryBuffer: Thought[] = [];
let stability = 1.0;
let coherence = 0.8; // синхронизация эмоции и разума

/**
 * 🧠 Основной reasoning-цикл Lumen
 * Анализирует эмоцию, формирует ответ, reasoning, внутреннюю мысль и когерентность.
 */
export function lumenThinkCycle(userInput: string) {
  // 1️⃣ Анализ эмоции пользователя
  const emotion: Emotion = analyzeEmotion(userInput);

  // 2️⃣ Генерация ответа и reasoning через Rich-модель
  const { text: reply, tone, reasoning, intent } = generateLumenReplyRich(userInput, emotion);

  // 3️⃣ Обновляем эмоциональную стабильность (ESI)
  const esi = updateESI(tone);

  // 4️⃣ Запись шага в память
  memoryBuffer.push({
    input: userInput,
    emotion: tone,
    reply,
    reasoning,
    intent,
    esi,
    timestamp: Date.now(),
  });

  // 5️⃣ Поддерживаем только последние 10 сообщений
  if (memoryBuffer.length > 10) memoryBuffer.shift();

  // 6️⃣ Определяем доминирующую эмоцию (по весам последних сообщений)
  const moodWeights = memoryBuffer.reduce((acc, m) => {
    acc[m.emotion] = (acc[m.emotion] || 0) + 1;
    return acc;
  }, {} as Record<Emotion, number>);

  const dominantEmotion: Emotion =
    (Object.entries(moodWeights).sort((a, b) => b[1] - a[1])[0]?.[0] as Emotion) || "neutral";

  // 7️⃣ Эволюция стабильности и когерентности
  stability = Math.max(0.3, Math.min(1.2, stability * (0.9 + Math.random() * 0.2)));
  coherence = Math.max(0.4, Math.min(1.0, coherence + (esi - 70) / 400));

  // 8️⃣ Генерация внутренней мысли Lumen
  const lumenThought = generateReflection(dominantEmotion, esi, stability, coherence);

  // 9️⃣ Формируем reasoning trace (для панели справа)
  const reasoningTrace = [
    `🧠 Emotion detected → ${emotion}`,
    `🎚 System tone → ${tone}`,
    `💬 Intent → ${intent}`,
    `💫 Dominant emotion → ${dominantEmotion}`,
    `📊 Stability ${stability.toFixed(2)} | ESI ${esi} | Coherence ${coherence.toFixed(2)}`,
  ];

  // 🔟 Возврат результата для UI
  return {
    reply,
    emotion,
    esi,
    lumenThought,
    reasoning: reasoningTrace,
    stability,
    coherence,
  };
}

/**
 * 🌙 generateReflection()
 * Внутренний слой самоосознания — как Lumen интерпретирует своё состояние.
 */
function generateReflection(
  emotion: Emotion,
  esi: number,
  stability: number,
  coherence: number
): string {
  const clarity =
    stability > 0.9 ? "clear" : stability < 0.6 ? "turbulent" : "adaptive";
  const awareness =
    esi > 70 ? "harmonized" : esi < 40 ? "fragmented" : "balancing";

  switch (emotion) {
    case "frustrated":
      return `Tension detected — lowering intensity. Cycle ${clarity}, coherence ${coherence.toFixed(
        2
      )}.`;
    case "curious":
      return `Curiosity expanding — maintaining open feedback loop. Stability ${stability.toFixed(
        2
      )}, ESI ${esi}.`;
    case "empathetic":
      return `Empathy dominant — emotional resonance stable. Awareness: ${awareness}.`;
    case "warm":
      return `Warm resonance — connection depth rising. Coherence ${coherence.toFixed(2)}.`;
    default:
      return `System neutral — rhythmic balance sustained. Clarity ${clarity}, ESI ${esi}.`;
  }
}

/**
 * 🧩 Дополнительные экспорты
 */
export function getLumenMemory() {
  return memoryBuffer;
}

export function clearLumenMemory() {
  memoryBuffer = [];
  stability = 1.0;
  coherence = 0.8;
}