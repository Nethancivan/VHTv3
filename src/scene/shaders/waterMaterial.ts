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
    float ripple = sin((p.x * 1.8 + uTime * 0.55)) * 0.014 + sin((p.y * 3.1 - uTime * 0.46)) * 0.009;
    float mouseWave = sin(distance(p.xy, uMouse * vec2(4.0, 1.8)) * 10.0 - uTime * 4.0) * 0.012;
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
    float wave = sin(uv.x * 82.0 + uTime * 1.15) * 0.5 + 0.5;
    float broken = step(0.82, fract(sin(dot(floor(uv * 52.0), vec2(12.98, 78.23))) * 43758.54));
    float haloReflection = smoothstep(0.22, 0.0, abs(uv.x - 0.5)) * smoothstep(0.05, 0.88, uv.y);
    float blueReflection = smoothstep(0.48, 0.0, abs(uv.x - 0.5)) * smoothstep(0.0, 0.7, uv.y);
    vec3 color = uDeep;
    color += uCyan * blueReflection * 0.075;
    color += uEmber * haloReflection * (0.09 + wave * 0.07 + uPulse * 0.22);
    color += vec3(0.45, 0.08, 0.55) * broken * blueReflection * 0.035;
    color += vec3(0.015, 0.018, 0.035) * (sin(uv.y * 145.0 + uTime) * 0.5 + 0.5);
    float alpha = 0.96;
    gl_FragColor = vec4(color * 0.46, alpha);
  }
  `
);
