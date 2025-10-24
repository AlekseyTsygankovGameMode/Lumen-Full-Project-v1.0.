// 🌌 LUMEN CHAT — conscious dialogue core (final integration)
// Использует useLumenChat: единый эмоциональный поток (EFV + Resonance + ESI)

import { useLumenChat } from "../hooks/useLumenChat";
import MessageBubble from "./MessageBubble";
import ReasoningPanel from "./ReasoningPanel";
import MetricsOverlay from "./MetricsOverlay";
import { getToneColor } from "../utils/toneColors";

export default function Chat() {
  const {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    bottomRef,
    efv,
    resonance,
    esi,
    currentTone,
  } = useLumenChat();

  const toneColor = getToneColor(currentTone);

  return (
    <div
      className="relative flex w-full h-[700px] overflow-hidden rounded-3xl bg-[#0b0018] text-white"
      style={{
        transition: "all 0.8s ease",
        boxShadow: `0 0 100px ${toneColor.glow}30`,
      }}
    >
      {/* 💫 Динамическая аура */}
      <MetricsOverlay tone={currentTone} esi={esi} />

      {/* 🩵 Левая панель — поток сообщений */}
      <div className="flex flex-col justify-between w-2/3 p-8 relative z-10">
        {/* Скроллируемая лента сообщений */}
        <div
          className="flex-1 overflow-y-auto pr-2 transition-all duration-500 scroll-smooth"
          style={{
            maxHeight: "100%",
            scrollBehavior: "smooth",
            filter: `brightness(${0.9 + resonance.amplitude * 0.2})`,
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              sender={msg.sender}
              text={msg.text}
              tone={msg.tone}
            />
          ))}

          {isTyping && (
            <div className="text-white/50 text-sm italic animate-pulse mt-2">
              Lumen is reflecting…
            </div>
          )}

          {/* 🔽 якорь для автопрокрутки */}
          <div ref={bottomRef} className="h-[1px]" />
        </div>

        {/* 💬 Поле ввода */}
        <div className="mt-6 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Message Lumen..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            style={{
              boxShadow: `0 0 20px ${toneColor.glow}20`,
              backdropFilter: "blur(10px)",
            }}
          />
          <button
            onClick={sendMessage}
            className="px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600/60 to-pink-500/60 hover:from-purple-500 hover:to-pink-400 shadow-lg transition-all"
            style={{
              boxShadow: `0 0 20px ${toneColor.glow}40`,
              transform: `scale(${1 + resonance.amplitude * 0.03})`,
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* 🧠 Правая панель — объяснение мышления */}
      <ReasoningPanel
        tone={currentTone}
        reasoning={[
          `Resonance phase: ${resonance.phase}`,
          `Frequency: ${resonance.frequency}`,
          `Tone detected: ${currentTone}`,
        ]}
        esi={esi}
      />

      {/* 🌠 Световой контур */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700"
        style={{
          boxShadow: `0 0 ${80 + resonance.amplitude * 80}px ${toneColor.glow}40`,
          opacity: 0.8,
          filter: `blur(${10 + resonance.amplitude * 10}px)`,
        }}
      />
    </div>
  );
}