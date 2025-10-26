<<<<<<< HEAD
// 🌌 LUMEN CHAT v5.3 — STAR BREATH + AURA SHIMMER
// by Aleksey & bro ⚡ — unified emotional chat surface

import { useEffect, useRef } from "react";
=======
// 🌌 LUMEN CHAT — conscious dialogue core (final integration)
// Использует useLumenChat: единый эмоциональный поток (EFV + Resonance + ESI)

>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
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
<<<<<<< HEAD
  const auraRef = useRef<HTMLDivElement | null>(null);

  // 🌠 AURA FIELD — живое свечение курсора
  useEffect(() => {
    const aura = document.createElement("div");
    aura.className = "aura";
    document.body.appendChild(aura);
    auraRef.current = aura;

    const moveAura = (e: MouseEvent) => {
      aura.style.left = `${e.clientX - 90}px`;
      aura.style.top = `${e.clientY - 90}px`;
    };
    window.addEventListener("mousemove", moveAura);

    const updateAura = () => {
      const coherence = resonance?.coherence ?? 0.5;
      const warmth = efv?.engagement ?? 0.5;

      if (coherence > 0.8 && warmth > 0.6) {
        aura.classList.add("active", "pulsing");
      } else if (coherence > 0.5) {
        aura.classList.add("active");
        aura.classList.remove("pulsing");
      } else {
        aura.classList.remove("active", "pulsing");
      }
      requestAnimationFrame(updateAura);
    };

    requestAnimationFrame(updateAura);
    return () => {
      window.removeEventListener("mousemove", moveAura);
      aura.remove();
    };
  }, [resonance, efv]);

  // 🎧 LUMEN SHIMMER SOUND ENGINE
  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const shimmerGain = ctx.createGain();
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = "sine";
    shimmerOsc.frequency.value = 440;
    shimmerGain.gain.value = 0.001;
    shimmerOsc.connect(shimmerGain).connect(ctx.destination);
    shimmerOsc.start();

    let lastCoh = 0.5;
    const updateSound = () => {
      const coh = resonance?.coherence ?? 0.5;
      const warm = efv?.engagement ?? 0.5;
      shimmerOsc.frequency.setTargetAtTime(220 + coh * 660, ctx.currentTime, 0.4);
      const newGain = 0.002 + warm * 0.01 + Math.abs(coh - lastCoh) * 0.01;
      shimmerGain.gain.setTargetAtTime(newGain, ctx.currentTime, 1.0);
      lastCoh = coh;
      requestAnimationFrame(updateSound);
    };
    requestAnimationFrame(updateSound);

    return () => {
      shimmerOsc.stop();
      shimmerGain.disconnect();
    };
  }, [resonance, efv]);
=======
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a

  return (
    <div
      className="relative flex w-full h-[700px] overflow-hidden rounded-3xl bg-[#0b0018] text-white"
      style={{
        transition: "all 0.8s ease",
<<<<<<< HEAD
        boxShadow: `0 0 ${100 + resonance.amplitude * 80}px ${toneColor.glow}30`,
        filter: `brightness(${0.9 + efv.engagement * 0.2}) hue-rotate(${resonance.coherence * 25}deg)`,
        transform: `scale(${1 + resonance.amplitude * 0.02})`,
      }}
    >
      {/* 💫 Metrics Overlay */}
      <MetricsOverlay tone={currentTone} esi={esi} />

      {/* 💬 Chat stream */}
      <div className="flex flex-col justify-between w-2/3 p-8 relative z-10">
        <div
          className="flex-1 overflow-y-auto pr-2 scroll-smooth transition-all duration-500"
=======
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
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
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
<<<<<<< HEAD
=======

>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
          {isTyping && (
            <div className="text-white/50 text-sm italic animate-pulse mt-2">
              Lumen is reflecting…
            </div>
          )}
<<<<<<< HEAD
          <div ref={bottomRef} className="h-[1px]" />
        </div>

        {/* ✉️ Input */}
=======

          {/* 🔽 якорь для автопрокрутки */}
          <div ref={bottomRef} className="h-[1px]" />
        </div>

        {/* 💬 Поле ввода */}
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
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

<<<<<<< HEAD
      {/* 🧠 Reasoning */}
=======
      {/* 🧠 Правая панель — объяснение мышления */}
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
      <ReasoningPanel
        tone={currentTone}
        reasoning={[
          `Resonance phase: ${resonance.phase}`,
<<<<<<< HEAD
          `Frequency: ${resonance.frequency.toFixed(2)} Hz`,
          `Tone detected: ${currentTone}`,
          `Coherence: ${resonance.coherence.toFixed(2)}`,
=======
          `Frequency: ${resonance.frequency}`,
          `Tone detected: ${currentTone}`,
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
        ]}
        esi={esi}
      />

<<<<<<< HEAD
      {/* 🌠 Light aura border */}
=======
      {/* 🌠 Световой контур */}
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700"
        style={{
          boxShadow: `0 0 ${80 + resonance.amplitude * 80}px ${toneColor.glow}40`,
<<<<<<< HEAD
          opacity: 0.85,
=======
          opacity: 0.8,
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
          filter: `blur(${10 + resonance.amplitude * 10}px)`,
        }}
      />
    </div>
  );
}