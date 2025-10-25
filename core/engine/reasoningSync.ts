// 🌌 Lumen Reasoning Sync — internal adaptive reasoning & emotional feedback
import { analyzeEmotion } from "./emotionLogic";
import { updateESI, getESI } from "./stateManager";
import { generateLumenReply } from "./responseEngine";

interface Thought {
  input: string;
  emotion: string;
  reply: string;
  esi: string;
}

let memoryBuffer: Thought[] = [];

export function lumenThinkCycle(userInput: string) {
  // 1️⃣ Анализируем эмоцию пользователя
  const emotion = analyzeEmotion(userInput);

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
}