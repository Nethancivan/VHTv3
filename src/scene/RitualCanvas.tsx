"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, BakeShadows, Preload, StatsGl } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { RitualScene } from "@/scene/RitualScene";
import { useRitualStore } from "@/state/ritualStore";

export function RitualCanvas() {
  const setCursor = useRitualStore((state) => state.setCursor);

  useEffect(() => {
    const update = (event: MouseEvent) => {
      setCursor((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, [setCursor]);

  return (
    <Canvas
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.85, 10.4], fov: 39, near: 0.1, far: 80 }}
      shadows="soft"
    >
      <color attach="background" args={["#020203"]} />
      <fog attach="fog" args={["#020203", 9, 34]} />
      <Suspense fallback={null}>
        <RitualScene />
        <BakeShadows />
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
      <EffectComposer multisampling={0} resolutionScale={0.82}>
        <Bloom intensity={1.55} luminanceThreshold={0.12} luminanceSmoothing={0.22} mipmapBlur />
        <ChromaticAberration offset={[0.0028, 0.0015]} blendFunction={BlendFunction.SCREEN} />
        <Noise opacity={0.075} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette darkness={0.82} offset={0.22} />
      </EffectComposer>
      {process.env.NODE_ENV === "development" ? <StatsGl className="stats" /> : null}
    </Canvas>
  );
}
