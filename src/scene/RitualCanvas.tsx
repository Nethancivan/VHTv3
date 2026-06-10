"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, BakeShadows, Preload } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { RitualScene } from "@/scene/RitualScene";
import { PostProcessing } from "@/scene/PostProcessing";
import { useRitualStore } from "@/state/ritualStore";
import { ARTWORK_DNA_CODE } from "@/data/artwork-dna";

export function RitualCanvas() {
  const setCursor = useRitualStore((state) => state.setCursor);
  const [background] = ARTWORK_DNA_CODE.COLOR_GENOME.base;

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
      dpr={[1, 1.6]}
      camera={{ position: [0, 1.62, 8.9], fov: 42, near: 0.1, far: 70 }}
      shadows="soft"
    >
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 8, 28]} />
      <Suspense fallback={null}>
        <RitualScene />
        <BakeShadows />
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
      <PostProcessing />
    </Canvas>
  );
}
