// /db/schema.ts

import { pgTable, varchar, integer, jsonb, timestamp, doublePrecision } from "drizzle-orm/pg-core";

// 🌀 Таблица EFV-снимков каждого хода
export const rounds = pgTable("rounds", {
  session_id: varchar("session_id", { length: 64 }),
  turn_index: integer("turn_index"),
  efv: jsonb("efv"), // { engagement, tone, esi }
  reasoning: varchar("reasoning", { length: 512 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow()
});

// 📊 Матч-сессия и итоговые метрики
export const matches = pgTable("matches", {
  session_id: varchar("session_id", { length: 64 }).primaryKey(),
  mode: varchar("mode", { length: 32 }),
  verdict: varchar("verdict", { length: 64 }),
  esi_avg: integer("esi_avg"),
  elo_delta: integer("elo_delta"),
  trajectory: jsonb("trajectory"), // массив ESI-точек: [{turn, tone, esi}]
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow()
});

// 🏆 Общий рейтинг по игроку / клиенту
export const ratings = pgTable("ratings", {
  client_id: varchar("client_id", { length: 64 }).primaryKey(),
  elo: integer("elo").default(1000),
  wins: integer("wins").default(0),
  losses: integer("losses").default(0),
  esi_avg: doublePrecision("esi_avg").default(70)
});
