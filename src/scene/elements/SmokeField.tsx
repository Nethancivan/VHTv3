"use client";

import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide, Group, Object3D } from "three";
import { useMemo, useRef } from "react";
import { useRitualStore } from "@/state/ritualStore";

type Puff = {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  speed: number;
};

export function SmokeField() {
  const group = useRef<Group>(null);
  const cursor = useRitualStore((state) => state.cursor);
  const puffs = useMemo<Puff[]>(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const side = i % 2 ? -1 : 1;
        const lane = Math.floor(i / 2);
        return {
          position: [side * (1.5 + Math.random() * 5.8), 0.8 + Math.random() * 2.5, -2.6 + Math.random() * 5.2],
          scale: [0.7 + Math.random() * 1.8, 0.55 + Math.random() * 1.35, 1],
          color: lane % 3 === 0 ? "#34175c" : lane % 3 === 1 ? "#0d214b" : "#17141d",
          speed: 0.18 + Math.random() * 0.32
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.children.forEach((child: Object3D, i: number) => {
      const t = clock.elapsedTime * puffs[i].speed;
      child.position.y = puffs[i].position[1] + Math.sin(t + i) * 0.25;
      child.position.x = puffs[i].position[0] + Math.sin(t * 0.8 + i * 1.7) * 0.28 + cursor.x * 0.18;
      child.rotation.z = t * 0.2 + i;
    });
  });

  return (
    <group ref={group}>
      {puffs.map((puff, index) => (
        <mesh key={index} position={puff.position} scale={puff.scale} renderOrder={1}>
          <planeGeometry args={[1.2, 1.2, 1, 1]} />
          <meshBasicMaterial
            color={puff.color}
            transparent
            opacity={0.13}
            depthWrite={false}
            side={DoubleSide}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
