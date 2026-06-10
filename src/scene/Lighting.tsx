"use client";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.11} color="#141225" />
      <pointLight position={[0, 2.35, -1.1]} intensity={3.9} color="#ff3218" distance={10} decay={2} />
      <pointLight position={[0, 1.2, 2.15]} intensity={2.7} color="#135dff" distance={7} decay={2} />
      <pointLight position={[-3.2, 1.15, 1.4]} intensity={1.25} color="#5e35ff" distance={7} decay={2} />
      <pointLight position={[3.3, 1.35, 0.8]} intensity={1.15} color="#00a6ff" distance={7} decay={2} />
      <spotLight
        position={[0, 7.5, 0.4]}
        target-position={[0, 0.72, 0]}
        intensity={3.8}
        angle={0.19}
        penumbra={0.94}
        color="#f7e9e5"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
    </>
  );
}
