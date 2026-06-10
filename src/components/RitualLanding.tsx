"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import GhostCursor from "@/components/GhostCursor/GhostCursor";
import { MediumMantraAudio } from "@/components/Audio/MediumMantraAudio";
import { ARTWORK_DNA_CODE } from "@/data/artwork-dna";

const RitualCanvas = dynamic(() => import("@/scene/RitualCanvas").then((mod) => mod.RitualCanvas), {
  ssr: false
});

export function RitualLanding() {
  const { headline, subheadline, description } = ARTWORK_DNA_CODE.HERO_COPY;

  return (
    <main className="landing" data-artwork={ARTWORK_DNA_CODE.ARTWORK_IDENTITY.title}>
      <div className="scene">
        <RitualCanvas />
      </div>
      <motion.section
        className="copy"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="artwork-title" data-text={headline}>
          {headline}
        </h1>
        <p className="subhead">{subheadline}</p>
        <p className="description">{description}</p>
      </motion.section>
      <GhostCursor
        color="#B497CF"
        brightness={1}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1.0}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
        zIndex={20}
      />
      <MediumMantraAudio />
      <div className="vignette" />
      <div className="scanline" />
    </main>
  );
}
