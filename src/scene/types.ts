import { ThreeElement } from "@react-three/fiber";
import { HaloMaterial } from "@/scene/shaders/haloMaterial";
import { WaterMaterial } from "@/scene/shaders/waterMaterial";
import { BeamMaterial } from "@/scene/shaders/beamMaterial";

declare module "@react-three/fiber" {
  interface ThreeElements {
    haloMaterial: ThreeElement<typeof HaloMaterial>;
    waterMaterial: ThreeElement<typeof WaterMaterial>;
    beamMaterial: ThreeElement<typeof BeamMaterial>;
  }
}
