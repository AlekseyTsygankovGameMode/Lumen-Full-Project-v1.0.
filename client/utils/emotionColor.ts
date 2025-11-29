// client/utils/emotionColor.ts
// 🎨 Цветовые состояния эмоциональных тонов Lumen
export function getToneColor(tone: string) {
  const palette = {
    calm: {
      border: "rgba(100, 180, 255, 0.6)",
      glow: "rgba(120, 200, 255, 0.4)",
      shadow: "rgba(60, 100, 160, 0.3)", // 🌊 добавлено
      text: "#e3f6ff",
    },
    empathetic: {
      border: "rgba(255, 160, 200, 0.6)",
      glow: "rgba(255, 120, 190, 0.4)",
      shadow: "rgba(150, 80, 130, 0.3)", // 🌸 добавлено
      text: "#fff0f7",
    },
    curious: {
      border: "rgba(255, 210, 140, 0.6)",
      glow: "rgba(255, 210, 140, 0.4)",
      shadow: "rgba(170, 120, 80, 0.3)", // ☀️ добавлено
      text: "#fff8e5",
    },
    assertive: {
      border: "rgba(255, 110, 110, 0.6)",
      glow: "rgba(255, 130, 130, 0.4)",
      shadow: "rgba(150, 60, 60, 0.3)", // 🔥 добавлено
      text: "#ffefec",
    },
    neutral: {
      border: "rgba(180, 180, 255, 0.4)",
      glow: "rgba(180, 180, 255, 0.2)",
      shadow: "rgba(100, 100, 180, 0.25)", // 🌫️ добавлено
      text: "#f3f3ff",
    },
  };

  return palette[tone as keyof typeof palette] || palette.neutral;
}