"use client";

import { extend, useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide, Group, Mesh, ShaderMaterial } from "three";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { HaloMaterial } from "@/scene/shaders/haloMaterial";
import { useRitualStore } from "@/state/ritualStore";
import "@/scene/types";

extend({ HaloMaterial });

export function EclipsePortal() {
  const root = useRef<Group>(null);
  const shader = useRef<ShaderMaterial>(null);
  const ring = useRef<Mesh>(null);
  const pulse = useRitualStore((state) => state.pulse);
  const hoverZone = useRitualStore((state) => state.hoverZone);
  const pulseValue = useMemo(() => ({ value: 0 }), []);

  useEffect(() => {
    gsap.fromTo(pulseValue, { value: 1 }, { value: 0, duration: 1.4, ease: "power3.out" });
  }, [pulse, pulseValue]);

  useFrame(({ clock }, delta) => {
    if (root.current) root.current.rotation.z += delta * 0.012;
    if (ring.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 0.72) * 0.012 + pulseValue.value * 0.035;
      ring.current.scale.setScalar(scale);
    }
    if (shader.current) {
      shader.current.uniforms.uTime.value = clock.elapsedTime;
      shader.current.uniforms.uPulse.value = pulseValue.value;
      shader.current.uniforms.uHover.value +=
        ((hoverZone === "center" ? 1 : 0) - shader.current.uniforms.uHover.value) * delta * 3;
    }
  });

  return (
    <group ref={root} position={[0, 2.02, -1.48]}>
      <mesh renderOrder={0}>
        <circleGeometry args={[2.35, 128]} />
        <meshBasicMaterial color="#0a0005" side={DoubleSide} />
      </mesh>
      <mesh ref={ring} renderOrder={2}>
        <torusGeometry args={[2.48, 0.09, 24, 192]} />
        <meshBasicMaterial
          color="#ff3218"
          transparent
          opacity={0.58}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh renderOrder={1}>
        <ringGeometry args={[2.12, 2.82, 192, 8]} />
        <haloMaterial ref={shader} transparent side={DoubleSide} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, -0.03]} renderOrder={1}>
        <ringGeometry args={[2.45, 2.78, 160]} />
        <meshBasicMaterial
          color="#ff7a22"
          transparent
          opacity={0.08}
          side={DoubleSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
