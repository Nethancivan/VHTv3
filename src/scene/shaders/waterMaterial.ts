import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

export const WaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: [0, 0],
    uPulse: 0,
    uDeep: new Color("#020308"),
    uCyan: new Color("#0f8cff"),
    uEmber: new Color("#ff3c13")
  },
  `
  varying vec2 vUv;
  varying vec3 vWorld;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 p = position;
    float ripple = sin((p.x * 2.1 + uTime * 0.8)) * 0.018 + sin((p.y * 3.4 - uTime * 0.7)) * 0.012;
    float mouseWave = sin(distance(p.xy, uMouse * vec2(5.0, 2.0)) * 11.0 - uTime * 5.0) * 0.018;
    p.z += ripple + mouseWave;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
  `,
  `
  uniform float uTime;
  uniform float uPulse;
  uniform vec3 uDeep;
  uniform vec3 uCyan;
  uniform vec3 uEmber;
  varying vec2 vUv;
  varying vec3 vWorld;

  void main() {
    vec2 uv = vUv;
    float horizon = smoothstep(0.18, 0.88, uv.y);
    float wave = sin(uv.x * 90.0 + uTime * 1.8) * 0.5 + 0.5;
    float broken = step(0.72, fract(sin(dot(floor(uv * 60.0), vec2(12.98, 78.23))) * 43758.54));
    float haloReflection = smoothstep(0.55, 0.0, abs(uv.x - 0.5)) * smoothstep(0.0, 0.75, uv.y);
    vec3 color = uDeep;
    color += uCyan * haloReflection * 0.18;
    color += uEmber * haloReflection * (0.25 + wave * 0.16 + uPulse * 0.4);
    color += vec3(0.9, 0.2, 0.95) * broken * haloReflection * 0.055;
    float alpha = 0.92;
    gl_FragColor = vec4(color, alpha);
  }
  `
);
