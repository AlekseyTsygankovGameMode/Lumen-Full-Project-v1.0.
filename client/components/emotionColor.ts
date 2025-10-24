// client/utils/emotionColor.ts
// 🎨 Цветовая карта эмоциональных тонов Lumen

export type ToneType = "calm" | "empathetic" | "curious" | "assertive" | "neutral";

export interface ToneColor {
  border: string;
  glow: string;
  text: string;
  shadow: string;
}

const toneColors: Record<ToneType, ToneColor> = {
  calm: {
    border: "#5AD0FF",
    glow: "#93C5FD",
    text: "#E5F3FF",
    shadow: "#1B3B5F",
  },
  empathetic: {
    border: "#FF7AB8",
    glow: "#FDA4AF",
    text: "#FFEAF4",
    shadow: "#5A1F3A",
  },
  curious: {
    border: "#A78BFA",
    glow: "#C4B5FD",
    text: "#F3F0FF",
    shadow: "#2A2156",
  },
  assertive: {
    border: "#FBBF24",
    glow: "#FDE68A",
    text: "#FFF9E6",
    shadow: "#4A3500",
  },
  neutral: {
    border: "#94A3B8",
    glow: "#CBD5E1",
    text: "#E7ECF3",
    shadow: "#1F2937",
  },
};

export function getToneColor(tone: string): ToneColor {
  return toneColors[tone as ToneType] || toneColors.neutral;
}
