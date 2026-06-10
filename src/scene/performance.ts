export function isCompactViewport(width: number) {
  return width < 768;
}

export function sceneCount(width: number, desktop: number, mobile: number) {
  return isCompactViewport(width) ? mobile : desktop;
}
