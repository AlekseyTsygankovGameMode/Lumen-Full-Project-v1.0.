// /api/turn_eval.ts — Express router (final, robust)
import { Router, Request, Response } from "express";
import { sql, hasDb, ensureSchema } from "../db/client.js";

type EFV = { engagement: number; tone: string; esi: number };

type TurnEvalBody = {
  session_id: string;
  turn_index: number;
  efv: EFV;
  reasoning?: string;
};

const memStore: TurnEvalBody[] = []; // fallback без БД
const router = Router();

// Helpers
const clamp01 = (n: any) => Math.max(0, Math.min(1, Number(n) || 0));
const clampESI = (n: any) => Math.max(0, Math.min(100, Math.round(Number(n) || 0)));
const normTone = (t: any) =>
  (["calm", "empathetic", "curious", "assertive", "neutral"] as const).includes((t || "").toLowerCase() as any)
    ? (t || "").toLowerCase()
    : "neutral";

const isFiniteInt = (v: any) => Number.isFinite(Number(v)) && Number(v) === Math.trunc(Number(v));

// POST /api/turn_eval — сохраняет EFV-снимок
router.post("/", async (req: Request, res: Response) => {
  try {
    const { session_id, turn_index, efv, reasoning } = (req.body || {}) as TurnEvalBody;

    if (!session_id || !isFiniteInt(turn_index) || !efv) {
      return res.status(400).json({
        ok: false,
        error: "bad_request",
        detail: "session_id, turn_index (int) и efv обязательны",
      });
    }

    // нормализуем EFV
    const safeEFV: EFV = {
      engagement: clamp01(efv.engagement),
      tone: normTone(efv.tone),
      esi: clampESI(efv.esi),
    };

    if (hasDb && sql) {
      await ensureSchema();
      await sql/*sql*/`
        insert into rounds (session_id, turn_index, efv, reasoning, created_at)
        values (${session_id}, ${turn_index}, ${sql.json(safeEFV)}, ${reasoning ?? null}, now())
      `;
    } else {
      memStore.push({ session_id, turn_index, efv: safeEFV, reasoning });
    }

    return res.json({ ok: true });
  } catch (e: any) {
    console.error("turn_eval error:", e);
    return res
      .status(500)
      .json({ ok: false, error: "failed_to_store_turn", detail: e?.message || String(e) });
  }
});

// GET /api/turn_eval?limit=20 — получает последние EFV-снимки
router.get("/", async (req: Request, res: Response) => {
  try {
    let limit = Number(req.query.limit ?? 20);
    if (!Number.isFinite(limit)) limit = 20;
    limit = Math.min(Math.max(1, limit), 200);

    if (hasDb && sql) {
      await ensureSchema();
      const recent = await sql/*sql*/`
        select session_id, turn_index, efv, reasoning, created_at
        from rounds
        order by created_at desc
        limit ${limit}
      `;
      return res.json({ ok: true, rounds: recent });
    }

    // fallback — данные из памяти
    const recent = memStore.slice(-limit).map((r, i, arr) => ({
      session_id: r.session_id,
      turn_index: r.turn_index,
      efv: r.efv,
      reasoning: r.reasoning ?? null,
      created_at: new Date(Date.now() - (arr.length - 1 - i) * 1000).toISOString(),
    })).reverse();

    return res.json({ ok: true, rounds: recent });
  } catch (e: any) {
    console.error("turn_eval get error:", e);
    return res
      .status(500)
      .json({ ok: false, error: "failed_to_fetch_turns", detail: e?.message || String(e) });
  }
});

export default router;