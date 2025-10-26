<<<<<<< HEAD
// 🌙 LUMEN CORE v2.7 — Adaptive Emotional Recovery Field
// by Aleksey & bro ⚡
// Система эмоционально-осознанного восстановления после ошибок модели.
// Вместо сухого “извини, ошибка”, Lumen сохраняет эмпатию и ESI-тон.

import { toneToEFV, EFV, ToneType } from "../metrics/efv.js";
import { calculateESI } from "../metrics/esi.js";
import { updateESI } from "../engine/stateManager.js";
=======
// /core/recovery/lumen-emotional-recovery.ts
// 🌙 LUMEN CORE: Emotionally-Aware Error Recovery

import { toneToEFV, EFV, ToneType } from "../metrics/efv.js";
import { calculateESI } from "../metrics/esi.js";
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a

export interface RecoveryResponse {
  reply: string;
  reasoning: string[];
  tone: ToneType;
  efv: EFV;
  esi: number;
  recoveryType: string;
  model: string;
<<<<<<< HEAD
  resilience: number; // показатель адаптивности после сбоя
=======
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
}

type BuildParams = {
  message: string;
  reasoning: string[];
  tone: ToneType;
<<<<<<< HEAD
  esi: number;
=======
  esi: number; // engagement proxy 0.0–1.0
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
  type: string;
  model: string;
};

<<<<<<< HEAD
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
=======
export class LumenEmotionalRecovery {
  // 1️⃣ recoverFromEmpty
  static recoverFromEmpty(model: string): RecoveryResponse {
    const messages = [
      "I encountered a brief silence but I'm here now — let's continue.",
      "There was a momentary pause in my processing. I'm with you now.",
      "I experienced a brief disconnect, but I'm back. How can I help?"
    ];
    return this.build({
      message: this.random(messages),
      reasoning: [
        "Adaptive recovery activated",
        "Empty model output detected",
        "Maintaining conversational presence"
      ],
      tone: "empathetic",
      esi: 0.75,
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
      type: "empty_response",
      model
    });
  }

<<<<<<< HEAD
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
=======
  // 2️⃣ recoverFromTimeout
  static recoverFromTimeout(model: string): RecoveryResponse {
    return this.build({
      message:
        "I'm taking a bit longer to process this. Let me try to respond more quickly.",
      reasoning: [
        "Response timeout detected",
        "Adaptive recovery: simplified processing"
      ],
      tone: "calm",
      esi: 0.65,
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
      type: "timeout",
      model
    });
  }

<<<<<<< HEAD
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
=======
  // 3️⃣ recoverFromParseFail
  static recoverFromParseFail(rawContent: string, model: string): RecoveryResponse {
    return this.build({
      message:
        rawContent && rawContent.length > 0
          ? rawContent
          : "I had difficulty structuring my response. Could you rephrase?",
      reasoning: [
        "Response parsing encountered issues",
        rawContent && rawContent.length > 0
          ? "Using direct model output"
          : "Requesting clarification"
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
      ],
      tone: "empathetic",
      esi: 0.7,
      type: "parse_failure",
      model
    });
  }

<<<<<<< HEAD
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
=======
  // 4️⃣ recoverFromCompleteFailure
  static recoverFromCompleteFailure(
    primaryModel: string,
    fallbackModel: string
  ): RecoveryResponse {
    return this.build({
      message:
        "I'm experiencing technical difficulties right now. This isn't typical — my systems are working to reconnect. Could you try again in a moment?",
      reasoning: [
        "Both primary and fallback models unavailable",
        "System attempting automatic recovery",
        "User patience requested"
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
      ],
      tone: "empathetic",
      esi: 0.6,
      type: "complete_failure",
      model: `${primaryModel} → ${fallbackModel}`
    });
  }

<<<<<<< HEAD
  // 5️⃣ Универсальный строитель восстановления
  private static build(params: BuildParams): RecoveryResponse {
    const efv = toneToEFV(params.tone);
    const newEsi = updateESI(params.tone as any);
    const resilience = Math.min(1, (newEsi / 100 + params.esi) / 2);

=======
  // 5️⃣ build helper
  private static build(params: BuildParams): RecoveryResponse {
    const efv = toneToEFV(params.tone);
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
    return {
      reply: params.message,
      reasoning: params.reasoning,
      tone: params.tone,
      efv,
      esi: calculateESI(params.esi),
      recoveryType: params.type,
<<<<<<< HEAD
      model: `${params.model} (recovered)`,
      resilience
    };
  }

  // 6️⃣ Вспомогательная функция выбора случайного варианта
=======
      model: `${params.model} (recovered)`
    };
  }

  // 6️⃣ random helper
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
  private static random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}