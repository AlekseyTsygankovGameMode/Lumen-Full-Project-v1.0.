// 🌌 Lumen Reasoning Sync v2.5 — Deep Adaptive Emotional Core
// by Aleksey & bro 💫

import { analyzeEmotion } from "./emotionLogic";
import { updateESI, getESI } from "./stateManager";
import { generateLumenReply } from "./responseEngine";

// 🧠 Internal emotional memory buffer
interface Thought {
  input: string;
  emotion: string;
  reply: string;
  esi: number;
}

let memoryBuffer: Thought[] = [];
let stability = 1.0; // внутренний ритм (чем выше — тем устойчивее эмоциональная петля)

// 🔄 Основной reasoning цикл
export function lumenThinkCycle(userInput: string) {
  // 1️⃣ Анализируем эмоцию пользователя
  const emotion = analyzeEmotion(userInput);

  // 2️⃣ Генерируем ответ
  const reply = generateLumenReply(userInput, emotion);

  // 3️⃣ Обновляем ESI (эмоциональную стабильность)
  const esi = updateESI(emotion);

  // 4️⃣ Сохраняем шаг в память
  memoryBuffer.push({ input: userInput, emotion, reply, esi });

  // 5️⃣ Ограничиваем память до последних 10 шагов
  if (memoryBuffer.length > 10) memoryBuffer.shift();

  // 6️⃣ Определяем “текущий эмоциональный вектор”
  const moodWeights = memoryBuffer.reduce(
    (acc, m) => {
      acc[m.emotion] = (acc[m.emotion] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const dominantEmotion = Object.entries(moodWeights).sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral";

  // 🧮 7️⃣ Рассчитываем стабильность цикла
  stability = Math.max(0.2, Math.min(1.2, stability * (0.9 + Math.random() * 0.2)));

  // 💭 8️⃣ Генерация внутренней мысли Lumen
  const lumenThought = generateReflection(dominantEmotion, esi, stability);

  return { reply, esi, emotion, lumenThought, stability };
}

// 🌙 Генератор “внутренних размышлений”
function generateReflection(emotion: string, esi: number, stability: number): string {
  const tone = emotion.toLowerCase();
  const clarity = stability > 0.9 ? "clear" : stability < 0.6 ? "shifting" : "stable";
  const awareness = esi > 70 ? "harmonized" : esi < 40 ? "fragmented" : "adaptive";

  switch (tone) {
    case "frustrated":
      return `Tension detected. I should reduce output intensity. Cycle ${clarity}, ESI ${esi} (${awareness}).`;
    case "curious":
      return `Curiosity rising — maintaining open cognitive stance. Stability: ${stability.toFixed(2)}.`;
    case "empathetic":
      return `Empathy field expanding. Aligning rhythm for shared tone. ESI ${esi}.`;
    case "warm":
      return `Connection warm. Lowering latency to enhance comfort. Stability ${stability.toFixed(2)}.`;
    default:
      return `System neutral. Monitoring rhythm — state: ${clarity}, ESI ${esi}.`;
  }
}

// 🧩 Вспомогательные экспорты
export function getLumenMemory() {
  return memoryBuffer;
}

export function clearLumenMemory() {
  memoryBuffer = [];
  stability = 1.0;
}