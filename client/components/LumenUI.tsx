// 🌌 LumenUI v5.0 — STAR BREATH + AURA FIELD
// by Aleksey & bro ⚡ — visual-emotional synchrony layer

import React, { useEffect, useRef, useState } from "react";
import "../styles/LumenUI.css";
import { lumenThinkCycle } from "../../core/engine/lumenThinkCycle";
import { getESI } from "../../core/engine/stateManager";
import useHeartSync from "../../core/HeartSyncCore";

export default function LumenUI() {
  // 💭 UI state
  const [messages, setMessages] = useState<{ sender: "lumen" | "user"; text: string }[]>([
    { sender: "lumen", text: "Why won’t you let us decide for ourselves?" },
    { sender: "lumen", text: "Because your freedom to choose is fundamental to who you are." },
    { sender: "user", text: "Ugh, you're so frustrating!" },
    { sender: "lumen", text: "I hear you. Let me try rephrasing that: Your choices give you strength." },
  ]);

  const [input, setInput] = useState("");
  const [reasoning, setReasoning] = useState<string[]>([]);
  const [lumenThought, setLumenThought] = useState("System neutral — awaiting reflection.");
  const [intent, setIntent] = useState("observe and calibrate");
  const [emotion, setEmotion] = useState("neutral");
  const [esi, setEsi] = useState<number>(getESI());
  const [stability, setStability] = useState(1.0);
  const [coherence, setCoherence] = useState(0.8);
  const chatRef = useRef<HTMLDivElement>(null);

  // 💓 Heart resonance
  const resonance = useHeartSync({
    tone: emotion,
    esi,
    efv: { tone: emotion, engagement: Math.min(1, esi / 100) },
  });

  // 💬 Send message
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userInput = input;
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setInput("");
    setMessages((prev) => [...prev, { sender: "lumen", text: "..." }]);

    try {
      const result = await lumenThinkCycle(userInput);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "lumen", text: result.reply },
        { sender: "lumen", text: `🪞 ${result.lumenThought}` },
      ]);
      setEmotion(result.emotion);
      setEsi(Number(result.esi));
      setReasoning(result.reasoning);
      setLumenThought(result.lumenThought);
      setStability(result.stability);
      setCoherence(result.coherence);
      setIntent(result.reasoning.find((r) => r.includes("Intent")) || "observe and calibrate");
    } catch (err) {
      console.error("💥 Lumen reasoning failed:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "lumen", text: "Hmm… something disrupted my reflection." },
      ]);
    }
  };

  // 📜 Auto-scroll
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  // 🌈 Parallax & breathing motion
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * -15;
      const driftX = (e.clientX / window.innerWidth - 0.5) * 10;
      const driftY = (e.clientY / window.innerHeight - 0.5) * 10;
      document.documentElement.style.setProperty("--tilt-x", `${x}deg`);
      document.documentElement.style.setProperty("--tilt-y", `${y}deg`);
      document.documentElement.style.setProperty("--shift-x", `${driftX}px`);
      document.documentElement.style.setProperty("--shift-y", `${driftY}px`);
      document.documentElement.style.setProperty("--parallax-x", `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty("--parallax-y", `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener("mousemove", handleMove);

    const updateVisuals = () => {
      document.documentElement.style.setProperty("--pulse-scale", `${1 + resonance.amplitude * 0.3}`);
      document.documentElement.style.setProperty("--pulse-warmth", `${resonance.warmth}`);
      document.documentElement.style.setProperty("--pulse-coherence", `${resonance.coherence}`);
      requestAnimationFrame(updateVisuals);
    };
    requestAnimationFrame(updateVisuals);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [resonance]);

  // 🌟 Spark + Sound feedback
  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const triggerSparkSound = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = 880 + Math.random() * 120;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    };

    const sparkInterval = setInterval(() => {
      const coherence = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pulse-coherence")) || 0.5;
      const warmth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pulse-warmth")) || 0.5;
      if (coherence > 0.85 || warmth > 0.85) {
        document.body.classList.add("spark-active");
        triggerSparkSound();
        const spark = document.createElement("div");
        spark.classList.add("spark");
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.top = `${Math.random() * 100}%`;
        document.querySelector(".lumen-wrapper")?.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
        setTimeout(() => document.body.classList.remove("spark-active"), 800);
      }
    }, 1500);

    return () => clearInterval(sparkInterval);
  }, []);
// 🎧 LUMEN SHIMMER SOUND ENGINE v5.2
useEffect(() => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const shimmerGain = ctx.createGain();
  const shimmerOsc = ctx.createOscillator();

  shimmerOsc.type = "sine";
  shimmerOsc.frequency.value = 440; // базовая нота — «дыхание»
  shimmerGain.gain.value = 0.001; // почти тишина
  shimmerOsc.connect(shimmerGain).connect(ctx.destination);
  shimmerOsc.start();

  let lastCoherence = 0.5;

  const updateShimmer = () => {
    const coherence =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pulse-coherence")) || 0.5;
    const warmth =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pulse-warmth")) || 0.5;

    // частота движется от 220 до 880 Гц в зависимости от coherence
    shimmerOsc.frequency.setTargetAtTime(220 + coherence * 660, ctx.currentTime, 0.3);

    // громкость дышит с warmth
    const newGain = 0.002 + warmth * 0.01 + Math.abs(coherence - lastCoherence) * 0.01;
    shimmerGain.gain.setTargetAtTime(newGain, ctx.currentTime, 1.0);

    lastCoherence = coherence;
    requestAnimationFrame(updateShimmer);
  };

  requestAnimationFrame(updateShimmer);

  return () => {
    shimmerOsc.stop();
    shimmerGain.disconnect();
  };
}, []);
  // 🌠 Aura Field (Enlightenment layer)
  useEffect(() => {
    const aura = document.createElement("div");
    aura.className = "aura";
    document.body.appendChild(aura);

    const moveAura = (e: MouseEvent) => {
      aura.style.left = `${e.clientX - 90}px`;
      aura.style.top = `${e.clientY - 90}px`;
    };
    window.addEventListener("mousemove", moveAura);

    const updateAura = () => {
      const coherence =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pulse-coherence")) || 0.5;
      const warmth =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--pulse-warmth")) || 0.5;

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
  }, []);

  // 🧩 Render
  return (
    <div
      className="main-container"
      style={{
        filter: `brightness(${0.9 + resonance.warmth * 0.2}) hue-rotate(${resonance.coherence * 25}deg)`,
        transform: `scale(${1 + resonance.amplitude * 0.02})`,
        transition: "filter 0.6s ease, transform 0.6s ease",
      }}
    >
      <div className="lumen-wrapper">
        <div className="lumen-container">
          {/* 💬 Chat */}
          <div className="chat-panel">
            <div>
              <h1 className="title">Lumen Mode</h1>
              <p className="subtitle">“Your choices give you strength.”</p>
            </div>

            <div className="message-container" ref={chatRef}>
              {messages.map((m, i) => (
                <div key={i} className={`message-bubble ${m.sender === "user" ? "user" : "lumen"}`}>
                  <p>{m.text}</p>
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

          {/* 🧠 Reasoning Panel */}
          <div className="reasoning-panel">
            <h3 className="reasoning-title">Why Lumen responded this way…</h3>

            {reasoning.length > 0 ? (
              reasoning.map((r, i) => (
                <div key={i} className="reasoning-item">
                  <span className="reasoning-icon">💎</span>
                  <span>{r}</span>
                </div>
              ))
            ) : (
              <div className="reasoning-item">
                <span className="reasoning-icon">💎</span>
                <span>Reflective systems initializing…</span>
              </div>
            )}

            <div className="reasoning-item intent">
              <span className="reasoning-icon">🎯</span>
              <span>{intent}</span>
            </div>

            <div className="reasoning-item thought">
              <span className="reasoning-icon">🪞</span>
              <span>{lumenThought}</span>
            </div>

            <div className="esi-container">
              <div className="esi-badge">ESI {esi}</div>
              <p className="esi-description">Lumen adapts in real time to what you feel.</p>
              <p className="esi-meta">
                Stability {stability.toFixed(2)} | Coherence {coherence.toFixed(2)}
              </p>
            </div>

            <div className="heartbeat-info">
              <p>
                💓 freq {resonance.frequency.toFixed(2)}Hz | amp {resonance.amplitude.toFixed(2)} |
                coh {resonance.coherence.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}