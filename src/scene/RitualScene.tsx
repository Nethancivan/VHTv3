"use client";

import { Float, Sparkles } from "@react-three/drei";
import { CameraRig } from "@/scene/camera/CameraRig";
import { HaloPortal } from "@/scene/elements/HaloPortal";
import { DivineBeam } from "@/scene/elements/DivineBeam";
import { PrayingFigure } from "@/scene/elements/PrayingFigure";
import { ShadowArms } from "@/scene/elements/ShadowArms";
import { RitualVessels } from "@/scene/elements/RitualVessels";
import { SmokeField } from "@/scene/elements/SmokeField";
import { RitualWater } from "@/scene/elements/RitualWater";
import { GlitchRain } from "@/scene/elements/GlitchRain";
import { PixelFragments } from "@/scene/elements/PixelFragments";

export function RitualScene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.08} color="#2b1c44" />
      <pointLight position={[0, 3.2, 1.5]} intensity={7.5} color="#ff3c1a" distance={15} />
      <pointLight position={[-3.3, 1.2, 2.4]} intensity={2.1} color="#146dff" distance={10} />
      <pointLight position={[3.1, 1.5, 2.2]} intensity={2.1} color="#9a22ff" distance={10} />
      <spotLight
        position={[0, 9, 0.8]}
        target-position={[0, 0.55, 0]}
        intensity={11}
        angle={0.23}
        penumbra={0.92}
        color="#fff3e7"
        castShadow
      />
      <group position={[0, 0, 0]}>
        <HaloPortal />
        <DivineBeam />
        <Float speed={0.7} floatIntensity={0.08} rotationIntensity={0.035}>
          <PrayingFigure />
        </Float>
        <ShadowArms />
        <RitualVessels />
        <SmokeField />
        <RitualWater />
        <GlitchRain />
        <PixelFragments />
        <Sparkles count={160} size={2.2} speed={0.16} opacity={0.38} color="#ff9a35" scale={[12, 5, 8]} position={[0, 1.7, 0]} />
      </group>
    </>
  );
}
