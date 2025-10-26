// client/main.tsx
import React from "react";
<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
(window as any).Buffer = Buffer;

import "./styles/LumenUI.css"; // общий стиль
import LumenUI from "./components/LumenUI";

// 🧠 Инициализация React App
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
=======
import { createRoot } from "react-dom/client";
import LumenUI from "./components/LumenUI";
import "./styles/FusionV2.css"; // подключаем новый HD стиль

const container = document.getElementById("root");
if (!container) throw new Error("❌ Root element not found in index.html");

const root = createRoot(container);
root.render(
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
  <React.StrictMode>
    <LumenUI />
  </React.StrictMode>
);
<<<<<<< HEAD

console.log("🟣 Lumen HD Interface initialized ⚙️");
=======
>>>>>>> 9b1fa7f8a480ef2921a4e1772f94583ba7d3213a
