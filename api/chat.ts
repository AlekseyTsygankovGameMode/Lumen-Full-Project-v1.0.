// /api/chat.ts — Express router (OpenRouter) + Lumen Emotional Recovery

import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { performance } from "perf_hooks";

import { toneToEFV, EFV, ToneType } from "../core/metrics/efv.js";
import { calculateESI } from "../core/metrics/esi.js";
import {
  LumenEmotionalRecovery,
  RecoveryResponse
} from "../core/recovery/lumen-emotional-recovery.js";

dotenv.config();
const router = Router();

// ========================================
// CONFIGURATION
// ========================================

const API_BASE = "https://openrouter.ai/api/v1";
const PRIMARY_MODEL = "qwen/qwen-3-235b-a22b:free";
const FALLBACK_MODEL = "zai/glm-4.5-air:free";
const TIMEOUT_MS = 30000;
const MAX_MESSAGE_LENGTH = 4000;

// Validate API key at startup
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  throw new Error("❌ OPENROUTER_API_KEY is missing in environment variables.");
}

// ========================================
// TYPES
// ========================================

interface LumenResponse {
  reply: string;
  reasoning: string[];
  efv: EFV;
  esi: number;
  tone: ToneType;
  model: string;
  fallback?: boolean;
  recoveryType?: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

// ========================================
// HELPERS
// ========================================

function genReqId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ========================================
// MAIN ROUTE
// ========================================

router.post(
  "/",
  async (req: Request, res: Response<LumenResponse | ErrorResponse>) => {
    const startTime = performance.now();
    const requestId = genReqId();

    console.log(`🔵 [${requestId}] New chat request received`);

    // ========================================
    // VALIDATION
    // ========================================

    if (!req.body) {
      return res.status(400).json({
        error: "missing_body",
        details: "Request body is required",
      });
    }

    const { message, mode = "lumen5", adaptivity = "collab" } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      console.log(`❌ [${requestId}] Invalid or empty message`);
      return res.status(400).json({
        error: "invalid_or_empty_message",
        details: "Message must be a non-empty string",
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      console.log(
        `❌ [${requestId}] Message too long: ${message.length} characters`
      );
      return res.status(400).json({
        error: "message_too_long",
        details: `Maximum length is ${MAX_MESSAGE_LENGTH} characters`,
      });
    }

    // ========================================
    // SYSTEM PROMPT
    // ========================================

    const systemPrompt = `
You are Lumen — a reflective, emotionally-aware AI.
You explain not only the answer, but *why* you answered this way.
You're concise, warm, and honest.

Tone palette: calm, empathetic, curious, assertive, neutral.
Mode: ${mode} | Adaptivity: ${adaptivity}

Return JSON:
{
  "reply": string,
  "reasoning": string[],
  "tone": "calm"|"empathetic"|"curious"|"assertive"|"neutral"
}
    `.trim();

    // ========================================
    // PRIMARY MODEL ATTEMPT
    // ========================================

    const primaryResult = await callModel(
      PRIMARY_MODEL,
      systemPrompt,
      message,
      requestId
    );

    if (primaryResult.ok && primaryResult.data) {
      const duration = Math.round(performance.now() - startTime);
      console.log(
        `✅ [${requestId}] Primary success (${PRIMARY_MODEL}) in ${duration}ms`
      );
      return res.json(primaryResult.data);
    }

    // ========================================
    // FALLBACK MODEL ATTEMPT
    // ========================================

    console.log(
      `⚠️  [${requestId}] Primary failed, attempting fallback (${FALLBACK_MODEL})...`
    );

    const fallbackResult = await callModel(
      FALLBACK_MODEL,
      systemPrompt,
      message,
      requestId
    );

    if (fallbackResult.ok && fallbackResult.data) {
      const duration = Math.round(performance.now() - startTime);
      console.log(
        `✅ [${requestId}] Fallback success (${FALLBACK_MODEL}) in ${duration}ms`
      );
      return res.json({ ...fallbackResult.data, fallback: true });
    }

    // ========================================
    // BOTH MODELS FAILED - EMOTIONAL RECOVERY
    // ========================================

    const duration = Math.round(performance.now() - startTime);
    console.log(
      `❌ [${requestId}] Both models failed after ${duration}ms → Emotional recovery activated`
    );

    const recovered: RecoveryResponse =
      LumenEmotionalRecovery.recoverFromCompleteFailure(
        PRIMARY_MODEL,
        FALLBACK_MODEL
      );

    const response: LumenResponse = {
      reply: recovered.reply,
      reasoning: recovered.reasoning,
      efv: recovered.efv,
      esi: recovered.esi,
      tone: recovered.tone,
      model: recovered.model,
      recoveryType: recovered.recoveryType,
    };

    return res.json(response);
  }
);

// ========================================
// MODEL CALL FUNCTION
// ========================================

async function callModel(
  model: string,
  prompt: string,
  userMessage: string,
  requestId: string
): Promise<{ ok: boolean; data?: LumenResponse }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://github.com/AlekseyTsygankovGameMode/Lumen",
        "X-Title": "Lumen v1.0 (Alpha)",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userMessage },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // ========================================
    // HTTP ERROR CHECK
    // ========================================

    if (!response.ok) {
      console.error(
        `❌ [${requestId}] ${model} HTTP error: ${response.status}`
      );
      return { ok: false };
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";

    // ========================================
    // 🌙 EMPTY RESPONSE RECOVERY
    // ========================================

    if (!raw) {
      console.warn(
        `⚠️  [${requestId}] ${model} returned empty output → Adaptive recovery`
      );
      const recovered = LumenEmotionalRecovery.recoverFromEmpty(model);
      return {
        ok: true,
        data: {
          reply: recovered.reply,
          reasoning: recovered.reasoning,
          efv: recovered.efv,
          esi: recovered.esi,
          tone: recovered.tone,
          model: recovered.model,
          recoveryType: recovered.recoveryType,
        },
      };
    }

    // ========================================
    // JSON PARSING
    // ========================================

    let parsed: {
      reply?: string;
      reasoning?: string[];
      tone?: ToneType;
    };

    try {
      parsed = JSON.parse(raw);

      // Validate structure
      if (!parsed.reply || !parsed.tone) {
        console.warn(
          `⚠️  [${requestId}] ${model} returned incomplete JSON structure`
        );
        parsed = {
          reply: parsed.reply || raw,
          reasoning:
            parsed.reasoning && parsed.reasoning.length > 0
              ? parsed.reasoning
              : ["Incomplete response structure"],
          tone: (parsed.tone as ToneType) || "neutral",
        };
      }
    } catch (error) {
      console.error(
        `❌ [${requestId}] ${model} JSON parse failed → Adaptive recovery`
      );
      const recovered = LumenEmotionalRecovery.recoverFromParseFail(
        raw,
        model
      );
      return {
        ok: true,
        data: {
          reply: recovered.reply,
          reasoning: recovered.reasoning,
          efv: recovered.efv,
          esi: recovered.esi,
          tone: recovered.tone,
          model: recovered.model,
          recoveryType: recovered.recoveryType,
        },
      };
    }

    // ========================================
    // SUCCESS - CALCULATE METRICS
    // ========================================

    const efv = toneToEFV(parsed.tone!);
    const esi = calculateESI(efv.engagement);

    return {
      ok: true,
      data: {
        reply: parsed.reply!,
        reasoning:
          parsed.reasoning && parsed.reasoning.length > 0
            ? parsed.reasoning
            : ["Direct model output"],
        efv,
        esi,
        tone: parsed.tone!,
        model,
      },
    };
  } catch (err: any) {
    clearTimeout(timeoutId);

    // ========================================
    // 🌙 TIMEOUT RECOVERY
    // ========================================

    if (err?.name === "AbortError") {
      console.error(
        `⏱️  [${requestId}] ${model} timeout after ${TIMEOUT_MS}ms → Adaptive recovery`
      );
      const recovered = LumenEmotionalRecovery.recoverFromTimeout(model);
      return {
        ok: true,
        data: {
          reply: recovered.reply,
          reasoning: recovered.reasoning,
          efv: recovered.efv,
          esi: recovered.esi,
          tone: recovered.tone,
          model: recovered.model,
          recoveryType: recovered.recoveryType,
        },
      };
    }

    // ========================================
    // UNKNOWN ERROR
    // ========================================

    console.error(
      `❌ [${requestId}] ${model} unknown error:`,
      err?.message || err
    );
    return { ok: false };
  }
}

export default router;