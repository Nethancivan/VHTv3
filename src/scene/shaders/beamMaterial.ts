import { shaderMaterial } from "@react-three/drei";
import { Color } from "three";

export const BeamMaterial = shaderMaterial(
  {
    uTime: 0,
    uPulse: 0,
    uWhite: new Color("#fff6ef"),
    uEdge: new Color("#ff2e16")
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float uTime;
  uniform float uPulse;
  uniform vec3 uWhite;
  uniform vec3 uEdge;
  varying vec2 vUv;
  void main() {
    float center = smoothstep(0.5, 0.0, abs(vUv.x - 0.5));
    float edge = smoothstep(0.44, 0.08, abs(vUv.x - 0.5));
    float flicker = 0.85 + sin(uTime * 18.0) * 0.045 + sin(uTime * 5.0) * 0.08;
    vec3 color = mix(uEdge, uWhite, center);
    float alpha = edge * (0.08 + center * 0.22) * (flicker + uPulse * 0.5);
    gl_FragColor = vec4(color, alpha);
  }
  `
);
