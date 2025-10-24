// /api/session_end.ts — Express router (final, no updated_at)
import { Router, Request, Response } from "express";
import { sql, hasDb, ensureSchema } from "../db/client.js";

type Verdict = "win" | "loss" | "draw" | "growth" | "decline" | "neutral";

type SessionEndBody = {
  session_id: string;
  mode?: string;
  verdict?: Verdict;
  esi_avg?: number;
  elo_delta?: number;
  trajectory?: number[];
};

const memMatches: any[] = [];
const memRatings = new Map<string, { elo: number; wins: number; losses: number; esi_avg: number | null }>();

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      session_id,
      mode = "lumen5",
      verdict = "neutral",
      esi_avg = 0,
      elo_delta = 0,
      trajectory = [],
    } = (req.body || {}) as SessionEndBody;

    if (!session_id) {
      return res.status(400).json({ ok: false, error: "session_id_required" });
    }

    const client_id = session_id.slice(0, 12);

    if (hasDb && sql) {
      await ensureSchema();

      // 🧩 insert match
      await sql/*sql*/`
        insert into matches (session_id, mode, verdict, esi_avg, elo_delta, trajectory, created_at)
        values (${session_id}, ${mode}, ${verdict}, ${esi_avg}, ${elo_delta}, ${sql.json(trajectory)}, now())
      `;

      // 🏆 upsert rating
      const existing = await sql/*sql*/`
        select client_id, elo, wins, losses, esi_avg
        from ratings
        where client_id = ${client_id}
        limit 1
      `;
      const old = existing[0] as { elo: number; wins: number; losses: number; esi_avg: number | null } | undefined;

      const newElo = (old?.elo ?? 1000) + (elo_delta || 0);
      const wins   = (old?.wins ?? 0) + (verdict === "growth" || verdict === "win" ? 1 : 0);
      const losses = (old?.losses ?? 0) + (verdict === "decline" || verdict === "loss" ? 1 : 0);
      const newEsi = typeof esi_avg === "number" ? esi_avg : (old?.esi_avg ?? null);

      await sql/*sql*/`
        insert into ratings (client_id, elo, wins, losses, esi_avg)
        values (${client_id}, ${newElo}, ${wins}, ${losses}, ${newEsi})
        on conflict (client_id) do update set
          elo = excluded.elo,
          wins = excluded.wins,
          losses = excluded.losses,
          esi_avg = excluded.esi_avg
      `;
    } else {
      // fallback (no DB)
      memMatches.push({
        session_id, mode, verdict, esi_avg, elo_delta, trajectory,
        created_at: new Date().toISOString(),
      });
      const old = memRatings.get(client_id);
      const newElo = (old?.elo ?? 1000) + (elo_delta || 0);
      const wins   = (old?.wins ?? 0) + (verdict === "growth" || verdict === "win" ? 1 : 0);
      const losses = (old?.losses ?? 0) + (verdict === "decline" || verdict === "loss" ? 1 : 0);
      const newEsi = typeof esi_avg === "number" ? esi_avg : (old?.esi_avg ?? null);
      memRatings.set(client_id, { elo: newElo, wins, losses, esi_avg: newEsi });
    }

    const trust_delta = Number(((elo_delta || 0) / 2).toFixed(1));

    return res.json({
      ok: true,
      summary: { session_id, mode, verdict, esi_avg, elo_delta, trajectory },
      trust_delta,
    });
  } catch (e: any) {
    console.error("session_end error:", e);
    return res
      .status(500)
      .json({ ok: false, error: "failed_to_finalize_session", detail: e?.message || String(e) });
  }
});

// 🔍 GET — просто посмотреть последние матчи (debug)
router.get("/", async (_req, res) => {
  try {
    if (hasDb && sql) {
      const rows = await sql/*sql*/`
        select session_id, mode, verdict, esi_avg, elo_delta, trajectory, created_at
        from matches order by created_at desc limit 20
      `;
      return res.json({ ok: true, matches: rows });
    }
    return res.json({ ok: true, matches: memMatches.slice(-20).reverse() });
  } catch (e: any) {
    console.error("session_end get error:", e);
    res.status(500).json({ ok: false, error: "failed_to_fetch_matches", detail: e?.message || String(e) });
  }
});

export default router;