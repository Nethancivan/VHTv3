export const ARTWORK_DNA_CODE: {
  AUTHOR_IDENTITY: {
    author: string;
    legal_identity: string;
    project: string;
    author_signature_direction: string;
    identity_lock: string;
  };
  ARTWORK_IDENTITY: {
    title: string;
    version: string;
    medium: string;
    publish_ratio: string;
    original_ratio_reference: string;
    mantra: string[];
  };
  HERO_COPY: {
    headline: string;
    subheadline: string;
    description: string;
  };
  MANIFESTO: Record<string, string>;
  LOCKED_CORE: {
    story: string[];
    visual_form: string[];
  };
  COLOR_GENOME: {
    base: string[];
    dominant_neon: string[];
    secondary_neon: string[];
    color_rules: string[];
  };
  FORBIDDEN_GENES: string[];
  AUTHOR_SIGNATURE: {
    visible_markers: string[];
    hidden_markers: string[];
    decode_line: string;
  };
};
