// 🌙 Lumen Emotional Field — interprets tone & keywords
export function analyzeEmotion(input: string) {
  const tone = input.toLowerCase();

  if (tone.includes("frustrating") || tone.includes("angry") || tone.includes("ugh"))
    return "frustrated";
  if (tone.includes("thanks") || tone.includes("love") || tone.includes("appreciate"))
    return "warm";
  if (tone.includes("why") || tone.includes("how") || tone.includes("?"))
    return "curious";
  if (tone.includes("sad") || tone.includes("sorry"))
    return "empathetic";

  return "neutral";
}