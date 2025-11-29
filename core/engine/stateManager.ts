// 🧩 Lumen Adaptive State Core v3.0
// by Aleksey & bro ⚡
//
// Хранит внутреннее состояние: ESI, тренд настроения, буфер эмоций
// и применяет сглаживающий фильтр, чтобы реакция Lumen ощущалась живой.

type Emotion =
  | "frustrated"
  | "curious"
  | "warm"
  | "empathetic"
  | "neutral";

interface State {
  esi: number; // Emotional Stability Index (0–100)
  moodTrend: "rising" | "falling" | "stable";
  emotionBuffer: Emotion[];
  lastEmotion: Emotion;
}

const state: State = {
  esi: 70, // стартовая точка (спокойное состояние)
  moodTrend: "stable",
  emotionBuffer: [],
  lastEmotion: "neutral"
};

// 🎛️ Плавное обновление ESI (зависит от эмоции и предыдущего состояния)
export function updateESI(emotion: Emotion): number {
  const deltaMap: Record<Emotion, number> = {
    frustrated: -4.5,
    curious: +2.5,
    warm: +3.5,
    empathetic: +4,
    neutral: 0
  };

  const randomNoise = (Math.random() - 0.5) * 1.2; // лёгкое “дыхание”
  const change = deltaMap[emotion] + randomNoise;

  state.esi = Math.max(0, Math.min(100, state.esi + change));
  state.lastEmotion = emotion;

  updateMoodTrend(emotion);
  return state.esi;
}

// 🧭 Тренд настроения (rising / falling / stable)
export function updateMoodTrend(emotion: Emotion): "rising" | "falling" | "stable" {
  const prevESI = state.esi;

  // если эмоция тёплая или эмпатичная — повышаем тенденцию
  if (emotion === "warm" || emotion === "empathetic") {
    state.moodTrend = prevESI < 85 ? "rising" : "stable";
  }
  // если раздражение или усталость — падает
  else if (emotion === "frustrated") {
    state.moodTrend = prevESI > 40 ? "falling" : "stable";
  }
  // иначе оставляем “спокойный” тренд
  else {
    state.moodTrend = "stable";
  }

  // записываем в буфер
  recordEmotion(emotion);
  return state.moodTrend;
}

// 💾 Короткая память эмоций (макс. 10 элементов)
function recordEmotion(emotion: Emotion) {
  state.emotionBuffer.push(emotion);
  if (state.emotionBuffer.length > 10) state.emotionBuffer.shift();
}

// 🔍 Аналитическая сводка эмоций
export function getEmotionSummary(): Record<Emotion, number> {
  const summary: Record<Emotion, number> = {
    frustrated: 0,
    curious: 0,
    warm: 0,
    empathetic: 0,
    neutral: 0
  };

  state.emotionBuffer.forEach((e) => {
    summary[e]++;
  });

  return summary;
}

// 📊 Получить текущий ESI
export function getESI(): number {
  return parseFloat(state.esi.toFixed(2));
}

// 🌤 Получить тренд настроения
export function getMoodTrend(): string {
  return state.moodTrend;
}

// 🧠 Получить последнее эмоциональное состояние
export function getLastEmotion(): Emotion {
  return state.lastEmotion;
}

// 🔄 Сброс внутреннего состояния (для новой сессии)
export function resetState() {
  state.esi = 70;
  state.moodTrend = "stable";
  state.emotionBuffer = [];
  state.lastEmotion = "neutral";
}