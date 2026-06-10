"use client";

import { useEffect, useRef, useState } from "react";
import { MEDIUM_MANTRA_AUDIO } from "@/config/audio";

export function MediumMantraAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);
  const [audioAvailable, setAudioAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(MEDIUM_MANTRA_AUDIO.src);
    audio.loop = MEDIUM_MANTRA_AUDIO.loop;
    audio.preload = "auto";
    audio.volume = MEDIUM_MANTRA_AUDIO.initialVolume;
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const removeGestureListeners = () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("mousedown", startAudio);
      window.removeEventListener("keydown", startAudio);
    };

    const fadeIn = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / MEDIUM_MANTRA_AUDIO.fadeInMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        if (audioRef.current) {
          audioRef.current.volume =
            MEDIUM_MANTRA_AUDIO.initialVolume +
            (MEDIUM_MANTRA_AUDIO.targetVolume - MEDIUM_MANTRA_AUDIO.initialVolume) * eased;
        }

        if (progress < 1) {
          fadeFrameRef.current = requestAnimationFrame(tick);
        }
      };
      fadeFrameRef.current = requestAnimationFrame(tick);
    };

    async function startAudio() {
      if (hasStartedRef.current || !audioRef.current) return;
      hasStartedRef.current = true;

      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = MEDIUM_MANTRA_AUDIO.initialVolume;
        await audioRef.current.play();
        fadeIn();
      } catch (error) {
        setAudioAvailable(false);
        console.warn(
          "[MediumMantraAudio] Audio could not start. Google Drive may block direct playback, autoplay may be restricted, or the file may not be publicly accessible.",
          error
        );
      }

      removeGestureListeners();
    }

    const onAudioError = () => {
      setAudioAvailable(false);
      console.warn("[MediumMantraAudio] Failed to load remote audio:", MEDIUM_MANTRA_AUDIO.src);
    };

    window.addEventListener("pointerdown", startAudio, { once: true });
    window.addEventListener("touchstart", startAudio, { once: true });
    window.addEventListener("mousedown", startAudio, { once: true });
    window.addEventListener("keydown", startAudio, { once: true });
    audio.addEventListener("error", onAudioError);

    return () => {
      removeGestureListeners();
      audio.removeEventListener("error", onAudioError);

      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current);
      }

      audio.pause();
      audio.src = "";
      audio.load();
      audioRef.current = null;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-audio-available={audioAvailable}
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}
    />
  );
}
