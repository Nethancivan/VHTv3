"use client";

import { extend, useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide, Mesh, ShaderMaterial } from "three";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { HaloMaterial } from "@/scene/shaders/haloMaterial";
import { useRitualStore } from "@/state/ritualStore";
import "@/scene/types";

extend({ HaloMaterial });

export function HaloPortal() {
  const mat = useRef<ShaderMaterial>(null);
  const group = useRef<Mesh>(null);
  const hoverZone = useRitualStore((state) => state.hoverZone);
  const pulse = useRitualStore((state) => state.pulse);
  const uniforms = useMemo(() => ({ pulse: { value: 0 } }), []);

  useEffect(() => {
    gsap.fromTo(uniforms.pulse, { value: 1 }, { value: 0, duration: 1.5, ease: "power3.out" });
  }, [pulse, uniforms]);

  useFrame(({ clock }, delta) => {
    if (!mat.current || !group.current) return;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uPulse.value = uniforms.pulse.value;
    mat.current.uniforms.uHover.value += ((hoverZone === "center" ? 1 : 0) - mat.current.uniforms.uHover.value) * delta * 3.6;
    const breathing = 1 + Math.sin(clock.elapsedTime * 0.86) * 0.018 + uniforms.pulse.value * 0.08;
    group.current.scale.setScalar(breathing);
  });

  return (
    <group position={[0, 2.08, -1.55]}>
      <mesh ref={group} renderOrder={2}>
        <ringGeometry args={[2.78, 3.55, 192, 12]} />
        <haloMaterial ref={mat} transparent depthWrite={false} blending={AdditiveBlending} side={DoubleSide} />
      </mesh>
      <mesh rotation={[0, 0, 0]} renderOrder={1}>
        <circleGeometry args={[3.05, 160]} />
        <meshBasicMaterial color="#ff1d45" transparent opacity={0.055} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
