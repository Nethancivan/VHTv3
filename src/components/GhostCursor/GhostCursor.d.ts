import type { CSSProperties, ReactElement } from "react";

export type GhostCursorProps = {
  className?: string;
  style?: CSSProperties;
  trailLength?: number;
  inertia?: number;
  grainIntensity?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  brightness?: number;
  color?: string;
  mixBlendMode?: CSSProperties["mixBlendMode"];
  edgeIntensity?: number;
  maxDevicePixelRatio?: number;
  targetPixels?: number;
  fadeDelayMs?: number;
  fadeDurationMs?: number;
  zIndex?: number;
};

export default function GhostCursor(props: GhostCursorProps): ReactElement;
