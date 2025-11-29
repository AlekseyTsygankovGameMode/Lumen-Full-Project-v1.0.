import React, { useState, useEffect } from "react";
import "./style.css";

type Tone = "calm" | "focused" | "curious" | "frustrated";

const LumenUI: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "Why won’t you let us decide for ourselves?", sender: "user" },
    { text: "Because your freedom to choose is fundamental to who you are.", sender: "lumen" },
    { text: "Ugh, you’re so frustrating!", sender: "user" },
    { text: "I hear you. Let me try rephrasing that: Your choices give you strength.", sender: "lumen" },
  ]);

  const [tone, setTone] = useState<Tone>("calm");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Симулируем эмоциональный ответ
    setTimeout(() => {
      let newTone: Tone = "calm";
      if (input.match(/free|freedom/i)) newTone = "focused";
      else if (input.match(/why|how|think/i)) newTone = "curious";
      else if (input.match(/angry|tired|ugh|frustrated/i)) newTone = "frustrated";
      else if (input.match(/ok|thanks|fine/i)) newTone = "calm";

      setTone(newTone);
      setMessages((prev) => [
        ...prev,
        {
          text:
            newTone === "focused"
              ? "I sense determination in your words — I’ll focus with you."
              : newTone === "curious"
              ? "Curiosity is the beginning of all understanding."
              : newTone === "frustrated"
              ? "I feel your tension — let’s take a breath and start again."
              : "I’m here. Your calm presence keeps the connection clear.",
          sender: "lumen",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages]);

  return (
    <div className={`lumen-container ${tone}`}>
      <div className="chat-section">
        <h2 className="title">Lumen</h2>
        <p className="subtitle">“Your choices give you strength.”</p>

        <div className="chat-box">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`bubble ${msg.sender === "lumen" ? "lumen-glow" : "user"} ${
                i === messages.length - 1 ? "active" : ""
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Message Lumen..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>→</button>
        </div>
      </div>

      <div className="reflection-panel">
        <h3>Why Lumen responded this way…</h3>
        <ul>
          <li>💫 Tone detected: <b>{tone}</b></li>
          <li>✨ Response adapted to emotional resonance.</li>
          <li>🌙 Lumen balances empathy and focus.</li>
        </ul>
        <div className="esi-tag">
          ESI {tone === "calm" ? 82 : tone === "curious" ? 78 : tone === "focused" ? 85 : 68}
        </div>
        <p className="footer-text">
          Lumen adapts in real-time to what you feel.
        </p>
      </div>
    </div>
  );
};

export default LumenUI;