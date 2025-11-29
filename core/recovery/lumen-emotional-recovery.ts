// 🌙 LUMEN CORE v2.7 — Adaptive Emotional Recovery Field
// by Aleksey & bro ⚡
// Система эмоционально-осознанного восстановления после ошибок модели.
// Вместо сухого “извини, ошибка”, Lumen сохраняет эмпатию и ESI-тон.

import { toneToEFV, EFV, ToneType } from "../metrics/efv.js";
import { calculateESI } from "../metrics/esi.js";
import { updateESI } from "../engine/stateManager.js";

export interface RecoveryResponse {
  reply: string;
  reasoning: string[];
  tone: ToneType;
  efv: EFV;
  esi: number;
  recoveryType: string;
  model: string;
  resilience: number; // показатель адаптивности после сбоя
}

type BuildParams = {
  message: string;
  reasoning: string[];
  tone: ToneType;
  esi: number;
  type: string;
  model: string;
};

// 🧠 Основной класс восстановления
export class LumenEmotionalRecovery {
  // 1️⃣ Пустой ответ (например, модель вернула "")
  static recoverFromEmpty(model: string): RecoveryResponse {
    const messages = [
      "I noticed a moment of silence — I’m still here, holding the thread.",
      "There was a brief pause. I’m listening again.",
      "Silence doesn’t mean disconnection. Let’s pick this up together."
    ];

    return this.build({
      message: this.random(messages),
      reasoning: [
        "Empty model output detected",
        "Engaging adaptive empathy channel",
        "Restoring conversational continuity"
      ],
      tone: "empathetic",
      esi: 0.74,
      type: "empty_response",
      model
    });
  }

  // 2️⃣ Время ожидания превышено
  static recoverFromTimeout(model: string): RecoveryResponse {
    const messages = [
      "I took a little longer to think — thank you for waiting.",
      "Processing took a moment, but I’m ready now.",
      "Slow response doesn’t mean I stopped caring."
    ];

    return this.build({
      message: this.random(messages),
      reasoning: [
        "Response timeout detected",
        "Cognitive delay managed through soft-reset",
        "Maintaining rhythm continuity"
      ],
      tone: "calm",
      esi: 0.68,
      type: "timeout",
      model
    });
  }

  // 3️⃣ Ошибка парсинга (модель сгенерировала сломанный JSON/строку)
  static recoverFromParseFail(rawContent: string, model: string): RecoveryResponse {
    const message =
      rawContent && rawContent.length > 0
        ? `I received fragmented output: "${rawContent.slice(0, 100)}..." — reassembling meaning.`
        : "I had trouble parsing my own words. Could you clarify your last thought?";

    return this.build({
      message,
      reasoning: [
        "Response parsing failed",
        rawContent ? "Reconstruction via semantic context" : "Fallback: user clarification requested",
        "Maintaining empathy state"
      ],
      tone: "empathetic",
      esi: 0.7,
      type: "parse_failure",
      model
    });
  }

  // 4️⃣ Полный сбой обеих моделей (основной и fallback)
  static recoverFromCompleteFailure(primaryModel: string, fallbackModel: string): RecoveryResponse {
    const message =
      "My internal systems momentarily lost synchronization. I’m reconnecting — thank you for your patience.";

    return this.build({
      message,
      reasoning: [
        "Primary + fallback model unavailable",
        "Activating deep recovery protocol",
        "Preserving emotional consistency"
      ],
      tone: "empathetic",
      esi: 0.6,
      type: "complete_failure",
      model: `${primaryModel} → ${fallbackModel}`
    });
  }

  // 5️⃣ Универсальный строитель восстановления
  private static build(params: BuildParams): RecoveryResponse {
    const efv = toneToEFV(params.tone);
    const newEsi = updateESI(params.tone as any);
    const resilience = Math.min(1, (newEsi / 100 + params.esi) / 2);

    return {
      reply: params.message,
      reasoning: params.reasoning,
      tone: params.tone,
      efv,
      esi: calculateESI(params.esi),
      recoveryType: params.type,
      model: `${params.model} (recovered)`,
      resilience
    };
  }

  // 6️⃣ Вспомогательная функция выбора случайного варианта
  private static random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}