// client/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
(window as any).Buffer = Buffer;

import "./styles/LumenUI.css"; // общий стиль
import LumenUI from "./components/LumenUI";

// 🧠 Инициализация React App
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LumenUI />
  </React.StrictMode>
);

console.log("🟣 Lumen HD Interface initialized ⚙️");
