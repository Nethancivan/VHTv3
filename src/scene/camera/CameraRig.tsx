"use client";

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { MathUtils, TOUCH } from "three";
import { isCompactViewport } from "@/scene/performance";

export function CameraRig() {
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);
  const compact = isCompactViewport(width);
  const [idle, setIdle] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopIdleMotion = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    setIdle(false);
  };

  const resumeIdleMotion = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 2800);
  };

  useEffect(() => {
    camera.position.set(0, compact ? 1.52 : 1.62, compact ? 9.45 : 8.9);
    if ("fov" in camera) {
      camera.fov = compact ? 48 : 42;
      camera.updateProjectionMatrix();
    }
  }, [camera, compact]);

  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <OrbitControls
      makeDefault
      target={[0, 1.18, 0]}
      enableRotate
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={compact ? 0.42 : 0.48}
      enablePan={false}
      enableZoom={false}
      minPolarAngle={MathUtils.degToRad(55)}
      maxPolarAngle={MathUtils.degToRad(108)}
      autoRotate={idle}
      autoRotateSpeed={0.1}
      touches={{ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_ROTATE }}
      onStart={stopIdleMotion}
      onEnd={resumeIdleMotion}
    />
  );
}
