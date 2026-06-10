"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
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
      <MediumMantraAudio />
      <div className="vignette" />
      <div className="scanline" />
    </main>
  );
}
