"use client";

import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, InstancedMesh, Object3D } from "three";
import { useMemo, useRef } from "react";
import { useRitualStore } from "@/state/ritualStore";

const dummy = new Object3D();
const colors = ["#ff521c", "#ffcf72", "#2ba7ff", "#a642ff", "#ffffff"].map((c) => new Color(c));

export function PixelFragments() {
  const mesh = useRef<InstancedMesh>(null);
  const cursor = useRitualStore((state) => state.cursor);
  const count = 420;
  const fragments = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 12,
        y: Math.random() * 5.6,
        z: (Math.random() - 0.5) * 6 - 1.6,
        s: 0.018 + Math.random() * 0.052,
        speed: 0.08 + Math.random() * 0.25,
        color: colors[Math.floor(Math.random() * colors.length)]
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    fragments.forEach((fragment, i) => {
      const t = clock.elapsedTime * fragment.speed + i;
      dummy.position.set(
        fragment.x + Math.sin(t) * 0.2 + cursor.x * fragment.z * -0.025,
        fragment.y + Math.cos(t * 1.3) * 0.15,
        fragment.z + cursor.y * 0.1
      );
      dummy.rotation.set(t, t * 0.7, t * 0.3);
      dummy.scale.setScalar(fragment.s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, fragment.color);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent opacity={0.48} blending={AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  );
}
