"use client";

import { extend, useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide, ShaderMaterial } from "three";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { BeamMaterial } from "@/scene/shaders/beamMaterial";
import { useRitualStore } from "@/state/ritualStore";
import "@/scene/types";

extend({ BeamMaterial });

export function DivineBeam() {
  const mat = useRef<ShaderMaterial>(null);
  const pulse = useRitualStore((state) => state.pulse);
  const value = useMemo(() => ({ pulse: { value: 0 } }), []);

  useEffect(() => {
    gsap.fromTo(value.pulse, { value: 1 }, { value: 0, duration: 1.5, ease: "power2.out" });
  }, [pulse, value]);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uPulse.value = value.pulse.value;
  });

  return (
    <group position={[0, 2.15, -0.45]}>
      <mesh rotation={[0, 0, 0]} renderOrder={3}>
        <planeGeometry args={[1.25, 13, 1, 1]} />
        <beamMaterial ref={mat} transparent depthWrite={false} blending={AdditiveBlending} side={DoubleSide} />
      </mesh>
      <mesh position={[0, -1.2, 0.03]} renderOrder={3}>
        <cylinderGeometry args={[0.22, 0.72, 5.5, 48, 1, true]} />
        <meshBasicMaterial color="#fff2df" transparent opacity={0.12} blending={AdditiveBlending} depthWrite={false} side={DoubleSide} />
      </mesh>
    </group>
  );
}
