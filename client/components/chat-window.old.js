// /client/components/chat-window.js

export function appendMsg(root, who, text, reasoning = "", tone = "neutral") {
  if (!root) return;

  const msg = document.createElement("div");
  msg.className = `msg ${who}`;
  msg.style.opacity = "0";
  msg.style.transition = "opacity 0.4s ease";

  // безопасно экранируем текст
  const safeText = text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  msg.innerHTML = `
    <div class="bubble tone-${tone}">
      ${safeText}
      ${reasoning ? `<div class="reasoning-note">${reasoning}</div>` : ""}
    </div>
  `;

  root.appendChild(msg);
  root.scrollTop = root.scrollHeight;

  // анимация появления
  requestAnimationFrame(() => {
    msg.style.opacity = "1";
  });

  // ограничиваем историю (например, 50 сообщений)
  const msgs = root.querySelectorAll(".msg");
  if (msgs.length > 50) root.removeChild(msgs[0]);
}