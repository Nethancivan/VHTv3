"use client";

import { useFrame } from "@react-three/fiber";
import { Group, Mesh, MeshBasicMaterial, NormalBlending } from "three";
import { useEffect, useMemo, useRef } from "react";
import { createSmokeTexture } from "@/scene/textures/createSmokeTexture";

export function FloorMist() {
  const group = useRef<Group>(null);
  const texture = useMemo(() => createSmokeTexture(), []);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const mist = child as Mesh;
      mist.rotation.z += delta * (index % 2 ? -0.018 : 0.012);
      (mist.material as MeshBasicMaterial).opacity =
        0.1 + index * 0.025 + Math.sin(clock.elapsedTime * 0.42 + index) * 0.018;
    });
  });

  return (
    <group ref={group}>
      {[
        { y: 0.015, scale: [9, 6, 1] as [number, number, number], color: "#100b18" },
        { y: 0.03, scale: [6.2, 4.8, 1] as [number, number, number], color: "#1b1023" },
        { y: 0.045, scale: [4.3, 3.4, 1] as [number, number, number], color: "#0d1525" }
      ].map((layer, index) => (
        <mesh
          key={layer.y}
          position={[0, layer.y, 0]}
          rotation={[-Math.PI / 2, 0, index * 0.8]}
          scale={layer.scale}
          renderOrder={3}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            color={layer.color}
            transparent
            opacity={0.11}
            depthWrite={false}
            blending={NormalBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
