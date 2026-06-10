"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Points as ThreePoints } from "three";
import { useMemo, useRef } from "react";
import { sceneCount } from "@/scene/performance";

export function EmberParticles() {
  const points = useRef<ThreePoints>(null);
  const width = useThree((state) => state.size.width);
  const count = sceneCount(width, 180, 95);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 10;
      values[index * 3 + 1] = 0.05 + Math.random() * 2.8;
      values[index * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    return values;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.08;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.24) * 0.045;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff6128"
        size={0.032}
        sizeAttenuation
        depthWrite={false}
        opacity={0.62}
      />
    </Points>
  );
}
