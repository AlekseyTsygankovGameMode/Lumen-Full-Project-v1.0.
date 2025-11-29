// /client/esi-graph.js

const canvas = document.createElement("canvas");
canvas.id = "esi-canvas";
canvas.width = window.innerWidth;
canvas.height = 120;
canvas.style.position = "fixed";
canvas.style.bottom = "60px";
canvas.style.left = "0";
canvas.style.zIndex = "5";
canvas.style.opacity = "0.3";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let esiData = [];

async function fetchESI() {
  try {
    const res = await fetch("/api/turn_eval");
    const data = await res.json();
    if (Array.isArray(data.rounds)) {
      esiData = data.rounds
        .filter(r => r.efv && typeof r.efv.esi === "number")
        .map(r => ({ esi: r.efv.esi, tone: r.efv.tone }));
    }
  } catch {
    console.warn("⚠️ Could not fetch ESI data");
  }
}

function toneToColor(tone) {
  const map = {
    calm: "#6B9CFF",
    empathetic: "#A5E1C8",
    curious: "#FFD75E",
    assertive: "#CE82FF",
    neutral: "#BBBBBB"
  };
  return map[tone] || "#888";
}

function drawESILine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (esiData.length < 2) return;

  const maxESI = 100;
  const minESI = 60;
  const step = canvas.width / (esiData.length - 1);

  ctx.beginPath();
  ctx.moveTo(0, canvas.height - (esiData[0].esi - minESI) * 2);

  for (let i = 1; i < esiData.length; i++) {
    const x = i * step;
    const y = canvas.height - (esiData[i].esi - minESI) * 2;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = toneToColor(esiData[esiData.length - 1].tone);
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
}

setInterval(async () => {
  await fetchESI();
  drawESILine();
}, 3000);