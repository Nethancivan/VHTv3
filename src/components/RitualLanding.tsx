"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRitualStore } from "@/state/ritualStore";

const RitualCanvas = dynamic(() => import("@/scene/RitualCanvas").then((mod) => mod.RitualCanvas), {
  ssr: false
});

export function RitualLanding() {
  const triggerCenterPulse = useRitualStore((state) => state.triggerCenterPulse);
  const setHoverZone = useRitualStore((state) => state.setHoverZone);

  return (
    <main className="landing">
      <div className="scene">
        <RitualCanvas />
      </div>
      <motion.header
        className="topbar"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <a className="mark" href="#" aria-label="AI's Collection home">
          AI&apos;s Collection
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#">About</a>
          <a href="#">Collection</a>
          <a href="#">Journal</a>
          <a href="#">Contact</a>
        </nav>
      </motion.header>
      <motion.section
        className="copy"
        onMouseEnter={() => setHoverZone("center")}
        onMouseLeave={() => setHoverZone("none")}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.25, delay: 0.2, ease: "easeOut" }}
      >
        <p className="eyebrow">Generative Art from Human Imagination</p>
        <h1>AI&apos;s Collection</h1>
        <p className="subhead">A digital ritual space for memory, belief, and the unseen self.</p>
        <p className="description">
          A living installation where spirit, consciousness, fire, water, and machine perception
          gather inside an infinite black chamber.
        </p>
        <button className="enter" onClick={triggerCenterPulse} onMouseEnter={() => setHoverZone("center")}>
          Enter Collection
        </button>
      </motion.section>
      <div className="vignette" />
      <div className="scanline" />
    </main>
  );
}
