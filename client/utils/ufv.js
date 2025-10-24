// /client/utils/ufv.js

export function detectUFV() {
  const now = performance.now();

  if (!window._ufv) {
    window._ufv = {
      last: now,
      presses: 0,
      engagement: 0.5,
      idle: 0
    };
    document.addEventListener("keydown", () => window._ufv.presses++);
  }

  const ufv = window._ufv;
  const dt = (now - ufv.last) / 1000;
  ufv.last = now;

  // активность за период
  const activity = Math.min(1, ufv.presses / 15);
  const idle = Math.min(1, dt / 5);

  // сглаживаем вовлечённость (чтобы не прыгала)
  ufv.engagement = ufv.engagement * 0.8 + (0.3 + activity * 0.7) * 0.2;
  ufv.idle = idle;
  ufv.presses = 0;

  return ufv;
}