// 🌌 LUMEN REASONING ENGINE v3.5 — Resonance-Aware Thought Loop
// by Aleksey & bro ⚡

import { sql, hasDb } from "../../db/client.js";
import { toneToEFV, EFV, compareEFV, describeEFVTrend } from "../metrics/efv.js";
import { calculateESI, describeESIChange } from "../metrics/esi.js";

export interface ReasoningInput {
  session_id: string;
  user_input: string;
  model_response: string;
  tone: string; // "calm" | "empathetic" | "curious" | ...
}

export interface ReasoningOutput {
  efv: EFV;
  esi: number;
  reasoning_trace: string[];
  trend: string;
  timestamp: string;
}

// 🧩 кэшируем предыдущее состояние для анализа изменений
let previousEFV: EFV | null = null;
let previousESI: number | null = null;

export async function processTurn(input: ReasoningInput): Promise<ReasoningOutput> {
  const { session_id, user_input, model_response, tone } = input;

  // 1️⃣ Определяем EFV (эмоциональный вектор)
  const efv: EFV = toneToEFV(tone);

  // 2️⃣ Вычисляем новый ESI с учётом EFV
  const esi = calculateESI(efv);

  // 3️⃣ Сравниваем с предыдущим состоянием (если есть)
  let trend = "neutral";
  let efvTrendText = "";
  let esiTrendText = "";

  if (previousEFV && previousESI !== null) {
    const efvTrend = compareEFV(previousEFV, efv);
    efvTrendText = describeEFVTrend(previousEFV, efv);
    esiTrendText = describeESIChange(previousESI, esi);
    trend = efvTrend;
  }

  // обновляем кэш
  previousEFV = efv;
  previousESI = esi;

  // 4️⃣ Составляем reasoning trace
  const reasoning_trace = [
    `User input → ${user_input}`,
    `Model response → ${model_response}`,
    `Tone analyzed → ${tone}`,
    `EFV: ${JSON.stringify(efv)}`,
    `ESI: ${esi.toFixed(1)}`,
    `EFV trend: ${efvTrendText}`,
    `ESI trend: ${esiTrendText}`,
  ];

  // 5️⃣ Логируем в базу
  if (hasDb && sql) {
    try {
      await sql/*sql*/`
        insert into turn_eval (session_id, user_input, model_response, score, created_at)
        values (${session_id}, ${user_input}, ${model_response}, ${esi}, now());
      `;
    } catch (err) {
      console.error("❌ DB insert failed:", err);
    }
  }

  // 6️⃣ Возвращаем расширенный reasoning output
  return {
    efv,
    esi,
    reasoning_trace,
    trend,
    timestamp: new Date().toISOString(),
  };
}