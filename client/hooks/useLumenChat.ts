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

  return {
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
  };
}
