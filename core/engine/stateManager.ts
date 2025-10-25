// 🧩 Lumen State Manager — tracks ESI and adaptive feedback
let emotionalStabilityIndex = 73;

export function updateESI(emotion: string) {
  if (emotion.includes("frustration") || emotion.includes("frustrated"))
    emotionalStabilityIndex -= 2;
  if (emotion.includes("warm") || emotion.includes("love"))
    emotionalStabilityIndex += 1;
  if (emotion.includes("curious"))
    emotionalStabilityIndex += 0.5;
  if (emotion.includes("empathetic") || emotion.includes("sad"))
    emotionalStabilityIndex += 0.2;

  emotionalStabilityIndex = Math.max(50, Math.min(100, emotionalStabilityIndex));
  return emotionalStabilityIndex.toFixed(1);
}

export function getESI() {
  return emotionalStabilityIndex;
}