"use client";

import { Capsule, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useRef } from "react";
import { useRitualStore } from "@/state/ritualStore";

const darkMaterial = {
  color: "#03040a",
  roughness: 0.74,
  metalness: 0.18,
  emissive: "#07133d",
  emissiveIntensity: 0.52
};

export function MediumFigure() {
  const root = useRef<Group>(null);
  const torso = useRef<Group>(null);
  const setHoverZone = useRitualStore((state) => state.setHoverZone);
  const triggerCenterPulse = useRitualStore((state) => state.triggerCenterPulse);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (root.current) root.current.position.y = 0.08 + Math.sin(t * 0.74) * 0.018;
    if (torso.current) {
      torso.current.rotation.z = Math.sin(t * 0.42) * 0.012;
      torso.current.rotation.x = -0.08 + Math.sin(t * 0.31) * 0.01;
    }
  });

  return (
    <group
      ref={root}
      position={[0, 0.08, 0.18]}
      onPointerEnter={() => setHoverZone("center")}
      onPointerLeave={() => setHoverZone("none")}
      onPointerDown={triggerCenterPulse}
    >
      <group position={[0, 0.2, 0]}>
        <Capsule args={[0.2, 0.95, 8, 18]} position={[-0.38, 0.02, 0.08]} rotation={[0.22, 0.18, 1.13]}>
          <meshStandardMaterial {...darkMaterial} emissive="#071a58" emissiveIntensity={0.48} />
        </Capsule>
        <Capsule args={[0.2, 0.95, 8, 18]} position={[0.38, 0.02, 0.08]} rotation={[0.22, -0.18, -1.13]}>
          <meshStandardMaterial {...darkMaterial} emissive="#16104f" emissiveIntensity={0.42} />
        </Capsule>
        <Sphere args={[0.7, 36, 24]} position={[0, 0.18, -0.02]} scale={[1.18, 0.42, 0.82]}>
          <meshStandardMaterial {...darkMaterial} />
        </Sphere>
      </group>

      <group ref={torso}>
        <Capsule args={[0.38, 0.78, 10, 24]} position={[0, 0.88, 0]} scale={[1, 1.04, 0.72]} castShadow>
          <meshStandardMaterial {...darkMaterial} emissive="#071a55" emissiveIntensity={0.58} />
        </Capsule>
        <Sphere args={[0.47, 32, 24]} position={[0, 1.17, -0.04]} scale={[1.34, 0.5, 0.78]}>
          <meshStandardMaterial {...darkMaterial} emissive="#0b1648" emissiveIntensity={0.46} />
        </Sphere>
        <mesh position={[0, 0.71, -0.2]} rotation={[0.08, 0, 0]}>
          <coneGeometry args={[0.65, 1.1, 16, 3, true]} />
          <meshStandardMaterial
            color="#020309"
            roughness={0.9}
            metalness={0.06}
            emissive="#10062e"
            emissiveIntensity={0.38}
            side={2}
          />
        </mesh>

        <Capsule args={[0.095, 0.62, 8, 16]} position={[-0.29, 1.11, 0.19]} rotation={[0.2, 0.12, -0.74]}>
          <meshStandardMaterial {...darkMaterial} emissive="#073a92" emissiveIntensity={0.72} />
        </Capsule>
        <Capsule args={[0.095, 0.62, 8, 16]} position={[0.29, 1.11, 0.19]} rotation={[0.2, -0.12, 0.74]}>
          <meshStandardMaterial {...darkMaterial} emissive="#31106b" emissiveIntensity={0.56} />
        </Capsule>
        <Capsule args={[0.075, 0.48, 8, 16]} position={[-0.11, 1.38, 0.39]} rotation={[0.08, 0.05, -0.13]}>
          <meshStandardMaterial {...darkMaterial} emissive="#0b4bb0" emissiveIntensity={0.68} />
        </Capsule>
        <Capsule args={[0.075, 0.48, 8, 16]} position={[0.11, 1.38, 0.39]} rotation={[0.08, -0.05, 0.13]}>
          <meshStandardMaterial {...darkMaterial} emissive="#54147f" emissiveIntensity={0.54} />
        </Capsule>

        <mesh position={[-0.055, 1.62, 0.42]} rotation={[0.05, 0.03, -0.04]}>
          <boxGeometry args={[0.1, 0.34, 0.075]} />
          <meshStandardMaterial {...darkMaterial} emissive="#1d6eff" emissiveIntensity={0.68} />
        </mesh>
        <mesh position={[0.055, 1.62, 0.42]} rotation={[0.05, -0.03, 0.04]}>
          <boxGeometry args={[0.1, 0.34, 0.075]} />
          <meshStandardMaterial {...darkMaterial} emissive="#7d1db7" emissiveIntensity={0.56} />
        </mesh>

        <Capsule args={[0.13, 0.12, 8, 16]} position={[0, 1.45, 0]}>
          <meshStandardMaterial {...darkMaterial} />
        </Capsule>
        <Sphere args={[0.31, 40, 28]} position={[0, 1.86, 0.01]} scale={[0.9, 1.08, 0.9]} castShadow>
          <meshStandardMaterial color="#010207" roughness={0.62} metalness={0.22} emissive="#071744" emissiveIntensity={0.6} />
        </Sphere>

        {[-0.12, -0.04, 0.04, 0.12].map((offset, index) => (
          <mesh
            key={offset}
            position={[(index % 2 ? -1 : 1) * (0.025 + index * 0.018), 1.87 + offset, 0.29]}
            scale={[0.42 - index * 0.035, 0.018 + (index % 2) * 0.009, 0.018]}
            renderOrder={4}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
              color={index % 2 ? "#ff194f" : "#18a7ff"}
              transparent
              opacity={0.5 - index * 0.05}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      <Sphere args={[0.62, 40, 24]} position={[0, 1.75, -0.02]} scale={[1, 1.15, 0.8]}>
        <meshBasicMaterial color="#1768ff" transparent opacity={0.035} depthWrite={false} />
      </Sphere>
      <pointLight position={[0, 1.45, 0.55]} intensity={1.25} color="#1767ff" distance={2.8} />
    </group>
  );
}
