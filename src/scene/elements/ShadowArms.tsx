"use client";

import { useFrame } from "@react-three/fiber";
import { Capsule } from "@react-three/drei";
import { Group } from "three";
import { useMemo, useRef } from "react";
import { useRitualStore } from "@/state/ritualStore";

type ArmConfig = {
  side: -1 | 1;
  x: number;
  y: number;
  z: number;
  rot: [number, number, number];
  scale: number;
};

function Arm({ config, index }: { config: ArmConfig; index: number }) {
  const root = useRef<Group>(null);
  const fingers = useRef<Group>(null);
  const hover = useRitualStore((state) => state.hoverZone === "arms");

  useFrame(({ clock }, delta) => {
    if (!root.current || !fingers.current) return;
    const t = clock.elapsedTime + index * 0.71;
    const retreat = hover ? config.side * 0.34 : 0;
    root.current.position.x += (config.x + retreat - root.current.position.x) * delta * 2.2;
    root.current.position.y = config.y + Math.sin(t * 0.8) * 0.08;
    root.current.rotation.z = config.rot[2] + Math.sin(t * 0.5) * 0.04;
    fingers.current.rotation.x = Math.sin(t * 1.5) * 0.16 + (hover ? 0.18 : 0);
  });

  return (
    <group ref={root} position={[config.x, config.y, config.z]} rotation={config.rot} scale={config.scale}>
      <Capsule args={[0.095, 1.45, 8, 18]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#010102" transparent opacity={0.82} roughness={1} emissive="#07020c" emissiveIntensity={0.35} />
      </Capsule>
      <group ref={fingers} position={[config.side * -0.8, 0, 0]} rotation={[0, 0, config.side * -0.25]}>
        {[-0.18, -0.06, 0.06, 0.18].map((offset, i) => (
          <Capsule key={offset} args={[0.035, 0.46 - i * 0.035, 6, 12]} position={[config.side * -0.19, offset, 0]} rotation={[0.08, 0, config.side * (-0.42 - i * 0.07)]}>
            <meshStandardMaterial color="#020102" transparent opacity={0.72} roughness={1} emissive="#120617" emissiveIntensity={0.2} />
          </Capsule>
        ))}
      </group>
    </group>
  );
}

export function ShadowArms() {
  const setHoverZone = useRitualStore((state) => state.setHoverZone);
  const arms = useMemo<ArmConfig[]>(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const side = i < 6 ? -1 : 1;
        const lane = i % 6;
        return {
          side,
          x: side * (2.0 + lane * 0.48),
          y: 0.95 + lane * 0.24,
          z: -0.4 - lane * 0.34,
          rot: [0.1, side * 0.16, side * (-0.35 - lane * 0.12)] as [number, number, number],
          scale: 0.85 + lane * 0.045
        };
      }),
    []
  );

  return (
    <group onPointerOver={() => setHoverZone("arms")} onPointerOut={() => setHoverZone("none")}>
      {arms.map((config, index) => (
        <Arm key={`${config.side}-${index}`} config={config} index={index} />
      ))}
    </group>
  );
}
