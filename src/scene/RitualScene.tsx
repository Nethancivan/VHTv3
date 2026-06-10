"use client";

import { CameraRig } from "@/scene/camera/CameraRig";
import { Lighting } from "@/scene/Lighting";
import { SceneRoot } from "@/scene/SceneRoot";

export function RitualScene() {
  return (
    <>
      <CameraRig />
      <Lighting />
      <SceneRoot />
    </>
  );
}
