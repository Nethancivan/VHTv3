"use client";

import { extend, useFrame } from "@react-three/fiber";
import { DoubleSide, Mesh, ShaderMaterial } from "three";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { WaterMaterial } from "@/scene/shaders/waterMaterial";
import { useRitualStore } from "@/state/ritualStore";
import "@/scene/types";

extend({ WaterMaterial });

export function RitualWater() {
  const mat = useRef<ShaderMaterial>(null);
  const mesh = useRef<Mesh>(null);
  const cursor = useRitualStore((state) => state.cursor);
  const pulse = useRitualStore((state) => state.pulse);
  const value = useMemo(() => ({ pulse: { value: 0 } }), []);

  useEffect(() => {
    gsap.fromTo(value.pulse, { value: 0.8 }, { value: 0, duration: 1.5, ease: "power3.out" });
  }, [pulse, value]);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uMouse.value = [cursor.x, cursor.y];
    mat.current.uniforms.uPulse.value = value.pulse.value;
  });

  return (
    <mesh ref={mesh} position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow renderOrder={0}>
      <planeGeometry args={[24, 16, 120, 72]} />
      <waterMaterial ref={mat} transparent side={DoubleSide} />
    </mesh>
  );
}
