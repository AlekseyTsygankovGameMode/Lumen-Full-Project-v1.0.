<<<<<<< HEAD
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
=======
// core/engine/lumenThinkCycle.ts
import { processTurn } from "./reasoning";
import { v4 as uuidv4 } from "uuid";

/**
 * Lumen high-level reasoning cycle
 * (Phase 2.5 — Conscious Reflection)
 */
export function lumenThinkCycle(userInput: string) {
  // 🧠 генерим ID сессии (в будущем можно будет брать из localStorage)
  const session_id = uuidv4();

  // 🔍 начальный "тон" для анализа — пока просто эвристика
  let tone = "neutral";
  if (/angry|mad|furious/i.test(userInput)) tone = "angry";
  else if (/sad|tired|lost/i.test(userInput)) tone = "low";
  else if (/hope|love|calm/i.test(userInput)) tone = "warm";

  // 🧩 Базовый ответ модели — Phase 2.5 stub
  let model_response = "I’m reflecting on that...";
  let lumenThought = "processing…";

  // 🧠 определяем эмоциональный контекст
  if (tone === "angry") {
    model_response = "Anger often hides pain — let’s unpack that.";
    lumenThought = "containment mode active — de-escalating tension.";
  } else if (tone === "low") {
    model_response = "It’s okay to slow down. You’re still here.";
    lumenThought = "stabilizing emotional rhythm — empathy priority ↑";
  } else if (tone === "warm") {
    model_response = "Warmth like that spreads — I can feel it.";
    lumenThought = "synchronizing to positive tone — reflective loop open.";
  }

  // ⚙️ Аналитика метрик EFV + ESI
  processTurn({
    session_id,
    user_input: userInput,
    model_response,
    tone,
  }).then((metrics) => {
    console.log("📊 EFV/ESI metrics:", metrics);
  });

  return {
    reply: model_response,
    lumenThought,
  };
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
}