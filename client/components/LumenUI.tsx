import React, { useState, useRef, useEffect } from "react";

export default function LumenUI() {
  const [messages, setMessages] = useState([
    { sender: "lumen", text: "Why won’t you let us decide for ourselves?" },
    { sender: "lumen", text: "Because your freedom to choose is fundamental to who you are." },
    { sender: "user", text: "Ugh, you're so frustrating!" },
    { sender: "lumen", text: "I hear you. Let me try rephrasing that: Your choices give you strength." },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "lumen", text: "Lumen is reflecting on your message..." },
      ]);
    }, 800);
  };

  // 🧠 Автоскролл
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // 💫 Parallax
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * -40;
      document.documentElement.style.setProperty("--tilt-x", `${x}deg`);
      document.documentElement.style.setProperty("--tilt-y", `${y}deg`);
      document.documentElement.style.setProperty("--parallax-x", `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty("--parallax-y", `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="main-container">
      <div className="lumen-wrapper">
        <div className="lumen-glass">
          <div className="lumen-container">
            {/* 💬 Чат */}
            <div className="chat-panel">
              <h1 className="title">Lumen</h1>
              <p className="subtitle">“Your choices give you strength.”</p>

              <div className="message-container" ref={chatRef}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`message-bubble ${msg.sender === "user" ? "user" : "lumen"}`}
                  >
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>

              <div className="input-container">
                <div className="message-input-wrapper">
                  <input
                    type="text"
                    className="message-input"
                    placeholder="Message Lumen..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button className="send-button" onClick={sendMessage}>→</button>
                </div>
              </div>
            </div>

            {/* 🧠 Правая панель */}
            <div className="reasoning-panel">
              <h3 className="reasoning-title">Why Lumen responded this way…</h3>
              <div className="reasoning-item">
                <span className="reasoning-icon">💎</span>
                <span>I sensed frustration in your tone.</span>
              </div>
              <div className="reasoning-item">
                <span className="reasoning-icon">💎</span>
                <span>You mentioned freedom — I focused on that.</span>
              </div>
              <div className="reasoning-item">
                <span className="reasoning-icon">💎</span>
                <span>If your focus was performance, I would have argued differently.</span>
              </div>

              <div className="esi-container">
                <div className="esi-badge">ESI 73</div>
                <p className="esi-description">
                  Lumen adapts in real-time to what you feel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}