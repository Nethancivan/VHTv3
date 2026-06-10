"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, Group, Mesh, MeshBasicMaterial, NormalBlending } from "three";
import { useEffect, useMemo, useRef } from "react";
import { sceneCount } from "@/scene/performance";
import { createSmokeTexture } from "@/scene/textures/createSmokeTexture";
import { useRitualStore } from "@/state/ritualStore";

type SmokeParticle = {
  radius: number;
  angle: number;
  speed: number;
  rise: number;
  phase: number;
  scale: number;
  opacity: number;
  tint: string;
};

export function IncenseSmokeSystem() {
  const group = useRef<Group>(null);
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);
  const cursor = useRitualStore((state) => state.cursor);
  const hover = useRitualStore((state) => state.hoverZone === "center");
  const count = sceneCount(width, 38, 23);
  const texture = useMemo(() => createSmokeTexture(), []);
  const particles = useMemo<SmokeParticle[]>(
    () =>
      Array.from({ length: count }, (_, index) => ({
        radius: 0.65 + Math.random() * 2.85,
        angle: Math.random() * Math.PI * 2,
        speed: 0.055 + Math.random() * 0.115,
        rise: 0.045 + Math.random() * 0.075,
        phase: Math.random(),
        scale: 0.45 + Math.random() * 1.15,
        opacity: 0.07 + Math.random() * 0.1,
        tint: index % 3 === 0 ? "#503767" : index % 3 === 1 ? "#263552" : "#615663"
      })),
    [count]
  );

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;

    group.current.children.forEach((child, index) => {
      const smoke = child as Mesh;
      const particle = particles[index];
      const life = (time * particle.rise + particle.phase) % 1;
      const envelope = Math.sin(life * Math.PI);
      const angle = particle.angle + time * particle.speed + life * 2.1;
      const radius = particle.radius + Math.sin(time * 0.3 + index) * 0.18;

      smoke.position.set(
        Math.cos(angle) * radius + cursor.x * 0.12,
        0.08 + life * 3.25,
        Math.sin(angle) * radius - 0.12 + cursor.y * 0.08
      );
      smoke.lookAt(camera.position);
      smoke.rotation.z += 0.0015 + particle.speed * 0.006;
      const scale = particle.scale * (0.72 + life * 0.68);
      smoke.scale.set(scale * 0.72, scale * 1.48, 1);
      (smoke.material as MeshBasicMaterial).opacity =
        particle.opacity * envelope * (hover ? 1.28 : 1);
    });
  });

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={`${count}-${index}`} scale={particle.scale} renderOrder={2}>
          <planeGeometry args={[1.35, 1.35]} />
          <meshBasicMaterial
            map={texture}
            color={particle.tint}
            transparent
            opacity={particle.opacity}
            depthWrite={false}
            side={DoubleSide}
            blending={NormalBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
