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

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    bottomRef,
    efv,
    resonance,   // <-- здесь уже есть .coherence
    esi,
    currentTone,
  };
}
