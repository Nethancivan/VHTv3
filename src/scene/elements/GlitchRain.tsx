"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, Color, InstancedMesh, Object3D } from "three";
import { useMemo, useRef } from "react";
import { useRitualStore } from "@/state/ritualStore";
import { sceneCount } from "@/scene/performance";

const dummy = new Object3D();
const palette = ["#00ccff", "#8048ff", "#ff1f38", "#00ff8a", "#ff8c19"].map((c) => new Color(c));

export function GlitchRain() {
  const mesh = useRef<InstancedMesh>(null);
  const width = useThree((state) => state.size.width);
  const hoverCenter = useRitualStore((state) => state.hoverZone === "center");
  const count = sceneCount(width, 360, 180);
  const drops = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: Math.random() * 8,
        z: -5.8 - Math.random() * 11,
        h: 0.08 + Math.random() * 0.58,
        speed: 0.22 + Math.random() * 1.05,
        color: palette[Math.floor(Math.random() * palette.length)]
      })),
    [count]
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const boost = hoverCenter ? 1.7 : 1;
    drops.forEach((drop, i) => {
      const y = ((drop.y - clock.elapsedTime * drop.speed * boost + 80) % 8) - 1.5;
      const glitch = Math.sin(clock.elapsedTime * 18 + i) > 0.985 ? Math.sin(clock.elapsedTime * 60) * 0.5 : 0;
      dummy.position.set(drop.x + glitch, y, drop.z);
      dummy.scale.set(0.018, drop.h, 0.018);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, drop.color);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent opacity={0.4} blending={AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}
