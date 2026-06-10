"use client";

import { Capsule } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";
import { useMemo, useRef } from "react";
import { sceneCount } from "@/scene/performance";
import { useRitualStore } from "@/state/ritualStore";

type HandConfig = {
  angle: number;
  radius: number;
  baseY: number;
  height: number;
  speed: number;
  phase: number;
  scale: number;
  tilt: number;
  opacity: number;
};

function EmergingHand({ config, index }: { config: HandConfig; index: number }) {
  const root = useRef<Group>(null);
  const fingers = useRef<Group>(null);
  const hover = useRitualStore((state) => state.hoverZone === "arms" || state.hoverZone === "center");

  useFrame(({ clock }) => {
    if (!root.current || !fingers.current) return;
    const cycle = (clock.elapsedTime * config.speed + config.phase) % 1;
    const lift = Math.pow(Math.sin(cycle * Math.PI), 1.2);
    const agitation = hover ? 1.12 : 1;

    root.current.position.y = config.baseY + lift * config.height * agitation;
    root.current.rotation.z = config.tilt + Math.sin(clock.elapsedTime * 0.72 + index) * 0.055;
    root.current.scale.setScalar(config.scale * (0.9 + lift * 0.1));
    fingers.current.rotation.x = -0.12 + Math.sin(clock.elapsedTime * 1.1 + index) * 0.08;
  });

  const x = Math.cos(config.angle) * config.radius;
  const z = Math.sin(config.angle) * config.radius - 0.15;

  return (
    <group
      ref={root}
      position={[x, config.baseY, z]}
      rotation={[0, -config.angle + Math.PI / 2, config.tilt]}
      scale={config.scale}
    >
      <Capsule args={[0.105, 1.15, 7, 14]} position={[0, 0.55, 0]} rotation={[0, 0, 0]}>
        <meshBasicMaterial
          color="#010104"
          transparent
          opacity={config.opacity}
        />
      </Capsule>
      <mesh position={[0, 1.18, 0]} scale={[0.34, 0.48, 0.16]}>
        <sphereGeometry args={[0.5, 18, 14]} />
        <meshBasicMaterial
          color="#010104"
          transparent
          opacity={config.opacity}
        />
      </mesh>
      <group ref={fingers} position={[0, 1.42, 0]}>
        {[-0.18, -0.06, 0.06, 0.18].map((offset, fingerIndex) => (
          <Capsule
            key={offset}
            args={[0.034, 0.42 - fingerIndex * 0.025, 6, 10]}
            position={[offset, 0.2 - Math.abs(offset) * 0.2, 0]}
            rotation={[0.05, 0, -offset * 0.55]}
          >
            <meshBasicMaterial
              color="#010103"
              transparent
              opacity={config.opacity * 0.94}
            />
          </Capsule>
        ))}
        <Capsule args={[0.04, 0.31, 6, 10]} position={[-0.27, 0.05, 0.03]} rotation={[0.1, 0.32, 0.7]}>
          <meshBasicMaterial
            color="#010103"
            transparent
            opacity={config.opacity * 0.94}
          />
        </Capsule>
      </group>
    </group>
  );
}

export function ShadowHandsSystem() {
  const width = useThree((state) => state.size.width);
  const setHoverZone = useRitualStore((state) => state.setHoverZone);
  const count = sceneCount(width, 12, 8);
  const hands = useMemo<HandConfig[]>(
    () =>
      Array.from({ length: count }, (_, index) => {
        const layer = index % 3;
        const angle =
          0.08 + (index / Math.max(1, count - 1)) * (Math.PI - 0.16) + (Math.random() - 0.5) * 0.18;
        return {
          angle,
          radius: 2.05 + layer * 0.95 + Math.random() * 0.42,
          baseY: -1.42 - Math.random() * 0.3,
          height: 1.3 + Math.random() * 0.45,
          speed: 0.035 + Math.random() * 0.035,
          phase: Math.random(),
          scale: 0.66 + layer * 0.13 + Math.random() * 0.1,
          tilt: (Math.random() - 0.5) * 0.34,
          opacity: 0.34 + (2 - layer) * 0.09
        };
      }),
    [count]
  );

  return (
    <group onPointerEnter={() => setHoverZone("arms")} onPointerLeave={() => setHoverZone("none")}>
      {hands.map((config, index) => (
        <EmergingHand key={`${count}-${index}`} config={config} index={index} />
      ))}
    </group>
  );
}
