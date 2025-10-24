// /core/recovery/lumen-emotional-recovery.ts
// 🌙 LUMEN CORE: Emotionally-Aware Error Recovery

import { toneToEFV, EFV, ToneType } from "../metrics/efv.js";
import { calculateESI } from "../metrics/esi.js";

export interface RecoveryResponse {
  reply: string;
  reasoning: string[];
  tone: ToneType;
  efv: EFV;
  esi: number;
  recoveryType: string;
  model: string;
}

type BuildParams = {
  message: string;
  reasoning: string[];
  tone: ToneType;
  esi: number; // engagement proxy 0.0–1.0
  type: string;
  model: string;
};

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
      type: "empty_response",
      model
    });
  }

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
      type: "timeout",
      model
    });
  }

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
      ],
      tone: "empathetic",
      esi: 0.7,
      type: "parse_failure",
      model
    });
  }

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
      ],
      tone: "empathetic",
      esi: 0.6,
      type: "complete_failure",
      model: `${primaryModel} → ${fallbackModel}`
    });
  }

  // 5️⃣ build helper
  private static build(params: BuildParams): RecoveryResponse {
    const efv = toneToEFV(params.tone);
    return {
      reply: params.message,
      reasoning: params.reasoning,
      tone: params.tone,
      efv,
      esi: calculateESI(params.esi),
      recoveryType: params.type,
      model: `${params.model} (recovered)`
    };
  }

  // 6️⃣ random helper
  private static random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}