"use client";

import { useFrame } from "@react-three/fiber";
import { Capsule, Sphere } from "@react-three/drei";
import { Group } from "three";
import { useRef } from "react";

export function PrayingFigure() {
  const root = useRef<Group>(null);
  const robe = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (root.current) root.current.position.y = Math.sin(t * 0.92) * 0.026;
    if (robe.current) robe.current.rotation.z = Math.sin(t * 0.48) * 0.018;
  });

  return (
    <group ref={root} position={[0, 0.04, 0.2]} rotation={[0, Math.PI, 0]} castShadow>
      <group ref={robe}>
        <mesh position={[0, 0.82, 0]}>
          <coneGeometry args={[0.66, 1.55, 8, 4]} />
          <meshStandardMaterial color="#06070e" roughness={0.82} metalness={0.12} emissive="#071653" emissiveIntensity={0.9} />
        </mesh>
        <mesh position={[0, 1.72, 0.02]}>
          <sphereGeometry args={[0.31, 32, 24]} />
          <meshStandardMaterial color="#020207" roughness={0.68} emissive="#101340" emissiveIntensity={0.75} />
        </mesh>
        <mesh position={[0, 1.72, -0.04]} scale={[1.18, 0.94, 1.08]}>
          <sphereGeometry args={[0.34, 32, 24]} />
          <meshStandardMaterial color="#010103" roughness={0.72} emissive="#07114d" emissiveIntensity={0.4} />
        </mesh>
        <group position={[0, 1.05, 0.34]}>
          <Capsule args={[0.08, 0.62, 8, 18]} position={[-0.19, 0.15, 0]} rotation={[0.22, 0.1, -0.7]}>
            <meshStandardMaterial color="#05050a" roughness={0.68} emissive="#0733b3" emissiveIntensity={0.9} />
          </Capsule>
          <Capsule args={[0.08, 0.62, 8, 18]} position={[0.19, 0.15, 0]} rotation={[0.22, -0.1, 0.7]}>
            <meshStandardMaterial color="#05050a" roughness={0.68} emissive="#5d0d9a" emissiveIntensity={0.75} />
          </Capsule>
          <mesh position={[-0.055, 0.48, 0.02]} rotation={[0.22, 0, -0.05]}>
            <boxGeometry args={[0.1, 0.36, 0.06]} />
            <meshStandardMaterial color="#08080e" roughness={0.7} emissive="#2d36ff" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0.055, 0.48, 0.02]} rotation={[0.22, 0, 0.05]}>
            <boxGeometry args={[0.1, 0.36, 0.06]} />
            <meshStandardMaterial color="#08080e" roughness={0.7} emissive="#9d1cff" emissiveIntensity={0.7} />
          </mesh>
        </group>
      </group>
      <Sphere args={[0.48, 48, 32]} position={[0, 1.72, 0]} scale={[1.15, 0.82, 1.15]}>
        <meshBasicMaterial color="#2e64ff" transparent opacity={0.075} />
      </Sphere>
    </group>
  );
}
