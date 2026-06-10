"use client";

import { DivineBeam } from "@/scene/elements/DivineBeam";
import { EclipsePortal } from "@/scene/elements/EclipsePortal";
import { EmberParticles } from "@/scene/elements/EmberParticles";
import { FloorMist } from "@/scene/elements/FloorMist";
import { GlitchRain } from "@/scene/elements/GlitchRain";
import { IncenseSmokeSystem } from "@/scene/elements/IncenseSmokeSystem";
import { MediumFigure } from "@/scene/elements/MediumFigure";
import { RitualVessels } from "@/scene/elements/RitualVessels";
import { RitualWater } from "@/scene/elements/RitualWater";
import { ShadowHandsSystem } from "@/scene/elements/ShadowHandsSystem";

export function SceneRoot() {
  return (
    <group>
      <GlitchRain />
      <EclipsePortal />
      <DivineBeam />
      <MediumFigure />
      <ShadowHandsSystem />
      <RitualVessels />
      <IncenseSmokeSystem />
      <EmberParticles />
      <RitualWater />
      <FloorMist />
    </group>
  );
}
