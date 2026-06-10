import { CanvasTexture, LinearFilter } from "three";

export function createSmokeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext("2d");
  if (!context) return new CanvasTexture(canvas);

  const gradient = context.createRadialGradient(128, 128, 10, 128, 128, 124);
  gradient.addColorStop(0, "rgba(255,255,255,0.86)");
  gradient.addColorStop(0.22, "rgba(235,225,255,0.52)");
  gradient.addColorStop(0.5, "rgba(180,160,220,0.2)");
  gradient.addColorStop(1, "rgba(70,55,100,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 18; i += 1) {
    const x = 70 + Math.random() * 116;
    const y = 60 + Math.random() * 136;
    const radius = 18 + Math.random() * 42;
    const puff = context.createRadialGradient(x, y, 0, x, y, radius);
    puff.addColorStop(0, "rgba(255,255,255,0.12)");
    puff.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = puff;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
