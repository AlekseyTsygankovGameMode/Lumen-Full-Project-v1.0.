// /core/engine/reasoning.ts
import { sql, hasDb } from "../../db/client.js";
import { toneToEFV, EFV } from "../metrics/efv.js";
import { calculateESI } from "../metrics/esi.js";

export interface ReasoningInput {
  session_id: string;
  user_input: string;
  model_response: string;
  tone: string; // "calm" | "empathetic" | ...
}

export interface ReasoningOutput {
  efv: EFV;                    // <-- фикс: возвращаем EFV, а не Record<string, number>
  esi: number;
  reasoning_trace: string[];
  timestamp: string;
}

export async function processTurn(input: ReasoningInput): Promise<ReasoningOutput> {
  const { session_id, user_input, model_response, tone } = input;

  // 1) тон -> EFV
  const efv: EFV = toneToEFV(tone);

  // 2) считаем ESI
  // <-- фикс: передаём в calculateESI сам efv, без обёртки { efv }
  const esi = calculateESI(efv.engagement);

  // 3) трейс рассуждения
  const reasoning_trace = [
    `User input: ${user_input}`,
    `Model response: ${model_response}`,
    `Tone analyzed as: ${tone}`,
    `EFV: ${JSON.stringify(efv)}`,
    `ESI: ${esi.toFixed(3)}`
  ];

  // 4) лог в БД (turn_eval)
  if (hasDb && sql) {
    try {
      await sql/*sql*/`
        insert into turn_eval (session_id, user_input, model_response, score, created_at)
        values (${session_id}, ${user_input}, ${model_response}, ${esi}, now());
      `;
    } catch (err) {
      console.error("DB insert failed:", err);
    }
  }

  // 5) ответ движка
  return {
    efv,
    esi,
    reasoning_trace,
    timestamp: new Date().toISOString(),
  };
}