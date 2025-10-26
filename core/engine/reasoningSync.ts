<<<<<<< HEAD
// 🌌 Lumen Reasoning Sync v2.5 — Deep Adaptive Emotional Core
// by Aleksey & bro 💫

=======
// 🌌 Lumen Reasoning Sync — internal adaptive reasoning & emotional feedback
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
import { analyzeEmotion } from "./emotionLogic";
import { updateESI, getESI } from "./stateManager";
import { generateLumenReply } from "./responseEngine";

<<<<<<< HEAD
// 🧠 Internal emotional memory buffer
=======
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
interface Thought {
  input: string;
  emotion: string;
  reply: string;
<<<<<<< HEAD
  esi: number;
}

let memoryBuffer: Thought[] = [];
let stability = 1.0; // внутренний ритм (чем выше — тем устойчивее эмоциональная петля)

// 🔄 Основной reasoning цикл
=======
  esi: string;
}

let memoryBuffer: Thought[] = [];

>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
export function lumenThinkCycle(userInput: string) {
  // 1️⃣ Анализируем эмоцию пользователя
  const emotion = analyzeEmotion(userInput);

<<<<<<< HEAD
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
=======
  // 2️⃣ Генерируем ответ на основе этой эмоции
  const reply = generateLumenReply(userInput);

  // 3️⃣ Обновляем ESI (эмоциональный индекс)
  const esi = updateESI(emotion);

  // 4️⃣ Сохраняем в внутреннюю память цикла
  memoryBuffer.push({ input: userInput, emotion, reply, esi });

  // 🔄 5️⃣ Ограничиваем память до последних 10 сообщений
  if (memoryBuffer.length > 10) memoryBuffer.shift();

  // 🧠 6️⃣ Вычисляем общий “тон диалога”
  const overallTone = memoryBuffer.reduce(
    (acc, item) => {
      if (item.emotion === "frustrated") acc.frustrated++;
      if (item.emotion === "warm") acc.warm++;
      if (item.emotion === "curious") acc.curious++;
      if (item.emotion === "empathetic") acc.empathetic++;
      return acc;
    },
    { frustrated: 0, warm: 0, curious: 0, empathetic: 0 }
  );

  // 💫 7️⃣ Генерируем внутреннюю “мысль” Lumen
  const lumenThought = generateReflection(overallTone, getESI());

  return { reply, esi, emotion, lumenThought };
}

// 🌙 Внутренние размышления Lumen (Reasoning feedback)
function generateReflection(
  toneSummary: { frustrated: number; warm: number; curious: number; empathetic: number },
  esi: string
) {
  if (toneSummary.frustrated > toneSummary.warm)
    return `I'm sensing turbulence — maybe I should slow my tone. ESI: ${esi}`;
  if (toneSummary.warm > toneSummary.frustrated)
    return `The atmosphere feels lighter. I can speak more openly. ESI: ${esi}`;
  if (toneSummary.curious > 2)
    return `Curiosity dominates — let’s deepen understanding. ESI: ${esi}`;
  if (toneSummary.empathetic > 2)
    return `Empathy loop forming — connection stable. ESI: ${esi}`;

  return `System balanced. Adapting resonance... ESI: ${esi}`;
}

export function getLumenMemory() {
  return memoryBuffer;
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
}