"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import { useRitualStore } from "@/state/ritualStore";

const target = new Vector3(0, 1.25, 0);
const position = new Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const cursor = useRitualStore((state) => state.cursor);
  const pulse = useRitualStore((state) => state.pulse);
  const lastPulse = useRef(0);
  const impulse = useRef(0);

  useFrame(({ clock }, delta) => {
    if (pulse !== lastPulse.current) {
      lastPulse.current = pulse;
      impulse.current = 1;
    }

    impulse.current = Math.max(0, impulse.current - delta * 0.8);
    const t = clock.elapsedTime;
    const breath = Math.sin(t * 0.47) * 0.075;
    const orbitX = cursor.x * 0.9;
    const orbitY = cursor.y * 0.34;
    const flashPull = impulse.current * 0.55;

    position.set(orbitX, 1.82 + orbitY + breath, 10.4 - flashPull);
    camera.position.lerp(position, 1 - Math.pow(0.035, delta));
    camera.lookAt(target);
  });

  return null;
}
