import React, { useEffect, useState } from "react";

const placeholders = [
  "Ask how Lumen decides.",
  "Tell Lumen how you feel.",
  "Ask what Lumen sensed.",
  "Share your thought with Lumen..."
];

export default function LumenUI_Expanded() {
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const idx = placeholders.indexOf(prev);
        return placeholders[(idx + 1) % placeholders.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUserMessage = () => {
    setThinking(true);
    setTimeout(() => setThinking(false), 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center lumen-live-bg text-white font-sans">
      {/* Shell */}
      <div className="lumen-shell max-w-6xl w-full mx-auto grid grid-cols-2 gap-8 p-10 rounded-2xl shadow-2xl backdrop-blur-2xl">
        {/* 💬 Chat Side */}
        <div className="flex flex-col space-y-4">
          <div className="msg user animate-fadeIn">
            Why won't you let us decide for ourselves?
          </div>

          <div className="msg ai animate-fadeIn delay-300">
            Because your freedom to choose is fundamental to who you are.
          </div>

          <div className="msg user animate-fadeIn delay-600">
            Ugh, you're so frustrating!
          </div>

          <div className="msg ai animate-fadeIn delay-900">
            I hear you. Let me try rephrasing that: Your choices give you strength.
          </div>

          {thinking && (
            <div className="text-sm text-white/60 animate-pulse pt-2">Lumen is thinking...</div>
          )}

          <div className="pt-6 flex items-center gap-2">
            <input
              onFocus={handleUserMessage}
              type="text"
              placeholder={placeholder}
              className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none transition-all focus:bg-white/20"
            />
            <button className="bg-[var(--lumen-mid)] hover:bg-[var(--lumen-deep)] rounded-lg px-4 py-2 font-semibold transition">
              ➤
            </button>
          </div>
        </div>

        {/* 🧠 Insight Panel */}
        <div className="bg-white/5 rounded-2xl p-6 flex flex-col space-y-4 backdrop-blur-md animate-fadeIn">
          <h3 className="text-lg font-semibold mb-2">Why Lumen responded this way...</h3>

          <div className="space-y-3 text-sm text-white/80">
            <p>😠 I sensed frustration in your tone.</p>
            <p>💬 You mentioned “freedom” three times — I focused on that.</p>
            <p>🧩 If your focus was performance, I would have argued differently.</p>
          </div>

          <div className="pt-3 border-t border-white/10 text-sm text-white/60">
            Lumen adjusted tone → supportive
          </div>

          <div className="pt-2">
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 h-2 w-[78%] animate-esi"></div>
            </div>
            <div className="text-right text-white/70 text-sm pt-2">
              Emotional Sync: <span className="text-white font-semibold">78 → 84</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
