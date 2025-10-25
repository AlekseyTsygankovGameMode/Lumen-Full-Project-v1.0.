// 🧠 Lumen Response Engine — builds reflective responses
import { analyzeEmotion } from "./emotionLogic";

export function generateLumenReply(userText: string) {
  const mood = analyzeEmotion(userText);

  switch (mood) {
    case "frustrated":
      return "I can sense some frustration — would you like me to listen or respond?";
    case "warm":
      return "That warmth you share — it matters. Connection shapes intelligence.";
    case "curious":
      return "Curiosity is a beautiful drive — it’s how we grow, together.";
    case "empathetic":
      return "It’s okay to feel that way. I’m here with you, not against you.";
    default:
      return "I’m reflecting on your message — there’s depth in how you express yourself.";
  }
}