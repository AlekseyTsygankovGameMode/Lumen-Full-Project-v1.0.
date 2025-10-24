// client/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import LumenUI from "./components/LumenUI";
import "./styles/FusionV2.css"; // подключаем новый HD стиль

const container = document.getElementById("root");
if (!container) throw new Error("❌ Root element not found in index.html");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <LumenUI />
  </React.StrictMode>
);
