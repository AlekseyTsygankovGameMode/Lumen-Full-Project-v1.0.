// /client/script.js

import { appendMsg } from "./components/chat-window.js";
import { renderReasoningPanel } from "./components/reasoning-panel.js";
import { syncHarmonic } from "./utils/sync.js";

// DOM elements
const chatRoot = document.getElementById("chat-root");
const reasoningRoot = document.getElementById("reasoning-panel");

// Demo intro message (можно убрать)
setTimeout(() => sendMessage("Hi Lumen, what are you?"), 1000);

// --- отправка сообщений ---
async function sendMessage(text) {
  if (!text) return;

  appendMsg(chatRoot, "user", text);
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: text,
      mode: "lumen5",
      adaptivity: "collab"
    })
  });

  const data = await res.json();
  handleAPIResponse(data);
}

// --- обработка API-ответа ---
function handleAPIResponse(res) {
  appendMsg(chatRoot, "bot", res.reply, res.meta_reasoning, res.efv?.tone);
  renderReasoningPanel(reasoningRoot, res.reasoning, res.esi, res.efv?.tone);
  syncHarmonic(res.efv); // 💛 дыхание, звук, свет, гармония
}

// --- input handling ---
const form = document.getElementById("prompt-form");
const input = document.getElementById("prompt-input");

if (form && input) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;
    sendMessage(userText);
    input.value = "";
  });
}
// 🌈 Lumen Aura Auto-Tone — плавная смена эмоциональных состояний
const tones = ["calm", "curious", "empathetic", "focused"];
let current = 0;

function cycleTone() {
  document.body.dataset.tone = tones[current];
  current = (current + 1) % tones.length;
}

cycleTone(); // первое состояние сразу при запуске
setInterval(cycleTone, 30000); // смена каждые 30 секунд