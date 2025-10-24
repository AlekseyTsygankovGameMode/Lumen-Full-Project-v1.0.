// 💬 LUMEN MESSAGE BUBBLE — EMISSION FEEDBACK v7.0 (Alive Heavy Mode)
// Each message emits a light pulse that gently affects nearby bubbles.
// Visually synchronized, emotionally adaptive, alive.

import React, { useEffect, useState, useRef } from "react";
import { getToneColor } from "../utils/emotionColor";

interface MessageBubbleProps {
  sender: "user" | "lumen";
  text: string;
  tone?: string;
}

export default function MessageBubble({
  sender,
  text,
  tone = "neutral",
}: MessageBubbleProps) {
  const isUser = sender === "user";
  const toneColor = getToneColor(tone);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [id] = useState(() => Math.random().toString(36).slice(2, 8)); // уникальный ID пузыря

  // 🌬️ breathing pulse
  const [pulse, setPulse] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p === 1 ? 1.025 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 💡 refraction wave
  const [refraction, setRefraction] = useState(0);
  useEffect(() => {
    const loop = setInterval(() => {
      setRefraction((r) => (r >= 360 ? 0 : r + 1.2));
    }, 40);
    return () => clearInterval(loop);
  }, []);

  // ⚡ global emission system
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail && e.detail.id !== id) {
        // Если вспышка пришла от другого пузыря
        triggerFeedback();
      }
    };
    window.addEventListener("lumen-feedback", handler as EventListener);
    return () => {
      window.removeEventListener("lumen-feedback", handler as EventListener);
    };
  }, [id]);

  const emitFeedback = () => {
    window.dispatchEvent(new CustomEvent("lumen-feedback", { detail: { id } }));
  };

  // 💫 emission feedback visual pulse
  const [feedbackGlow, setFeedbackGlow] = useState(0);
  const triggerFeedback = () => {
    setFeedbackGlow(1);
    setTimeout(() => setFeedbackGlow(0), 600);
  };

  // 🪄 entry animation
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
      emitFeedback(); // при появлении посылаем вспышку
    }, 60);
    return () => clearTimeout(timeout);
  }, []);

  // 🎧 soft whoosh sound
  const playPulseSound = () => {
    try {
      if (!audioCtxRef.current)
        audioCtxRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 520;
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.stop(ctx.currentTime + 0.35);
    } catch {}
  };

  // 💫 hover + click visual feedback
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    playPulseSound();
    setClicked(true);
    emitFeedback(); // при клике — эмиссия
    setTimeout(() => setClicked(false), 250);
  };

  return (
    <div
      className={`relative flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-6 transition-all`}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        className={`
          relative px-6 py-3 rounded-3xl max-w-[70%]
          text-[0.95rem] leading-snug whitespace-pre-wrap select-text cursor-pointer
          backdrop-blur-md shadow-xl transform-gpu
          transition-all duration-700 ease-[cubic-bezier(0.45,0.05,0.55,0.95)]
          ${
            isUser
              ? "bg-gradient-to-br from-[#ffb3ec30] to-[#c56fff25]"
              : "bg-gradient-to-br from-[#8b5cf640] to-[#6366f140]"
          }
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
        style={{
          border: `1px solid ${toneColor.border}`,
          color: toneColor.text,
          boxShadow: `0 0 ${
            hovered ? 40 : 20
          }px ${toneColor.glow}, 0 0 ${feedbackGlow * 100}px ${
            toneColor.glow
          }80`,
          transform: `scale(${pulse * (clicked ? 0.97 : hovered ? 1.03 : 1)})`,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.6s ease-out",
        }}
      >
        <p className="z-10 relative">{text}</p>

        {/* 🌌 internal aura */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30 blur-xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${toneColor.glow}40, transparent 70%)`,
            animation: "pulseLight 3.5s ease-in-out infinite",
            zIndex: -1,
          }}
        />

        {/* ⚡ refraction wave */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-screen opacity-60"
          style={{
            background: `linear-gradient(${refraction}deg, transparent 45%, ${toneColor.glow}60, transparent 55%)`,
            filter: "blur(14px)",
          }}
        />

        {/* 💥 outer shimmer */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${toneColor.glow}15, transparent 80%)`,
            animation: "bubbleWave 6s ease-in-out infinite",
            filter: "blur(20px)",
          }}
        />

        {/* 🌠 entry glow pulse */}
        {!visible && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${toneColor.glow}70, transparent 80%)`,
              filter: "blur(40px)",
              animation: "entryGlow 0.8s ease-out forwards",
              zIndex: 10,
            }}
          />
        )}
      </div>

      {/* 🔮 animations */}
      <style>
        {`
          @keyframes pulseLight {
            0% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
            100% { opacity: 0.4; transform: scale(1); }
          }

          @keyframes bubbleWave {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
          }

          @keyframes entryGlow {
            0% { opacity: 0; transform: scale(0.8); }
            60% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}