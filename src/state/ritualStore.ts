import { create } from "zustand";

export type HoverZone = "none" | "center" | "fire" | "arms";

type RitualState = {
  cursor: { x: number; y: number };
  hoverZone: HoverZone;
  pulse: number;
  setCursor: (x: number, y: number) => void;
  setHoverZone: (zone: HoverZone) => void;
  triggerCenterPulse: () => void;
};

export const useRitualStore = create<RitualState>((set) => ({
  cursor: { x: 0, y: 0 },
  hoverZone: "none",
  pulse: 0,
  setCursor: (x, y) => set({ cursor: { x, y } }),
  setHoverZone: (hoverZone) => set({ hoverZone }),
  triggerCenterPulse: () => set((state) => ({ pulse: state.pulse + 1, hoverZone: "center" }))
}));
