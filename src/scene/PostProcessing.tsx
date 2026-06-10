"use client";

import { useThree } from "@react-three/fiber";
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { isCompactViewport } from "@/scene/performance";

const chromaticOffset = new Vector2(0.0012, 0.0008);

export function PostProcessing() {
  const width = useThree((state) => state.size.width);
  const compact = isCompactViewport(width);

  return (
    <EffectComposer multisampling={0} resolutionScale={compact ? 0.62 : 0.78}>
      <Bloom
        intensity={compact ? 0.72 : 0.92}
        luminanceThreshold={0.28}
        luminanceSmoothing={0.62}
        mipmapBlur
      />
      <ChromaticAberration offset={chromaticOffset} blendFunction={BlendFunction.NORMAL} />
      <Noise opacity={0.045} blendFunction={BlendFunction.SOFT_LIGHT} />
      <Vignette darkness={0.76} offset={0.2} />
    </EffectComposer>
  );
}
