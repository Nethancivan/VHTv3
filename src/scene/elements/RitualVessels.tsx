"use client";

import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Group } from "three";
import { useMemo, useRef } from "react";
import { useRitualStore } from "@/state/ritualStore";

function FireBowl({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const flame = useRef<Group>(null);
  const hover = useRitualStore((state) => state.hoverZone === "fire");
  const setHoverZone = useRitualStore((state) => state.setHoverZone);

  useFrame(({ clock }, delta) => {
    if (!flame.current) return;
    const target = hover ? 1.35 : 1;
    const flicker = 1 + Math.sin(clock.elapsedTime * 16 + position[0]) * 0.08;
    flame.current.scale.y += (target * flicker - flame.current.scale.y) * delta * 5;
  });

  return (
    <group position={position} scale={scale} onPointerOver={() => setHoverZone("fire")} onPointerOut={() => setHoverZone("none")}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.56, 0.24, 48]} />
        <meshStandardMaterial color="#080605" roughness={0.58} metalness={0.76} emissive="#2a0803" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <torusGeometry args={[0.43, 0.045, 8, 48]} />
        <meshStandardMaterial color="#12100d" roughness={0.45} metalness={0.9} emissive="#401006" emissiveIntensity={0.8} />
      </mesh>
      <group ref={flame} position={[0, 0.36, 0]}>
        <mesh scale={[0.8, 0.72, 0.8]}>
          <coneGeometry args={[0.32, 0.86, 24]} />
          <meshBasicMaterial color="#ff4a14" transparent opacity={0.48} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.05, 0]} scale={[0.48, 0.58, 0.48]}>
          <coneGeometry args={[0.26, 0.7, 24]} />
          <meshBasicMaterial color="#ffd06d" transparent opacity={0.5} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

export function RitualVessels() {
  const vessels = useMemo(
    () => [
      [-2.7, 0.03, -0.05, 0.44],
      [2.7, 0.03, -0.05, 0.44]
    ] as [number, number, number, number][],
    []
  );

  return (
    <>
      {vessels.map(([x, y, z, s]) => (
        <FireBowl key={`${x}-${z}`} position={[x, y, z]} scale={s} />
      ))}
    </>
  );
}
