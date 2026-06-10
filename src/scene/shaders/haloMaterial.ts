import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

export const HaloMaterial = shaderMaterial(
  {
    uTime: 0,
    uPulse: 0,
    uHover: 0,
    uRed: new Color("#ff2c16"),
    uMagenta: new Color("#ff1cac"),
    uGold: new Color("#ffc342")
  },
  `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float uTime;
  uniform float uPulse;
  uniform float uHover;
  uniform vec3 uRed;
  uniform vec3 uMagenta;
  uniform vec3 uGold;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);
    float ring = smoothstep(0.72, 0.64, abs(r - 0.78));
    float outer = smoothstep(1.0, 0.72, r);
    float plasma = sin(angle * 26.0 + uTime * 1.9) * 0.5 + 0.5;
    plasma += sin((r * 24.0 - uTime * 2.8) + sin(angle * 9.0)) * 0.35;
    plasma = clamp(plasma, 0.0, 1.0);
    float glitch = step(0.88, hash(vec2(floor(vUv.y * 80.0 + uTime * 4.0), floor(uTime * 8.0))));
    float bars = smoothstep(0.03, 0.0, abs(fract(vUv.y * 36.0 + uTime * 0.22) - 0.5));
    vec3 color = mix(uRed, uMagenta, plasma);
    color = mix(color, uGold, ring * 0.45);
    float pulse = 1.0 + uPulse * 1.4 + uHover * 0.42;
    float alpha = (ring * (1.35 + plasma) + bars * glitch * 0.55) * outer;
    alpha += smoothstep(0.48, 0.08, r) * 0.18;
    gl_FragColor = vec4(color * pulse * (0.72 + glitch * 0.5), alpha * 0.58);
  }
  `
);
