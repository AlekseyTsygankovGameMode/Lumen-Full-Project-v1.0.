// /db/client.ts
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const url =
  process.env.DATABASE_URL ||
  process.env.SUPABASE_DB_URL ||
  "";

export const hasDb = Boolean(url);

export const sql = hasDb
  ? postgres(url, { prepare: false, idle_timeout: 20 })
  : null;

export const db = hasDb ? drizzle(sql!) : null;

// создаём все необходимые таблицы, если их нет
export async function ensureSchema() {
  if (!sql) return;

  // 1) rounds — EFV снимки по ходу сессии (Phase II)
  await sql/*sql*/`
    create table if not exists rounds (
      id bigserial primary key,
      session_id varchar(64) not null,
      turn_index integer not null,
      efv jsonb not null,
      reasoning text,
      created_at timestamp default now() not null
    );
  `;

  // 2) matches — финализация сессий
  await sql/*sql*/`
    create table if not exists matches (
      id bigserial primary key,
      session_id varchar(64) not null,
      mode varchar(32) not null,
      verdict varchar(16) not null,
      esi_avg numeric,
      elo_delta integer default 0,
      trajectory jsonb,
      created_at timestamp default now() not null
    );
  `;

  // 3) ratings — агрегированная статистика по клиенту
  await sql/*sql*/`
    create table if not exists ratings (
      client_id varchar(64) primary key,
      elo integer default 1000,
      wins integer default 0,
      losses integer default 0,
      esi_avg numeric,
      updated_at timestamp default now() not null
    );
  `;
}