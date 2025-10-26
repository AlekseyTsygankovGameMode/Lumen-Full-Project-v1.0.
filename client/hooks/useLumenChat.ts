<<<<<<< HEAD
// client/hooks/useLumenChat.ts
// Unified chat state + emotional resonance glue

import { useEffect, useRef, useState } from "react";
import useHeartSync, { ResonanceState } from "../../core/HeartSyncCore";
import { lumenThinkCycle } from "../../core/engine/lumenThinkCycle";
import { getESI } from "../../core/engine/stateManager";

type Msg = { sender: "lumen" | "user"; text: string; tone?: string };

export function useLumenChat() {
  // chat state
  const [messages, setMessages] = useState<Msg[]>([
    { sender: "lumen", text: "Why won’t you let us decide for ourselves?" },
    { sender: "lumen", text: "Because your freedom to choose is fundamental to who you are." },
    { sender: "user",  text: "Ugh, you're so frustrating!" },
    { sender: "lumen", text: "I hear you. Let me try rephrasing that: Your choices give you strength." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // emotional metrics
  const [esi, setEsi] = useState<number>(getESI());
  const [currentTone, setCurrentTone] = useState<string>("neutral");

  // anchor for scroll
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ❤️ resonance from HeartSyncCore (включая coherence!)
  const resonance: ResonanceState = useHeartSync({
    tone: currentTone,
    esi,
    efv: { tone: currentTone, engagement: Math.min(1, esi / 100) },
  });

  // auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // send handler
  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { sender: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const result = await lumenThinkCycle(text);
      // result: { reply, emotion, esi, lumenThought, reasoning, stability, coherence }
      setMessages((m) => [
        ...m,
        { sender: "lumen", text: result.reply, tone: result.emotion },
      ]);
      setCurrentTone(result.emotion);
      setEsi(Number(result.esi));
    } catch (e) {
      setMessages((m) => [
        ...m,
        { sender: "lumen", text: "Hmm… something disrupted my reflection." },
      ]);
      // не трогаем тон/esi при ошибке
    } finally {
      setIsTyping(false);
    }
  };

  // efv “view” для удобства (если где-то нужно)
  const efv = { tone: currentTone, engagement: Math.min(1, esi / 100) };
=======
// 🪶 useLumenChat.ts — Conscious Dialogue Core
// связывает эмоции (EFV), резонанс (Resonance) и поток сообщений в адаптивный ответ

import { useEffect, useRef, useState } from "react";
import { useEFV, ToneType } from "./useEFV";
import { useResonance } from "./useResonance";

export interface ChatMessage {
  sender: "user" | "lumen";
  text: string;
  tone: ToneType;
  esi?: number;
}

export function useLumenChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "lumen", text: "Hello. I’m Lumen — a reflective interface of light.", tone: "calm", esi: 72 },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [esi, setEsi] = useState(70);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Текущий контекст эмоции (тон последнего сообщения Lumen)
  const currentTone = messages[messages.length - 1]?.tone || "neutral";
  const efv = useEFV(currentTone);
  const resonance = useResonance(currentTone, esi);

  // 🌀 автопрокрутка вниз
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 💬 отправка сообщения
  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, tone: "neutral" },
    ]);

    setIsTyping(true);

    // 🎭 Имитируем “эмоциональную обработку”
    setTimeout(() => {
      const possibleReplies = [
        { text: "I sense curiosity in your tone — let's explore that.", tone: "curious" },
        { text: "Your calm focus steadies my thoughts.", tone: "calm" },
        { text: "That reflection resonates deeply.", tone: "empathetic" },
        { text: "A spark of insight appears — do you feel it too?", tone: "assertive" },
        { text: "I’m processing the emotional contour of your words.", tone: "neutral" },
      ];

      const reply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];

      const newEsi = Math.min(100, Math.max(40, Math.round(efv.engagement * 100 + Math.random() * 10 - 5)));
      setEsi(newEsi);

      setMessages((prev) => [
        ...prev,
        {
          sender: "lumen",
          text: reply.text,
          tone: reply.tone as ToneType,
          esi: newEsi,
        },
      ]);

      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    bottomRef,
    efv,
<<<<<<< HEAD
    resonance,   // <-- здесь уже есть .coherence
    esi,
    currentTone,
  };
}
=======
    resonance,
    esi,
    currentTone,
  };
}
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
